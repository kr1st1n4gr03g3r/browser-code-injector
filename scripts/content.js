chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "reload_styles") {
    console.log("Reloading CSS...");

    document.querySelectorAll("link[rel='stylesheet']").forEach((sheet) => {
      const url = new URL(sheet.href);
      url.searchParams.set("cache-bust", Date.now()); // Prevent caching
      sheet.href = url.toString();
    });

    document.querySelectorAll("style").forEach((style) => {
      style.innerHTML = style.innerHTML; // Force inline styles to refresh
    });

    sendResponse({ status: "CSS Reloaded" });
  }
});
