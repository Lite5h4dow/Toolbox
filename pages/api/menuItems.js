import withMongo from "../../middleware/withMongo";

const handler = async (req, res, db) => {
  console.log("in api");

  var pages = await db
    .collection("Pages")
    .find()
    .toArray();

  res.status(200).json(JSON.stringify(pages));
};

export default withMongo(handler);
