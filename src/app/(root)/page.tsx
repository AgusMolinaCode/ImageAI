import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import Link from "next/link";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();
  const usuario = await currentUser();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header
        title={`${usuario?.fullName} Profile`}
        subtitle="Welcome to your profile"
      />

      <section className="px-1">
        <div className="bg-slate-100 border border-slate-300 dark:border-slate-400 dark:bg-slate-700 max-w-44 rounded-xl p-1">
          <p className="font-semibold">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <Image
                  src="/assets/icons/coin.svg"
                  alt="coins"
                  width={28}
                  height={28}
                  className=""
                />
                <h2 className="text-lg font-bold text-dark-600">
                  {user.creditBalance}
                </h2>
              </div>
              <Link href="/credits">
                <button className="group h-8 select-none rounded-lg bg-white px-3 text-sm leading-8 text-zinc-950 shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] hover:bg-zinc-50 hover:via-zinc-900 hover:to-zinc-800 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]">
                  <span className="block group-active:[transform:translate3d(0,1px,0)]">
                    Buy More
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 md:mt-8">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;
