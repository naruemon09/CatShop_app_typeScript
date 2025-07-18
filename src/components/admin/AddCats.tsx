import React from "react";

const AddCats = () => {
  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold">Add Cats</h2>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="m-4">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">ID Number</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Breed</label>
              <div className="col-sm-10">
                <div className="dropdown">
                  <button
                    className="form-control dropdown-toggle"
                    style={{ width: "auto" }}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" type="button">
                        Dropdown item
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        Dropdown item
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        Dropdown item
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Catdetails</label>
              <div className="col-sm-10">
                <textarea className="form-control" />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Birthdate</label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  style={{ width: "auto" }}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Gender</label>
              <div className="col-sm-10">
                <input type="radio" />
                <label className="px-2">Male</label>
                <input type="radio" />
                <label className="px-2">Female</label>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Size</label>
              <div className="col-sm-10">
                <ul className="select-list list-unstyled d-flex">
                  <li data-value="S" className="select-item pe-3">
                    <a href="#" className="btn btn-light">S</a>
                  </li>
                  <li data-value="M" className="select-item pe-3">
                    <a href="#" className="btn btn-light">M</a>
                  </li>
                  <li data-value="L" className="select-item pe-3">
                    <a href="#" className="btn btn-light">L</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Image</label>
              <div className="col-sm-10">
                <input type="file" className="form-control" />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Price</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "auto" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="text-end">
                <button className="btn btn-success me-2">Save</button>
                <button className="btn btn-danger">Cancle</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCats;
