function injectStylesAndScripts(cssUrl, jsUrl) {
  // Ensure the page is fully loaded
  if (document.readyState !== "complete") {
    window.addEventListener("load", () => injectStylesAndScripts(cssUrl, jsUrl));
    return;
  }

  let outerIframe = document.querySelector("iframe");
  if (!outerIframe) {
    console.error("❌ Outer iframe not found.");
    return;
  }

  let outerDoc = outerIframe.contentDocument || outerIframe.contentWindow.document;
  if (!outerDoc) {
    console.error("❌ Cannot access outer iframe document.");
    return;
  }

  let innerIframe = outerDoc.querySelector("iframe");
  if (!innerIframe) {
    console.error("❌ Inner iframe not found.");
    return;
  }

  let innerDoc = innerIframe.contentDocument || innerIframe.contentWindow.document;
  if (!innerDoc) {
    console.error("❌ Cannot access inner iframe document.");
    return;
  }

  console.log("✅ Found nested iframe! Injecting CSS and JS...");

  // Inject CSS
  let link = innerDoc.createElement("link");
  link.rel = "stylesheet";
  link.href = cssUrl + "?cache-bust=" + Date.now(); // Prevent caching
  innerDoc.head.appendChild(link);

  // Inject JS
  let script = innerDoc.createElement("script");
  script.src = jsUrl + "?cache-bust=" + Date.now(); // Prevent caching
  innerDoc.body.appendChild(script);
}

// Initial injection when page loads
injectStylesAndScripts(
  "http://localhost:3000/styles.css",
  "http://localhost:3000/injected.js"
);

// Listen for file updates from the server
const eventSource = new EventSource("http://localhost:3000/subscribe");
eventSource.onmessage = (event) => {
  if (event.data === "reload") {
    console.log("♻️ Changes detected! Reloading styles and scripts...");
    injectStylesAndScripts(
      "http://localhost:3000/styles.css",
      "http://localhost:3000/injected.js"
    );
  }
};
