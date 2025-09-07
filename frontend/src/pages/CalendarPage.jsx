import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4"> Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
        className="mx-auto"
      />
      <p className="mt-4 text-center text-gray-700">
        Selected Date: {date.toDateString()}
      </p>
    </div>
  );
};

export default CalendarPage;
