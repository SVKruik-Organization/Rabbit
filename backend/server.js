const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
const prefix = "/api/v1";

// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use(`${prefix}/users`, userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get(prefix, (req, res) => {
    res.json({ message: "Hello from server!" });
});
