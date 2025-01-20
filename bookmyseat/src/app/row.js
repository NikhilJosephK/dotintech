"use client";

export default function Row({ commonArr, fetching, type }) {

    return (
        <div className="flex gap-20 justify-center">
            {commonArr.map((item) => {

                return (
                    <div key={item?.id} className="flex gap-20">
                        {item.type.includes(type) && (
                            <div className="flex gap-20">
                                <div
                                    onClick={() => fetching(item.seat)}
                                    className="size-24 bg-red-200 flex justify-center items-center"
                                >
                                    {item?.seat}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
