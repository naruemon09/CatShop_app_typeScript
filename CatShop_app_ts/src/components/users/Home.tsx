import React from 'react'
import CatCard from './CatCard'

const Home: React.FC = () => {
  return (
    <div>
            <section id="banner" style={{background: '#F9F3EC'}}>
                <div className="container">
                    <div className="swiper main-swiper">
                        <div className="swiper-wrapper">

                            <div className="swiper-slide py-5">
                                <div className="row banner-content align-items-center">
                                    <div className="img-wrapper col-md-5">
                                        <img src="/src/images/banner-img3.png" className="img-fluid"/>
                                    </div>
                                    <div className="content-wrapper col-md-7 p-5 mb-5">
                                        <div className="secondary-font text-primary text-uppercase mb-4">Save 10 - 20 % off</div>
                                        <h2 className="banner-title display-1 fw-normal">Best destination for <span className="text-primary">your
                                            pets</span>
                                        </h2>
                                        <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                                            shop now
                                            <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                                                <use xlink:href="#arrow-right"></use>
                                            </svg></a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide py-5">
                                <div className="row banner-content align-items-center">
                                    <div className="img-wrapper col-md-5">
                                        <img src="/src/images//banner-img3.png" className="img-fluid" />
                                    </div>
                                    <div className="content-wrapper col-md-7 p-5 mb-5">
                                        <div className="secondary-font text-primary text-uppercase mb-4">Save 10 - 20 % off</div>
                                        <h2 className="banner-title display-1 fw-normal">Best destination for <span className="text-primary">your
                                            pets</span>
                                        </h2>
                                        <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                                            shop now
                                            <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                                                <use xlink:href="#arrow-right"></use>
                                            </svg></a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide py-5">
                                <div className="row banner-content align-items-center">
                                    <div className="img-wrapper col-md-5">
                                        <img src="/src/images/banner-img4.png" className="img-fluid" />
                                    </div>
                                    <div className="content-wrapper col-md-7 p-5 mb-5">
                                        <div className="secondary-font text-primary text-uppercase mb-4">Save 10 - 20 % off</div>
                                        <h2 className="banner-title display-1 fw-normal">Best destination for <span className="text-primary">your
                                            pets</span>
                                        </h2>
                                        <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                                            shop now
                                            <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                                                <use xlink:href="#arrow-right"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-pagination mb-5"></div>
                    </div>
                </div>
            </section>
            <section id="categories">
            <div className="container my-3 py-5">
                <div className="row my-5">
                    <div className="col text-center">
                        <a href="#" className="categories-item">
                            <iconify-icon className="category-icon" icon="ph:bowl-food"></iconify-icon>
                            <h5>Foodies</h5>
                        </a>
                    </div>
                    <div className="col text-center">
                        <a href="#" class="categories-item">
                            <iconify-icon className="category-icon" icon="ph:bird"></iconify-icon>
                            <h5>Bird Shop</h5>
                        </a>
                    </div>
                    <div className="col text-center">
                        <a href="#" className="categories-item">
                            <iconify-icon className="category-icon" icon="ph:dog"></iconify-icon>
                            <h5>Dog Shop</h5>
                        </a>
                    </div>
                    <div className="col text-center">
                        <a href="#" className="categories-item">
                            <iconify-icon className="category-icon" icon="ph:fish"></iconify-icon>
                            <h5>Fish Shop</h5>
                        </a>
                    </div>
                    <div className="col text-center">
                        <a href="#" className="categories-item">
                            <iconify-icon className="category-icon" icon="ph:cat"></iconify-icon>
                            <h5>Cat Shop</h5>
                        </a>
                    </div>
                </div>
            </div>
        </section>
            <section id="clothing" className="my-5 overflow-hidden">
            <div className="container pb-5">

                <div className="section-header d-md-flex justify-content-between align-items-center mb-3">
                    <h2 className="display-3 fw-normal">Pet Clothing</h2>
                    <div>
                        <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                            shop now
                            <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                                <use xlink:href="#arrow-right"></use>
                            </svg></a>
                    </div>
                </div>

                <div className="products-carousel swiper">
                    <div className="swiper-wrapper">
                        <CatCard/>
                        <CatCard/>
                        <CatCard/>
                    </div>
                </div>
            </div>
        </section> 
        </div>
  )
}

export default Home