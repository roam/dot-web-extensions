const INTERVAL = 100;
const MAX_ATTEMPTS = 50;

function clean(attempt, noticeRemoved, htmlClassRemoved) {
    noticeRemoved = noticeRemoved || removeNotice();
    htmlClassRemoved = htmlClassRemoved || removeHtmlClass();
    const newAttempt = attempt + 1;
    if (newAttempt <= MAX_ATTEMPTS && (!noticeRemoved || !htmlClassRemoved)) {
        setTimeout(() => {
            clean(attempt + 1, noticeRemoved, htmlClassRemoved);
        }, INTERVAL);
    }
}

function removeNotice() {
    let removed = false;
    ['.gdpr-notification', '.gdpr-dialog-wrapper'].forEach((c) => {
        try {
            let el = document.querySelector(c);
            el = el ? el.parentNode : null;
            el = el ? el.parentNode : null;
            if (el) {
                el.remove();
                removed = true;
            }
        } catch (e) {
            console.error(e);
        }
    });
    return removed;
}

function removeHtmlClass() {
    let removed = false;
    ['is-gdpr-dialog-active', 'is-gdpr-notification-active'].forEach((c) => {
        const html = document.documentElement;
        if (html.classList.contains(c)) {
            html.classList.remove(c);
            removed = true;
        }
    });
    return removed;
}

setTimeout(() => {
    clean(0, false, false);
}, INTERVAL);
