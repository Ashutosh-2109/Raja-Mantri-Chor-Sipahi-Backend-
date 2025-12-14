const express = require("express");
const gameRoutes = require("./routes/gameRoutes");

const app = express();
app.use(express.json());

app.use("/api", gameRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
