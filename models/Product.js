import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         maxlength: 60,
      },
      desc: {
         type: String,
         required: true,
         maxlength: 200,
      },
      img: {
         type: String,
         required: true,
      },
      prices: {
         type: [Number],
         required: true,
      },
      extraOptions: {
         type: [
            {
               text: { type: String, required: true },
               price: { type: Number, required: true },
            },
         ],
      },
   },
   { timestamps: true } // horodate les créations et ls changements du schema product
);
export default mongoose.model.Product ||
   mongoose.model("Product", ProductSchema); // vérifie si le schéma Product existe sinon le crée dans la bdd
