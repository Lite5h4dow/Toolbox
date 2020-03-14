import withMongo from "../../middleware/withMongo";
import passHash from "password-hash";

const handler = async (req, res, db) => {
  var user = await db.collection("Users").findOne({
    username: req.body.username
  });

  if ((user != null) & passHash.verify(req.body.password, user.password)) {
    res.status(200).json({ id: user._id });
  } else {
    res
      .status(400)
      .json({ message: "Username or password does not match records" });
  }
};

export default withMongo(handler);
