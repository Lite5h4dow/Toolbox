import withMongo from "../../middleware/withMongo";

const handler = async (req, res, db) => {
  console.log("in api");

  var pages = await db
    .collection("Pages")
    .find()
    .toArray();
  console.log(pages);
  // pages.Then(result => {
  //   console.log(result);
  // });

  res.status(200).json(JSON.stringify(pages));
};

export default withMongo(handler);
