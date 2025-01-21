import { Form } from "@/components";

export default function Home() {
  return (
    <div className="h-[100vh] grid place-content-center bg-black">
      <h1 className="text-5xl text-blue-300 font-bold mb-20">BookMySeat</h1>
      <Form />
    </div>
  )
}