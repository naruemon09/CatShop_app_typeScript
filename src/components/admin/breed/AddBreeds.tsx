import React, { useState } from "react";
import type { IBreeds } from "../../../Interface/ICats";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Store from "../../store/Store";



const AddBreeds: React.FC = () => {

  const {token} = Store();
  const navigate = useNavigate();
  const [breed, setBreed] = useState<IBreeds>({
    breedname: "",
  });

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7092/api/Breeds/CreateBreeds",
        breed,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data === "Create Success") {
        navigate("/breeds");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold">เพิ่มสายพันธุ์ใหม่</h2>
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
                <a href="/breeds" className="btn btn-danger">ยกเลิก</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBreeds;
