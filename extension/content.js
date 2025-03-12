function injectStylesAndScripts(cssUrl, jsUrl) {
  // Find the outer iframe
  let outerIframe = document.querySelector("iframe");
  if (!outerIframe) {
    console.error("❌ Outer iframe not found.");
    return;
  }

  let outerDoc =
    outerIframe.contentDocument || outerIframe.contentWindow.document;
  if (!outerDoc) {
    console.error("❌ Cannot access outer iframe document.");
    return;
  }

  // Find the inner iframe inside the outer iframe
  let innerIframe = outerDoc.querySelector("iframe");
  if (!innerIframe) {
    console.error("❌ Inner iframe not found.");
    return;
  }

  let innerDoc =
    innerIframe.contentDocument || innerIframe.contentWindow.document;
  if (!innerDoc) {
    console.error("❌ Cannot access inner iframe document.");
    return;
  }

  console.log("✅ Found nested iframe! Injecting CSS and JS...");

  // Inject CSS
  let link = innerDoc.createElement("link");
  link.rel = "stylesheet";
  link.href = cssUrl;
  innerDoc.head.appendChild(link);

  // Inject JS
  let script = innerDoc.createElement("script");
  script.src = jsUrl;
  innerDoc.body.appendChild(script);
}

// Check every second for iframe and inject styles/scripts
setInterval(() => {
  injectStylesAndScripts(
    "http://localhost:3000/styles.css",
    "http://localhost:3000/injected.js"
  );
}, 1000);
