import axios from "axios";
import https from "https";

const validateSession = (userId, sessionId) => {
  console.log(userId);
  console.log(sessionId);

  var api = axios({
    method: "post",
    url: `${process.env.local_url}/api/validateSession`,
    data: { userID: userId, _id: sessionId },
    httpsAgent: new https.Agent({ keepAlive: true })
  });

  api.then(val => {});

  api.catch(val => {});
};

export default validateSession;
