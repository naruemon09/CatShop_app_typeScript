import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateBreed: React.FC = () => {
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

  const onSubmit = async () => {
    try {
        console.log(breed)
    //   const response = await axios.post(
    //     "https://localhost:7092/api/Breeds/CreateBreeds",
    //     breeds,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log(response);
    //   if (response.data === "Create Success") {
    //     navigate("/breeds");
    //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">แก้ไขสายพันธุ๋</h2>
      </div>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="m-4">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">สายพันธุ์</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={breed.breedname}
                  onChange={(e) =>
                    setBreed({ ...breed, breedname: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="text-end">
                <button
                  className="btn btn-success me-2"
                  type="submit"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  บันทึก
                </button>
                <a href="/breeds" className="btn btn-danger">
                  ยกเลิก
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBreed;
