import type { NextPage } from "next";
import Login from "@/components/Login";
import Forum from "src/components/Forum";
import type { GetServerSidePropsContext } from "next";

interface Props {
  user?: boolean;
}

const Home: NextPage = ({ user }: Props) => {
  return <>{user ? <Forum /> : <Login />}</>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let cookies = context.req.cookies;
  if (cookies.session) {
    return {
      props: {
        user: true,
      },
    };
  }
  if (!cookies.session) return { props: { user: false } };
}

export default Home;
