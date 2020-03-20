import {
  Sidebar,
  Segment,
  Container,
  Menu,
  Button,
  Grid
} from "semantic-ui-react";
import { useBooleanKnob } from "@fluentui/docs-components";

const withLayout = Page => {
  const [visible, setVisible] = useBooleanKnob({ name: "visible" });
  return () => (
    <div>
      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
      />
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          id="sidebar"
          animation="push"
          width="thin"
          onHide={() => setVisible(false)}
          visible={visible}
          inverted
        ></Sidebar>
        <Sidebar.Pusher id="pusher">
          <Segment basic inverted>
            <Container>
              <Grid>
                <Grid.Column width="2">
                  <Button
                    floated="right"
                    basic
                    circular
                    icon="bars"
                    color="teal"
                    onClick={() => {
                      setVisible(!visible);
                    }}
                  />
                </Grid.Column>
                <Grid.Column width="12"></Grid.Column>
                <Grid.Column width="2">
                  <Button
                    floated="left"
                    basic
                    circular
                    icon="sign-out"
                    color="teal"
                  />
                </Grid.Column>
              </Grid>
            </Container>
          </Segment>
          <Page />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default withLayout;
