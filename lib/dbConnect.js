const mongoose = require("mongoose");

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.MONGODB_URI, {
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
