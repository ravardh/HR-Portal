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
    status: "Pending",
  });

  useEffect(() => {
    const storedLeaves = localStorage.getItem("leaveList");
    if (storedLeaves) {
      const parsedLeaves = JSON.parse(storedLeaves);
      setLeaveList(parsedLeaves);
      setHasAppliedLeave(parsedLeaves.length > 0);

      const usedLeaves = { Casual: 0, Annual: 0, Sick: 0 };
      parsedLeaves.forEach((leave) => {
        if (leave.status !== "Rejected") {
          const days =
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24) +
            1;
          if (leave.type in usedLeaves) usedLeaves[leave.type] += days;
        }
      });

      setLeaveBalances((prevBalances) => {
        const updatedBalances = { ...prevBalances };
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

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.type ||
      !formData.reason ||
      !formData.startDate ||
      !formData.endDate
    ) {
      return alert("Please fill all the fields.");
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start > end) {
      return alert("Start date cannot be after end date.");
    }

    const daysApplied = (end - start) / (1000 * 60 * 60 * 24) + 1;

    if (daysApplied > leaveBalances[formData.type]) {
      return alert(
        `You only have ${leaveBalances[formData.type]} ${
          formData.type
        } leave(s) remaining.`
      );
    }

    const newLeave = {
      id: Date.now(),
      ...formData,
    };

    setLeaveList([...leaveList, newLeave]);
    setLeaveBalances((prev) => ({
      ...prev,
      [formData.type]: prev[formData.type] - daysApplied,
    }));

    setShowModal(false);
    setFormData({
      type: "",
      reason: "",
      startDate: "",
      endDate: "",
      status: "Pending",
    });
    setHasAppliedLeave(true);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Approved":
        return `${baseClasses} bg-green-100 text-green-700`;
      case "Rejected":
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      type: "",
      reason: "",
      startDate: "",
      endDate: "",
      status: "Pending",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Leave Management
        </h1>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaveTypes.map((type) => (
          <div
            key={type}
            className="border border-gray-200 rounded-lg p-2 bg-white flex justify-center"
          >
            <p className=" font-semibold text-gray-800">
              {type} Leave : {leaveBalances[type]}/{totalLeaveDays[type]} Days
            </p>
          </div>
        ))}
      </div>

      {/* Apply Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleApplyClick}
          className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Apply for Leave
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-start p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Apply for Leave
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <input
                    name="reason"
                    value={formData.reason}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Brief reason for leave"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 text-sm font-medium px-5 py-2.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-800">Leave History</h3>
        </div>

        {leaveList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaveList.map((leave, index) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {leave.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(leave.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(leave.endDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {leave.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(leave.status)}>
                        {leave.status}
                      </span>
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
