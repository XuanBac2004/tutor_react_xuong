import React, { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import { Link } from "react-router-dom";

function Home() {
  const { state } = useContext(ProductContext);
  return (
    <>
      <h1>danh sach san pham</h1>
      
      <div className="row">
        {state && state.products && state.products.length > 0 ? (
          state.products.map(item => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <div>
                <Link to={`/data-detail/${item.id}`}>
                  <img src={item.thumbnail} width={"100px"} height={"200px"} alt="" />
                </Link>
                <div>
                  <Link to={`/data-detail/${item.id}`}>
                    <h2>{item.title}</h2>
                  </Link>
                  <p>{item.price}$</p>
                  <p>{item.description}</p>
                  <button className="btn btn-danger" width="100%">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
}

export default Home;
