import React from "react";
import CatCard from "./CatCard";

const Shop: React.FC = () => {
  return (
    <div>
      <div className="shopify-grid">
    <div className="container py-5 my-5">
      <div className="row flex-md-row-reverse g-md-5 mb-5">

        <main className="col-md-9">
          <div className="filter-shop d-md-flex justify-content-between align-items-center">
            <div className="showing-product">
              <p className="m-0">Showing 1–9 of 55 results</p>
            </div>
            <div className="sort-by">
              <select className="filter-categories border-0 m-0">
                <option value="">Default sorting</option>
                <option value="">Name (A - Z)</option>
                <option value="">Name (Z - A)</option>
                <option value="">Price (Low-High)</option>
                <option value="">Price (High-Low)</option>
                <option value="">Rating (Highest)</option>
                <option value="">Rating (Lowest)</option>
                <option value="">Model (A - Z)</option>
                <option value="">Model (Z - A)</option>
              </select>
            </div>
          </div>

          <div className="product-grid row ">
            <CatCard/>
            <CatCard/>
            <CatCard/>
          </div>

          <nav className="navigation paging-navigation text-center mt-5" role="navigation">
            <div className="pagination loop-pagination d-flex justify-content-center align-items-center">
              <a href="#" className="pagination-arrow d-flex align-items-center mx-3">
                <iconify-icon icon="ic:baseline-keyboard-arrow-left" className="pagination-arrow fs-1"></iconify-icon>
              </a>
              <span aria-current="page" className="page-numbers mt-2 fs-3 mx-3 current">1</span>
              <a className="page-numbers mt-2 fs-3 mx-3" href="#">2</a>
              <a className="page-numbers mt-2 fs-3 mx-3" href="#">3</a>
              <a href="#" className="pagination-arrow d-flex align-items-center mx-3">
                <iconify-icon icon="ic:baseline-keyboard-arrow-right" className="pagination-arrow fs-1"></iconify-icon>
              </a>
            </div>
          </nav>

        </main>
        <aside className="col-md-3 mt-5">
          <div className="sidebar">
            <div className="widget-menu">
              <div className="widget-search-bar">
                <div className="search-bar border rounded-2 border-dark-subtle pe-3">
                  <form id="search-form" className="text-center d-flex align-items-center" action="" method="">
                    <input type="text" className="form-control border-0 bg-transparent" placeholder="Search for products"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"></path>
                    </svg>
                  </form>
                </div>
              </div>
            </div>
            <div className="widget-product-categories pt-5">
              <h4 className="widget-title">Categories</h4>
              <ul className="product-categories sidebar-list list-unstyled">
                <li className="cat-item">
                  <a href="/collections/categories">All</a>
                </li>
                <li className="cat-item">
                  <a href="#" className="nav-link">Dogs</a>
                </li>
                <li className="cat-item">
                  <a href="#" className="nav-link">Food</a>
                </li>
                <li className="cat-item">
                  <a href="#" className="nav-link">Cats</a>
                </li>
                <li className="cat-item">
                  <a href="#" className="nav-link">Birds</a>
                </li>
              </ul>
            </div>
            <div className="widget-product-tags pt-3">
              <h4 className="widget-title">Tags</h4>
              <ul className="product-tags sidebar-list list-unstyled">
                <li className="tags-item">
                  <a href="#" className="nav-link">Pets</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">Clothes</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">Foods</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">Toys</a>
                </li>
              </ul>
            </div>
            <div className="widget-product-brands pt-3">
              <h4 className="widget-title">Brands</h4>
              <ul className="product-tags sidebar-list list-unstyled">
                <li className="tags-item">
                  <a href="#" className="nav-link">Denim</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">Puma</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">Klaws</a>
                </li>
              </ul>
            </div>
            <div className="widget-price-filter pt-3">
              <h4 className="widget-titlewidget-title">Filter By Price</h4>
              <ul className="product-tags sidebar-list list-unstyled">
                <li className="tags-item">
                  <a href="#" className="nav-link">Less than $10</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">$10- $20</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">$20- $30</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">$30- $40</a>
                </li>
                <li className="tags-item">
                  <a href="#" className="nav-link">$40- $50</a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
    </div>
  );
};

export default Shop;
