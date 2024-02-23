// @flow strict
import { getTokenCookieAction } from '@/app/actions';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const UpdatePost = dynamic(() => import('@/app/components/update-post'), {
  ssr: false,
});

const getBlogPost = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/view/${id}`);
  if (!res.ok) {
    notFound();
  };

  return await res.json();
};

async function page({ params }) {
  const { id } = params;
  const tokenData = await getTokenCookieAction();
  const token = tokenData?.value;
  const { data: post } = await getBlogPost(id);

  if (!token){
    redirect('/login');
  };

  return (
    <div>
      <UpdatePost post={post} token={token} />
    </div>
  );
};

export default page;