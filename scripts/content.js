let styleElement;

chrome.storage.sync.get(["stylesEnabled", "customSites"], (data) => {
  const currentSite = window.location.hostname;

  if (
    data.stylesEnabled !== false &&
    (!data.customSites || data.customSites.includes(currentSite))
  ) {
    injectStyles();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggle_styles") {
    const currentSite = window.location.hostname;

    if (
      message.enabled &&
      (!data.customSites || data.customSites.includes(currentSite))
    ) {
      injectStyles();
    } else {
      removeStyles();
    }
  }
});

function injectStyles() {
  if (!styleElement) {
    styleElement = document.createElement("link");
    styleElement.rel = "stylesheet";
    styleElement.href = chrome.runtime.getURL("styles/styles.css");
    document.head.appendChild(styleElement);
  }
}

function removeStyles() {
  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }
}
