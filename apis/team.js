const express = require("express");
const fs = require("node:fs");
const { v4: uuidv4 } = require("uuid");

const manage = express.Router();

manage.get("/team", (req,res) => {
    const lists = fs.readFileSync("./sample.txt", { encoding: "utf8" });
    
    if(lists){
        const data = lists.trim().split('\n').map(datas => JSON.parse(datas));
        res.status(200).json({ data });
    }else{
        res.status(200).json({ message: "No data available in the File" });
    }
});

manage.post("/team", (req, res) => {
    const { name, members } = req.body;

    if (!name) {
        return res.status(400).json({ error: "'name' is required and should not be empty." });
    }
    if (!members) {
        return res.status(400).json({ error: "'members' is required and should not be empty." });
    }

    const newTeam = {
        id: uuidv4(),
        name,
        members
    };
    
    fs.appendFileSync("./sample.txt", `${JSON.stringify(newTeam)}\n`, { encoding: "utf8" });
    res.status(201).json({ ...newTeam });
});

manage.put("/team", (req, res) => {
    const { id } = req.query;
    const updatedData = req.body;

    const { name, members } = req.body;
    if (!name) {
        return res.status(400).json({ error: "'name' is required and should not be empty." });
    }
    if (!members) {
        return res.status(400).json({ error: "'members' is required and should not be empty." });
    }

    const lists = fs.readFileSync("./sample.txt", { encoding: "utf8" });
    const data = lists.trim().split('\n').map(datas => JSON.parse(datas));
    
    const updatedList = data.map(item => {
        if (item.id == id) {
            updated = true;
            return { ...item, ...updatedData };
        }else{
            return res.status(400).json({ error: "No matched data found" });
        }
        return item;
    });
    
    const updatedContent = updatedList.map(item => JSON.stringify(item)).join('\n');
    fs.writeFileSync("./sample.txt", updatedContent, { encoding: "utf8" });
    res.status(200).json({ updatedData });
});

manage.delete("/team", (req, res) => {
    const { id } = req.query;

    const lists = fs.readFileSync("./sample.txt", { encoding: "utf8" });
    const data = lists.trim().split('\n').map(datas => JSON.parse(datas));

    const updatedList = data.filter(item => item.id != id);
    if (updatedList.length === data.length) {
        return res.status(400).json({ error: "No matched data found" });
    }

    const updatedContent = updatedList.map(item => JSON.stringify(item)).join('\n');
    fs.writeFileSync("./sample.txt", updatedContent, { encoding: "utf8" });
    res.status(200).json({ updatedData: updatedList });
});


manage.get("/tickets", (req,res) => {
    const lists = fs.readFileSync("./ticket.txt", { encoding: "utf8" });
    
    if(lists){
        const data = lists.trim().split('\n').map(datas => JSON.parse(datas));
        res.status(200).json({ data });
    }else{
        res.status(200).json({ message: "No data available in the File" });
    }
});

manage.post("/tickets", (req, res) => {

    const { title, description, team, status, assignee, reporter } = req.body;

    if (!title || !description || !team || !status || !assignee || !reporter) {
        return res.status(400).json({ error: "every fields are required and should not be empty." });
    }

    const newTicket = {
        id: uuidv4(),
        title,
        description,
        team,
        status,
        assignee,
        reporter
    };
    fs.appendFileSync("./ticket.txt", `${JSON.stringify(newTicket)}\n`, { encoding: "utf8" });
    res.status(201).json({ ...newTicket });
});

manage.put("/tickets", (req, res) => {
    const { id } = req.query;
    const updatedData = req.body;

    const { title, description, team, status, assignee, reporter } = req.body;

    if (!title || !description || !team || !status || !assignee || !reporter) {
        return res.status(400).json({ error: "every fields are required and should not be empty." });
    }

    const lists = fs.readFileSync("./ticket.txt", { encoding: "utf8" });
    const data = lists.trim().split('\n').map(datas => JSON.parse(datas));
    
    const updatedList = data.map(item => {
        if (item.id == id) {
            updated = true;
            return { ...item, ...updatedData };
        }else{
            return res.status(400).json({ error: "No matched data found" });
        }
        return item;
    });
    
    const updatedContent = updatedList.map(item => JSON.stringify(item)).join('\n');
    fs.writeFileSync("./ticket.txt", updatedContent, { encoding: "utf8" });
    res.status(200).json({ updatedData });
});

manage.delete("/tickets", (req, res) => {
    const { id } = req.query;

    const lists = fs.readFileSync("./ticket.txt", { encoding: "utf8" });
    const data = lists.trim().split('\n').map(line => JSON.parse(line)).filter(item => item !== null);

    const updatedList = data.filter(item => item.id != id);
    if (updatedList.length === data.length) {
        return res.status(400).json({ error: "No matched data found" });
    }

    const updatedContent = updatedList.map(item => JSON.stringify(item)).join('\n');
    fs.writeFileSync("./ticket.txt", updatedContent, { encoding: "utf8" });
    res.status(200).json({ updatedData: updatedList });
});

module.exports = manage;