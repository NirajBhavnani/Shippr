import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";
import { logo } from "@/public/assets";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <Image src={logo} alt="logo" height={70} className="logo" />
        </Link>
      </p>

      <button type="button" className="cart-icon" onClick="">
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
