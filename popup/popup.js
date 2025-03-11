document.addEventListener("DOMContentLoaded", () => {
  const toggleStyles = document.getElementById("toggle-styles");
  const cssDirectoryInput = document.getElementById("css-directory");
  const saveDirectoryButton = document.getElementById("save-directory");
  const resetDirectoryButton = document.getElementById("reset-directory");
  const runOnThisPageButton = document.getElementById("run-on-this-page");
  const reloadBtn = document.getElementById("reload-extension");

  // Load saved settings
  chrome.storage.sync.get(
    ["stylesEnabled", "cssDirectories", "activeTabs"],
    (data) => {
      toggleStyles.checked = data.stylesEnabled !== false;
      if (data.cssDirectories) {
        cssDirectoryInput.value = data.cssDirectories.join(", ");
      }
    }
  );

  // Toggle styles
  toggleStyles.addEventListener("change", () => {
    chrome.storage.sync.set({ stylesEnabled: toggleStyles.checked });
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

  // Run on this page
  runOnThisPageButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.storage.sync.get("activeTabs", (data) => {
          let activeTabs = data.activeTabs || [];
          if (!activeTabs.includes(tabs[0].id)) {
            activeTabs.push(tabs[0].id);
          }
          chrome.storage.sync.set({ activeTabs });
        });
      }
    });
  });

  // Reload extension
  reloadBtn.addEventListener("click", () => {
    chrome.runtime.reload();
  });
});

document.getElementById("close-popup").addEventListener("click", () => {
  chrome.windows.getCurrent((window) => {
    chrome.windows.remove(window.id);
  });
});
