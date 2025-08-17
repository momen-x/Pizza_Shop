import Link from "../Link/Link";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href={"/"} className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Pizza Shop</h1>
        <div className="text-4xl">🍕</div>
      </Link>
    </div>
  );
};

export default Logo;
