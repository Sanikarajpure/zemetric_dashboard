/* eslint-disable react/prop-types */
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SmsStats = ({ stats }) => {
  const data = {
    labels: ["Last Minute", "Today", "Yesterday"],
    datasets: [
      {
        label: "SMS Requests",
        data: [
          stats.requestsLastMinute,
          stats.requestsToday,
          stats.requestsLastDay,
        ],
        backgroundColor: "#2563EB",
        borderColor: "#2563EB",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} requests`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">SMS Statistics 📊</h2>
      <div className="mb-6">
        <Bar data={data} options={options} />
      </div>
      <div className="text-lg">
        <div>Requests in the last minute: {stats.requestsLastMinute}</div>
        <div>Requests today: {stats.requestsLastDay}</div>
      </div>
    </div>
  );
};

export default SmsStats;
