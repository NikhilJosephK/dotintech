"use client";

import { useEffect, useState } from "react";
import Row from "./row";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { totalCost } from "@/context";

export default function BookSeats() {
  const [seatSelection, setSeatSelection] = useState([]);
  const [updateTotalCost, setUpdateTotalCost] = useState(0);
  const route = new useRouter();
  const { setTotal } = useContext(totalCost);

  function initializeSeats(seatName, type, cost) {
    let num = 0;
    let apiData = Array.from({ length: 6 }).map((_) => {
      num++;
      return {
        id: seatName + num,
        seat: seatName + num,
        type: type,
        price: cost,
      };
    });
    return apiData;
  }

  const seatingOptions = [
    {
      alphabet: "A",
      type: "silver",
      price: 100,
    },
    {
      alphabet: "B",
      type: "gold",
      price: 150,
    },
    {
      alphabet: "C",
      type: "platinum",
      price: 200,
    },
  ];

  const segregateRows = seatingOptions.map((item) => {
    return initializeSeats(item.alphabet, item.type, item.price);
  });

  const flattenedRows = segregateRows.flat();

  useEffect(() => {
    const total = flattenedRows.reduce((acc, item) => {
      if (seatSelection.includes(item.id)) {
        return (acc += item.price);
      }
      return acc;
    }, 0);
    setUpdateTotalCost(total);
  }, [seatSelection]);

  function handleSeatSelection(data) {
    if (seatSelection.includes(data)) {
      seatSelection.splice(seatSelection.indexOf(data), 1);
      setSeatSelection((prev) => [...prev]);
    } else if (seatSelection.length < 9) {
      setSeatSelection((prev) => [...prev, data]);
    }
  }

  function goToCheckout() {
    setTotal(updateTotalCost);
    route.push("/checkout/");
  }

  return (
    <section className="h-[100vh] flex items-center justify-center flex-col gap-24 bg-black relative">
      {seatSelection.length >= 9 && (
        <p className=" absolute top-24 text-red-400 text-base ">
          Sorry! Cannot book more than 8 seats.
        </p>
      )}
      <div className="flex flex-col gap-10">
        {segregateRows.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <Row
                handleSeatSelection={handleSeatSelection}
                flattenedRows={item}
                type={item[0].type}
                seatSelection={seatSelection}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-8 max-md:flex-wrap max-md:justify-center px-4">
        {seatingOptions.map((item) => {
          return (
            <div
              className="flex items-center gap-3 "
              key={item.alphabet}
            >
              <p className="text-white uppercase text-xl font-semibold">
                {item.type} :
              </p>
              <p className="text-white uppercase text-xl font-semibold">
                Rs.{item.price} ({item.alphabet})
              </p>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 bg-red-300 left-0 right-0 py-6 w-full">
        <button
          type="submit"
          onClick={goToCheckout}
          className={`text-2xl font-bold mx-auto bg-blue-300 py-2 px-5 rounded-md border-2 border-blue-200 hover:bg-blue-400 transition duration-300 flex justify-center ${
            (seatSelection.length >= 9 || seatSelection.length === 0) &&
            "pointer-events-none bg-gray-400"
          }`}
        >
          Checkout : {updateTotalCost}
        </button>
      </div>
    </section>
  );
}
