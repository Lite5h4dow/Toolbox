import useAxios from "axios-hooks";
import {
  Dimmer,
  Loader,
  Segment,
  Container,
  Menu,
  Item
} from "semantic-ui-react";

export default function MenuPages() {
  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.local_url}/api/menuItems`
  );

  if (loading) return <Loader />;
  if (error) return <div>error</div>;

  console.log(data);

  data.sort((a, b) => {
    console.log(a);
    console.log(b);
    return a.PageOrder - b.PageOrder;
  });

  return (
    <Container>
      {data.map(page => {
        return <Menu.Item>{page.PageName}</Menu.Item>;
      })}
    </Container>
  );
}
