const express = require("express");
const cors = require("cors");
const axios = require("axios")

const app = express();

const controllerFile = require("./controller");

app.use(express.json());
app.use(cors());

app.get("/api/movies", controllerFile.getMovies);
app.delete("/api/movies/:id", controllerFile.deleteMovie);
app.post("/api/movies", controllerFile.createMovies);
app.put("/api/movies/:id", controllerFile.updateMovie);

app.listen(4040,() => console.log(`server running on 4040`))