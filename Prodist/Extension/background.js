chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {cancel: true}
    },
    {urls: ["*://*.quora.com/*","*://*.facebook.com/*","*://*.instagram.com/*","*://*.twitter.com/*"]},
    ["blocking"]
)


