console.log("Custom JavaScript is running!");

// Example: Change all `<h1>` elements to say "Hello!"
document.querySelectorAll("h1").forEach(h1 => {
  h1.textContent = "Hello from my extension!";
  h1.style.color = "blue";
});

// Example: Add a button to the page
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

button.onclick = () => alert("Button Clicked!");

document.body.appendChild(button);
