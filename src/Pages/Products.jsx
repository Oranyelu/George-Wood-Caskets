import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../assets/product-api'; // Importing the product data
import Services from '../assets/service-api'; // Importing the service data
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useContext } from 'react';
import { ProductContext } from '../ProductProvider';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { productData } = Products;
  const { servicesData } = Services;
  const { addToCart } = useContext(ProductContext);

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = productData.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, productData]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className='bg-custom-gradient min-h-screen flex flex-col font-montserrat'>
      <section>
        <Header />
      </section>
      <section className='mt-16 p-4'>
        <h1 className='text-4xl font-bold'>{product.name}</h1>
        <img src={product.images[0]} alt={product.name} className='w-full h-auto mt-4' />
        <p className='mt-4'>{product.description}</p>
        <p>Color: {product.color}</p>
        <p>Price: ${product.price}</p>
        <button 
          className="bg-[#A37E2C] text-white px-4 py-2 mt-4 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
          onClick={() => addToCart(product)}
        >
          Order Now
        </button>
      </section>
      
      <section className='mt-8 p-4'>
        <h1 className='text-2xl font-bold mb-4'>You May Also Like</h1>
        <div className='flex flex-wrap gap-4'>
          {productData.slice(0, 5).map((item) => (
            <div key={item.id} className='w-[200px] bg-white border border-gray-200 p-4 rounded-lg'>
              <img src={item.thumbnail} alt={item.name} className='w-full h-auto object-cover' />
              <h2 className='text-lg font-semibold'>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <button 
                className="bg-[#A37E2C] text-white px-4 py-2 mt-2 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                onClick={() => addToCart(item)}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>
      
      <section className='mt-8 p-4'>
        <h1 className='text-2xl font-bold mb-4'>Services You May Like</h1>
        <div className='flex flex-wrap gap-4'>
          {servicesData.slice(0, 5).map((service) => (
            <div key={service.id} className='w-[200px] bg-white border border-gray-200 p-4 rounded-lg'>
              <img src={service.thumbnail} alt={service.name} className='w-full h-auto object-cover' />
              <h2 className='text-lg font-semibold'>{service.name}</h2>
              <p>Price: {service.price.toLocaleString()} NGN</p>
              <button 
                className="bg-[#A37E2C] text-white px-4 py-2 mt-2 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                onClick={() => addToCart(service)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ProductDetail;
