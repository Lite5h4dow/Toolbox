import withMongo from "../../middleware/withMongo";
import createSession from "../../lib/createSession";
import passHash from "password-hash";

const register = async (req, res, db) => {
  var error = [];
  var findUsername = await db
    .collection("Users")
    .findOne({ username: req.body.username.toLowerCase() });

  var findEmail = await db
    .collection("Users")
    .findOne({ email: req.body.email.toLowerCase() });

  if (findUsername != null) {
    error.push("Username already in use.");
  }

  if (findEmail != null) {
    error.push("Email already in use.");
  }

  if (req.body.password != req.body.passwordc) {
    error.push("Passwords do not match.");
  }

  if (error.length > 0) {
    res.status(400).json(error);
  } else {
    var newUser = {
      forename: req.body.forename.toLowerCase(),
      surname: req.body.surname.toLowerCase(),
      username: req.body.username,
      password: passHash.generate(req.body.password),
      email: req.body.email.toLowerCase()
    };
    var createdUser = await db.collection("Users").insertOne(newUser);
    console.log(createdUser);
    var sessionID = await createSession(createdUser.ops[0]._id, db);
    res
      .status(200)
      .json({ userID: createdUser.ops[0]._id, sessionID: sessionID });
  }
};

export default withMongo(register);
