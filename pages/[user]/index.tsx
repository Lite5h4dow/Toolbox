import Router from "next/router";
import MainLayout from "../../components/mainLayout";
import Axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import https from "https";
import { Segment, Header, Loader, Dimmer } from "semantic-ui-react";
import { Component } from "react";
import moment from "moment";

interface DashboardProps { }

interface DashboardState { }

class Dashboard extends Component<DashboardProps, DashboardState> {
  render() {
    return (
      <MainLayout>
        <Header content="Dashboard" textAlign="center" />
        <Segment placeholder></Segment>
        <Segment placeholder></Segment>
        <Segment placeholder></Segment>

      </MainLayout>
    );
  }
}

export default Dashboard;
