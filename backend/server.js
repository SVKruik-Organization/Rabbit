require('dotenv').config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.static("public"))

const prefix = "/api/v1";

// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use(`${prefix}/users`, userRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use(`${prefix}/stripe`, paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get(prefix, (req, res) => {
    res.json({ message: "Hello from server!" });
});