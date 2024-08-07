const fs = require("node:fs");

const write = fs.appendFileSync("./sample.txt", "Ajith\n", { encoding: "utf8" });

const data = fs.readFileSync("./sample.txt", { encoding: "utf8" });

console.log(write);
