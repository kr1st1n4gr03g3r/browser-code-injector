document.addEventListener("DOMContentLoaded", () => {
  const toggleStyles = document.getElementById("toggle-styles");
  const siteListInput = document.getElementById("site-list");
  const saveSitesButton = document.getElementById("save-sites");
  const reloadBtn = document.getElementById("reload-extension");

  // Load saved settings
  chrome.storage.sync.get(["stylesEnabled", "customSites"], (data) => {
    toggleStyles.checked = data.stylesEnabled !== false; // Default: enabled
    siteListInput.value = data.customSites ? data.customSites.join(", ") : "";
  });

  // Toggle styles on checkbox change
  toggleStyles.addEventListener("change", () => {
    chrome.storage.sync.set({ stylesEnabled: toggleStyles.checked });
    chrome.runtime.sendMessage({
      action: "toggle_styles",
      enabled: toggleStyles.checked,
    });
  });

  // Save site-specific rules
  saveSitesButton.addEventListener("click", () => {
    const sites = siteListInput.value.split(",").map((s) => s.trim());
    chrome.storage.sync.set({ customSites: sites });

    chrome.runtime.sendMessage({ action: "update_sites", sites });
  });

  // Reload extension button
  reloadBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "reload_extension" });
  });
});
