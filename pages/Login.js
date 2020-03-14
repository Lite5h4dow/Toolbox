import withLayout from "../components/frontLayout";
import serialize from "form-serialize";
import {
  Segment,
  Button,
  Grid,
  Form,
  Label,
  Header,
  Input
} from "semantic-ui-react";
import Axios from "axios";
import https from "https";

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
      console.log(`${process.env.local_url}/Profile/${ret.data.id}`);
      window.Location.href = `${process.env.local_url}/Profile/${ret.data.id}`;
    });
  }

  function registerPost(reqData) {
    console.log(reqData);
    var res = Axios({
      method: "post",
      url: `${process.env.local_url}/api/register`,
      data: reqData,
      httpsAgent: new https.Agent({ keepAlive: true })
    });

    res.catch(resErr => {
      console.log(resErr.response.data);
      resErr.response.data;
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
            <Form.Field control={Button} content="Login" type="submit" />
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
            <Form.Field control={Button} content="Register" type="submit" />
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default withLayout(Login);
