import Router from "next/router";
import MainLayout from "../../components/mainLayout";
import Axios from "axios";
import cookie from "js-cookie";
import https from "https";
import { Segment, Header } from "semantic-ui-react";

const profile = () => {
  return (
    <MainLayout>
      <Header textAlign="center">Dashboard</Header>
      <Segment></Segment>
    </MainLayout>
  );
};

export default profile;
