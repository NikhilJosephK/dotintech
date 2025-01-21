'use client'

import { useEffect, useState } from "react";
import Row from "./row";

export default function Home() {
  const [getSeat, setGetSeat] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  function createSeat(seatName, type, cost) {
    let num = 0;
    let apiData = Array.from({ length: 6 }).map((_) => {
      num++
      return { id: seatName + num, seat: seatName + num, type: type, price: cost }
    })
    return apiData;
  }

  const arr = [
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


  const nonFlatArr = arr.map(item => {
    return createSeat(item.alphabet, item.type, item.price)
  });

  const commonArr = nonFlatArr.flat();

  useEffect(() => {

    const total = commonArr.reduce((acc, item) => {
      if (getSeat.includes(item.id)) {
        return acc += item.price
      }
      return acc
    }, 0)
    setTotalCost(total)
  }, [getSeat])

  function fetchSeats(data) {
    if (getSeat.includes(data)) {
      getSeat.splice(getSeat.indexOf(data), 1);
      setGetSeat(prev => [...prev]);
    }
    else if (getSeat.length < 8) {
      setGetSeat(prev => [...prev, data]);
    }
  }

  return (
    <section className="h-[100vh] flex items-center justify-center flex-col gap-24">
      <div className="flex flex-col gap-10">
        {nonFlatArr.map((item, index) => {
          return <Row key={index} fetching={fetchSeats} commonArr={item} type={item[0].type} />
        })}
      </div>
      <h1 className="text-2xl font-bold">Total is : {totalCost}</h1>
    </section>
  );
}
