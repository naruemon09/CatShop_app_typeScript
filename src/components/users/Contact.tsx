import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="container py-5 my-5">
      <div className="row">
        <div className="contact-info col-lg-6 pb-3">
          <h2 className="text-dark">Contact Information</h2>
          <p>
            Tortor dignissim convallis aenean et tortor at risus viverra
            adipiscing.
          </p>
          <div className="page-content d-flex flex-wrap mt-5">
            <div className="col-lg-6 col-sm-12">
              <div className="content-box text-dark pe-4 mb-5">
                <h4 className="card-title">Office</h4>
                <div className="contact-address pt-3">
                  <p>730 Glenstone Ave 65802, Springfield, US</p>
                </div>
                <div className="contact-number">
                  <p>
                    <a href="#">+123 987 321</a>
                  </p>
                  <p>
                    <a href="#">+123 123 654</a>
                  </p>
                </div>
                <div className="email-address">
                  <p>
                    <a href="#">contact@website.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="content-box">
                <h4 className="card-title">Management</h4>
                <div className="contact-address pt-3">
                  <p>730 Glenstone Ave 65802, Springfield, US</p>
                </div>
                <div className="contact-number">
                  <p>
                    <a href="#">+123 987 321</a>
                  </p>
                  <p>
                    <a href="#">+123 123 654</a>
                  </p>
                </div>
                <div className="email-address">
                  <p>
                    <a href="#">contact@website.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
