import React from "react";

const CatCard: React.FC = () => {
  return (
      <div className="col-md-4 my-4">
        <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
          New
        </div>
        <div className="card position-relative">
          <a href="single-product.html">
            <img
              src="/src/images/item1.jpg"
              className="img-fluid rounded-4"
              alt="image"
            />
          </a>
          <div className="card-body p-0">
            <a href="single-product.html">
              <h3 className="card-title pt-4 m-0">Grey hoodie</h3>
            </a>

            <div className="card-text">
              <span className="rating secondary-font">
                <iconify-icon
                  icon="clarity:star-solid"
                  className="text-primary"
                ></iconify-icon>
                <iconify-icon
                  icon="clarity:star-solid"
                  className="text-primary"
                ></iconify-icon>
                <iconify-icon
                  icon="clarity:star-solid"
                  className="text-primary"
                ></iconify-icon>
                <iconify-icon
                  icon="clarity:star-solid"
                  className="text-primary"
                ></iconify-icon>
                <iconify-icon
                  icon="clarity:star-solid"
                  className="text-primary"
                ></iconify-icon>
                5.0
              </span>

              <h3 className="secondary-font text-primary">$18.00</h3>

              <div className="d-flex flex-wrap mt-3">
                <a href="#" className="btn-cart me-3 px-4 pt-3 pb-3">
                  <h5 className="text-uppercase m-0">Add to Cart</h5>
                </a>
                <a href="#" className="btn-wishlist px-4 pt-3 ">
                  <iconify-icon
                    icon="fluent:heart-28-filled"
                    className="fs-5"
                  ></iconify-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CatCard;
