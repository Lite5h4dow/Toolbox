import withMongo from "../../middleware/withMongo";
import passHash from "password-hash";

const handler = async (req, res, db) => {
  var user = await db.collection("Users").findOne({
    username: req.body.username
  });

  if (!!user && passHash.verify(req.body.password, user.password)) {
    var sessionDate = {
      year: new Date().getUTCFullYear(),
      month: new Date().getUTCMonth(),
      day: new Date().getUTCDate(),
      hour: new Date().getUTCHours(),
      minute: new Date().getUTCMinutes(),
      seconds: new Date().getUTCSeconds()
    };
    var session = await db
      .collection("UserSessions")
      .insertOne({ userID: user._id, loginDate: sessionDate });

    res.status(200).json({ userID: user._id, sessionID: session.ops[0]._id });
  } else {
    res
      .status(400)
      .json({ message: "Username or password does not match records" });
  }
};

export default withMongo(handler);
