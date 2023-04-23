import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/shop'>Shop</Link>
        </li>
        <li>
          <Link href='/donate'>Donate</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
