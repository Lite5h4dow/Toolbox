import {
  Sidebar,
  Segment,
  Container,
  Menu,
  Button,
  Grid,
  Item
} from "semantic-ui-react";
import react, { Component } from "react";
import UserAvatar from "../components/userMenuAvatar";
import Router from "next/router";
import Cookie from "js-cookie";

export interface LayoutState {
  barVisible: boolean;
  bodyDimmed: boolean;
}

class MainLayout extends Component<{}, LayoutState> {
  constructor(props) {
    super(props);
    this.state = { barVisible: false, bodyDimmed: false };
    this.handleSideBar = this.handleSideBar.bind(this);
  }

  handleSideBar() {
    const visible = this.state.barVisible;
    this.setState({ barVisible: !visible, bodyDimmed: !visible });
  }

  render() {
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
                        icon="user outline"
                        floated="right"
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
