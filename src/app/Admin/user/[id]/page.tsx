import React from "react";
import EditUserDataByAdmin from "../../_components/user/EditUserDataByAdmin";
import { prisma } from "@/lib/prisma";
import { tokenName } from "@/utils/tokenName";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyTokenForPage";

interface IProps {
  params: Promise<{ id: string }>;
}

const EditUserPage = async ({ params }: IProps) => {
  //   console.log((await params).id);
  const id = (await params).id;
  const user = await prisma.user.findUnique({ where: { id } });
  const name = user?.name || "";
  const email = user?.email || "";
  const city = user?.city || "";
  const country = user?.country || "";
  const role = user?.role || "USER";
  const p = user?.postalCode || "";
  const phone = user?.phone || "";
  const img = user?.image || "";
  const street = user?.streetAddress || "";

  const cookieStore = cookies();
  const token = (await cookieStore)?.get(tokenName);

  const payload = verifyTokenForPage(token?.value || "");
  const currentUser = payload?.id || "";

  return (
    <div>
      <EditUserDataByAdmin
        id={id}
        name={name}
        city={city}
        country={country}
        email={email}
        phone={phone}
        postalCode={p}
        role={role}
        image={img}
        streetAddress={street}
        currentUser={currentUser}
      />
    </div>
  );
};

export default EditUserPage;
