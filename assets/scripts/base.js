window.onIframeLoad = ($iframe) => {
    try {
        const doc = $iframe.contentDocument || $iframe.contentWindow.document;
        $iframe.style.height = (doc.body.scrollHeight + 1) + 'px';
    } catch (e) {
        console.error(e);
    }
}