
# Browser Code Injector 💉

A Chrome extension that **injects custom CSS and JavaScript** into selected websites **dynamically**, without needing to reload the extension.

Repository: [GitHub](https://github.com/kr1st1n4gr03g3r/browser-code-injector)

---

## **✨ Features**  
✅ Apply **custom styles and scripts** dynamically  
✅ Automatically update styles when CSS or JS files change  
✅ Works inside iframes for better content injection  
✅ No need to reload the extension or refresh tabs  

---

## **🚀 1️⃣ Installation**  

### **📌 1.1 Install Dependencies**  
You'll need **Node.js** and **npm**.

#### **📌 1.1.1 Install Node.js & npm**  
If you don’t already have **Node.js** installed, install it via Homebrew:

```sh
brew install node
```  
Verify installation:  
```sh
node -v
npm -v
```  

---

## **🛠️ 2️⃣ Setting Up the Extension**  

### **📌 2.1 Clone the repository**  

```sh
git clone https://github.com/kr1st1n4gr03g3r/browser-code-injector.git
cd browser-code-injector
```  

### **📌 2.2 Load the extension in Chrome**  
1. Open Chrome and go to `chrome://extensions/`  
2. **Enable Developer Mode** (top right corner)  
3. Click **"Load Unpacked"** and select the `extension/` folder.  

---

## **🎨 3️⃣ Auto-Injecting Custom CSS & JavaScript**  

### **📌 3.1 Start the Server for Live Updates**  
This watches for file changes and injects CSS/JS dynamically:

```sh
cd server
npm install
npm start
```  

---

## **📚 4️⃣ Injecting External CSS & JS**  

Modify the files in `watched_folder/`, and they will be automatically applied.  

1. Edit `watched_folder/styles.css` (for CSS updates)  
2. Edit `watched_folder/script.js` (for JavaScript updates)  

---

## **🔧 5️⃣ Usage**  

- Open Chrome DevTools (`F12 > Console`) to see logs.  
- Modify CSS/JS files in `watched_folder/` and see changes instantly.  
- Click the **Browser Code Injector** extension icon in Chrome to toggle styling.  
- **How to open a website and apply changes**:  
  - Open any website in Chrome.  
  - Make sure the extension is loaded and running.  
  - Modify the files in `watched_folder/` to see updates applied dynamically.
  
---

## **🔧 6️⃣ Isolating Specific Code Blocks in DevTools**  

To isolate specific elements and modify them:

1. **Open Chrome DevTools** (`F12` or `Cmd+Option+I` on Mac, `F12` or `Ctrl+Shift+I` on Windows/Linux).
2. Go to the **Elements** tab and hover over different elements in the DOM.
3. Right-click an element and select **Inspect**.
4. Use the **Styles** panel to preview CSS changes live before applying them permanently.
5. Identify the correct `iframe` if the content is inside an embedded frame:
   - Open **DevTools Console** (`F12 > Console`).
   - Run: 
```sh
document.querySelectorAll("iframe")
```
   - Find the correct iframe and modify its content dynamically using the extension.

---

## **🛠️ 7️⃣ Debugging**  

If something isn’t working:  
- **Check logs** in the terminal (`server.js` will print detected changes).  
- **Open Chrome DevTools (`F12 > Console`)** and look for errors.  
- **Ensure Node.js is running (`npm start`)** to watch for changes.  

---

## **📚 8️⃣ License**  

This project is open-source under the **MIT License**.

---

## **✨ 9️⃣ Future Improvements**  

- **Support injecting JavaScript via terminal**  
- **Auto-refreshing tabs when external files update**  
- **Improved UI for managing injected styles**  

---

## **💡 1️⃣0️⃣ Contributing**  

Pull requests are welcome! Open an issue if you have **feature requests** or **bugs**.  

---


***Further notes:***
This extension was made for people who struggle in AEM to get the preview in author to reflect changes in CSS folders. The authors that are styling CSS within the authoring environment cannot see the changes properly without publishing the content every single time. Specifcally when using AEM Guides, you would have to find your .dita or snippet file within the dam. Here's an example:

1. Go to the asset in the authoring environment at `content/dam/project-name/.../file.dita`
2. Inspect as usual using the dev console, and style as needed by copying the CSS from your AEM directory 

