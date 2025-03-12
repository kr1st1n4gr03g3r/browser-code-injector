const express = require("express");
const chokidar = require("chokidar");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("watched_folder"));

let clients = [];

app.get("/subscribe", (req, res) => {
  clients.push(res);
  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
});

const notifyClients = () => {
  clients.forEach((client) => client.json({ reload: true }));
  clients = [];
};

chokidar.watch("watched_folder").on("change", notifyClients);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
