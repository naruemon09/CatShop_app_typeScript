import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import type { IGetBreeds } from "../../../Interface/ICats";

const Breeds: React.FC = () => {

  const {token} = Store();
  const [breeds, setBreeds] = useState<IGetBreeds[]>([]);

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
  }, [breeds]);

  const handleDelete = async (breedid: string) => {
    try {
      const response = await axios.delete(
        `https://localhost:7092/api/Breeds/DeleteBreed/${breedid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">การจัดการสายพันธุ๋</h2>
        <a href="/addbreeds" className="btn btn-warning">+ เพิ่มสายพันธุ์ใหม่</a>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>สายพันธุ์</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            {breeds.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.breedname}</td>
                  <td>
                    <a href={`/breeds/${item.breedid}`} className="btn btn-sm btn-success me-2">
                      ดูข้อมูล
                    </a>
                    <a href={`/updateBreeds/${item.breedid}`} className="btn btn-sm btn-warning me-2">
                      แก้ไข
                    </a>
                    <button 
                      type="button"
                      onClick={() => handleDelete(item.breedid)}
                      className="btn btn-sm btn-danger">
                      ลบ
                    </button>
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
