document.addEventListener("DOMContentLoaded", () => {
  const cssDirectoryInput = document.getElementById("css-directory");
  const saveDirectoryButton = document.getElementById("save-directory");
  const resetDirectoryButton = document.getElementById("reset-directory");
  const reloadBtn = document.getElementById("reload-extension");

  // Load saved settings
  chrome.storage.sync.get(["cssDirectories"], (data) => {
    if (data.cssDirectories) {
      cssDirectoryInput.value = data.cssDirectories.join(", ");
    }
  });

  // Save CSS directories
  saveDirectoryButton.addEventListener("click", () => {
    const directories = cssDirectoryInput.value.split(",").map((s) => s.trim());
    chrome.storage.sync.set({ cssDirectories: directories });
  });

  // Reset directories
  resetDirectoryButton.addEventListener("click", () => {
    chrome.storage.sync.remove("cssDirectories");
    cssDirectoryInput.value = "";
  });

  // Reload extension
  reloadBtn.addEventListener("click", () => {
    chrome.runtime.reload();
  });
});
