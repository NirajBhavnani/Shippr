// slug is the unique identifier which belongs to each product
// [slug] indicates that it is going to be dynamic e.g: /product/headphones, /product/speaker
import React from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { client, urlFor } from "@/lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
          {/* <div className="small-images-container">
            {image?.map((item, index) => (
              <img src={urlFor(item)} className="" onMouseEnter="" />
            ))}
          </div> */}
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>

          <div className="reviews">
            <div>
              {/* Calling same component 4 times */}
              {Array(4).fill(<AiFillStar />)}
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
              <span className="minus" onClick="">
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                0
              </span>
              <span className="plus" onClick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick="">
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
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
