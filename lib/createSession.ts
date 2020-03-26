import moment from "moment";

const createSession = async (userID, db) => {
  var sessionDate = moment.utc().format();
  var session = await db
    .collection("UserSessions")
    .insertOne({ userID: userID, loginDate: sessionDate });

  return session.ops[0]._id;
};

export default createSession;
