import sys
import json
import time
from playwright.sync_api import sync_playwright

# Ensure UTF-8
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

def run_benchmark(url="https://chill-burger.ir/", cpu_throttling=4, runs=1):
    print(f"--- Running Benchmark on {url} (CPU Throttling: {cpu_throttling}x) ---")
    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # Emulate low-end mobile device (390x844, touch, mobile)
        context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (Linux; Android 10; SM-A105F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36",
            is_mobile=True,
            has_touch=True,
            device_scale_factor=2
        )

        # Enable Chrome DevTools Protocol for CPU throttling
        page = context.new_page()
        client = page.context.new_cdp_session(page)
        client.send("Emulation.setCPUThrottlingRate", {"rate": cpu_throttling})

        # Inject performance recording script
        page.add_init_script("""
            window.__fpsMetrics = {
                frameDeltas: [],
                longTasks: 0,
                longTaskTime: 0,
                cls: 0,
                running: false
            };

            // Observer for Layout Shift
            try {
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            window.__fpsMetrics.cls += entry.value;
                        }
                    }
                }).observe({ type: 'layout-shift', buffered: true });
            } catch(e) {}

            // Observer for Long Tasks
            try {
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        window.__fpsMetrics.longTasks++;
                        window.__fpsMetrics.longTaskTime += entry.duration;
                    }
                }).observe({ type: 'longtask', buffered: true });
            } catch(e) {}

            // Frame timing loop
            let lastTime = performance.now();
            function onFrame(now) {
                if (window.__fpsMetrics.running) {
                    const delta = now - lastTime;
                    window.__fpsMetrics.frameDeltas.push(delta);
                }
                lastTime = now;
                requestAnimationFrame(onFrame);
            }
            requestAnimationFrame(onFrame);

            window.__startRecording = () => {
                window.__fpsMetrics.frameDeltas = [];
                window.__fpsMetrics.running = true;
                lastTime = performance.now();
            };

            window.__stopRecording = () => {
                window.__fpsMetrics.running = false;
                return window.__fpsMetrics;
            };
        """)

        # Navigate to page
        page.goto(url, wait_until="networkidle")
        time.sleep(1)

        # Start recording animation performance
        page.evaluate("window.__startRecording()")

        # Perform comprehensive mobile interaction test:
        # 1. Smooth scroll down through the entire menu
        total_height = page.evaluate("document.body.scrollHeight")
        scroll_step = 100
        current_scroll = 0

        while current_scroll < total_height:
            current_scroll += scroll_step
            page.evaluate(f"window.scrollTo(0, {current_scroll})")
            time.sleep(0.04) # ~25 scroll events per second

        # 2. Toggle price switch if available
        toggle_buttons = page.query_selector_all(".toggle-slider, button:has-text('دوبل'), button:has-text('سینگل')")
        for btn in toggle_buttons[:2]:
            try:
                btn.click()
                time.sleep(0.3)
            except Exception:
                pass

        # 3. Click items to trigger expansion
        items = page.query_selector_all(".item")
        for item in items[:4]:
            try:
                item.click()
                time.sleep(0.2)
                item.click()
                time.sleep(0.15)
            except Exception:
                pass

        # 4. Scroll back to top
        while current_scroll > 0:
            current_scroll -= scroll_step * 2
            page.evaluate(f"window.scrollTo(0, {max(0, current_scroll)})")
            time.sleep(0.03)

        time.sleep(0.5)

        # Stop and collect metrics
        metrics = page.evaluate("window.__stopRecording()")
        browser.close()

        deltas = metrics.get("frameDeltas", [])
        if not deltas:
            print("No frames recorded")
            return None

        # Process frame stats
        total_frames = len(deltas)
        total_duration = sum(deltas) / 1000.0 # in seconds
        avg_fps = total_frames / total_duration if total_duration > 0 else 0

        # Sort deltas for percentiles (higher delta = lower fps)
        sorted_deltas = sorted(deltas)
        p99_delta = sorted_deltas[int(total_frames * 0.99)] if total_frames > 0 else 16.6
        p95_delta = sorted_deltas[int(total_frames * 0.95)] if total_frames > 0 else 16.6
        low_1_fps = 1000.0 / p99_delta if p99_delta > 0 else 0
        low_5_fps = 1000.0 / p95_delta if p95_delta > 0 else 0

        # Dropped frames
        # > 20ms (> 50 fps target or dropped frame on 60hz)
        dropped_frames = sum(1 for d in deltas if d > 20.0)
        # > 33.3ms (severe jank / dropped down to < 30fps)
        severe_jank_frames = sum(1 for d in deltas if d > 33.3)

        report = {
            "avg_fps": round(avg_fps, 1),
            "low_1_fps": round(low_1_fps, 1),
            "low_5_fps": round(low_5_fps, 1),
            "total_frames": total_frames,
            "dropped_frames": dropped_frames,
            "dropped_percent": round((dropped_frames / total_frames) * 100, 1) if total_frames > 0 else 0,
            "severe_jank_frames": severe_jank_frames,
            "severe_jank_percent": round((severe_jank_frames / total_frames) * 100, 1) if total_frames > 0 else 0,
            "cls": round(metrics.get("cls", 0), 4),
            "long_tasks": metrics.get("longTasks", 0),
            "long_task_time_ms": round(metrics.get("longTaskTime", 0), 1),
        }

        print("\n--- Benchmark Results ---")
        print(f"Average FPS:          {report['avg_fps']} FPS")
        print(f"1% Low FPS:           {report['low_1_fps']} FPS")
        print(f"5% Low FPS:           {report['low_5_fps']} FPS")
        print(f"Total Frames:         {report['total_frames']}")
        print(f"Dropped Frames (>20ms): {report['dropped_frames']} ({report['dropped_percent']}%)")
        print(f"Severe Jank (>33ms):   {report['severe_jank_frames']} ({report['severe_jank_percent']}%)")
        print(f"Cumulative Layout Shift: {report['cls']}")
        print(f"Long Tasks Count:     {report['long_tasks']}")
        print(f"Total Blocking Time:  {report['long_task_time_ms']} ms")
        print("-------------------------\n")

        return report

if __name__ == "__main__":
    run_benchmark()
