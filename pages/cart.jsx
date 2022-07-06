import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
   const state = useSelector((state) => state.cart);
   console.log(state);
   const [totalPrice, setTotalPrice] = useState(0);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const calculTotalPrice = () => {
      let totalTab = [];
      let total = 0;
      state.products?.forEach((product) =>
         totalTab.push(product.pizzaPrice * product.quantity)
      );
      for (let i = 0; i < totalTab.length; i++) {
         total += totalTab[i];
      }
      setTotalPrice(total);
   };
   useEffect(() => {
      calculTotalPrice();
   }, [calculTotalPrice]);
   console.log(totalPrice);
   return (
      <div className={styles.container}>
         <div className={styles.left}>
            <table className={styles.table}>
               {/* ne pas oublier la balise tbody sinon erreur d'hydratation */}
               <tbody>
                  <tr className={styles.trTitle}>
                     <th>Product</th>
                     <th>Name</th>
                     <th>Extras</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th>Total</th>
                  </tr>
               </tbody>
               {state.products.map((product) => (
                  <tbody key={product._id}>
                     <tr className={styles.tr}>
                        <td>
                           <div className={styles.imgContainer}>
                              <Image
                                 src={product.pizza.img}
                                 layout="fill"
                                 objectFit="cover"
                                 alt=""
                              />
                           </div>
                        </td>
                        <td>
                           <span className={styles.name}>
                              {product.pizza.title}
                           </span>
                        </td>
                        <td>
                           <span className={styles.extras}>
                              {product.pizza.extraOptions.map((option) => (
                                 <span key={option._id}>{option.text} </span>
                              ))}
                           </span>
                        </td>
                        <td>
                           <span className={styles.price}>
                              ${product.pizzaPrice}
                           </span>
                        </td>
                        <td>
                           <span className={styles.quantity}>
                              {product.quantity}
                           </span>
                        </td>
                        <td>
                           <span className={styles.total}>
                              ${product.pizzaPrice * product.quantity}
                           </span>
                        </td>
                     </tr>
                  </tbody>
               ))}
            </table>
         </div>
         <div className={styles.right}>
            <div className={styles.wrapper}>
               <h2 className={styles.title}>CART TOTAL</h2>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Subtotal:</b>$
                  {totalPrice}
               </div>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Discount:</b>$0.00
               </div>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Total:</b>${totalPrice}
               </div>
               <button className={styles.button}>CHECKOUT NOW!</button>
            </div>
         </div>
      </div>
   );
};

export default Cart;
