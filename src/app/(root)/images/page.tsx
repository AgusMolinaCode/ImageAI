import LogoForm from "@/components/shared/LogoForm";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>Error: User ID is required</div>;
  }

  const user = await getUserById(userId);

  return (
    <div>
      <LogoForm action="Add" userId={user._id} />
    </div>
  );
};

export default page;