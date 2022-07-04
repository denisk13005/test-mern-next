import React, { useEffect, useState } from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";

const Product = ({ pizza }) => {
   const [size, setSize] = useState(0);
   const [pizzaPrice, setPizzaPrice] = useState(pizza.prices[size]);
   const [extraOptions, setExtraOptions] = useState(0);

   const handleChange = (e, option) => {
      e.target.checked
         ? setExtraOptions(extraOptions + option.price)
         : setExtraOptions(extraOptions - option.price);
   };
   useEffect(() => {
      setPizzaPrice(pizza.prices[size] + extraOptions);
   }, [extraOptions, pizza.prices, size]);

   return (
      <div className={styles.container}>
         <div className={styles.left}>
            <div className={styles.imgContainer}>
               <Image
                  src={pizza.img}
                  layout="fill"
                  alt=""
                  objectFit="contain"
               />
            </div>
         </div>
         <div className={styles.right}>
            <h1 className={styles.title}>{pizza.title}</h1>
            <span className={styles.price}>${pizzaPrice}</span>
            <p className={styles.desc}>{pizza.desc}</p>
            <h3 className={styles.choose}>Choose the size</h3>
            <div className={styles.sizes}>
               <div className={styles.size} onClick={() => setSize(0)}>
                  <Image src="/img/size.png" alt="" layout="fill" />
                  <span className={styles.option}>Small</span>
               </div>
               <div className={styles.size} onClick={() => setSize(1)}>
                  <Image src="/img/size.png" alt="" layout="fill" />
                  <span className={styles.option}>Medium</span>
               </div>
               <div className={styles.size} onClick={() => setSize(2)}>
                  <Image src="/img/size.png" alt="" layout="fill" />
                  <span className={styles.option}>Large</span>
               </div>
            </div>
            <h3 className={styles.choose}>Choose additional ingredients</h3>
            <div className={styles.ingredients}>
               {pizza.extraOptions.map((option) => (
                  <div className={styles.ingredientsOption} key={option._id}>
                     <input
                        type="checkbox"
                        id={option.text}
                        name={option.text}
                        className={styles.checkbox}
                        onClick={(e) => handleChange(e, option)}
                     />
                     <label htmlFor={option.text}>{option.text}</label>
                  </div>
               ))}
            </div>
            <div className={styles.add}>
               <input
                  type="number"
                  defaultValue={1}
                  className={styles.quantity}
               />
               <button className={styles.button}>add to cart</button>
            </div>
         </div>
      </div>
   );
};

export default Product;
/**
 *
 * @param {object} params url params
 * @returns {object} pizza object
 */
export const getServerSideProps = async ({ params }) => {
   console.log("trst");
   console.log(params.id);
   const res = await axios.get(
      `http://localhost:3000/api/products/${params.id}`
   );
   return {
      props: {
         pizza: res.data,
      },
   };
};
