/*
* API för att hantera Benvenuto Amicos användare och menyer 
*/

// Importera paket och filer som behövs
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

// Ny app
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors(
    {origin: 'https://benvenutoamico.netlify.app'},
    {origin: 'https://benvenutoamico.netlify.app/takeaway/'},
{origin: 'https://benvenutoamico.netlify.app/dinner-menu/'},
{origin: 'https://benvenutoamico.netlify.app/lunch-menu/'},
{origin: 'https://benvenutoamico.netlify.app/book/'},
{origin: 'https://benvenutoamico.netlify.app/admin-dinner/'},
{origin: 'https://benvenutoamico.netlify.app/takeaway/'},
{origin: 'https://benvenutoamico.netlify.app/admin-lunch/'},
{origin: 'https://benvenutoamico.netlify.app/admin-takeaway/'},
{origin: 'https://benvenutoamico.netlify.app/admin-bookings/'},
)); //Lägg till url till webbsida när du vet vilken som ska använda API:et

// Routes
app.use("/api", authRoutes);
app.use("/api", menuRoutes);

// Skyddade routes

app.get("/api/admin", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" })
});

app.get("/api/admin/bookings", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" })
});

app.get("/api/admin/lunch", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" })
});

app.get("/api/admin/dinner", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" })
});

app.get("/api/admin/takeaway", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" })
});

// Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Token
    
    if(token == null) res.status(401).json({ message: "Användare ej auktoriserad för denna route - token saknas!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Ogiltig JWT" });

        req.username = username;
        next();
    })
};


// Starta app
app.listen(port, () => {
    console.log(`Server startade på port: ${port}`);
})