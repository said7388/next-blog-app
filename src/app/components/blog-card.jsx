// @flow strict
import Image from 'next/image';
import Link from 'next/link';

function BlogCard({ post }) {

  return (
    <div className="p-3 shadow-sm bg-[#ffffff] rounded-lg">
      <Image
        src="/placeholder.png"
        width={1080}
        height={720}
        alt={post.title}
        className="rounded"
      />
      <div className="p-2">
        <Link href={`/post/${post.id}`}>
          <h3 className="text-xl font-semibold my-4 hover:text-indigo-500">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 line-clamp-4">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;