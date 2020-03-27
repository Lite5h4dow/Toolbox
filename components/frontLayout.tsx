import { Menu, Segment, Container } from "semantic-ui-react";
import MenuPages from "./menuPages";

const withLayout = Page => {
  return () => (
    <div>
      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
      />
      <Segment basic inverted attached="bottom">
        <Menu inverted secondary>
          <MenuPages />
        </Menu>
      </Segment>
      <Container>
        <Page />
      </Container>
    </div>
  );
};
export default withLayout;
