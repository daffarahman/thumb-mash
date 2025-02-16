import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex justify-center p-4">
      <Link href="/">
        {/*<h1 className="text-2xl font-bold">ThumbMash</h1>*/}
        <Image src="/brand.png" width={256} height={72} alt="brand logo" />
      </Link>
    </header>
  );
}
