console.log("Browser Code Injector: Custom JavaScript is running!");

// Change all h1 text
document.querySelectorAll("h1").forEach((h1) => {
  h1.textContent = "Injected by Browser Code Injector!";
  h1.style.color = "blue";
});

// Add a floating button to the page
const button = document.createElement("button");
button.textContent = "Click Me!";
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.padding = "10px";
button.style.background = "red";
button.style.color = "white";
button.style.border = "none";
button.style.cursor = "pointer";

button.onclick = () => alert("Hello from Browser Code Injector!");

document.body.appendChild(button);
