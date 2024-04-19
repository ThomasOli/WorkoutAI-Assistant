const { MongoClient } = require("mongodb");

// This should be your MongoDB Atlas URI
const Db = process.env.ATLAS_URI;

// Log the URI to make sure it's what you expect
console.log('Connecting to MongoDB with URI:', Db);

const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

module.exports = {
    connectToServer: async function () {
        try {
            await client.connect();
            _db = client.db();
            // Log the name of the database to confirm it's the correct one
            console.log("Successfully connected to MongoDB. Database:", _db.databaseName);
            return _db;
        } catch (err) {
            console.error("Failed to connect to MongoDB with URI:", Db, err);
            throw err;
        }
    },

    getDb: function () {
        return _db;
    },
};
