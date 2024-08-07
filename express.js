const express = require("express");
const app = express();

app.get("/", (req,res) => {
    res.status(200).json({message: "success"});
})

app.listen(4000, (err) => {
    if(err){
        console.log("server failed");
    }
    console.log("listening 4000");
    
});