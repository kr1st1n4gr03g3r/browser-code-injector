chrome.runtime.onInstalled.addListener(() => {
  console.log("Browser Code Injector Installed.");
});

chrome.runtime.onConnect.addListener((port) => {
  console.log("Connected to DevTools:", port.name);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "reload_styles") {
    console.log("Received request to reload styles.");
    sendResponse({ status: "Styles reloaded" });
  }
});
