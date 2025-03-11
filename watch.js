const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const watchFolders = ["styles", "scripts"];

watchFolders.forEach((folder) => {
  const folderPath = path.join(__dirname, folder);
  fs.watch(folderPath, { recursive: true }, (eventType, filename) => {
    if (filename) {
      console.log(
        `Detected change in ${filename}. Reloading affected files...`
      );

      if (filename.endsWith(".css")) {
        exec("chrome-cli reload", () => {
          sendMessageToTabs({ action: "update_styles" });
        });
      }

      if (filename.endsWith(".js")) {
        exec("chrome-cli reload", () => {
          sendMessageToTabs({ action: "update_scripts" });
        });
      }
    }
  });
});

function sendMessageToTabs(message) {
  exec(`chrome-cli list tabs`, (err, stdout) => {
    if (err) {
      console.error("Error listing tabs:", err);
      return;
    }

    const tabIds = stdout
      .split("\n")
      .map((line) => line.match(/^\[(\d+)\]/))
      .filter((match) => match)
      .map((match) => match[1]);

    tabIds.forEach((tabId) => {
      exec(
        `chrome-cli execute "chrome.runtime.sendMessage(${JSON.stringify(
          message
        )});" -t ${tabId}`
      );
    });
  });
}

console.log("Watching for file changes...");
