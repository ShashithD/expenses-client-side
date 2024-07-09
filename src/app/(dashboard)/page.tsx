import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import WithAuth from '@/app/with-auth';

const Home: NextPage = () => {
  return <WithAuth><Content /></WithAuth>;
};

export default Home;
