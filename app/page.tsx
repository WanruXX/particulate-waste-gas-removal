import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Home() {
  return (
    <div className="absolute w-full">
      <div className="absolute top-0 w-full h-16 bg-slate-300">
      <div className="flex w-48">
        <Link href="/">
          <div className="flex items-center gap-x-2 pl-5 pt-5">
            <Image
              src="/logo.svg"
              alt="Logo"
              height={30}
              width={30} />
            <span className={cn("font-semibold text-md", font.className)}>Our team name</span>
          </div>
        </Link>
      </div>
      <div className="absolute right-4 top-4 hidden lg:inline-block">
        <Link href="/" className="text-black text-md pr-7 hover:text-rose-400">
          Tools
        </Link>
        <Link href="/" className="text-black text-md pr-6 hover:text-rose-400">
          Docs
        </Link>
        <Link href="/" className="text-white text-md pr-6 hover:text-rose-400">
          FAQ
        </Link>
        <Link href="/" className="text-white text-md pr-6 hover:text-rose-400">
          Contact
        </Link>
        <Button className="mr-2 rounded-xl bg-transparent border-2 border-zinc-500 text-l font-mono hover:text-white">Sign in</Button>
      </div>
      </div>
      
      <div className="flex flex-col m-auto mt-24 w-full justify-center text-center text-black text-3xl font-mono font-semibold">
        Particulate / Waste-gas Removal System Dashboard
      </div>

    </div>
  );
}
