import { Schema, model, models } from "mongoose";

const MercadoPagoOrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mercadoPagoId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  credits: {
    type: Number,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const MercadoPagoOrder =
  models.MercadoPagoOrder || model("MercadoPagoOrder", MercadoPagoOrderSchema);

export default MercadoPagoOrder;
