const express = require("express");

const manage = require("./apis/team");

const app = express();

app.use(express.json());

app.use("/manage", manage);

app.listen(4000, (err) => {
    if(err){
        console.log("server failed");
    }
    console.log("listening now 4000");
});