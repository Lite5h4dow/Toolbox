import withMongo from "../../middleware/withMongo";
import { ObjectId } from "mongodb";

const handler = async (req, res, db) => {
  var foundUser = await db
    .collection("Users")
    .findOne({ _id: ObjectId(req.body.userID) });

  console.log(foundUser);

  if (!!foundUser) {
    res.status(200).json({
      forename: foundUser.forename,
      surname: foundUser.surname,
      username: foundUser.username,
      email: foundUser.email,
      type: foundUser.type
    });
  } else {
    res.status(400);
  }
};

export default withMongo(handler);
