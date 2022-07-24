import { Navbar } from "../Navbar";
const Forum = () => {
  return (
    <div dir="rtl">
      <Navbar />
      forum
    </div>
  );
};
export default Forum;

export async function getStaticProps() {
  const posts = await fetch("http://localhost:3000/api/posts", {
    method: "GET",
  });
  console.log("POST -> ", posts);
}
