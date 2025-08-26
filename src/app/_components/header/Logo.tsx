import Link from "../Link/Link";
import React from "react";
import logoDark from "../../../../public/assets/images/favicon.ico";
import logoLight from "../../../../public/assets/images/logo.jpeg";
import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href={"/"} className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Pizza Shop</h1>
        <div className="text-4xl">
          <Image
            src={logoDark}
            alt="logo"
            height={100}
            width={100}
            className="hidden dark:block"
          />
          <Image
            src={logoLight}
            alt="logo"
            height={80}
            width={80}
            className="dark:hidden"
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
