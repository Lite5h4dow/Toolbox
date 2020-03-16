import withLayout from "../components/frontLayout";
import serialize from "form-serialize";
import Router from "next/router";
import {
  Segment,
  Button,
  Grid,
  Form,
  Header,
  Input,
  Checkbox
} from "semantic-ui-react";
import Axios from "axios";
import https from "https";
import cookie from "js-cookie";

const Login = () => {
  var email;
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
      cookie.set("lastUser", ret.data.sessionID);
      Router.push(`/Profile/${ret.data.userID}`);
    });

    res.catch(ret => {
      alert(ret.response.data.message);
    });
  }

  function registerPost(reqData) {
    var res = Axios({
      method: "post",
      url: `${process.env.local_url}/api/register`,
      data: reqData,
      httpsAgent: new https.Agent({ keepAlive: true })
    });

    res.then(ret => {
      cookie.set("sessionId", ret.data.sessionID);
      cookie.set("lastUser", ret.data.userID);
      Router.push(`/Profile/${ret.data.userID}`);
    });

    res.catch(resErr => {
      alert(resErr.response.data);
    });
  }
  return (
    <Segment>
      <Grid stackable columns={2} divided>
        <Grid.Column>
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
        </Grid.Column>
        <Grid.Column>
          <Header>Register</Header>
          <Form
            id="registerForm"
            onSubmit={() => {
              var form = serialize(document.querySelector("#registerForm"), {
                hash: true
              });
              registerPost(form);
            }}
          >
            <Form.Group widths="equal">
              <Form.Field
                name="forename"
                control={Input}
                label="Forename"
                placeholder="Joe"
                required
              />

              <Form.Field
                name="surname"
                control={Input}
                label="Surname"
                placeholder="Bloggs"
                required
              />
            </Form.Group>
            <Form.Field
              name="email"
              control={Input}
              label="E-mail Address"
              placeholder="joe.bloggs123@gmail.com"
              value={email}
              type="email"
              required
            />
            <Form.Field
              name="username"
              control={Input}
              label="Username"
              placeholder="joebloggs123"
              required
            />
            <Form.Group widths="equal">
              <Form.Field
                name="password"
                control={Input}
                label="Password"
                placeholder="password"
                type="password"
                required
              />

              <Form.Field
                name="passwordc"
                control={Input}
                label="Confirm Password"
                placeholder="password"
                type="password"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Field control={Button} content="Register" type="submit" />
              <Form.Field
                control={Checkbox}
                label="I agree to the terms and conditions"
                required
              />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default withLayout(Login);
