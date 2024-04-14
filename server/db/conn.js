const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
console.log('Connecting to MongoDB with URI:', Db);
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
<<<<<<< HEAD
                _db = db.db("user.workouts"); 
                console.log("Successfully connected to MongoDB to the userWorkouts database.");
=======
                _db = db.db("user");
                console.log("Successfully connected to MongoDB.");
>>>>>>> 934f6093172a8c6505d60c97ff20a7eba713543b
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