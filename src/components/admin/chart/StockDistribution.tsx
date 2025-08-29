import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import type { IGetOrder } from "../../../Interface/IOrder";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const StockDistribution: React.FC = () => {
  const { token } = Store();

  const [cats, setCats] = useState<IGetOrder[]>([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7092/api/Cats/CatStock",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setCats(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCats();
  }, []);

  const data = {
    labels: cats.map((item) => item.breed),
    datasets: [
      {
        label: "Count",
        data: cats.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

 

  return (
    <div className="card bg-white w-100 h-100 me-3">
      <div className="card-body">
        <h3>Cat Stock Distribution</h3>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default StockDistribution;
