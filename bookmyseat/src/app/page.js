'use client'

import { useEffect, useState } from "react";
import Row from "./row";

export default function Home() {
  const [getSeat, setGetSeat] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  let row1, row2, row3;

  function createSeat(seatName, type, cost) {
    let num = 0;
    let apiData = Array.from({ length: 6 }).map((_) => {
      num++
      return { id: seatName + num, seat: seatName + num, type: type, price: cost }
    })
    return apiData;
  }

  row1 = createSeat('A', 'silver', 100);
  row2 = createSeat('B', 'gold', 150);
  row3 = createSeat('C', 'platinum', 200);

  const commonArr = [...row1, ...row2, ...row3];

  useEffect(() => {
    let total = 0
    commonArr.forEach(item => {
      if (getSeat.includes(item.id)) {
        setTotalCost(total += item.price)
      }
      if (getSeat.length === 0) {
        setTotalCost(0)
      }
    })

  }, [getSeat])

  function fetchSeats(data) {
    if (getSeat.includes(data)) {
      getSeat.splice(getSeat.indexOf(data), 1);
      setGetSeat(prev => [...prev]);
    } else {
      setGetSeat(prev => [...prev, data]);
    }
  }

  return (
    <section className="h-[100vh] flex items-center justify-center flex-col gap-24">
      <div className="flex flex-col gap-10">
        <Row fetching={fetchSeats} commonArr={row1} type='silver' />
        <Row fetching={fetchSeats} commonArr={row2} type='gold' />
        <Row fetching={fetchSeats} commonArr={row3} type='platinum' />
      </div>
      <h1 className="text-2xl font-bold">Total is : {totalCost}</h1>
    </section>
  );
}
