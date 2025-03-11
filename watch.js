const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const cssFilePath = path.join(__dirname, "styles", "style.css");

// Watch for changes in the CSS file
fs.watchFile(cssFilePath, { interval: 500 }, (curr, prev) => {
  console.log(`Detected change in ${cssFilePath}. Reloading styles...`);

  // Send a message to the Chrome extension
  exec(
    `osascript -e 'tell application "Google Chrome" to reload active tab'`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error refreshing Chrome: ${error.message}`);
        return;
      }
      console.log("Styles reloaded successfully!");
    }
  );
});
