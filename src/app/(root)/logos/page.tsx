import LogoForm from "@/components/shared/LogoForm";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  // const page = Number(searchParams?.page) || 1;
  const { userId } = auth();
  
  if (!userId) {
    return <div>Error: User ID is required</div>;
  }

  const user = await getUserById(userId);
  // const images = await getUserLogos({ userId: user._id });

  return (
    <div>
      <LogoForm action="Add" userId={user._id} />

      {/* <Collection
        hasSearch={true}
        images={images?.data}
        totalPages={images?.totalPages}
        page={page}
      /> */}
    </div>
  );
};

export default page;