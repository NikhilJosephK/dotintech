"use client";

import { useContext, useState } from "react";
import { totalCost } from "@/context";

export default function Checkout() {
  const [isBooked, setIsBooked] = useState(false);

  const { total } = useContext(totalCost);
  return (
    <div className="h-[100vh] bg-black grid place-content-center ">
      {isBooked && (
        <h3 className="text-2xl font-bold text-blue-100 mb-10">
          Booking Confirmed!
        </h3>
      )}
      <div className="relative">
        <p className="text-black py-5 px-10 bg-gray-200 rounded-md">
          Your Total is:{" "}
          <span className="text-xl font-semibold">{total || 0}</span>
        </p>
        <button
          className={`bg-blue-300 rounded-md p-4 text-base font-bold mt-3 hover:bg-blue-400 transition duration-300 w-full ${
            total || "pointer-events-none"
          }`}
          type="submit"
          onClick={() => setIsBooked(true)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
