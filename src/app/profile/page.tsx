import React from "react";
import InfoAccount from "../_components/profile/ProfileInfo";
import { cookies } from "next/headers";
import { tokenName } from "@/utils/tokenName";
import { verifyTokenForPage } from "@/utils/verifyTokenForPage";

const ProfilePage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get(tokenName);
  // console.log("token is : ", token);

  const payload = verifyTokenForPage(token?.value || "");
  const id = payload?.id || "";
  const email = payload?.email || "";
  const name = payload?.name || "";
  const img = payload?.imgURL || "";
  return (
    <div>
      <InfoAccount id={id} email={email} name={name} imgURL={img} />
    </div>
  );
};

export default ProfilePage;
