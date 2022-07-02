import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
   {
      customer: {
         type: String,
         required: true,
         maxlength: 60,
      },
      address: {
         type: String,
         required: true,
         maxlength: 200,
      },
      total: {
         type: Number,
         required: true,
      },
      status: {
         type: Number,
         default: 0,
      },
      method: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true } // horodate les créations et ls changements du schema product
);
export default mongoose.model.Product || mongoose.model("Order", OrderSchema); // vérifie si le schéma Order existe sinon le crée dans la bdd
