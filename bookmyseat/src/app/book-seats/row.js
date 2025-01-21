"use client";

import { useEffect, useState } from "react";

export default function Row({ flattenedRows, handleSeatSelection, type, seatSelection }) {

    const [seatList, setSeatList] = useState([]);

    useEffect(() => {
        setSeatList([...seatSelection])
    }, [seatSelection])

    return (
        <div className="flex md:gap-20 sm:gap-10 gap-5 justify-center">
            {flattenedRows.map((item) => {
                return (
                    <div key={item?.id} className="flex gap-20">
                        {item.type.includes(type) && (
                            <div className="relative">

                                <div className="flex gap-20">
                                    <div
                                        onClick={() => {
                                            handleSeatSelection(item.seat)
                                        }}
                                        className={`rounded-md sm:size-12 size-8  bg-blue-200 flex justify-center items-center cursor-pointer ${seatList.includes(item.seat) ? 'bg-red-200' : 'bg-blue-200'}`}
                                    >
                                        {item?.seat}
                                    </div>

                                </div>
                                {seatList.includes(item.seat) && <p className="absolute text-white -top-7">{item.price}</p>}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
