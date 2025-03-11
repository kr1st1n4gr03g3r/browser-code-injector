let styleElements = [];

chrome.storage.sync.get(
  ["stylesEnabled", "cssDirectories", "activeTabs"],
  (data) => {
    if (!data.stylesEnabled) return;
    if (!data.activeTabs || !data.activeTabs.includes(chrome.runtime.id))
      return;
    if (data.cssDirectories) {
      injectStyles(data.cssDirectories);
    }
  }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "update_styles") {
    chrome.storage.sync.get("cssDirectories", (data) => {
      if (data.cssDirectories) {
        injectStyles(data.cssDirectories);
      }
    });
  }
});

function injectStyles(directories) {
  removeStyles();
  directories.forEach((directory) => {
    fetch(`file://${directory}`)
      .then((response) => response.text())
      .then((css) => {
        let styleElement = document.createElement("style");
        styleElement.innerHTML = css;
        document.head.appendChild(styleElement);
        styleElements.push(styleElement);
        injectStylesIntoIframes(css);
      })
      .catch((error) => console.error("Error loading CSS:", error));
  });
}

function removeStyles() {
  styleElements.forEach((style) => style.remove());
  styleElements = [];
}

function injectStylesIntoIframes(css) {
  document.querySelectorAll("iframe").forEach((iframe) => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      let styleElement = iframeDoc.createElement("style");
      styleElement.innerHTML = css;
      iframeDoc.head.appendChild(styleElement);
    } catch (error) {
      console.warn("Could not access iframe:", error);
    }
  });
}
