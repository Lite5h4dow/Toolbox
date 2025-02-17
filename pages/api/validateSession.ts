import withMongo from "../../middleware/withMongo";
import { ObjectID, Db } from "mongodb";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  var filter = {
    userID: new ObjectID(req.body.userID),
    _id: new ObjectID(req.body.sessionID)
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
