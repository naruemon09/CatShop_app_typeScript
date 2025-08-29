import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";

const Refund: React.FC = ({ orderId }) => {
  const { token } = Store();
  const [refund, setRefund] = useState();

  useEffect(() => {
    const getRefund = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7092/api/Orders/GetCancel/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setRefund(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRefund();
  }, []);

  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <div className="card bg-white p-4">
        <div>

        </div>
      </div>
    </div>
  );
};

export default Refund;
