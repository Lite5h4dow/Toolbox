import {
  Segment,
  Form,
  Header,
  Container,
  Input,
  Loader,
  Select
} from "semantic-ui-react";
import { useRouter } from "next/router";
import serialize from "form-serialize";
import Axios, { AxiosResponse } from "axios";
import https from "https";
import Cookies from "js-cookie";
import Layout from "../../components/mainLayout";
import { Component } from "react";
import { userData } from "../../lib/userData";
import { isNullOrUndefined } from "util";
import { userTypes } from "../../lib/userTypes";

interface SettingsState {
  uData: userData;
}

class Settings extends Component<{}, SettingsState> {
  constructor(props) {
    super(props);
    this.setState({
      uData: new userData(
        "Joe",
        "Bloggs",
        "JoeBloggs123",
        "Joe.Bloggs@gmail.com",
        'Landlord'
      )
    });
  }

  componentWillMount() {

    var user = Axios({
      url: `${process.env.local_url}/api/getUser`,
      method: "post",
      data: { userID: Cookies.get("lastUser") },
      httpsAgent: new https.Agent({ keepAlive: true })
    });

    user.then(resp => {
      console.log(resp.data)
      this.setState({
        uData: new userData(
          resp.data.Forename,
          resp.data.Surname,
          resp.data.Username,
          resp.data.Email,
          resp.data.UserType
        )
      });
    });
  }

  handleFormChange = (e, { name, value }) => {
    this.setState({ uData: { [name]: value } })
  }


  render() {
    if (isNullOrUndefined(this.state.uData))
      return (
        <Segment placeholder>
          <Loader>

          </Loader>
        </Segment>
      );
    return (
      <Layout>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              name="Forename"
              label="Forename"
              control={Input}
              placeholder={this.state.uData.Forename}
            />
            <Form.Field
              name="Surname"
              label="Surname"
              control={Input}
              placeholder={this.state.uData.Surname}
            />
          </Form.Group>
          <Form.Field
            name="Email"
            label="Email Address"
            control={Input}
            type="email"
            placeholder={this.state.uData.Email}
          />
          <Form.Field
            name="Type"
            label="Account Type"
            control={Select}
            options={['Cleaner', 'Manager', 'Admin', 'Landlord', 'Agency', 'Contractor']}
          />
        </Form>
      </Layout>
    );
  }
}

export default Settings;
