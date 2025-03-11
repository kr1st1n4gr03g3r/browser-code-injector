const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const watchFolders = ["styles", "scripts"]; // Folders to watch

watchFolders.forEach((folder) => {
  const folderPath = path.join(__dirname, folder);
  fs.watch(folderPath, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith(".css") || filename.endsWith(".js"))) {
      console.log(`Detected change in ${filename}. Reloading extension...`);

      // Reload Chrome extension
      exec("chrome-cli reload", (err, stdout, stderr) => {
        if (err) {
          console.error("Error reloading extension:", err);
          return;
        }
        console.log("Extension reloaded successfully!");
      });
    }
  });
});

console.log("Watching for file changes...");
