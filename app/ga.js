export const GA_TRACKING_ID = 'G-GQ4JRRT24K';

export function pageview(url) {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
}

export function event({ action, category, label, value }) {
    if (typeof window.gtag !== 'undefined') {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
}
