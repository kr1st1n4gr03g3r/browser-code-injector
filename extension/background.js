chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startServer") {
    chrome.storage.local.set({ serverStatus: "ON", folderPath: message.path });
    chrome.runtime.sendMessage({ action: "updateStatus", status: "ON" });
  }

  if (message.action === "stopServer") {
    chrome.storage.local.set({ serverStatus: "OFF" });
    chrome.runtime.sendMessage({ action: "updateStatus", status: "OFF" });
  }
});
