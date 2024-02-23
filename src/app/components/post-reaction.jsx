// @flow strict
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { toast } from "react-toastify";

function PostReaction({ totalReaction, reactions, postId , token, user}) {
  const router = useRouter();

  const findMyReaction = () => {
    const myReaction = reactions.find((reaction) => reaction.user_id === user?.id);
    return myReaction;
  };

  const makeReaction = async (reaction) => {
    if (!token){
      router.push("/login");
      return;
    };

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/reactions`, {
        post_id: postId,
      }, {
        headers: {
          Authorization: "Bearer " + token,
        }
      });

      router.refresh();
    } catch (error) {
      const res = await error.response.data;
      toast.error(res?.message);
    }
  };

  return (
    <div>
      {
        findMyReaction() ?
          <p className="flex items-center gap-2">
            <button onClick={makeReaction}>
              <BiSolidLike className="text-indigo-600" size={24} />
            </button>
            <span> {totalReaction}</span>
          </p>
          :
          <p className="flex items-center gap-2">
            <button onClick={makeReaction}><BiLike size={24} /></button>
            <span> {totalReaction}</span>
          </p>
      }
    </div>
  );
};

export default PostReaction;