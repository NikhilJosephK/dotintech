"use client";

export default function Row({ flattenedRows, handleSeatSelection, type }) {

    return (
        <div className="flex gap-20 justify-center">
            {flattenedRows.map((item) => {

                return (
                    <div key={item?.id} className="flex gap-20">
                        {item.type.includes(type) && (
                            <div className="flex gap-20">
                                <div
                                    onClick={() => handleSeatSelection(item.seat)}
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
