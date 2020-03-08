import { Menu, Container } from "semantic-ui-react";

const withLayout = Page => {
  return () => (
    <div>
      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
      />
      <Menu pointing secondary></Menu>
      <Container>
        <Page />
      </Container>
    </div>
  );
};

export default withLayout;
