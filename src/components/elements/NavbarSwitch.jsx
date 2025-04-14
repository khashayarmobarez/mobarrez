"use client";
import { useRef } from "react";

 // Client component due to interactivity

const NavbarSwitch = ({ className, onClick, checked }) => {

  const burgerRef = useRef(null);

  return (
    <div className={className}>
      <label className="burger z-50" htmlFor="burger" ref={burgerRef}>
          <input type="checkbox" id="burger" checked={checked} onChange={onClick} />
          <span></span>
          <span></span>
          <span></span>
      </label>

      <style jsx>{`
        .burger {
            position: relative;
            width: 24px;
            height: 20px;
            background: transparent;
            cursor: pointer;
            display: block;
        }

        .burger input {
            display: none;
        }

        .burger span {
            display: block;
            position: absolute;
            height: 2.5px;
            width: 100%;
            background: var(--foreground);
            border-radius: 9px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: .25s ease-in-out;
        }

        .burger span:nth-of-type(1) {
            top: 0px;
            transform-origin: left center;
        }

        .burger span:nth-of-type(2) {
            top: 50%;
            transform: translateY(-50%);
            transform-origin: left center;
        }

        .burger span:nth-of-type(3) {
            top: 100%;
            transform-origin: right center;
            transform: translateY(-100%);
            width: 70%;
            right: 0;
            left: auto;
        }

        .burger input:checked ~ span:nth-of-type(1) {
            transform: rotate(45deg);
            top: -1px;
            left: 8px;
        }

        .burger input:checked ~ span:nth-of-type(2) {
            width: 0%;
            opacity: 0;
        }

        .burger input:checked ~ span:nth-of-type(3) {
            transform: rotate(-45deg);
            top: -1px;
            left: 0px;
            width: 100%;
        }
      `}</style>
    </div>
  );
};

export default NavbarSwitch;  