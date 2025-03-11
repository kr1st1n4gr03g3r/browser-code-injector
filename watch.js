const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const watchFolders = ["styles", "scripts"];
const externalCssFile = process.argv[2]; // Get file from terminal argument

watchFolders.forEach((folder) => {
  const folderPath = path.join(__dirname, folder);
  fs.watch(folderPath, { recursive: true }, (eventType, filename) => {
    if (filename) {
      console.log(
        `Detected change in ${filename}. Reloading affected files...`
      );

      if (filename.endsWith(".css")) {
        sendMessageToTabs({ action: "update_styles" });
      }

      if (filename.endsWith(".js")) {
        sendMessageToTabs({ action: "update_scripts" });
      }
    }
  });
});

if (externalCssFile) {
  console.log(`Injecting external CSS file: ${externalCssFile}`);
  injectExternalCss(externalCssFile);
}

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

function injectExternalCss(filePath) {
  fs.readFile(filePath, "utf8", (err, css) => {
    if (err) {
      console.error("Error reading external CSS file:", err);
      return;
    }

    sendMessageToTabs({ action: "inject_external_css", css });
  });
}

console.log("Watching for file changes...");
