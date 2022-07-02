import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
   console.log({ pizzaList });
   return (
      <div className={styles.container}>
         <h1 className={styles.title}>THE BEST PIZZA IN MASSALIA </h1>
         <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            necessitatibus velit eveniet iure, repellendus corrupti animi quos
            itaque expedita ratione!
         </p>
         <div className={styles.wrapper}>
            {pizzaList.map((pizza) => (
               <PizzaCard key={pizza._id} pizza={pizza} />
            ))}
         </div>
      </div>
   );
};

export default PizzaList;
