const express = require("express");
const cors = require("cors");
const session = require("express-session");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const transactRoutes = require("./routes/transactRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session({
    secret:"sample_secret",
    resave:true,
    saveUninitialized: true,
    cookie: {secure:true}
}));

app.use("/u", userRoutes);
app.use("/p", productRoutes);
app.use("/t", transactRoutes);

const port = process.env.port || 3001;

app.listen(port,() => {
    console.log("Servidor en http://localhost:" + port);
});
