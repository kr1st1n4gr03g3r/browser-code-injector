# Browser Code Injector 💉

A Chrome extension that **injects custom CSS and JavaScript** into all open tabs **dynamically**, without needing to reload the extension.

---

## **✨ Features**  
✅ Apply **custom styles** across all tabs  
✅ Automatically update styles when you modify CSS files  
✅ Inject **external CSS files** from the terminal  
✅ No need to reload the extension  

---

## **🚀 1️⃣ Installation (Mac/Linux)**  

### **📌 1.1 Install Dependencies**  
You'll need `node.js`, `npm`, and `chrome-cli`.

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

#### **📌 1.1.2 Install `chrome-cli`**  
This allows communication with Chrome from the command line:

```sh
brew install chrome-cli
```  
Verify installation:  
```sh
chrome-cli list tabs
```  

---

## **🔧 2️⃣ Setting Up the Extension**  

### **📌 2.1 Clone the repository**  
```sh
git clone https://github.com/YOUR-USERNAME/browser-code-injector.git
cd browser-code-injector
```  

### **📌 2.2 Load the extension in Chrome**  
1. Open Chrome and go to `chrome://extensions/`  
2. **Enable Developer Mode** (top right corner)  
3. Click **"Load Unpacked"** and select the `browser-code-injector/` folder.  

---

## **🎨 3️⃣ Auto-Injecting Custom CSS**  

### **📌 3.1 Watch for CSS Changes & Apply Instantly**  
Start watching CSS/JS file changes so updates apply without reloading:

```sh
node watch.js
```  

---

## **📂 4️⃣ Injecting an External CSS File**  

To inject a separate CSS file (e.g., `custom.css`):

```sh
node watch.js path/to/custom.css
```  

This will dynamically inject the styles into **all open browser tabs**.

---

## **🔥 5️⃣ Usage**  

- Click the **Browser Code Injector** extension icon in Chrome.  
- **Toggle "Enable Custom Styles"** to enable/disable styling.  
- **Modify CSS/JS files** in the `styles/` or `scripts/` folder, and see changes instantly!  
- **Inject custom CSS via terminal**:  
  ```sh
  node watch.js myfile.css
  ```  

---

## **🛠 6️⃣ Debugging**  

If something isn’t working:  
- **Check logs** in the terminal (`watch.js` will print detected changes).  
- **Open Chrome DevTools (`F12 > Console`)** and look for errors.  
- **Run `chrome-cli list tabs`** to ensure `chrome-cli` is installed correctly.  

---

## **📜 7️⃣ License**  

This project is open-source under the **MIT License**.

---

## **✨ 8️⃣ Future Improvements**  

- **Support for injecting JavaScript** from the terminal  
- **Auto-refreshing tabs** when external CSS updates  
- **Improved UI** for managing injected styles  

---

## **💡 9️⃣ Contributing**  

Pull requests are welcome! Open an issue if you have **feature requests** or **bugs**.

---