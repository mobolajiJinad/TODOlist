const express = require("express");

require("dotenv").config();

const routes = require("./routes");
const { startDBConnection, closeDBConnection } = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tasks", routes);

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const start = async () => {
  let server;

  try {
    await startDBConnection(uri);

    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  console.log(
    "Received SIGINT signal. Closing server and database connection..."
  );
  server.close(() => {
    closeDBConnection();
    process.exit(0);
  });
});

start();
