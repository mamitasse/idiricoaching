const path = require("path");
const { Sitemap } = require("react-router-sitemap");

// Définis tes routes React (tu peux importer celles de ton fichier Routes.js si tu en as un)
const routes = [
  "/",
  "/login",
  "/signup",
  "/nadia",
  "/sabrina",
  "/dashboard",
  "/contact"
];

// Crée et génère le sitemap
new Sitemap({ routes })
  .build("https://www.idiricoaching.fr") // Remplace par ton domaine
  .save(path.join(__dirname, "public", "sitemap.xml"));

console.log("✅ Sitemap généré avec succès !");
