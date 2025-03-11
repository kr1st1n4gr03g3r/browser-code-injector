const fs = require("fs");

chrome.storage.sync.get("cssDirectories", (data) => {
  if (data.cssDirectories) {
    data.cssDirectories.forEach((filePath) => {
      fs.watch(filePath, { persistent: true }, (eventType, filename) => {
        if (filename) {
          console.log(`Detected change in ${filePath}. Reloading styles...`);
          chrome.storage.sync.get("activeTabs", (data) => {
            if (!data.activeTabs) return;
            data.activeTabs.forEach((tabId) => {
              chrome.tabs.sendMessage(tabId, { action: "update_styles" });
            });
          });
        }
      });
    });
  }
});
