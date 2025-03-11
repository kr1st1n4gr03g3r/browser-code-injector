let styleElement;
let scriptElement;

chrome.storage.sync.get(["stylesEnabled", "customSites"], (data) => {
  const currentSite = window.location.hostname;

  if (
    data.stylesEnabled !== false &&
    (!data.customSites || data.customSites.includes(currentSite))
  ) {
    injectStyles();
    injectScript();
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

  if (message.action === "update_styles") {
    updateStyles();
  }

  if (message.action === "update_scripts") {
    updateScripts();
  }
});

function injectStyles() {
  if (!styleElement) {
    styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
  }
  fetch(chrome.runtime.getURL("styles/styles.css"))
    .then((response) => response.text())
    .then((css) => {
      styleElement.innerHTML = css;
    });
}

function updateStyles() {
  if (styleElement) {
    fetch(chrome.runtime.getURL("styles/styles.css"))
      .then((response) => response.text())
      .then((css) => {
        styleElement.innerHTML = css;
      });
  }
}

function removeStyles() {
  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }
}

function injectScript() {
  if (!scriptElement) {
    scriptElement = document.createElement("script");
    scriptElement.src = chrome.runtime.getURL("scripts/script.js");
    document.body.appendChild(scriptElement);
  }
}

function updateScripts() {
  if (scriptElement) {
    scriptElement.remove();
  }
  injectScript();
}
