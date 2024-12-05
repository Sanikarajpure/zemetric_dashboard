import React, { useState, useEffect } from "react";
import { sendSms, getSmsStats, getSmsViolations } from "../services/smsService";
import SmsStats from "./SmsStats";
import SmsViolations from "./SmsViolations";

const SmsSender = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [smsStats, setSmsStats] = useState({
    requestsLastMinute: 0,
    requestsLastDay: 0,
  });
  const [violations, setViolations] = useState(null);
  const [error, setError] = useState(null);

  // Fetch stats and violations whenever phone number changes
  useEffect(() => {
    const fetchStatsAndViolations = async () => {
      if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
        setSmsStats({ requestsLastMinute: 0, requestsLastDay: 0 });
        setViolations(null);
        setError(null);
        return;
      }

      try {
        setError(null); // Clear previous errors
        const [statsRes, violationsRes] = await Promise.all([
          getSmsStats(phoneNumber),
          getSmsViolations(phoneNumber),
        ]);

        setSmsStats(
          statsRes?.data || { requestsLastMinute: 0, requestsLastDay: 0 }
        );
        setViolations(violationsRes?.data?.violations || null);
      } catch (err) {
        console.error("Error fetching stats or violations:", err);
        setError("Failed to fetch stats or violations.");
      }
    };

    fetchStatsAndViolations();
  }, [phoneNumber]);

  const sendSmsHandler = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setResponse({ status: "Error", data: "Phone number is required." });
      return;
    }

    // Basic phone number validation
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setResponse({
        status: "Error",
        data: "Invalid phone number format. Must be 10 digits.",
      });
      return;
    }

    try {
      const res = await sendSms({
        phoneNumber,
        message,
      });
      setResponse(res);

      // Refetch stats and violations after sending an SMS
      const statsRes = await getSmsStats(phoneNumber);
      const violationsRes = await getSmsViolations(phoneNumber);
      setSmsStats(
        statsRes?.data || { requestsLastMinute: 0, requestsLastDay: 0 }
      );
      setViolations(violationsRes?.data?.violations || null);
    } catch (err) {
      setResponse({
        status: "Error",
        data: err.response?.data?.message || "An error occurred",
      });
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setResponse(""); // Clear response on phone number change
  };

  const isPhoneNumberValid = /^[0-9]{10}$/.test(phoneNumber);

  const getResponseStyle = (status) => {
    if (status === "Error") {
      return "bg-red-100 text-red-700 border border-red-500";
    }
    return "bg-green-100 text-green-700 border border-green-500";
  };

  return (
    <div className="p-4">
      <div className="flex justify-center py-2">
        <div className="text-[22px] font-semibold">Hello!👋🏼</div>
      </div>
      <form onSubmit={sendSmsHandler} className="grid gap-6">
        <div>
          <input
            type="text"
            value={phoneNumber || ""}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your phone number"
            required
            className="w-full rounded-md px-2 py-2 outline-none"
          />
        </div>
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Start typing a message..."
            required
            className="w-full rounded-md px-2 py-2 outline-none"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold w-fit p-3 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            Send SMS
          </button>
        </div>
      </form>
      {response && (
        <div
          className={`mt-4 p-4 rounded-lg ${getResponseStyle(
            response.status
          )} shadow-md`}
        >
          <p>
            <strong>Status:</strong> {response.status}
          </p>
          <p>
            <strong>Response:</strong> {response.data}
          </p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-500 rounded-lg">
          <p>Error: {error}</p>
        </div>
      )}

      {!isPhoneNumberValid && (
        <div className="mt-4 text-center">
          <p>Please enter your cell phone number to view stats.</p>
        </div>
      )}

      {isPhoneNumberValid && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SmsStats stats={smsStats} />
          <SmsViolations violations={violations} />
        </div>
      )}
    </div>
  );
};

export default SmsSender;
