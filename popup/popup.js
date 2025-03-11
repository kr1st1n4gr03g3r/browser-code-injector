document.addEventListener("DOMContentLoaded", () => {
  const toggleStyles = document.getElementById("toggle-styles");
  const reloadBtn = document.getElementById("reload-extension");

  // Load saved state
  chrome.storage.sync.get("stylesEnabled", (data) => {
    toggleStyles.checked = data.stylesEnabled !== false;
  });

  // Toggle styles on checkbox change
  toggleStyles.addEventListener("change", () => {
    chrome.storage.sync.set({ stylesEnabled: toggleStyles.checked });
    chrome.runtime.sendMessage({
      action: "toggle_styles",
      enabled: toggleStyles.checked,
    });
  });

  // Reload extension button
  reloadBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "reload_extension" });
  });
});
