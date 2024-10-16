import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createTransaction } from "@/lib/actions/transaction.action";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });

  const payment = await new Payment(client).get({ id: body.data.id });
  console.log(payment);
  const transaction = {
    stripeId: payment.id?.toString() || "",
    amount: payment.transaction_amount ? payment.transaction_amount / 100 : 0,
    plan: payment.metadata?.plan || "",
    credits: Number(payment.metadata?.credits) || 0,
    buyerId: payment.metadata?.buyerId || "",
    createdAt: new Date(),
  };

  const newOrder = await createTransaction(transaction);
  return NextResponse.json({ message: "OK", order: newOrder });
}
