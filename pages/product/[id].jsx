import React, { useState } from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";

const Product = ({ pizza }) => {
   const [size, setSize] = useState(0);
   // const pizza = {
   //    id: 1,
   //    img: "/img/pizza.png",
   //    name: "CAMPAGNOLA",
   //    price: [19.9, 23.9, 27.9],
   //    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, libero.",
   // };
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
            <span className={styles.price}>${pizza.prices[size]}</span>
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
                        id="double"
                        name="double"
                        className={styles.checkbox}
                     />
                     <label htmlFor="double">{option.text}</label>
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
