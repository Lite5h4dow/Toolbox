import withMongo from "../../middleware/withMongo";
import createSession from "../../lib/createSession";
import passHash from "password-hash";
import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  var user = await db.collection("Users").findOne({
    username: req.body.username
  });

  if (!!user && passHash.verify(req.body.password, user.password)) {
    console.log(user._id);
    var newSession = await createSession(user._id, db);
    res.status(200).json({ userID: user._id, sessionID: newSession });
  } else {
    res
      .status(400)
      .json({ message: "Username or password does not match records" });
  }
};

export default withMongo(handler);
