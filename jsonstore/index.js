const express = require("express");
const path = require("path");
const TAFFY = require("taffydb").taffy;

const db = TAFFY([
    {"username": "admin", "comments": process.env.FLAG},
    {"username": "randomuser", "comments": "This is a test comment"},
]);


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/addData", (req, res) => {
    const { data, username } = req.body;
    if (!username || typeof username !== "string" || username == "admin") {
        return res.status(400).send("Invalid username!");
    }

    if (!data || typeof data !== "object") {
        return res.status(400).send("Invalid data!");
    }

    for (const key in data) {
        if (typeof data[key] !== "string") {
            return res.status(400).send("Invalid data!");
        }
    }

    // set username to data
    data["username"] = username;

    db.insert(data);
    res.status(200).send("Data added successfully!");
});

// POST /getData
app.post("/getData", (req, res) => {
    const { username, filters } = req.body;

    if (!username || typeof username !== "string" || username == "admin") {
        return res.status(403).send("Invalid username!");
    }

    if (!filters || typeof filters !== "object") {
        return res.status(400).send("Invalid filters!");
    }

    for (const key in filters) {
        if (typeof filters[key] !== "string") {
            return res.status(400).send("Invalid data!");
        }
    }

    filters["username"] = username;

    const data = db(filters).get();
    res.status(200).send(JSON.stringify(data));
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});