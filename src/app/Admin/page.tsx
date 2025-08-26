import React from "react";
import ProfileInput from "./_components/profile/profileInput";
import { cookies } from "next/headers";
import { tokenName } from "@/utils/tokenName";
import { verifyTokenForPage } from "@/utils/verifyTokenForPage";

const ProfilePage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get(tokenName);
  // console.log("token is : ", token);

  const payload = verifyTokenForPage(token?.value || "");
  const id = payload?.id || "";

  return (
    <div className="">
      <ProfileInput id={id} />
    </div>
  );
};

export default ProfilePage;
