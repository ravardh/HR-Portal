import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Calendar = () => {
  const HiringDate = new Date("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const attendanceData = {
    "2025-05": {
      20: { status: "1", inTime: "09:02 AM", outTime: "05:45 PM" },
      21: { status: "0", inTime: null, outTime: null },
      22: { status: "1", inTime: "01:10 PM", outTime: "06:40 PM" }, // Half Day
      23: { status: "L", type: "Casual", inTime: null, outTime: null },
      24: { status: "1", inTime: "09:00 AM", outTime: "06:00 PM" },
      25: { status: "L", type: "Sick", inTime: null, outTime: null },
    },
  };

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (
      currentMonth === HiringDate.getMonth() &&
      currentYear === HiringDate.getFullYear()
    )
      return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    const now = new Date();
    if (currentMonth === now.getMonth() && currentYear === now.getFullYear())
      return;
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const isHalfDay = (inTime, outTime) => {
    if (!inTime || !outTime) return false;

    const parseTime = (time) => {
      const [t, meridiem] = time.split(" ");
      const [hours, minutes] = t.split(":").map(Number);
      let h = meridiem === "PM" && hours !== 12 ? hours + 12 : hours;
      if (meridiem === "AM" && hours === 12) h = 0;
      return h * 60 + minutes;
    };

    const inMinutes = parseTime(inTime);
    const outMinutes = parseTime(outTime);
    const lateThreshold = parseTime("01:00 PM");
    const earlyThreshold = parseTime("06:30 PM");

    return inMinutes > lateThreshold || outMinutes < earlyThreshold;
  };

  const getAttendanceStatus = (day) => {
    const monthKey = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}`;
    const record = attendanceData[monthKey]?.[day.toString()];
    if (record?.status === "1" && isHalfDay(record.inTime, record.outTime)) {
      return { ...record, status: "HD" };
    }
    return record || null;
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const data = getAttendanceStatus(day);
      const status = data?.status;
      const isHiringDate =
        day === HiringDate.getDate() &&
        currentMonth === HiringDate.getMonth() &&
        currentYear === HiringDate.getFullYear();

      let className =
        "h-16 flex items-center justify-center border rounded-md flex-col text-sm cursor-pointer ";
      if (isHiringDate) {
        className += "bg-blue-100 border-blue-300 text-blue-800 font-semibold";
      } else if (status === "1") {
        className += "bg-green-100 text-green-700";
      } else if (status === "0") {
        className += "bg-red-100 text-red-700";
      } else if (status === "L") {
        className += "bg-yellow-100 text-yellow-700";
      } else if (status === "HD") {
        className += "bg-purple-100 text-purple-700";
      } else {
        className += "text-gray-700";
      }

      days.push(
        <div
          key={`day-${day}`}
          className={className}
          onClick={() => setSelectedDate({ day, data })}
        >
          <span>{day}</span>
          <span className="text-xs font-medium">
            {status === "1"
              ? "P"
              : status === "0"
              ? "A"
              : status === "L"
              ? "L"
              : status === "HD"
              ? "HD"
              : ""}
          </span>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Attendance Calendar</h2>
          <p className="text-sm text-gray-500">
            From{" "}
            {HiringDate.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="w-full lg:w-52 mt-6 lg:mt-0">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2"></div>
                Present (P)
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded mr-2"></div>
                Lob (A)
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded mr-2"></div>
                Leave (L)
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded mr-2"></div>
                Half Day (HD)
              </div>
            </div>
            {/* <div className="flex items-center mt-1">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-2"></div>
              Hiring Date
            </div> */}
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          disabled={
            currentMonth === HiringDate.getMonth() &&
            currentYear === HiringDate.getFullYear()
          }
          className={`p-2 rounded-full ${
            currentMonth === HiringDate.getMonth() &&
            currentYear === HiringDate.getFullYear()
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <FiChevronLeft size={20} />
        </button>

        <span className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>

        <button
          onClick={nextMonth}
          disabled={
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
          }
          className={`p-2 rounded-full ${
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-sm font-medium text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

      {/* Selected Day Details */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Selected Date Details</h3>
          <p className="text-base mb-4">
            {`${String(selectedDate.day).padStart(2, "0")}/${String(
              currentMonth + 1
            ).padStart(2, "0")}/${currentYear}`}
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-green-100 text-center p-3 rounded">
              <span className="font-medium">IN : </span>{" "}
              {selectedDate.data?.inTime || "NA"}
            </div>
            <div className="bg-red-100 text-center p-3 rounded">
              <span className="font-medium">OUT : </span>{" "}
              {selectedDate.data?.outTime || "NA"}
            </div>
            <div className="bg-yellow-100 p-3 text-center rounded">
              <span className="font-medium">Status : </span>{" "}
              {selectedDate.data?.status === "1"
                ? "Present"
                : selectedDate.data?.status === "0"
                ? "Lob"
                : selectedDate.data?.status === "L"
                ? selectedDate.data?.type || "Leave"
                : selectedDate.data?.status === "HD"
                ? "Half Day"
                : "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
