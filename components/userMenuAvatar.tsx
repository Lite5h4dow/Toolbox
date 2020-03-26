import { Image, Segment } from "semantic-ui-react";
import react, { Component } from "react";
import { SemanticSIZES } from "semantic-ui-react/dist/commonjs/generic";

export interface avatarProps {
  imgName: string;
  imgSize: SemanticSIZES;
}
export interface avatarState {}

class userAvatar extends Component<avatarProps, avatarState> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Segment inverted color="grey">
        <Image
          circular
          centered
          size={this.props.imgSize}
          src={this.props.imgName}
        />
      </Segment>
    );
  }
}

export default userAvatar;
