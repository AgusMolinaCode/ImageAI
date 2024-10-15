import React from "react";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";

const Credits = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3 max-w-7xl items-center mx-auto px-1">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="w-full rounded-[16px] border-2 border-purple-200/20 p-8 shadow-xl shadow-purple-200/20"
              style={{ backgroundColor: plan.background }}
            >
              <div className="flex-start flex-col gap-3">
                <p className="font-bold mt-2 text-black">{plan.name}</p>
                <p className="font-semibold text-6xl text-black mt-6">
                  ${plan.price}{" "}
                  {plan.price !== 0 && <span className="text-xl">ARS</span>}
                </p>
                <p className="font-semibold text-md text-gray-500 mt-2">
                  {plan.description}
                </p>
                <p className="font-bold text-black text-2xl mt-2">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt="check"
                      width={28}
                      height={28}
                    />
                    <p className="text-black font-medium">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <p className="text-start py-2 text-gray-500 font-medium">
                  Free Consumable
                </p>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;
