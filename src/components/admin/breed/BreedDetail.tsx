import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import { useParams } from "react-router-dom";

const BreedDetail: React.FC = () => {
  const { breedid } = useParams();
  const { token } = Store();
  const [breed, setBreed] = useState({
    breedid: "",
    breedname: ""
  });

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7092/api/Breeds/GetBreedById/${breedid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setBreed(response.data);
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
        <h2 className="fw-bold">Breeds Detail</h2>
      </div>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="m-4">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Breed ID</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  value={breed.breedid}
                  disabled
                  onChange={(e) =>
                    setBreed({ ...breed, breedid: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Breed Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  disabled
                  value={breed.breedname}
                  onChange={(e) =>
                    setBreed({ ...breed, breedname: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedDetail;
