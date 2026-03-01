const { MongoClient } = require("mongodb");

class MongoDB {
  static client = null;

  static async connect(uri) {
    if (this.client) {
      return this.client;
    }

    try {
      this.client = new MongoClient(uri);
      await this.client.connect();
      console.log("Connected to MongoDB");
      return this.client;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
}

module.exports = MongoDB;