const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const cssFilePath = path.join(__dirname, "styles", "style.css");

fs.watchFile(cssFilePath, { interval: 500 }, (curr, prev) => {
  console.log(`Detected change in ${cssFilePath}. Reloading styles...`);

  // Send message to the extension to reload styles
  exec(
    `osascript -e 'tell application "Google Chrome" to set URL of active tab of window 1 to URL of active tab of window 1'`,
    (error) => {
      if (error) {
        console.error(`Error refreshing Chrome: ${error.message}`);
        return;
      }
      console.log("Styles reloaded successfully!");
    }
  );
});

console.log("Watching for CSS changes...");
