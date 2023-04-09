import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";
import { logo } from "@/public/assets";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <Image src={logo} alt="logo" height={70} className="logo" />
        </Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {/* Show cart only when cart icon is clicked */}
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
