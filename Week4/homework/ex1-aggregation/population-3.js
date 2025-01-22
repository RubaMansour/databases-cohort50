
const { MongoClient } = require('mongodb');
require("dotenv").config();

const uri =process.env.MONGODB_URL;

const client = new MongoClient(uri);

async function getPopulationByContinent(year, ageGroup) {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db('population_data');
    const collection = db.collection('country_population');

    const pipeline = [
      { $match: { Year: year, Age: ageGroup } },        {
        $group: {
          _id: "$Country",  
          Year: { $first: "$Year" },
          Age: { $first: "$Age" },
          M: { $sum: "$M" },  
          F: { $sum: "$F" }   
        }
      },

{
        $project: {
          _id: 1,
          Country: "$_id",
          Year: 1,
          Age: 1,
          M: 1,
          F: 1,
          TotalPopulation: { $add: ["$M", "$F"] }  }
      },
      { $sort: { Country: 1 } }  
    ];



const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

(async () => {
  const year = 2020;
  const ageGroup = "100+";  
  const populationData = await getPopulationByContinent(year, ageGroup);
  console.log(populationData);
})();
