const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const dbName = "Train_system";
const bulkOperationsBookingData = [];

const bookingsData = [
  {
    booking_id: 1,
    username: "user1",
    source: "சென்னை",
    destination: "கோயம்புத்தூர்",
    date: "1-2-24",
    seats: {
      "1A": [1, 2, 3],
      "2A": [],
      "2S": [],
      "3A": [],
      SL: [],
    },
  },
  {
    booking_id: 2,
    username: "user2",
    source: "சென்னை",
    destination: "கோயம்புத்தூர்",
    date: "3-3-24",
    seats: {
      "1A": [],
      "2A": [2, 3, 5, 6],
      "2S": [],
      "3A": [],
      SL: [],
    },
  },
  {
    booking_id: 3,
    username: "user3",
    source: "சென்னை",
    destination: "கோயம்புத்தூர்",
    date: "3-3-24",
    seats: {
      "1A": [1, 4, 5],
      "2A": [3, 5, 8],
      "2S": [],
      "3A": [],
      SL: [],
    },
  },
  {
    booking_id: 4,
    username: "user4",
    source: "சென்னை",
    destination: "கோயம்புத்தூர்",
    date: "3-3-24",
    seats: {
      "1A": [],
      "2A": [],
      "2S": [4, 30, 41, 50, 1],
      "3A": [],
      SL: [],
    },
  },
  {
    booking_id: 5,
    username: "user5",
    source: "சென்னை",
    destination: "கோயம்புத்தூர்",
    date: "3-3-24",
    seats: {
      "1A": [20, 10, 15],
      "2A": [],
      "2S": [],
      "3A": [],
      SL: [],
    },
  },
  {
    booking_id: 6,
    username: "user6",
    source: "சென்னை",
    destination: "கோயம்புத்தூர்",
    date: "4-4-24",
    seats: {
      "1A": [11, 45, 6],
      "2A": [],
      "2S": [],
      "3A": [],
      SL: [],
    },
  },
  // Add more bookings as needed
];

// Construct bulk write operations for buses
bookingsData.forEach((data) => {
  const filter = { booking_id: data.booking_id };
  const update = { $setOnInsert: data };
  bulkOperationsBookingData.push({
    updateOne: { filter, update, upsert: true },
  });
});

// Connect to MongoDB and perform bulk write operations
async function performBulkWrite() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbName);
    const result = await database
      .collection("booking")
      .bulkWrite(bulkOperationsBookingData);
    console.log("Bulk write result:", result);
  } catch (error) {
    console.error("Error performing bulk write:", error);
  } finally {
    await client.close();
  }
}

performBulkWrite();
