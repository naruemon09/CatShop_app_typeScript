import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { IGetOrder } from "../../../Interface/IOrder";
import axios from "axios";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const SalesTrend: React.FC = () => {
  const { token } = Store();

  const [orders, setOrders] = useState<IGetOrder[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7092/api/Orders/Sales",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const data = {
    labels: orders.map((item) => new Date(item.date).toDateString()),
    datasets: [
      {
        label: "Sales (baht)",
        data: orders.map((item) => item.totalSales),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.3,
        
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card bg-white w-100 h-100 me-3">
      <div className="card-body">
        <h3>ยอดขาย</h3>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesTrend;
