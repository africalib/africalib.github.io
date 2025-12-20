window.onIframeLoad = ($iframe) => {
    try {
        const doc = $iframe.contentDocument || $iframe.contentWindow.document;
        $iframe.style.height = (doc.body.scrollHeight + 3) + 'px';
        console.log($iframe.style.height)
    } catch (e) {
        console.error(e);
    }
}