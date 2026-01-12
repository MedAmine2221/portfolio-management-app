import Image from "next/image";
export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen">
      <Image alt="loading" height={500} src="/loading.gif" width={500} />
    </div>
  );
}
