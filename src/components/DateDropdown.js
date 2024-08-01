import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
const DateDropdown = ({month, year, handleMonthClick, handleYearClick}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i);
  
  
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const toggleMonthDropdown = () => setIsMonthOpen(!isMonthOpen);
  const toggleYearDropdown = () => setIsYearOpen(!isYearOpen);
  function reset() {
    alert(`No results found. Please try again.`);
    setSelectedMonth(dayjs().month());
    setSelectedYear(dayjs().year());
  }
  const monthClickListener = (month) => {
    setSelectedMonth(months[month]);
    setIsMonthOpen(false);
    handleMonthClick(month, reset);
  };
  
  const yearClickListener = (year) => {
    setSelectedYear(year);
    setIsYearOpen(false);
    handleYearClick(year, reset);
  };

  useEffect(
    ()=> {setSelectedMonth(month); setSelectedYear(year);}, [month, year]
  );

  return (
    <div className="space-y-4">
      <div className="relative inline-block text-left">
        <div className="m-2">
          <button
            type="button"
            className=" m-2 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500"
            onClick={toggleMonthDropdown}
          >
            {months[selectedMonth] || selectedMonth}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isMonthOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {months.map((month, index) => (
                <button
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  onClick={() => monthClickListener(index)}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="m-2 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500"
            onClick={toggleYearDropdown}
          >
            {selectedYear || "Select a year"}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isYearOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {years.map((year, index) => (
                <button
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  onClick={() => yearClickListener(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateDropdown;
