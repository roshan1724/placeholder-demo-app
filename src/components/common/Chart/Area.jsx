import "./Area.scss";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  aspectRatio: 3,
  scales: {
    y: {
      min: 0,
      max: 4,
      grid: {
        display: true,
        lineWidth: 1,
        color: "rgba(128, 128, 128, 0.3)",
      },
    },
    x: [
      {
        ticks: {
          callback: (label, index, labels) => {
            if (/\s/.test(label)) {
              return label.split(" ");
            }
            return label;
          },
        },
      },
    ],
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      titleColor: "#000",
      bodyColor: "#000",
    },
  },
};

const labels = [
  "Phase 1: Detect",
  "Phase 2: Respond",
  "Phase 3: Mitigate",
  "Phase 4: Lorem Ipsum",
  "Phase 5: Dolor Sit",
  "Phase 6: Amet",
  "Phase 7: Lorem",
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: `Smith Company Inc's Time`,
      data: [1.0, 1.1, 1.8, 2.3, 2.7, 3.6, 4.0],
      borderColor: "#9451B5",
      backgroundColor: "#9451B540",
    },
    {
      fill: true,
      label: "Average Peer Time",
      data: [0.4, 0.6, 1.0, 1.6, 2.1, 2.3, 3.0],
      borderColor: "#3598DB",
      backgroundColor: "#3598DB40",
    },
    {
      fill: true,
      label: "Fastest Possible Time",
      data: [0.2, 0.3, 0.4, 0.7, 1.0, 1.2, 1.6],
      borderColor: "#27AE61",
      backgroundColor: "#27AE6140",
    },
  ],
};

function Area() {
  return <Line options={options} data={data} width={"100%"} />;
}

export default Area;
