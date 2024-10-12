import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaHandshakeSimple } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
const Facilities = () => {
  return (
    <div className="container ">
      <div className="grid grid-cols-1 md:grid-cols-2   lg:grid-cols-4 gap-4 py-9 ml-5 md:ml-auto">
        <div
          className="flex gap-3 items-center "
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          <MdLocalShipping className="text-4xl text-[#023e8a]  " />
          <div>
            <p className="text-base  font-semibold">Free Shipping</p>
            <span className="text-sm">On all orders within $99</span>
          </div>
        </div>
        <div
          className="flex gap-3 items-center"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <FaHandshakeSimple className="md:text-4xl text-[#023e8a] text-3xl " />
          <div>
            <p className="text-base  font-semibold">Secure Payment</p>
            <span className="text-sm">We ensure payment</span>
          </div>
        </div>
        <div
          className="flex gap-3 items-center"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <GiReceiveMoney className="md:text-4xl text-[#023e8a] text-3xl " />
          <div>
            <p className="text-base  font-semibold">100% Money Back</p>
            <span className="text-sm">30 days return policy</span>
          </div>
        </div>
        <div
          className="flex gap-3 items-center"
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          <TbMessageCircle className="md:text-4xl text-[#023e8a] text-3xl " />
          <div>
            <p className="text-base  font-semibold">Online Support</p>
            <span className="text-sm">24/7 dedicated support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
