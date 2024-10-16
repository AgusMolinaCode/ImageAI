import { Schema, model, models } from "mongoose";

const TransactionMercadoPagoSchema = new Schema({
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

const TransactionMercadoPago = models?.TransactionMercadoPago || model("TransactionMercadoPago", TransactionMercadoPagoSchema);

export default TransactionMercadoPago;