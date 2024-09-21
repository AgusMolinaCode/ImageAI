import { Schema, model, models } from "mongoose";

// Definición de la interfaz ITransaction que extiende Document
export interface ITransaction extends Document {
  createdAt: Date;
  stripeId: string;
  amount: number;
  plan?: string;
  credits?: number;
  buyer: Schema.Types.ObjectId;
}

// Definición del esquema de Mongoose para el modelo Transaction
const TransactionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
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

// Creación del modelo Transaction basado en el esquema TransactionSchema
const Transaction = models?.Transaction || model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;