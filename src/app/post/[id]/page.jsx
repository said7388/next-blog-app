// @flow strict
import CommentCard from '@/app/components/comment-card';
import CommentInput from '@/app/components/comment-input';
import PostReaction from '@/app/components/post-reaction';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const getBlogPost = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/view/${id}`);
  if (!res.ok) {
    notFound();
  };

  return await res.json();
};

const getBlogPostReaction = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reactions/${id}`, {
    cache: "no-cache"
  });

  if (!res.ok) {
    notFound();
  };

  return await res.json();
};

const getBlogPostComment = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
    cache: "no-cache"
  });

  if (!res.ok) {
    notFound();
  };

  return await res.json();
};

async function page({ params }) {
  const { id } = params;
  const { data: post } = await getBlogPost(id);
  const { reactions, totalReaction } = await getBlogPostReaction(id);
  const { data: comments, pagination } = await getBlogPostComment(id);

  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="py-8 border-b">
        <Image
          src="/placeholder.png"
          width={720}
          height={420}
          alt={post.title}
          className="rounded max-w-2xl mx-auto h-auto"
        />
        <div className="my-5 mt-8 lg:mt-12 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Image
              src="/avatar.jpg"
              width={240}
              height={240}
              alt={post.author}
              className="rounded-full w-12 h-12"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold">
                {post.author}
              </h3>
              <p className="text-sm">
                {new Date(post.created_at).toDateString()}
              </p>
            </div>
          </div>
          <PostReaction
            totalReaction={totalReaction}
            reactions={reactions}
            postId={id}
          />
        </div>
        <h2 className="text-3xl font-bold my-8">
          {post.title}
        </h2>
        <p>
          {post.content}
        </p>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-8">Top Comments</h2>
        <div className="flex flex-col gap-8">
          <CommentInput postId={id} />
          {
            comments.length > 0 && comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default page;