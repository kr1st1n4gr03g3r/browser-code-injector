let popupWindow = null;

chrome.action.onClicked.addListener((tab) => {
  if (popupWindow) {
    chrome.windows.remove(popupWindow.id);
    popupWindow = null;
  } else {
    chrome.windows.create(
      {
        url: "popup/popup.html",
        type: "popup",
        width: 400,
        height: 500,
      },
      (window) => {
        popupWindow = window;
      }
    );
  }
});
