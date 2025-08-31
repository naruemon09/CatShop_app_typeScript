import React, { useEffect, useState } from "react";
import CatCard from "./CatCard";
import Store from "../store/Store";
import axios from "axios";
import { useLocation } from "react-router-dom";
import type { IGetCats } from "../../Interface/ICats";

const Shop: React.FC = () => {
  const { token } = Store();
  const location = useLocation();
  const breedId = location.state?.breedid;
  const [cats, setCats] = useState<IGetCats[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const getCats = async () => {
      try {
        const response = await axios.get<IGetCats[]>("https://localhost:7092/api/Cats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response);
           const CatAvaliable = response.data.filter(
            (r) => r.catStatus === "ว่าง")
          if (breedId === null || breedId === undefined) {
            setCats(CatAvaliable);
          } else {
            const SelectBreed = CatAvaliable.filter(
            (r) => r.breedid === breedId)
            setCats(SelectBreed);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCats();
  }, [breedId]);

  const totalItems = cats.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCats = cats.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSort = (sortType: string) => {
    const sortedCats = [...cats];
    switch (sortType) {
      case "name-asc":
        sortedCats.sort((a, b) => a.catname.localeCompare(b.catname, "th"));
        break;
      case "name-desc":
        sortedCats.sort((a, b) => b.catname.localeCompare(a.catname, "th"));
        break;
      case "price-asc":
        sortedCats.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        sortedCats.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        break;
    }
    setCats(sortedCats);
};

  return (
      <div className="shopify-grid">
        <div className="container py-5 my-5">
          <main>
            <div className="filter-shop d-md-flex justify-content-between align-items-center">
              <div className="showing-product">
                <p className="m-0">
                  แสดง {startIndex + 1}–{Math.min(endIndex, totalItems)} จาก{" "}
                  {totalItems} ผลลัพธ์
                </p>
              </div>
              <div className="sort-by">
                <select className="filter-categories border-0 m-0"
                onChange={(e) => handleSort(e.target.value)}>
                  <option value="default">การเรียงลำดับเริ่มต้น</option>
                  <option value="name-asc">ชื่อ (ก - ฮ)</option>
                  <option value="name-desc">ชื่อ (ฮ - ก)</option>
                  <option value="price-asc">ราคา (ต่ำ-สูง)</option>
                  <option value="price-desc">ราคา (สูง-ต่ำ)</option>
                </select>
              </div>
            </div>

            <div className="product-grid row">
              {currentCats.map((item, index) => (
                <div key={index} className="col-md-3 my-4">
                  <CatCard item={item} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="navigation paging-navigation text-center mt-5"
                role="navigation"
              >
                <div className="pagination loop-pagination d-flex justify-content-center align-items-center">
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className="pagination-arrow d-flex align-items-center mx-3 btn btn-link"
                    style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"
                      ></path>
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`page-numbers mt-2 fs-3 mx-3 btn btn-link ${
                          currentPage === page ? "current" : ""
                        }`}
                        style={{
                          fontWeight: currentPage === page ? "bold" : "normal",
                          textDecoration: "none",
                        }}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className="pagination-arrow d-flex align-items-center mx-3 btn btn-link"
                    style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </nav>
            )}
          </main>
        </div>
      </div>
  );
};

export default Shop;
