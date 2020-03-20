import Router from "next/router";
import withLayout from "../../components/mainLayout";
import Axios from "axios";
import cookie from "js-cookie";
import https from "https";
import { Segment, Header } from "semantic-ui-react";

const profile = () => {
  var session = Axios({
    method: "post",
    url: `${process.env.local_url}/api/validateSession`,
    data: {
      userID: cookie.get("lastUser"),
      sessionID: cookie.get("sessionId")
    },
    httpsAgent: new https.Agent({ keepAlive: true })
  });

  session.then(sess => {
    if (!sess.data.session) {
      cookie.remove("lastUser");
      cookie.remove("sessionId");
      Router.push("/Login");
    }
  });

  session.catch(sess => {
    if (!sess.data.session) {
      cookie.remove("lastUser");
      cookie.remove("sessionId");
      Router.push("/Login");
    }
  });

  return (
    <Segment>
      <Header>Hi User</Header>
    </Segment>
  );
};

export default withLayout(profile);
