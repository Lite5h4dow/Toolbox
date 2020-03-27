import withMongo from "../../middleware/withMongo";
import { ObjectId } from "mongodb";
import { userData } from "../../lib/userData";
import { userTypes } from "../../lib/userTypes";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse, db) => {
  var foundUser = await db
    .collection("Users")
    .findOne({ _id: new ObjectId(req.body.userID) });

  var user = new userData(
    <string>foundUser._id,
    <string>foundUser.forename,
    <string>foundUser.surname,
    <string>foundUser.username,
    <string>foundUser.email,
    <userTypes>foundUser.type
  );

  if (!!foundUser) {
    res.status(200).json(user);
  } else {
    res.status(400);
  }
};

export default withMongo(handler);
