import BlogCard from "./components/blog-card";

const getBlogPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    cache: "no-cache"
  });
  const data = await res.json();
  return data;
};

export default async function Home() {
  const { data } = await getBlogPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {
        data?.length > 0 && data.map((post, i) => (
          <BlogCard key={i} post={post} />
        ))
      }
    </div>
  );
}
