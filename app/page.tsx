import Image from "next/image";
export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen">
      <Image src="/loading.gif" width={500} height={500} alt="loading" />
    </div>
  )
}
