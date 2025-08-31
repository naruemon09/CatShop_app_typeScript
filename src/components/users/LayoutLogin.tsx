import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const LayoutLogin: React.FC = () => {

  const [page, setPage] = useState(false);

  return (
    <div>
      <section className="login-tabs padding-large">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="tabs-listing">
              <nav>
                <div className="nav nav-tabs d-flex justify-content-center border-dark-subtle mb-3">
                  <button
                    className={`nav-link mx-3 fs-3 border-bottom border-dark-subtle border-0 text-uppercase 
                    ${page === false && "active"}`}
                    type="button"
                    onClick={() => setPage(false)}
                  >
                    เข้าสู่ระบบ
                  </button>
                  <button
                    className={`nav-link mx-3 fs-3 border-bottom border-dark-subtle border-0 text-uppercase 
                    ${page === true && "active"}`}
                    type="button"
                    onClick={() => setPage(true)}
                  >
                    สมัครสมาชิก
                  </button>
                </div>
              </nav>
              <div className="tab-content">
                {page === false ? (
                  <div className="tab-pane fade active show">
                    <div className="col-lg-8 offset-lg-2 mt-5">
                      <p className="mb-0">เข้าสู่ระบบ</p>
                      <hr className="my-1" />
                      <Login />
                    </div>
                  </div>
                ) : (
                  <div className="tab-pane fade active show">
                    <div className="col-lg-8 offset-lg-2 mt-5">
                      <p className="mb-0">สมัครสมาชิก</p>
                      <hr className="my-1" />
                      <Register setPage={setPage} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LayoutLogin;
