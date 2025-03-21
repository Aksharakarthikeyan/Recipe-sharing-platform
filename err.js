const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    try {
        throw new Error('Something went wrong!');
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
