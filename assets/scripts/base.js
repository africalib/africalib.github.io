window.onIframeLoad = ($iframe) => {
    try {
        const doc = $iframe.contentDocument || $iframe.contentWindow.document;
        console.log(doc)
        $iframe.style.height = doc.body.scrollHeight + 'px';
        console.log($iframe.style.height)
    } catch (e) {
        console.error(e);
    }
}