// slug is the unique identifier which belongs to each product
// [slug] indicates that it is going to be dynamic e.g: /product/headphones, /product/speaker
import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { client, urlFor } from "@/lib/client";
import { Product } from "@/components";
import { useStateContext } from "@/context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd } = useStateContext();

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>

          <div className="reviews">
            <div>
              {/* Calling same component 4 times */}
              {Array.from(Array(4), (_, i) => (
                <AiFillStar key={i} />
              ))}
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>

          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like:</h2>

        {/* Marquee essentially stands for scrolling part */}
        <div className="marquee">
          {/* track class is added for auto-scrolling */}
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// If we want to use getStaticProps, then we also have to include getStaticPaths
export const getStaticPaths = async () => {
  const query = `*[_type == 'product'] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// Another special next.js function which is used when we want to pre-render the page at build time
// using the props returned by getStaticProps
export const getStaticProps = async ({ params: { slug } }) => {
  // Used to fetch product details from the product page that we are on
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;

  const productsQuery = "*[_type == 'product']";

  const product = await client.fetch(query); //individual
  const products = await client.fetch(productsQuery); //all

  return {
    props: { product, products },
  };
};

export default ProductDetails;
