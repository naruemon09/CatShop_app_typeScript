import React, { useEffect, useState } from "react";
import CatCard from "./CatCard";
import axios from "axios";
import Store from "../store/Store";
import type { IGetCats } from "../../Interface/ICats";

const Home: React.FC = () => {
  const { token } = Store();
  const image = [
    "src/images/banner-img3.png",
    "src/images/banner-img1.png",
    "src/images/banner-img5.png",
  ];

  const [cats, setCats] = useState<IGetCats[]>([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const response = await axios.get<IGetCats[]>("https://localhost:7092/api/Cats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const sortedCats = response.data.sort(
            (a, b) => new Date(b.addDateTime).getTime() - new Date(a.addDateTime).getTime()
          );
          setCats(sortedCats);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCats();
  }, []);

  return (
    <div>
      <section id="banner" style={{ background: "#F9F3EC" }}>
        <div className="container">
          <div className="swiper main-swiper">
            <div className="swiper-wrapper">
              {image.map((item) => (
                <div className="swiper-slide py-5">
                  <div className="row banner-content align-items-center">
                    <div className="img-wrapper col-md-5">
                      <img src={item} className="img-fluid" />
                    </div>
                    <div className="content-wrapper col-md-7 p-5 mb-5">
                      <div className="secondary-font text-primary text-uppercase mb-4">
                        ลดราคา 10–20% สำหรับแมวสุดโปรด
                      </div>
                      <h2 className="banner-title display-1 fw-normal">
                        จุดหมายปลายทางสำหรับ
                        <span className="text-primary">แมวสุดรัก</span>
                      </h2>
                      <a
                        href="/ร้านค้า"
                        className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                      >
                        ร้านค้า
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="mb-1 ms-2"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="clothing" className="my-5 overflow-hidden">
        <div className="container pb-5">
          <div className="section-header d-md-flex justify-content-between align-items-center mb-3">
            <h2 className="display-3 fw-normal">สัตว์เลี้ยง</h2>
            <div>
              <a
                href="/ร้านค้า"
                className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
              >
                ร้านค้า
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mb-1 ms-2"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="product-grid row">
              {cats.slice(0, 4).map((item, index) => (
                <div key={index} className="col-md-3 my-4">
                  <div className="z-1 position-absolute rounded-3 m-2 px-3 border border-dark-subtle">
                    ใหม่
                  </div>
                  <CatCard item={item} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
