import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="container py-5 my-5">
      <div className="row">
        <div className="contact-info col-lg-6 pb-3">
          <h2 className="text-dark">ข้อมูลการติดต่อ</h2>
          <p>ตกแต่งและจัดการพื้นที่อย่างเหมาะสมเพื่อความสะดวกและประสิทธิภาพ</p>
          <div className="page-content d-flex flex-wrap mt-5">
            <div className="col-lg-5 col-sm-12">
              <div className="content-box text-dark pe-4 mb-5">
                <h4 className="card-title">สำนักงาน</h4>
                <div className="contact-address pt-3">
                  <p>
                    123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110
                  </p>
                </div>
                <div className="contact-number">
                  <p>
                    <a href="#">+66 2 123 4567</a>
                  </p>
                  <p>
                    <a href="#">+66 81 234 5678</a>
                  </p>
                </div>
                <div className="email-address">
                  <p>
                    <a href="#">office@website.co.th</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-sm-12">
              <div className="content-box">
                <h4 className="card-title">ฝ่ายบริหาร</h4>
                <div className="contact-address pt-3">
                  <p>
                    123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110
                  </p>
                </div>
                <div className="contact-number">
                  <p>
                    <a href="#">+66 2 765 4321</a>
                  </p>
                  <p>
                    <a href="#">+66 89 876 5432</a>
                  </p>
                </div>
                <div className="email-address">
                  <p>
                    <a href="#">management@website.co.th</a>
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
