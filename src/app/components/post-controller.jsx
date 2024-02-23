// @flow strict
"use client";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { postsRevalidateAction } from "../actions";

function PostController({ post, user, token }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/delete/${post.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        }
      });

      postsRevalidateAction();
      toast.success(res.data.message);
      router.push("/")
    } catch (error) {
      console.log(error)
      toast.error(res?.message);
    }
  };

  return (
    <>
      {
        (user?.id === post?.author_id && token) ?
          <div className="flex gap-3 absolute top-5 right-5">
            <Link href={`/post/update/${post.id}/`}>
              <button className="bg-[#e2e2e2] rounded px-3 py-2">
                <FaEdit size={18} />
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded px-3 py-2">
              <MdDelete size={18} />
            </button>
          </div>
          :
          <></>
      }
    </>
  );
};

export default PostController;