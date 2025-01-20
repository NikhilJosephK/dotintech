'use client'

import { useEffect, useState } from "react";

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
    })

  }, [getSeat])

  return (
    <section className="h-[100vh] flex items-center justify-center flex-col gap-24">
      <div className="gap-2 flex " >
        {
          commonArr.map(item => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="flex gap-20">
                <div
                  key={item?.id}
                  onClick={() => {
                    if (getSeat.includes(item.seat)) {
                      getSeat.splice(getSeat.indexOf(item.seat), 1);
                      setGetSeat(prev => [...prev]);
                    } else {
                      setGetSeat(prev => [...prev, item.seat]);
                    }
                  }}
                  className="size-24 bg-red-200 flex justify-center items-center"
                >
                  {item?.seat}
                </div>
              </div>
            )
          })
        }

      </div>
      <h1 className="text-2xl font-bold">Total is : {totalCost}</h1>
    </section>
  );
}
