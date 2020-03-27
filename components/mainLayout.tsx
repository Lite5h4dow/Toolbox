import {
  Sidebar,
  Segment,
  Container,
  Menu,
  Button,
  Grid,
  Dimmer,
  Loader
} from "semantic-ui-react";
import react, { Component } from "react";
import UserAvatar from "../components/userMenuAvatar";
import Router from "next/router";
import Cookies from "js-cookie";
import Axios, { AxiosResponse } from "axios";
import https from "https";
import { ParsedUrlQuery } from "querystring";

export interface LayoutState {
  barVisible: boolean;
  bodyDimmed: boolean;
  displayPage: boolean;
}

class MainLayout extends Component<{}, LayoutState> {
  constructor(props) {
    super(props);
    this.setState({ barVisible: false, bodyDimmed: false, displayPage: false });
    this.handleSideBar = this.handleSideBar.bind(this);
  }

  componentWillMount() {
    this.setState({ displayPage: false });
    var session = Cookies.get("sessionId");
    var lastUser = Cookies.get("lastUser");

    var validation = Axios({
      url: `${process.env.local_url}/api/validateSession`,
      method: "post",
      data: { sessionID: session, userID: lastUser },
      httpsAgent: new https.Agent({ keepAlive: true })
    });

    validation.then((res: AxiosResponse) => {
      if (!res.data.session) {
        Router.push("/Login");
      } else {
        this.setState({ displayPage: true });
      }
    });

    validation.catch(() => {
      Router.push("/Login");
    });
  }

  handleSideBar() {
    const visible = this.state.barVisible;
    this.setState({ barVisible: !visible, bodyDimmed: !visible });
  }

  handleLogOut() {
    Cookies.remove("lastUser");
    Cookies.remove("sessionId");
    Router.push("/");
  }

  render() {
    if (!this.state.displayPage) {
      return (
        <Segment>
          <Dimmer active>
            <Loader size="big" content="Loading" />
          </Dimmer>
        </Segment>
      );
    }
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            inverted
            vertical
            visible={this.state.barVisible}
            onHide={() => {
              this.setState({ barVisible: false, bodyDimmed: false });
            }}
          >
            <Menu.Item>
              <UserAvatar
                imgName="http://via.placeholder.com/500"
                imgSize="small"
              />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.bodyDimmed}>
            <Segment basic inverted>
              <Container>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width="2">
                      <Button
                        circular
                        basic
                        color="orange"
                        icon="bars"
                        floated="left"
                        onClick={this.handleSideBar}
                      />
                    </Grid.Column>
                    <Grid.Column width="12"></Grid.Column>
                    <Grid.Column width="2">
                      <Button
                        circular
                        basic
                        color="orange"
                        icon="sign-out"
                        floated="right"
                        onClick={this.handleLogOut}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <Container>{this.props.children}</Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default MainLayout;
