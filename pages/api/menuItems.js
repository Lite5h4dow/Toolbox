import withMongo from "../../middleware/withMongo";

const handler = async (req, res, client, callback) => {
  console.log("in api");

  const db = client.db(process.env.mongo_name);

  var pages = await db
    .collection("Pages")
    .find({})
    .toArray(function(err, docs) {
      const assert = require("assert");

      assert.equal(err, null);

      console.log("found the following documents");
      console.log(docs);
      return docs;
    });

  res.status(200).json(pages);

  callback(client);
};

export default withMongo(handler);
