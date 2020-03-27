import useAxios from "axios-hooks";
import Link from "next/link";
import Router from "next/router";
import { Loader, Container, Menu, Button } from "semantic-ui-react";

export default function MenuPages() {
  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.local_url}/api/menuItems`
  );

  if (loading) return <Loader />;
  if (error) return <div>error</div>;

  data.sort((a, b) => {
    return a.PageOrder - b.PageOrder;
  });

  const handleClick = (url: string) => {
    let router = Router;
    router.push(url);
  };

  return (
    <Container>
      {data.map(page => {
        return (
          <Menu.Item
            as="a"
            key={page.PageOrder}
            onClick={() => {
              handleClick(page.PageURL);
            }}
            content={page.PageName}
          />
        );
      })}
      <Menu.Menu position="right">
        <Menu.Item fitted="vertically">
          <Button.Group compact>
            <Button
              basic
              color="blue"
              compact
              content="Login"
              onClick={() => {
                let router = Router;
                router.push("/Login");
              }}
            />
            <Button
              basic
              color="orange"
              compact
              content="Register"
              onClick={() => {
                let router = Router;
                router.push("/Register");
              }}
            />
          </Button.Group>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  );
}
