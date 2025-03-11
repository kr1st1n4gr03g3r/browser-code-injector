chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "reload_styles") {
    console.log("Reloading CSS...");

    const stylesheets = document.querySelectorAll("link[rel='stylesheet']");
    stylesheets.forEach((sheet) => {
      const url = new URL(sheet.href);
      url.searchParams.set("cache-bust", Date.now()); // Prevent caching issues
      sheet.href = url.toString();
    });

    sendResponse({ status: "CSS Reloaded" });
  }
});
