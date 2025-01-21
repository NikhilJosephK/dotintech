'use client'

import { useEffect, useState } from "react";
import Row from "./row";

export default function Home() {
  const [seatSelection, setSeatSelection] = useState([]);
  const [updateTotalCost, setUpdateTotalCost] = useState(0);

  function initializeSeats(seatName, type, cost) {
    let num = 0;
    let apiData = Array.from({ length: 6 }).map((_) => {
      num++
      return { id: seatName + num, seat: seatName + num, type: type, price: cost }
    })
    return apiData;
  }

  const seatingOptions = [
    {
      alphabet: 'A',
      type: 'silver',
      price: 100
    },
    {
      alphabet: 'B',
      type: 'gold',
      price: 150
    },
    {
      alphabet: 'C',
      type: 'platinum',
      price: 200
    }
  ];

  const segregateRows = seatingOptions.map(item => {
    return initializeSeats(item.alphabet, item.type, item.price)
  });

  const flattenedRows = segregateRows.flat();

  useEffect(() => {
    const total = flattenedRows.reduce((acc, item) => {
      if (seatSelection.includes(item.id)) {
        return acc += item.price
      }
      return acc
    }, 0)
    setUpdateTotalCost(total)
  }, [seatSelection])

  function handleSeatSelection(data) {
    if (seatSelection.includes(data)) {
      seatSelection.splice(seatSelection.indexOf(data), 1);
      setSeatSelection(prev => [...prev]);
    }
    else if (seatSelection.length < 8) {
      setSeatSelection(prev => [...prev, data]);
    }
  }

  return (
    <section className="h-[100vh] flex items-center justify-center flex-col gap-24">
      <div className="flex flex-col gap-10">
        {segregateRows.map((item, index) => {
          return <Row key={index} handleSeatSelection={handleSeatSelection} flattenedRows={item} type={item[0].type} />
        })}
      </div>
      <h1 className="text-2xl font-bold">Total is : {updateTotalCost}</h1>
    </section>
  );
}
