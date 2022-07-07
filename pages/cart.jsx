import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
   PayPalScriptProvider,
   PayPalButtons,
   usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Cart = () => {
   //state
   const state = useSelector((state) => state.cart);
   const [totalPrice, setTotalPrice] = useState(0);

   //to open the paypal payment btn after click on checkout now
   const [open, setOpen] = useState(false);
   //paypal
   const amount = totalPrice;
   const currency = "USD";
   const style = { layout: "vertical" };
   console.log(open);

   // Custom component to wrap the PayPalButtons and handle currency changes
   const ButtonWrapper = ({ currency, showSpinner }) => {
      // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
      // This is the main reason to wrap the PayPalButtons in a new component
      const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

      useEffect(() => {
         dispatch({
            type: "resetOptions",
            value: {
               ...options,
               currency: currency,
            },
         });
      }, [currency, dispatch]);

      return (
         <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
               style={style}
               disabled={false}
               forceReRender={[amount, currency, style]}
               fundingSource={undefined}
               createOrder={(data, actions) => {
                  return actions.order
                     .create({
                        purchase_units: [
                           {
                              amount: {
                                 currency_code: currency,
                                 value: amount,
                              },
                           },
                        ],
                     })
                     .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                     });
               }}
               onApprove={function (data, actions) {
                  return actions.order.capture().then(function (details) {
                     console.log(details);
                     // const shipping = details.purchase_units[0].shipping;
                     // createOrder({
                     //    customer: shipping.name.full_name,
                     //    address: shipping.address.address_line_1,
                     //    total: cart.total,
                     //    method: 1,
                     // });
                  });
               }}
            />
         </>
      );
   };

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
               {open ? (
                  <div className={styles.paymentMethods}>
                     <button className={styles.payButton}>
                        Paiement à la réception
                     </button>
                     <PayPalScriptProvider
                        options={{
                           "client-id":
                              "Adm4k9ktEzorAxcfVNlQCQ7USWKmD5bhkDMPM_ti-btU8xCCklpdWv6DGDMCM7qY9r9oQOEaf90JWlGq",
                           components: "buttons",
                           currency: "USD",
                           "disable-funding": "credit,card,p24", //désactive les méthodes de paiement citées
                        }}
                     >
                        <ButtonWrapper
                           currency={currency}
                           showSpinner={false}
                        />
                     </PayPalScriptProvider>
                  </div>
               ) : (
                  <button
                     className={styles.button}
                     onClick={() => setOpen(true)}
                  >
                     CHECKOUT NOW!
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default Cart;
