const mongoose = require("mongoose");

const startDBConnection = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const closeDBConnection = async () => {
  mongoose.connection.close((err) => {
    if (err) {
      console.error("Error closing MongoDB connection:", err);
    } else {
      console.log("MongoDB connection closed.");
    }
  });
};

module.exports = { startDBConnection, closeDBConnection };
