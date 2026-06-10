const fs = require("fs");
const apiBase = process.env.VITE_API_BASE || "http://localhost:8080";
fs.writeFileSync("public/config.js", `window.VITE_API_BASE = '${apiBase}';\n`);
