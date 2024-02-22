// @flow strict
"use client";
import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { toast } from "react-toastify";

function CommentInput({ postId }) {
  const [content, setContent] = useState('');
  const user = localStorage.getItem('token');
  const router = useRouter();

  const handleSubmit = async (e) => {
    if (!content) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comments/create`, {
        post_id: postId,
        content: content,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      });

      setContent('');
      router.refresh();
    } catch (error) {
      const res = await error.response.data;
      toast.error(res?.message);
    }
  };

  return (
    <>
      {
        !user ?
          <div className="flex justify-center py-5">
            <p>
              Please <Link className="text-indigo-500" href="/login">login</Link> to write new comment.
            </p>
          </div>
          :
          <div className="flex items-start gap-3">
            <Image
              src="/avatar.jpg"
              width={240}
              height={240}
              alt="Avatar"
              className="rounded-full w-12 h-12"
            />
            <div className="rounded-lg w-full">
              <div className="relative">
                <textarea
                  type="text"
                  placeholder="Write your comment"
                  rows="5"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="peer relative w-full rounded border border-slate-200 px-4 py-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-indigo-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-indigo-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Write your comment
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="inline-block rounded-lg border border-white px-6 py-2 text-center text-base font-medium bg-indigo-600 text-white transition mt-3">
                  Submit
                </button>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default CommentInput;