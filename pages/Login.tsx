import withLayout from "../components/frontLayout";
import serialize from "form-serialize";
import Router from "next/router";
import {
  Segment,
  Button,
  Form,
  Header,
  Input,
  Checkbox
} from "semantic-ui-react";
import Axios from "axios";
import https from "https";
import cookie from "js-cookie";

const Login = () => {
  function loginPost(reqData) {
    var res = Axios({
      method: "post",
      url: `${process.env.local_url}/api/login`,
      data: reqData,
      httpsAgent: new https.Agent({ keepAlive: true })
    });

    res.then(ret => {
      if (reqData.rememberMe) {
        cookie.set("sessionId", ret.data.sessionID, { expires: 30 });
      } else {
        cookie.set("sessionId", ret.data.sessionID);
      }
      cookie.set("lastUser", ret.data.userID);
      Router.push(`/${ret.data.userID}`);
    });

    res.catch(ret => {
      alert(ret.response.data.message);
    });
  }

  return (
    <Segment>
      <Header>Login</Header>
      <Form
        id="loginForm"
        onSubmit={() => {
          var form = serialize(document.querySelector("#loginForm"), {
            hash: true
          });
          loginPost(form);
        }}
      >
        <Form.Field
          name="username"
          control={Input}
          label="Username"
          placeholder="joebloggs123"
          required
        />
        <Form.Field
          name="password"
          control={Input}
          label="Password"
          placeholder="password"
          type="password"
          required
        />
        <Form.Group>
          <Form.Field control={Button} content="Login" type="submit" />
          <Form.Field
            name="rememberMe"
            control={Checkbox}
            label="Remember Me"
          />
        </Form.Group>
      </Form>
    </Segment>
  );
};

export default withLayout(Login);
