import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Login from "@/components/Login";
import Forum from "src/components/Forum";

const Home: NextPage = () => {
  const [session, setSession] = useState<boolean>(false);
  useEffect(() => {
    let session = localStorage.getItem("session");
  }, []);
  return <>{session ? <Forum /> : <Login />}</>;
};

export default Home;
