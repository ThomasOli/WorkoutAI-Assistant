const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

module.exports = {
    connectToServer: async function () {
        try {
            const db = await client.connect();
            // Verify we got a good "db" object
            if (db) {
                _db = db.db("employees");
                console.log("Successfully connected to MongoDB.");
            }
            return _db;
        } catch (err) {
            throw err;
        }
    },

    getDb: function () {
        return _db;
    },
};