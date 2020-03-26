import { Segment, Header, Button } from "semantic-ui-react";
import withLayout from "../components/frontLayout";

const Index = () => {
  return (
    <div>
      <Segment>
        <Header> Hello, World!</Header>
      </Segment>
    </div>
  );
};

export default withLayout(Index);
