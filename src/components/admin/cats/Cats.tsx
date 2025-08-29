import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import type { IGetCats } from "../../../Interface/ICats";
import { NumericFormat } from "react-number-format";


const Cats: React.FC = () => {
  const { token } = Store();
  const [cats, setCats] = useState<IGetCats[]>([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get("https://localhost:7092/api/Cats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response);
          setCats(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBreeds();
  }, []);

  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Cats Management</h2>
        <a href="/addcats" className="btn btn-warning">
          + Add New Cat
        </a>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Images</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {cats.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`https://localhost:7092/api/Cats/Image/${item.images}`}
                      style={{ width: "80px", height: "80px" }}
                    />
                  </td>
                  <td>{item.catname}</td>
                  <td>{item.breedname}</td>
                  <td>{item.gender === "0" ? "Male" : "Female"}</td>
                  <td>
                    <NumericFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </td>
                  <td
                    className={`m-2 ${
                      item.catStatus === "Avaliable"
                        ? "badge bg-success"
                        : item.catStatus === "Adopted"
                        ? "badge bg-info"
                        : item.catStatus === "Sick"
                        ? "badge bg-warning"
                        : item.catStatus === "Death"
                        ? "badge bg-danger"
                        : "badge bg-secondary"
                    }`}
                    style={{
                      color:
                        item.catStatus === "Avaliable"
                          ? "#198754"
                          : item.catStatus === "Adopted"
                          ? "#0dcaf0"
                          : item.catStatus === "Sick"
                          ? "#ffc107"
                          : item.catStatus === "Death"
                          ? "#dc3545"
                          : "#6c757d",
                    }}
                  >
                    {item.catStatus}
                  </td>
                  <td>
                    <a
                      href={`/cats/${item.catId}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      View
                    </a>
                    <a
                      href={`/updateCats/${item.catId}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </a>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cats;
