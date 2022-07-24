import { Navbar } from "../Navbar";
import React, { useEffect } from "react";
const Forum = () => {
  async function fetchPosts() {
    const posts = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
    });
    console.log("POST -> ", posts);
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div dir="rtl">
      <Navbar />
      forum
    </div>
  );
};
export default Forum;

export async function getStaticProps() {}
