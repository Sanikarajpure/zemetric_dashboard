/* eslint-disable react/prop-types */
import React from "react";

const SmsViolations = ({ violations }) => {
  // Style based on the number of violations
  const getViolationStyle = (violations) => {
    if (violations === 0) return "bg-green-200 text-green-700";
    if (violations <= 5) return "bg-yellow-200 text-yellow-700";
    return "bg-red-200 text-red-700";
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <span className="mr-2 text-red-600">🚨</span>
        Rate Limit Violations (Last Hour)
      </h2>

      {violations > 0 ? (
        <div className={`p-4 rounded-lg ${getViolationStyle(violations)} mb-4`}>
          <div className="font-semibold text-lg">Violations: {violations}</div>
          <div className="text-sm">
            These violations occurred within the last hour. Please monitor usage
            to avoid issues.
          </div>
        </div>
      ) : (
        <div className="text-green-600 font-semibold">
          No violations in the last hour.
        </div>
      )}
    </div>
  );
};

export default SmsViolations;
