import withMongo from "../../middleware/withMongo";
import { ObjectID } from "mongodb";
import moment from "moment";

const handler = async (req, res, db) => {
  var filter = {
    userID: ObjectID(req.body.userID),
    _id: ObjectID(req.body.sessionID)
  };
  var session = await db.collection("UserSessions").findOne(filter);
  if (!!!session) {
    res.status(200).json({ session: false });
  } else {
    if (moment(session.loginDate).add(1, "M") > moment.utc()) {
      res.status(200).json({ session: true });
    } else {
      res.status(200).json({ session: false });
    }
  }
};

export default withMongo(handler);
