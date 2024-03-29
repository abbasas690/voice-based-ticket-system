const { MongoClient } = require("mongodb");
// MongoDB connection URI
const rp = require("request-promise");
const getTrainBtwStation = async (from, to, callback) => {
  rp(
    `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${from}&to=${to}`
  )
    .then((resp) => {
      callback(resp);
    })
    .catch((err) => {
      callback(err);
    });
};

const uri = "mongodb://localhost:27017/Train_system";
// mongodb://localhost:27017
const db_name = "Train_system";

// Options for MongoDB connection

// Establish MongoDB connection
const stations = {
  சென்னை: "MAS",
  மதுரை: "MDU",
  கோவை: "CBE",
  கோயம்புத்தூர்: "CBE",
  திருச்சி: "TCN",
  சேலம்: "SA",
  தஞ்சாவூர்: "TJ",
  கன்னியாகுமரி: "CAPE",
  திருப்பதி: "TPTY",
  ராமேஸ்வரம்: "RMM",
  திருநெல்வேலி: "TEN",
};
// Get all users
exports.getTrain = async (req, res) => {
  const { from, to } = req.body;
  const f = stations[from];
  const t = stations[to];
  if (f == "" && t == "") {
    return res.status(400).json({ success: false, data: "no station found" });
  }
  try {
    await getTrainBtwStation(f, t, (r) => {
      console.log(r);
      data = JSON.parse(r);
      res.status(200).json(data);
    });
    // Perform database operations using the connection instance
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
    const { date, source, destination } = req.body;
    console.log(date);
    const booking = await db
      .collection("booking")
      .find({
        date: date,
        source: source,
        destination: destination,
      })
      .toArray();
    const seat = [];
    for (const book of booking) {
      seat.push(book.seats);
    }
    const combinedObject = seat.reduce((acc, curr) => {
      for (const compartment in curr) {
        acc[compartment] = (acc[compartment] || []).concat(curr[compartment]);
      }
      return acc;
    }, {});
    console.log(combinedObject);
    res.json(combinedObject);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.booking = async (req, res) => {
  try {
    // Perform database operations using the connection instance
    const client = await MongoClient.connect(uri);
    const db = client.db(db_name);
    const { date, source, destination, seats, username } = req.body;
    const last = await db
      .collection("booking")
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    const bus = await db.collection("booking").insertOne({
      booking_id: last[0].booking_id + 1,
      username: username,
      source: source,
      destination: destination,
      date: date,
      seats: seats,
    });
    if (bus.acknowledged) {
      res.json({ message: "booked sucessfully !!!" });
    } else {
      res.json({ message: "booking failed !!!" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
