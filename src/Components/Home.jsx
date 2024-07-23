import React, { useContext } from "react";
import { ProductContext } from "../ProductProvider";
import { Link } from "react-router-dom";
import OtherService from "./OtherService";

const products = [
  { id: 1, name: "Product 1", price: 100, lable:"Xclusive"},
  { id: 2, name: "Product 2", price: 150 },
  { id: 3, name: "Product 3", price: 200 },
];

function Home() {
  const { addToCart } = useContext(ProductContext);

  return (
    <div>
      <section className="products-section pt-[40px]">
        <header className="flex flex-col items-center">
          <h2>Featured Products</h2>
          <h1>BESTSELLER PRODUCTS</h1>
          <p>Make your choice based on popular demand...</p>
        </header>
        <div>
          <ul className="flex">
            {products.map((product) => (
              <div key={product.id} className="w-[232.69px]">
                <img src={product.img} alt="product img" />
                <div className="bg-white w-[100%]">
                        <h1 className="text-[#011309]">{product.name}</h1>
                        <h2 className="text-[#135B3A]">{product.lable}</h2>
                        <h3>Description:{product.description}</h3>
                        <p>Size:{product.size}</p>
                        <span>Color: { product.color}</span>
                        <p>${product.price}</p>
                        <button className="bg-[#A37E2C]" onClick={() => addToCart(product)}>Order now</button>
                </div>

               
              </div>
            ))}
          </ul>
          <Link to="/cart">Go to Cart</Link>
        </div>
      </section>

      <section className="achievements-section">
        <div>
          <h2>ACHIEVEMENTS</h2>
          <h1>THE BEST SERVICES</h1>
        </div>
        <main className="achievements-content">
          <span>
            <img src="" alt="Service 1" />
            <h4>Service 1</h4>
            <p>Description of Service 1</p>
          </span>
          <span>
            <img src="" alt="Service 2" />
            <h4>Service 2</h4>
            <p>Description of Service 2</p>
          </span>
          <span>
            <img src="" alt="Service 3" />
            <h4>Service 3</h4>
            <p>Description of Service 3</p>
          </span>
        </main>
      </section>

      <section>
        <OtherService />
      </section>
    </div>
  );
}

export default Home;
