const mongoose = require("mongoose");

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.NODE_ENV === "development" ? process.env.MONGODB_URI : process.env.MONGODB_PRODURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function dbDisconnect() {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  return mongoose.connection.close();
}

module.exports = {
  dbConnect,
  dbDisconnect,
};
