import React from 'react'

const Checkout: React.FC = () => {
  return (
    <section id="cart" className="my-5 py-5">
    <div className="container">
      <div className="row g-md-5">
        <div className="col-md-8 pe-md-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="card-title text-uppercase">Product</th>
                <th scope="col" className="card-title text-uppercase">Quantity</th>
                <th scope="col" className="card-title text-uppercase">Subtotal</th>
                <th scope="col" className="card-title text-uppercase"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row" className="py-4">
                  <div className="cart-info d-flex flex-wrap align-items-center ">
                    <div className="col-lg-3">
                      <div className="card-image">
                        <img src="/src/images/item1.jpg" alt="cloth" className="img-fluid"/>
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <div className="card-detail ps-3">
                        <h5 className="card-title">
                          <a href="#" className="text-decoration-none">Grey Hoodie</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="input-group product-qty align-items-center w-50">
                    <span className="input-group-btn">
                      <button type="button" className="quantity-left-minus btn btn-light btn-number" data-type="minus">
                        <svg width="16" height="16">
                          <use xlink:href="#minus"></use>
                        </svg>
                      </button>
                    </span>
                    <input type="text" id="quantity" name="quantity" className="form-control input-number text-center p-2 mx-1" value="1"/>
                    <span className="input-group-btn">
                      <button type="button" className="quantity-right-plus btn btn-light btn-number" data-type="plus" data-field="">
                        <svg width="16" height="16">
                          <use xlink:href="#plus"></use>
                        </svg>
                      </button>
                    </span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="total-price">
                    <span className="secondary-font fw-medium">$150.00</span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="cart-remove">
                    <a href="#">
                      <svg width="24" height="24">
                        <use xlink:href="#trash"></use>
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="row" className="py-4">
                  <div className="cart-info d-flex flex-wrap align-items-center ">
                    <div className="col-lg-3">
                      <div className="card-image">
                        <img src="/src/images/item9.jpg" alt="cloth" className="img-fluid"/>
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <div className="card-detail ps-3">
                        <h5 className="card-title">
                          <a href="#" className="text-decoration-none">Dog Food</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="input-group product-qty align-items-center w-50">
                    <span className="input-group-btn">
                      <button type="button" className="quantity-left-minus btn btn-light btn-number" data-type="minus">
                        <svg width="16" height="16">
                          <use xlink:href="#minus"></use>
                        </svg>
                      </button>
                    </span>
                    <input type="text" id="quantity" name="quantity" className="form-control input-number text-center p-2 mx-1" value="1"/>
                    <span className="input-group-btn">
                      <button type="button" className="quantity-right-plus btn btn-light btn-number" data-type="plus" data-field="">
                        <svg width="16" height="16">
                          <use xlink:href="#plus"></use>
                        </svg>
                      </button>
                    </span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="total-price">
                    <span className="secondary-font fw-medium">$90.00</span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="cart-remove">
                    <a href="#">
                      <svg width="24" height="24">
                        <use xlink:href="#trash"></use>
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="row" className="py-4">
                  <div className="cart-info d-flex flex-wrap align-items-center ">
                    <div className="col-lg-3">
                      <div className="card-image">
                        <img src="/src/images/item5.jpg" alt="cloth" className="img-fluid"/>
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <div className="card-detail ps-3">
                        <h5 className="card-title">
                          <a href="#" className="text-decoration-none">Cat Home</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="input-group product-qty align-items-center w-50">
                    <span className="input-group-btn">
                      <button type="button" className="quantity-left-minus btn btn-light btn-number" data-type="minus">
                        <svg width="16" height="16">
                          <use xlink:href="#minus"></use>
                        </svg>
                      </button>
                    </span>
                    <input type="text" id="quantity" name="quantity" className="form-control input-number text-center p-2 mx-1" value="1"/>
                    <span className="input-group-btn">
                      <button type="button" className="quantity-right-plus btn btn-light btn-number" data-type="plus" data-field="">
                        <svg width="16" height="16">
                          <use xlink:href="#plus"></use>
                        </svg>
                      </button>
                    </span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="total-price">
                    <span className="secondary-font fw-medium">$260.00</span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="cart-remove">
                    <a href="#">
                      <svg width="24" height="24">
                        <use xlink:href="#trash"></use>
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <div className="cart-totals">
            <h2 className="pb-4">Cart Total</h2>
            <div className="total-price pb-4">
              <table cellspacing="0" className="table text-uppercase">
                <tbody>
                  <tr className="subtotal pt-2 pb-2 border-top border-bottom">
                    <th>Subtotal</th>
                    <td data-title="Subtotal">
                      <span className="price-amount amount text-dark ps-5">
                        <bdi>
                          <span className="price-currency-symbol">$</span>1,500.00
                        </bdi>
                      </span>
                    </td>
                  </tr>
                  <tr className="order-total pt-2 pb-2 border-bottom">
                    <th>Total</th>
                    <td data-title="Total">
                      <span className="price-amount amount text-dark ps-5">
                        <bdi>
                          <span className="price-currency-symbol">$</span>1,500.00</bdi>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="button-wrap row g-2">
              <div className="col-md-6"><button className="btn btn-dark btn-lg rounded-1 fs-6 p-3 w-100">Update Cart</button>
              </div>
              <div className="col-md-6"><button className="btn btn-dark btn-lg rounded-1 fs-6 p-3 w-100">Continue To
                  Shop</button></div>
              <div className="col-md-12"><a href="checkout.html" className="btn btn-primary p-3 text-uppercase rounded-1 w-100">Proceed to checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Checkout