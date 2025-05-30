import React, { useState, useEffect } from "react";

const Leave = () => {
  const leaveTypes = ["Casual", "Annual", "Sick"];

  const totalLeaveDays = {
    Casual: 12,
    Annual: 12,
    Sick: 12,
  };

  const [leaveBalances, setLeaveBalances] = useState({
    Casual: 5,
    Annual: 10,
    Sick: 7,
  });

  const [showModal, setShowModal] = useState(false);
  const [leaveList, setLeaveList] = useState([]);
  const [hasAppliedLeave, setHasAppliedLeave] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    reason: "",
    startDate: "",
    endDate: "",
    hodStatus: "Pending",
    hrStatus: "Pending",
    document: null,
  });

  useEffect(() => {
    const storedLeaves = localStorage.getItem("leaveList");
    if (storedLeaves) {
      const parsedLeaves = JSON.parse(storedLeaves);
      setLeaveList(parsedLeaves);
      setHasAppliedLeave(parsedLeaves.length > 0);

      const usedLeaves = { Casual: 0, Annual: 0, Sick: 0 };
      parsedLeaves.forEach((leave) => {
        if (leave.hodStatus !== "Rejected" && leave.hrStatus !== "Rejected") {
          const days =
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24) +
            1;
          if (leave.type in usedLeaves) usedLeaves[leave.type] += days;
        }
      });

      setLeaveBalances(() => {
        const updatedBalances = {};
        for (const type of leaveTypes) {
          updatedBalances[type] = Math.max(
            totalLeaveDays[type] - usedLeaves[type],
            0
          );
        }
        return updatedBalances;
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leaveList", JSON.stringify(leaveList));
  }, [leaveList]);

  const resetForm = () => {
    setFormData({
      type: "",
      reason: "",
      startDate: "",
      endDate: "",
      hodStatus: "Pending",
      hrStatus: "Pending",
      document: null,
    });
  };

  const handleApplyClick = () => setShowModal(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, document: e.target.files[0] }));
  };

  const validateForm = () => {
    const { type, reason, startDate, endDate } = formData;

    if (!type || !reason || !startDate || !endDate) {
      alert("Please fill all the fields.");
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (start > end) {
      alert("Start date cannot be after end date.");
      return false;
    }

    if (type === "Casual") {
      const diffDays = (start - today) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) {
        alert("Casual leave must be applied at least 7 days in advance.");
        return false;
      }
    }

    const daysApplied = (end - start) / (1000 * 60 * 60 * 24) + 1;
    if (daysApplied > leaveBalances[type]) {
      alert(`You only have ${leaveBalances[type]} ${type} leave(s) remaining.`);
      return false;
    }

    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { startDate, endDate, type } = formData;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const daysApplied = (end - start) / (1000 * 60 * 60 * 24) + 1;

    const newLeave = {
      id: Date.now(),
      ...formData,
    };

    setLeaveList([...leaveList, newLeave]);
    setLeaveBalances((prev) => ({
      ...prev,
      [type]: prev[type] - daysApplied,
    }));

    setShowModal(false);
    resetForm();
    setHasAppliedLeave(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    return {
      Approved: `${base} bg-green-100 text-green-700`,
      Rejected: `${base} bg-red-100 text-red-700`,
      Pending: `${base} bg-gray-100 text-gray-700`,
    }[status];
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Leave Management</h1>

      {/* Leave Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaveTypes.map((type) => (
          <div key={type} className="p-4 bg-white shadow-sm rounded-lg border text-center">
            <p className="font-semibold text-gray-800">
              {type} Leave: {leaveBalances[type]}/{totalLeaveDays[type]} Days
            </p>
          </div>
        ))}
      </div>

      {/* Apply Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleApplyClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Apply for Leave
        </button>
      </div>

      {/* Modal Form */}
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
      {/* Modal Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Apply for Leave</h2>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-red-600 transition"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Modal Body */}
      <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
        {/* Leave Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Leave Type <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            name="reason"
            rows={3}
            value={formData.reason}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Brief description of the reason"
            required
          ></textarea>
        </div>

        {/* Start Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Document Upload for Sick Leave */}
        {formData.type === "Sick" && (
          <div>
            <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
              Medical Document <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Leave History */}
      <div className="bg-white rounded-lg shadow-sm border mt-8 overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-medium text-gray-800">Leave History</h3>
        </div>

        {leaveList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Start</th>
                  <th className="px-6 py-3">End</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">HOD</th>
                  <th className="px-6 py-3">HR</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {leaveList.map((leave, index) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{leave.type}</td>
                    <td className="px-6 py-4">{formatDate(leave.startDate)}</td>
                    <td className="px-6 py-4">{formatDate(leave.endDate)}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{leave.reason}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(leave.hodStatus)}>{leave.hodStatus}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(leave.hrStatus)}>{leave.hrStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {hasAppliedLeave
              ? "No leave records available"
              : "You haven't applied for any leave yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leave;
