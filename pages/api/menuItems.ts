import withMongo from "../../middleware/withMongo";
import { NextApiResponse, NextApiRequest } from "next";
import { Db } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  var pages = await db
    .collection("Pages")
    .find()
    .toArray();

  res.status(200).json(JSON.stringify(pages));
};

export default withMongo(handler);
