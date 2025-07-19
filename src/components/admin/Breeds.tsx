import React, { useEffect, useState } from "react";
import Store from "../store/Store";
import axios from "axios";


const Breeds: React.FC = () => {

  const {token} = Store();
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get("https://localhost:7092/api/Breeds", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response);
          setBreeds(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBreeds();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Breeds Management</h2>
        <a href="/addbreeds" className="btn btn-warning">+ Add New Breed</a>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Breeds Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            {breeds.map((item, index) => (
              <tbody>
                <tr key={item}>
                  <td>{index + 1}</td>
                  <td>{item.breedname}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2">
                      Edit
                    </button>
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

export default Breeds;
