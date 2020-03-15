import withMongo from "../../middleware/withMongo";

const handler = (req, res, db) => {
  console.log(req.body.sessionID);
  console.log(req.body.userID);

  var session = db.collection("UserSessions").findOne({
    userID: req.body.userID,
    sessionID: req.body.sessionID
  });

  console.log(session);
};

export default withMongo(handler);
