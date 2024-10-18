import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createTransaction } from "@/lib/actions/transaction.action";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().then((data) => data as { data: { id: string } });

    const payment = await new Payment(client).get({ id: body.data.id });
    console.log(payment);

    if(payment.status !== "approved") {
    const transaction = {
      stripeId: payment.id?.toString() || "",
      amount: payment.transaction_amount ? payment.transaction_amount / 100 : 0,
      plan: payment.metadata?.plan || "",
      credits: Number(payment.metadata?.credits) || 0,
      buyerId: payment.metadata?.buyerId || "",
      createdAt: new Date(),
    };

    console.log("Transaction to be saved to the database:", transaction);

    const newOrder = await createTransaction(transaction);
    return NextResponse.json({ message: "OK", order: newOrder });
  }
  } catch (error) {
    console.error("Error processing Mercado Pago webhook:", error);
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: "Error", error: errorMessage }, { status: 500 });
  }
}