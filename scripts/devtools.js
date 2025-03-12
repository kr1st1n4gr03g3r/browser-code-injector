document.addEventListener("DOMContentLoaded", () => {
  const saveDirectoryButton = document.getElementById("save-directory");
  const resetDirectoryButton = document.getElementById("reset-directory");
  const reloadBtn = document.getElementById("reload-extension");

  // Save CSS directories
  saveDirectoryButton.addEventListener("click", () => {
    const directories = document
      .getElementById("css-directory")
      .value.split(",")
      .map((s) => s.trim());
    chrome.storage.sync.set({ cssDirectories: directories });
  });

  // Reset directories
  resetDirectoryButton.addEventListener("click", () => {
    chrome.storage.sync.remove("cssDirectories");
    document.getElementById("css-directory").value = "";
  });

  // Reload extension
  reloadBtn.addEventListener("click", () => {
    chrome.runtime.reload();
  });
});
