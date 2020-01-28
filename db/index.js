const mongoose = require("mongoose");

module.exports = {
  mongoose,
  connect: async database => {
    try {
      const connection = await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log(`MongoDB Connected`);
      return connection;
    } catch (err) {
      console.log("Error to connecting to database", err);
    }
  },
  disconnect: async () => await mongoose.connection.close()
};
