// Example controller module (e.g., userController.js)
const { MongoClient } = require("mongodb");

// MongoDB connection URI

const uri = "mongodb://localhost:27017/bus_system";
// mongodb://localhost:27017
const db_name = "bus_system";

// Options for MongoDB connection

// Establish MongoDB connection

// Get all users
exports.getAllBus = async (req, res) => {
  try {
    // Perform database operations using the connection instance
    const client = await MongoClient.connect(uri);
    const db = client.db(db_name);
    const bus = await db.collection("buses").find().toArray();
    res.json(bus);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.findRoute = async (req, res) => {
  try {
    // Perform database operations using the connection instance
    const client = await MongoClient.connect(uri);
    const db = client.db(db_name);
    const { source, destination } = req.body;
    const bus = await db
      .collection("routes")
      .find({ source: source, destination: destination })
      .toArray();
    res.json(bus);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.findBus = async (req, res) => {
  try {
    // Perform database operations using the connection instance
    const client = await MongoClient.connect(uri);
    const db = client.db(db_name);
    const { bus_id } = req.body;
    const bus = await db.collection("buses").find({ bus_id: bus_id }).toArray();
    res.json(bus);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.seats = async (req, res) => {
  try {
    // Perform database operations using the connection instance
    const client = await MongoClient.connect(uri);
    const db = client.db(db_name);
    const { date, route_id } = req.body;
    console.log(date, route_id);
    const booking = await db
      .collection("booking")
      .find({ date: date, route_id: route_id })
      .toArray();
    const seat = [];
    for (const book of booking) {
      seat.push(...book.seats);
    }
    console.log(seat);
    res.json(seat);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
