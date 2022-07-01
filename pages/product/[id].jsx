import React, { useState } from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/image";

const Product = () => {
   const [size, setSize] = useState(0);
   const pizza = {
      id: 1,
      img: "/img/pizza.png",
      name: "CAMPAGNOLA",
      price: [19.9, 23.9, 27.9],
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, libero.",
   };
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
            <h1 className={styles.title}>{pizza.name}</h1>
            <span className={styles.price}>${pizza.price[size]}</span>
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
               <div className={styles.ingredientsOption}>
                  <input
                     type="checkbox"
                     id="double"
                     name="double"
                     className={styles.checkbox}
                  />
                  <label htmlFor="double">double ingredient</label>
               </div>
               <div className={styles.ingredientsOption}>
                  <input
                     type="checkbox"
                     id="cheese"
                     name="cheese"
                     className={styles.checkbox}
                  />
                  <label htmlFor="cheese">cheese</label>
               </div>
               <div className={styles.ingredientsOption}>
                  <input
                     type="checkbox"
                     id="spicy"
                     name="spicy"
                     className={styles.checkbox}
                  />
                  <label htmlFor="spicy">spicy</label>
               </div>
               <div className={styles.ingredientsOption}>
                  <input
                     type="checkbox"
                     id="garlic"
                     name="garlic"
                     className={styles.checkbox}
                  />
                  <label htmlFor="garlic">garlic</label>
               </div>
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
