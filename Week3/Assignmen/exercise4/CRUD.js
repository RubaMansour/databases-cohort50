const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("databaseWeek3");
    const collection = database.collection("bob_ross_episodes");
async function run() {
  try {
    await client.connect();
    const database = client.db("databaseWeek3");
    const collection = database.collection("bob_ross_episodes");

    const newDocument = {
      title: "Mountain View",
      elements: ["mountains", "sky", "trees"]
    };
    const createResult = await collection.insertOne(newDocument);
    console.log(`New document created with the _id: ${createResult.insertedId}`);

    const cursor = collection.find();
    await cursor.forEach(doc => console.dir(doc));

    const updateQuery = { title: "Mountain View" };
    const update = { $set: { title: "Beautiful Mountain View" } };
    const updateResult = await collection.updateOne(updateQuery, update);
    console.log(`${updateResult.modifiedCount} document(s) updated`);

    const deleteQuery = { title: "Beautiful Mountain View" };
    const deleteResult = await collection.deleteOne(deleteQuery);
    console.log(`${deleteResult.deletedCount} document(s) deleted`);

} catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
