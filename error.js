const express = require( 'express');
const app = express () ;
app.get('/', (req, res, next) => {
try {
throw new Error ('Something went wrong!');
} catch (err) {
next(err);
}
}) ;
app.use((err, req, res, next) => {
res.status (500). send({ message: err.message });
})
app. listen (3000, () => console. log( 'Server listening on port 3000'));