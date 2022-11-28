const mongoose = require("mongoose");

// If we have an error
mongoose.connection.on("error", (error) => {
  console.log("Ha habido un error en la conexión:", error);
  process.exit(1);
});

// If we can connect with db
mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB en", mongoose.connection.name);
});

// Connect with db
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

// Export the connection
module.exports = mongoose.connection;
