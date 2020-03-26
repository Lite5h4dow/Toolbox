import { Segment, Form, Radio, Header, Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import serialize from "form-serialize";
import useAxios from "axios-hooks";
import https from "https";
import Layout from "../../components/mainLayout";

const settings = () => {
  const router = useRouter();
  var [{ data, loading, error }, refetch] = useAxios({
    method: "post",
    url: `${process.env.local_url}/api/getUser`,
    data: { userID: router.query.user },
    httpsAgent: new https.Agent({ keepAlive: true })
  });

  if (loading) return <Segment loading></Segment>;
  if (error) router.push("/");

  return (
    <Layout>
      <Container>
        <Header content="Settings" textAlign="center" />
        <Segment></Segment>
      </Container>
    </Layout>
  );
};

export default settings;
