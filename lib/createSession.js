const createSession = async (userID, db) => {
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
    .insertOne({ userID: userID, loginDate: sessionDate });

  return session.ops[0]._id;
};

export default createSession;
