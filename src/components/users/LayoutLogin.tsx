import React from "react";
import Login from "./Login";
import Register from "./Register";

const LayoutLogin: React.FC = () => {
    return (
        <div>
            <section className="login-tabs padding-large">
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className="tabs-listing">
                            <nav>
                                <div className="nav nav-tabs d-flex justify-content-center border-dark-subtle mb-3" id="nav-tab" role="tablist">
                                    <button className="nav-link mx-3 fs-3 border-bottom border-dark-subtle border-0 text-uppercase active" id="nav-sign-in-tab" data-bs-toggle="tab" data-bs-target="#nav-sign-in" type="button" role="tab" aria-controls="nav-sign-in" aria-selected="true">Log In</button>
                                    <button className="nav-link mx-3 fs-3 border-bottom border-dark-subtle border-0 text-uppercase" id="nav-register-tab" data-bs-toggle="tab" data-bs-target="#nav-register" type="button" role="tab" aria-controls="nav-register" aria-selected="false">Sign Up</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade active show" id="nav-sign-in" role="tabpanel" aria-labelledby="nav-sign-in-tab">
                                    <div className="col-lg-8 offset-lg-2 mt-5">
                                        <p className="mb-0">Log-In</p>
                                        <hr className="my-1"/>
                                        <Login />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-register" role="tabpanel" aria-labelledby="nav-register-tab">
                                    <div className="col-lg-8 offset-lg-2 mt-5">
                                        <p className="mb-0">Sign-Up</p>
                                        <hr className="my-1"/>
                                        <Register />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LayoutLogin;
