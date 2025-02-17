import { NextApiRequest, NextApiResponse } from "next";

const withMongo = handler => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log("In Middleware");

  const MongoClient = require("mongodb").MongoClient;
  const client = new MongoClient(process.env.mongo_url);

  try {
    await client.connect();
    const db = client.db(process.env.mongo_name, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("connected to database");

    await handler(req, res, db);
  } catch (err) {
    console.error("connection to mongodb failed: " + err);
  } finally {
    client.close();
    console.log("disconnected from database");
  }
};

export default withMongo;
