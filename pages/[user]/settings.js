import { Segment, Form, Radio, Header } from "semantic-ui-react";
import { useRouter } from "next/router";
import serialize from "form-serialize";
import useAxios from "axios-hooks";
import https from "https";
import withLayout from "../../components/mainLayout";

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

  return <Segment></Segment>;
};

export default withLayout(settings);
