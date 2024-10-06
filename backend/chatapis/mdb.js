import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function select(uuid) {
  const uri = process.env.MONGO_CONNECTION;
  const client = new MongoClient(uri);
  try {
    const database = client.db("historydb");
    const history = database.collection("history");

    const query = { uuid: uuid };
    const reqs = await history.findOne(query);
    if (reqs != null) {
      return reqs;
    } else {
      return {};
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function insert(uuid, hist) {
  const uri = process.env.MONGO_CONNECTION;
  const client = new MongoClient(uri);
  // history should be a string
  try {
    const database = client.db("historydb");
    const history = database.collection("history");

    const query = { uuid: uuid };
    const reqs = await history.findOne(query);

    const _ignore = await history.deleteOne(query);

    console.log(reqs);

    if (reqs == null) {
      var toInsert = { uuid: uuid, history: [hist] };
      await history.insertOne(toInsert);
      return true;
    } else {
      var toInsert = { uuid: uuid, history: [...reqs.history, hist] };
      await history.insertOne(toInsert);
      return true;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default { select, insert };
