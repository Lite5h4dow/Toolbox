import {
  Segment,
  Button,
  Form,
  Header,
  Input,
  Checkbox
} from "semantic-ui-react";
import https from "https";
import Router from "next/router";
import Axios from "axios";
import withLayout from "../components/frontLayout";
import cookie from "js-cookie";
import serialize from "form-serialize";

const Register = () => {
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
      Router.push(`/${ret.data.userID}`);
    });

    res.catch(resErr => {
      alert(resErr.response.data);
    });
  }

  return (
    <Segment>
      <Header> Register </Header>
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
    </Segment>
  );
};

export default withLayout(Register);
