chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "reload_extension") {
    chrome.runtime.reload();
  }

  if (message.action === "toggle_styles") {
    chrome.storage.sync.set({ stylesEnabled: message.enabled });
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          action: "toggle_styles",
          enabled: message.enabled,
        });
      });
    });
  }

  if (message.action === "update_styles") {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: "update_styles" });
      });
    });
  }

  if (message.action === "update_scripts") {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: "update_scripts" });
      });
    });
  }
});
