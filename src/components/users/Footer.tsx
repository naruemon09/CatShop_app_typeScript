import React from 'react'

const Footer: React.FC = () => {
    return (
        <div>
            <section id="insta" className="my-3">
                <div className="row g-0 py-5">
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src="/src/images/insta1.jpg" alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src="/src/images/insta2.jpg" alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon class="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src="/src/images/insta3.jpg" alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src="/src/images/insta4.jpg" alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon class="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src="/src/images/insta5.jpg" alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src="/src/images/insta6.jpg" alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                </div>
            </section>
            <footer id="footer" className="my-5">
                <div className="container py-5 my-5">
                    <div className="row">

                        <div className="col-md-3">
                            <div className="footer-menu">
                                <img src="/src/images/cat_logo.png" alt="logo" />
                                <p className="blog-paragraph fs-6 mt-3">Subscribe to our newsletter to get updates about our grand offers.</p>
                                <div className="social-links">
                                    <ul className="d-flex list-unstyled gap-2">
                                        <li className="social">
                                            <a href="#">
                                                <iconify-icon className="social-icon" icon="ri:facebook-fill"></iconify-icon>
                                            </a>
                                        </li>
                                        <li className="social">
                                            <a href="#">
                                                <iconify-icon className="social-icon" icon="ri:twitter-fill"></iconify-icon>
                                            </a>
                                        </li>
                                        <li className="social">
                                            <a href="#">
                                                <iconify-icon className="social-icon" icon="ri:pinterest-fill"></iconify-icon>
                                            </a>
                                        </li>
                                        <li className="social">
                                            <a href="#">
                                                <iconify-icon className="social-icon" icon="ri:instagram-fill"></iconify-icon>
                                            </a>
                                        </li>
                                        <li className="social">
                                            <a href="#">
                                                <iconify-icon className="social-icon" icon="ri:youtube-fill"></iconify-icon>
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-menu">
                                <h3>Quick Links</h3>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">Home</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">About us</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">Offer </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">Services</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">Conatct Us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-menu">
                                <h3>Help Center</h3>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">FAQs</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">Payment</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">Returns & Refunds</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">Checkout</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link">Delivery Information</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <h3>Our Newsletter</h3>
                                <p className="blog-paragraph fs-6">Subscribe to our newsletter to get updates about our grand offers.</p>
                                <div className="search-bar border rounded-pill border-dark-subtle px-2">
                                    <form className="text-center d-flex align-items-center" action="" method="">
                                        <input type="text" className="form-control border-0 bg-transparent" placeholder="Enter your email here" />
                                        <iconify-icon className="send-icon" icon="tabler:location-filled"></iconify-icon>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>

            {/* <div id="footer-bottom">
                <div class="container">
                    <hr class="m-0" />
                    <div class="row mt-3">
                        <div class="col-md-6 copyright">
                            <p class="secondary-font">© 2023 Waggy. All rights reserved.</p>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p class="secondary-font">Free HTML Template by <a href="https://templatesjungle.com/" target="_blank"
                                class="text-decoration-underline fw-bold text-black-50"> TemplatesJungle</a> </p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Footer