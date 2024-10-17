"use client";
import React from "react";
import { checkoutOrderMercadoPago } from "@/lib/actions/transaction.action";
import { Button } from "../ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const CheckoutMercadoPago = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutOrderMercadoPago(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <Button type="submit">
        <>
          <Image
            src="/assets/icons/mercado-pago.svg"
            alt=""
            width={40}
            height={40}
          />

          <p className="px-2 text-lg">MercadoPago</p>
        </>
      </Button>
    </form>
  );
};

export default CheckoutMercadoPago;
