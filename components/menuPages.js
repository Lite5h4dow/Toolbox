import useAxios from "axios-hooks";
import Link from 'next/link'
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

  data.sort((a, b) => {
    return a.PageOrder - b.PageOrder;
  });

  const handleClick = (PageURL) => {
    window.location.href = PageURL
  }

  return (
    <Container>
      {data.map(page => {
        return (
          <Link href={page.PageURL} passHref key={page.PageOrder}>
            <Menu.Item as="a" >{page.PageName}</Menu.Item>
          </Link>
        );
      })}
    </Container>
  );
}
