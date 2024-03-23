import React from "react";
import { Logo } from ".";

function Navbar() {
  return (

      <div className="flex justify-center py-3 bg-white shadow-md top-[0] w-[100%]">
        <div className="w-[60%] flex justify-between items-center xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[91%]">
          <Logo width="135px" />
          <button className=" flex items-center py-2 px-5 text-primary-700 border-primary-700 border-[1px] rounded-[100px] text-[13.4px] hover:bg-primary-700 cursor-pointer hover:text-white transition-all">
            <div>เข้าสู่ระบบ / สมัครสมาชิก</div>
          </button>
        </div>
      </div>

  );
}

export default Navbar;
