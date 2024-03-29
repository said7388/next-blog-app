import dynamic from 'next/dynamic';
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenCookieAction } from './actions';
import "./globals.css";

const Navbar = dynamic(() => import('@/app/components/navbar'), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Blog",
  description: "This is a simple blog application.",
};

export default async function RootLayout({ children }) {
  const tokenData = await getTokenCookieAction();
  const  token = tokenData?.value;
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <Navbar token={token} />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
