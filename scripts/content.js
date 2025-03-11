let styleElement;

chrome.storage.sync.get(["stylesEnabled", "cssDirectory"], (data) => {
  if (data.stylesEnabled !== false) {
    injectStyles(data.cssDirectory);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggle_styles") {
    if (message.enabled) {
      chrome.storage.sync.get("cssDirectory", (data) => {
        injectStyles(data.cssDirectory);
      });
    } else {
      removeStyles();
    }
  }

  if (message.action === "update_css_directory") {
    injectStyles(message.directory);
  }
});

function injectStyles(directory) {
  if (!directory) return;

  if (!styleElement) {
    styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
  }

  fetch(`file://${directory}`)
    .then((response) => response.text())
    .then((css) => {
      styleElement.innerHTML = css;
    })
    .catch((error) => console.error("Error loading CSS:", error));
}

function removeStyles() {
  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }
}
