document.getElementById("startServer").addEventListener("click", () => {
  const folderPath = document.getElementById("folderPath").value;
  chrome.runtime.sendMessage({ action: "startServer", path: folderPath });
});

document.getElementById("stopServer").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stopServer" });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateStatus") {
    document.getElementById("status").innerText = `Server is ${message.status}`;
    document.getElementById("startServer").disabled = message.status === "ON";
    document.getElementById("stopServer").disabled = message.status === "OFF";
  }
});
