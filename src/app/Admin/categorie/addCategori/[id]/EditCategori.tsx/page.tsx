import EditCategoryInput from "@/app/Admin/_components/catogeri/EditCategoryInput";
import { prisma } from "@/lib/prisma";
import React from "react";

interface IProps {
  params: Promise<{ id: string }>;
}

const EditCztegoriesPage = async ({ params }: IProps) => {
  const id = (await params).id;

  const data = await prisma.category.findUnique({ where: { id } });
  // console.log(data);
  const name = data?.name || "";
  const description = data?.description || "";

  return (
    <div>
      <section>
        <EditCategoryInput id={id} name={name} description={description} />
      </section>
    </div>
  );
};

export default EditCztegoriesPage;
