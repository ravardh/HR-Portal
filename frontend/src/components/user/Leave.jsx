import React, { useState, useEffect } from "react";

const Leave = () => {
  const leaveTypes = ["Casual", "Annual", "Sick"];
  const totalLeaveDays = Object.fromEntries(leaveTypes.map(type => [type, 12]));

  const [leaveBalances, setLeaveBalances] = useState({ Casual: 5, Annual: 10, Sick: 7 });
  const [showModal, setShowModal] = useState(false);
  const [leaveList, setLeaveList] = useState([]);
  const [hasAppliedLeave, setHasAppliedLeave] = useState(false);

  const initialFormData = {
    type: "",
    reason: "",
    startDate: "",
    endDate: "",
    hodStatus: "Pending",
    hrStatus: "Pending",
    document: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const storedLeaves = JSON.parse(localStorage.getItem("leaveList")) || [];
    setLeaveList(storedLeaves);
    setHasAppliedLeave(storedLeaves.length > 0);

    const usedLeaves = Object.fromEntries(leaveTypes.map(type => [type, 0]));

    storedLeaves.forEach(({ type, startDate, endDate, hodStatus, hrStatus }) => {
      if (hodStatus !== "Rejected" && hrStatus !== "Rejected") {
        const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
        usedLeaves[type] += days;
      }
    });

    const updatedBalances = Object.fromEntries(
      leaveTypes.map(type => [type, Math.max(totalLeaveDays[type] - usedLeaves[type], 0)])
    );

    setLeaveBalances(updatedBalances);
  }, []);

  useEffect(() => {
    localStorage.setItem("leaveList", JSON.stringify(leaveList));
  }, [leaveList]);

  const resetForm = () => setFormData(initialFormData);

  const handleFormChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, document: e.target.files[0] }));
  };

  const validateForm = () => {
    const { type, reason, startDate, endDate, document } = formData;
    if (!type || !reason || !startDate || !endDate) return alert("Please fill all the fields.") || false;

    if (type === "Sick") {
      const start = new Date(startDate), end = new Date(endDate), today = new Date();
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (start > end) return alert("Start date cannot be after end date.") || false;

      const daysApplied = (end - start) / (1000 * 60 * 60 * 24) + 1;

      if (daysApplied > leaveBalances[type]) {
        return alert(`You only have ${leaveBalances[type]} ${type} leave(s) remaining.`) || false;
      }

      if (daysApplied > 3 && !document) {
        return alert("Please upload a supporting document for sick leave more than 3 days.") || false;
      }
    }

    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { type, startDate, endDate } = formData;
    const start = new Date(startDate), end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const daysApplied = (end - start) / (1000 * 60 * 60 * 24) + 1;

    setLeaveList(prev => [...prev, { id: Date.now(), ...formData }]);
    setLeaveBalances(prev => ({ ...prev, [type]: prev[type] - daysApplied }));

    setShowModal(false);
    resetForm();
    setHasAppliedLeave(true);
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    return {
      Approved: `${base} bg-green-100 text-green-700`,
      Rejected: `${base} bg-red-100 text-red-700`,
      Pending: `${base} bg-gray-100 text-gray-700`,
    }[status];
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric"
  });

  const shouldShowDocumentField = () => {
    const { type, startDate, endDate } = formData;
    if (type !== "Sick" || !startDate || !endDate) return false;
    const start = new Date(startDate), end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return (end - start) / (1000 * 60 * 60 * 24) + 1 > 3;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Leave Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaveTypes.map(type => (
          <div key={type} className="p-4 bg-white shadow-sm rounded-lg border text-center">
            <p className="font-semibold text-gray-800">
              {type} Leave: {leaveBalances[type]}/{totalLeaveDays[type]} Days
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Apply for Leave
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Apply for Leave</h2>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="text-gray-400 hover:text-red-600 transition"
                aria-label="Close"
              >✕</button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  {leaveTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['startDate', 'endDate'].map(dateType => (
                  <div key={dateType}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dateType === 'startDate' ? 'Start Date' : 'End Date'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name={dateType}
                      value={formData[dateType]}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                ))}
              </div>

              {shouldShowDocumentField() && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supporting Document <span className="text-red-500">*</span>
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

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >Cancel</button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                >Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                {leaveList.map(({ id, type, startDate, endDate, reason, hodStatus, hrStatus }, index) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{type}</td>
                    <td className="px-6 py-4">{formatDate(startDate)}</td>
                    <td className="px-6 py-4">{formatDate(endDate)}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{reason}</td>
                    <td className="px-6 py-4"><span className={getStatusBadge(hodStatus)}>{hodStatus}</span></td>
                    <td className="px-6 py-4"><span className={getStatusBadge(hrStatus)}>{hrStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {hasAppliedLeave ? "No leave records available" : "You haven't applied for any leave yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leave;
