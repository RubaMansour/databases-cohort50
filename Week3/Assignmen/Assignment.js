const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://rubamansour73:Ruba1mansour@cluster00.c8its.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas!");

 
    const database = client.db("test");
    const collection = database.collection("example");

    const document = await collection.findOne();
    console.log(document);
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas", err);
  }
}
run();
