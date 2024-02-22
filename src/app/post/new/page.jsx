"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { toast } from "react-toastify";

export default function NewPost() {
  const router = useRouter();
  const [userInput, setUserInput] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = async () => {
    if (!userInput.title || !userInput.content) {
      toast.error('Please fill in all fields.');
      return;
    };

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
        title: userInput.title,
        content: userInput.content,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      });

      toast.success(res.data.message);
      router.refresh();
      router.push("/")
    } catch (error) {
      const res = await error.response.data;
      toast.error(res?.message);
    }
  };

  return (
    <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 w-full max-w-xl mx-auto mt-5">
      <div className="p-8">
        <header className="mb-4 text-center">
          <h3 className="text-2xl font-medium text-slate-700">New Post</h3>
        </header>
        <div className="flex flex-col space-y-5">
          <div className="relative my-6">
            <input
              type="text"
              name="title"
              onChange={(e) => setUserInput({ ...userInput, title: e.target.value })}
              placeholder="Post Title"
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-indigo-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <label
              className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Post Title
            </label>
          </div>
          <div className="relative my-6">
            <textarea
              type="text"
              placeholder="Write your post here"
              rows="8"
              onChange={(e) => setUserInput({ ...userInput, content: e.target.value })}
              className="peer relative w-full rounded border border-slate-200 px-4 py-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-indigo-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <label
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-indigo-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Write your post
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end flex-col gap-5 p-6 px-8">
        <button onClick={handleSubmit} className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-indigo-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none">
          <span>Submit</span>
        </button>
      </div>
    </div>
  )
};
