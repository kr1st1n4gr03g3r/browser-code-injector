chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed and running.");
});

// Listen for watch.js triggering a reload
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "reload_styles") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "reload_styles" });
      }
    });
  }
});
