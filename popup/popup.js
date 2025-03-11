document.addEventListener("DOMContentLoaded", () => {
  const toggleStyles = document.getElementById("toggle-styles");
  const cssDirectoryInput = document.getElementById("css-directory");
  const saveDirectoryButton = document.getElementById("save-directory");
  const reloadBtn = document.getElementById("reload-extension");

  // Load saved settings
  chrome.storage.sync.get(["stylesEnabled", "cssDirectory"], (data) => {
    toggleStyles.checked = data.stylesEnabled !== false;
    if (data.cssDirectory) {
      cssDirectoryInput.value = data.cssDirectory;
    }
  });

  // Toggle styles on checkbox change
  toggleStyles.addEventListener("change", () => {
    chrome.storage.sync.set({ stylesEnabled: toggleStyles.checked });
    chrome.runtime.sendMessage({
      action: "toggle_styles",
      enabled: toggleStyles.checked,
    });
  });

  // Save CSS directory
  saveDirectoryButton.addEventListener("click", () => {
    const directory = cssDirectoryInput.value.trim();
    chrome.storage.sync.set({ cssDirectory: directory });
    chrome.runtime.sendMessage({ action: "update_css_directory", directory });
  });

  // Reload extension button
  reloadBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "reload_extension" });
  });
});
