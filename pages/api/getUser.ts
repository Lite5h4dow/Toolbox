import withMongo from "../../middleware/withMongo";
import { ObjectId } from "mongodb";
import { userData } from "../../lib/userData";

const handler = async (req, res, db) => {
  var foundUser = await db
    .collection("Users")
    .findOne({ _id: ObjectId(req.body.userID) });

  var user = new userData(
    foundUser.forename,
    foundUser.surname,
    foundUser.username,
    foundUser.email,
    foundUser.type
  );

  if (!!foundUser) {
    res.status(200).json(user);
  } else {
    res.status(400);
  }
};

export default withMongo(handler);
