const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    console.log("GET Request Successful!");
    res.send("Get Req Successfully initiated");
});

app.put("/put", (req, res) => {
    console.log("PUT REQUEST SUCCESSFUL");
    console.log(req.body);
    res.send("Data Update Request Received");
});

app.post("/post", (req, res) => {
    console.log("POST REQUEST SUCCESSFUL");
    console.log(req.body);
    res.send("Data POST Request Received");
});

app.delete("/delete", (req, res) => {
    console.log("DELETE REQUEST SUCCESSFUL");
    console.log(req.body);
    res.send("Data DELETE Request Received");
});

app.listen(PORT, () => {
    console.log(`Server established at ${PORT}`);
});
