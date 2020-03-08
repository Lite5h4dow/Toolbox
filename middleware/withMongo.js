const withMongo = handler => async (req, res) => {
  console.log("In Middleware");

  const MongoClient = require("mongodb").MongoClient;
  const assert = require("assert");
  const client = new MongoClient(process.env.mongo_url);

  await client.connect(function(err) {
    assert.equal(null, err);
    console.log("connected to database");

    return handler(req, res, client, function(client) {
      console.log("disconnecting from database");
      client.close();
    });
  });
};

export default withMongo;
