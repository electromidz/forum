import { Navbar } from "../Navbar";
import React, { useEffect } from "react";
import useSWR from "swr";

const Forum = () => {
  const { data, error } = useSWR("/api/posts");

  if (!data && !error) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return (
    <div dir="rtl">
      <Navbar />
      <div>{data?.data[0]?.title}</div>
      <div>{data?.data[0]?.content}</div>
    </div>
  );
};
export default Forum;
