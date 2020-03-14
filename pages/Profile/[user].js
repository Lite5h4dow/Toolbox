import { useRouter } from "next/router";
import withLayout from "../../components/frontLayout";

const profile = () => {
  const router = useRouter();
  const profile = router.query;

  console.log(profile);
  return <div></div>;
};

export default withLayout(profile);
