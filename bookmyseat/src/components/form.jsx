"use client";

import { useRouter } from "next/navigation";

export function Form() {
  const route = new useRouter();

  function signup(e) {
    e.preventDefault();
    route.push("/book-seats/");
  }

  return (
    <form
      action=""
      className="flex flex-col"
      onSubmit={signup}
    >
      <label
        className="mb-2 text-base font-normal text-gray-400"
        htmlFor="email"
      >
        Email/Username
      </label>
      <input
        className="border-2 p-4 rounded-md"
        type="email"
        name="email"
      />
      <button
        className="bg-blue-300 rounded-md p-4 text-base font-bold mt-3 hover:bg-blue-400 transition duration-300"
        type="submit"
      >
        Signup
      </button>
    </form>
  );
}
