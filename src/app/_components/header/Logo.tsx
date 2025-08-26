import Link from "../Link/Link";
import React from "react";
import logo from "../../favicon.ico"
import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href={"/"} className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Pizza Shop</h1>
        <div className="text-4xl">
          <Image
          src={logo}
          alt="logo"
          height={50}
          width={50}/>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
