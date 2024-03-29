const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const dbName = "flight_system";
const bulkOperationsFlightData = [];
const bulkOperationsRoutesData = [];
const bulkOperationsBookingData = [];

// Define sample data for flights
const flightsData = [
  { flight_id: 1, name: "IndiGo", price: 500, class: "economy", seats: 200 },
  {
    flight_id: 2,
    name: "Air India",
    price: 700,
    class: "premium economy",
    seats: 50,
  },
  {
    flight_id: 3,
    name: "SpiceJet",
    price: 1000,
    class: "First",
    seats: 20,
  },
  {
    flight_id: 4,
    name: "Air India",
    price: 450,
    class: "premium economy",
    seats: 150,
  },
  { flight_id: 5, name: "IndiGo", price: 600, class: "first", seats: 180 },
  // Add more Indian flights
];

// Define sample data for flight routes
const flightRoutesData = [
  {
    flight_id: [1, 2, 3],
    route_id: 1,
    source: "சென்னை",
    destination: "கோயம்புத்தூர்",
  },
  { flight_id: [3], route_id: 2, source: "பாரிஸ்", destination: "டுபாய்" },
  { flight_id: [4], route_id: 3, source: "மும்பை", destination: "தில்லி" },
  { flight_id: [5], route_id: 4, source: "தில்லி", destination: "பெங்களூர்" },
  // Add more flight routes for Indian cities
];

// Define sample data for flight bookings
const bookingsData = [
  {
    booking_id: 1,
    username: "user1",
    flight_id: 1,
    route_id: 1,
    date: "1-2-24",
    seats: [3],
  },
  {
    booking_id: 2,
    username: "user2",
    flight_id: 1,
    route_id: 1,
    date: "1-2-24",
    seats: [1],
  },
  {
    booking_id: 3,
    username: "user3",
    flight_id: 2,
    route_id: 1,
    date: "1-2-24",
    seats: [2],
  },
  {
    booking_id: 4,
    username: "user4",
    flight_id: 4,
    route_id: 3,
    date: "1-2-24",
    seats: [5],
  },
  {
    booking_id: 5,
    username: "user5",
    flight_id: 5,
    route_id: 4,
    date: "1-2-24",
    seats: [8, 9],
  },
  // Add more flight bookings for Indian flights as needed
];

// Construct bulk write operations for flights
flightsData.forEach((data) => {
  const filter = { flight_id: data.flight_id };
  const update = { $setOnInsert: data };
  bulkOperationsFlightData.push({
    updateOne: { filter, update, upsert: true },
  });
});

// Construct bulk write operations for flight routes
flightRoutesData.forEach((data) => {
  const filter = { route_id: data.route_id };
  const update = { $setOnInsert: data };
  bulkOperationsRoutesData.push({
    updateOne: { filter, update, upsert: true },
  });
});

// Construct bulk write operations for flight bookings
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
    const result1 = await database
      .collection("flights")
      .bulkWrite(bulkOperationsFlightData);
    const result2 = await database
      .collection("routes")
      .bulkWrite(bulkOperationsRoutesData);
    const result3 = await database
      .collection("booking")
      .bulkWrite(bulkOperationsBookingData);
    console.log("Bulk write result:", result1, result2, result3);
  } catch (error) {
    console.error("Error performing bulk write:", error);
  } finally {
    await client.close();
  }
}

performBulkWrite();
