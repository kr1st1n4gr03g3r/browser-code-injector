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

  if (message.action === "update_css_directory") {
    chrome.storage.sync.set({ cssDirectory: message.directory });
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          action: "update_css_directory",
          directory: message.directory,
        });
      });
    });
  }
});
