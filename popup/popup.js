document.getElementById("reload-extension").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "reload_extension" });
});
