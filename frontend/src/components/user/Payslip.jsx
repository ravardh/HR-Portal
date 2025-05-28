import React, { useState } from "react";
import { Download } from "lucide-react";

const joinYear = 2025; // Start from 2025
const currentYear = new Date().getFullYear();

const payslipData = {
  2025: ["January", "February", "March", "April", "May"],
  2026: ["January"], // Example for future
};

const allMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const PayslipTable = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Generate dynamic year list from joinYear to currentYear
  const years = [];
  for (let year = joinYear; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payslips</h2>

      {/* Year Dropdown */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mr-3">Select Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Payslip Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
        {allMonths.map((month) => {
          const isAvailable =
            payslipData[selectedYear]?.includes(month) ?? false;
          const pdfUrl = `/payslips/Payslip_${month}_${selectedYear}.pdf`;

          const content = (
            <div className="p-4 bg-white border rounded-lg shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition cursor-pointer">
              <span className="font-medium text-gray-800 mb-2">{month}</span>
              {isAvailable ? (
                <Download className="w-5 h-5 text-blue-600" />
              ) : (
                <span className="text-xs text-gray-400">Not Available</span>
              )}
            </div>
          );

          return isAvailable ? (
            <a
              key={month}
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {content}
            </a>
          ) : (
            <div key={month}>{content}</div>
          );
        })}
      </div>
    </div>
  );
};

export default PayslipTable;
