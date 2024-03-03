const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const dbName ="bus_system";
const bulkOperationsBusData = [];
const bulkOperationsRoutesData = [];
const bulkOperationsBookingData = [];

// Define sample data for buses
const busesData = [
    { bus_id: 1, name:"kpn", price: 250,type:"ac",nos:52 },
    { bus_id: 2, name:"kpn", price: 150,type:"non-ac",nos:52 },
    { bus_id: 3, name:"kpn", price: 150,type:"non-ac",nos:52 },
    { bus_id: 4, name:"kpc",price:250, type:"ac",nos:25 },
    { bus_id: 5,name:"kyc", price: 300,type:"ac" ,nos:52}
    //add more buses
];


// Define sample data for bus routes
const busRoutesData = [
    { bus_id: 1, route_id:1,  source: "சென்னை", destination: "கோயம்புத்தூர்",},
    { bus_id: 2, route_id:2,  source: "சென்னை", destination: "கோயம்புத்தூர்",},
    { bus_id: 3, route_id:3,  source: "சென்னை", destination: "கோயம்புத்தூர்",},
    { bus_id: 4, route_id:4,  source: "கோயம்புத்தூர்", destination: "மதுரை",},
    { bus_id: 5, route_id:5,  source: "திருப்பூர்", destination: "சென்னை",  }
];

// Define sample data for bookings
const bookingsData = [
    {booking_id:1, username: 'user1', bus_id: 1, route_id: 1, date: '1-2-24', seats: [2] },
    {booking_id:2, username: 'user2', bus_id: 2, route_id:2, date: '3-3-24', seats: [1] },
    {booking_id:3, username: 'user2', bus_id: 3, route_id: 3, date: '4-4-24', seats: [1] },
    // Add more bookings as needed
];

// Construct bulk write operations for buses
busesData.forEach(data => {
    const filter = { bus_id: data.bus_id };
    const update = { $setOnInsert: data };
    bulkOperationsBusData.push({ updateOne: { filter, update, upsert: true } });
});

// Construct bulk write operations for bus routes
busRoutesData.forEach(data => {
    const filter = { route_id: data.route_id };
    const update = { $setOnInsert: data };
    bulkOperationsRoutesData.push({ updateOne: { filter, update, upsert: true } });
});

// Construct bulk write operations for bookings
bookingsData.forEach(data => {
    const filter = { booking_id: data.booking_id };
    const update = { $setOnInsert: data };
    bulkOperationsBookingData.push({ updateOne: { filter, update, upsert: true } });
});

// Connect to MongoDB and perform bulk write operations
async function performBulkWrite() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const database = client.db(dbName);
        const result1 = await database.collection('buses').bulkWrite(bulkOperationsBusData);
        const result2 = await database.collection('routes').bulkWrite(bulkOperationsRoutesData);
        const result3 = await database.collection('booking').bulkWrite(bulkOperationsBookingData);
        console.log('Bulk write result:', result1,result2,result3);
    } catch (error) {
        console.error('Error performing bulk write:', error);
    } finally {
        await client.close();
    }
}

performBulkWrite();
