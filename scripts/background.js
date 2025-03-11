chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed and running.");
});

// Listen for messages from watch.js or popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "reload_styles") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "reload_styles" });
      }
    });
  }
});

// Close popup when clicking the "X" button
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "close_popup") {
    chrome.windows.getCurrent((window) => {
      chrome.windows.remove(window.id);
    });
  }
});
