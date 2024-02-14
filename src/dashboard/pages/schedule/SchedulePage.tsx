import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePickerButton } from "@/dashboard/components/schedule/DatePickerButton"
import { TicketButton } from "@/dashboard/components/schedule/TicketButton";
import React, { useState } from "react";

export const SchedulePage = () => {
    const employees = [
        'Alejandra',
        'Nayeli',
        'Jazmin',
        'Mónica',
        'Ashley'
    ];

    const generateTimeSlots = () => {
        const timeSlots = [];
        for (let hour = 8; hour <= 22; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
                timeSlots.push(time);
            }
        }
        return timeSlots;
    };
    const today = new Date();
    const [date, setDate] = useState<Date | undefined>(today);

    const handleTodayButtonClick = () => {
        setDate(new Date());
    };
    return (
        <>
            <div className="grid grid-cols-2 mb-5">
                <div className="space-x-2 flex">
                    <Button variant={'outline'} onClick={handleTodayButtonClick}>Today</Button>
                    <DatePickerButton date={date} setDate={setDate} />
                </div>
            </div>
            <div className="flex">
                <div className="text-end space-y-1">
                    <div className="sticky top-0 bg-slate-50 h-[35px] flex items-center justify-center">
                        <h5>Horas</h5>
                    </div>
                    {generateTimeSlots().map((time, index) => (
                        <div key={index} className="border-t h-[44px] flex items-center px-1">
                            <span className="font-medium">{time}</span>
                        </div>
                    ))}
                </div>
                <div className="grow grid grid-flow-col justify-stretch">
                    {employees.map((employee, index) => (
                        <div key={index} className="text-center space-y-1">
                            <div className="sticky top-0 bg-slate-50 h-[35px] flex items-center justify-center"><h4>{employee}</h4></div>
                            {generateTimeSlots().map((time, index) => (
                                <TicketButton duration={60} title="Example" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
