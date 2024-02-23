// @flow strict

import { getTokenCookieAction } from '@/app/actions';
import CreateNewPost from '@/app/components/new-post';
import { redirect } from 'next/navigation';

async function page() {
  const tokenData = await getTokenCookieAction();
  const token = tokenData?.value;

  if (!token) {
    redirect('/login');
  };

  return (
    <div>
      <CreateNewPost token={token} />
    </div>
  );
};

export default page;