// @flow strict
"use client";

import Link from 'next/link';
import { useRouter } from "next/navigation";

function Navbar() {
  const token = localStorage.getItem('token');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.refresh();
  };

  return (
    <header className="shadow fixed left-0 top-0 z-40 w-full bg-white/80 py-6 backdrop-blur-[15px] backdrop-saturate-[150%] transition-all duration-300">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold text-indigo-700">
              Simple Blog
            </span>
          </Link>
          {
            token ?
              <div className="flex items-center gap-6">
                <Link
                  href="/post/new"
                  className="font-medium px-6 py-2 rounded bg-indigo-600 text-white">
                  New Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-medium px-6 py-2 rounded bg-gray-200">
                  Logout
                </button>
              </div>
              :
              <Link
                href="/login"
                className="font-medium px-6 py-2 rounded bg-indigo-600 text-white">
                Login
              </Link>
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;