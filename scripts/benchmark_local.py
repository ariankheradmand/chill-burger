import sys
import http.server
import socketserver
import threading
import time
import os

# Ensure UTF-8
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from benchmark import run_benchmark

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_local():
    port = 3456
    web_dir = os.path.join(os.getcwd(), "out")
    
    os.chdir(web_dir)
    handler = QuietHandler
    httpd = socketserver.TCPServer(("", port), handler)
    
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"Local test server started on http://localhost:{port}/ (serving out/)")
    time.sleep(1)
    
    try:
        # Run benchmark on local optimized build at 4x CPU slowdown
        metrics = run_benchmark(f"http://localhost:{port}/", cpu_throttling=4)
        return metrics
    finally:
        httpd.shutdown()
        print("Local test server stopped.")

if __name__ == "__main__":
    run_local()
