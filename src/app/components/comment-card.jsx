// @flow strict
import Image from 'next/image';

function CommentCard({ comment }) {
  return (
    <div className="flex items-start gap-3">
      <Image
        src="/avatar.jpg"
        width={240}
        height={240}
        alt="Avatar"
        className="rounded-full w-12 h-12"
      />
      <div className="p-5 bg-white rounded-lg w-full border">
        <p className="font-semibold">{comment.author}</p>
        <p className="my-3 text-xs font-medium">
          {new Date(comment.created_at).toDateString()}
        </p>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;