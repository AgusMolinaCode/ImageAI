"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import { updateCredits } from "./user.actions";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "ars",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  redirect(session.url!);
}

export const checkoutOrderMercadoPago = async (
  transaction: CheckoutTransactionParams
) => {
  const amount = Number(transaction.amount);

  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: transaction.buyerId,
            title: transaction.plan,
            quantity: 1,
            unit_price: amount,
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
          failure: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
          pending: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        },
        metadata: {
          plan: transaction.plan,
          credits: transaction.credits,
          buyerId: transaction.buyerId,
        },
      },
    });

    redirect(preference.sandbox_init_point!);
  } catch (error) {
    console.error("Error al procesar el pedido con Mercado Pago:", error);
    throw error;
  }
};

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    // Create a new transaction with a buyerId
    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    await updateCredits(transaction.buyerId, transaction.credits);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}