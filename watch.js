const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const externalCssFiles = [];

chrome.storage.sync.get("cssDirectories", (data) => {
  if (data.cssDirectories) {
    externalCssFiles.push(...data.cssDirectories);
    watchFiles();
  }
});

function watchFiles() {
  externalCssFiles.forEach((file) => {
    fs.watch(file, { persistent: true }, (eventType, filename) => {
      if (filename) {
        console.log(`Detected change in ${file}. Reloading styles...`);
        sendMessageToTabs({ action: "update_styles" });
      }
    });
  });
}

function sendMessageToTabs(message) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, message);
    });
  });
}

console.log("Watching for file changes...");
