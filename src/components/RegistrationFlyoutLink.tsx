import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RegistrationFlyoutLink = () => {
  return (
    <button className="">
      <FlyoutLink>เข้าสู่ระบบ / สมัครสมาชิก</FlyoutLink>
    </button>
  );
};

interface IPropFlyoutLink {
  children: string | JSX.Element;
}

const FlyoutLink = ({ children }: IPropFlyoutLink) => {
  const [open, setOpen] = useState(false);

  const showFlyout = open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="flex items-center py-2 px-5 border-primary-700 border-[1px] rounded-[100px] text-[13.4px] cursor-pointer transition-all relative z-[10]"
    >
      <a className="relative text-primary-700">{children}</a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-[4.2rem] text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <Content />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Content = () => {
  const navigate = useNavigate();
  return (
    <div className="flex p-5 flex-col w-[300px] bg-white rounded-lg shadow-md">
      <div className="border-b-[1px] pb-4 mb-5">
        <p className="text-[13px] mb-3 text-left">
          รับส่วนลดพิเศษสำหรับสมาชิก Carental
          พร้อมการจองที่รวดเร็วและไม่ยุ่งยาก!
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-primary-500 rounded-lg text-white w-[100%] py-2"
        >
          เข้าสู่ระบบ
        </button>
      </div>
      <div>
        <p className="text-[13px] mb-3 text-left">
          เข้าเว็บไซต์ Carental เป็นครั้งแรกใช่ไหม?
        </p>
        <button
          onClick={() => navigate("/register")}
          className="border-primary-700 border-[1px] rounded-lg text-primary-700 w-[100%] py-2"
        >
          สมัครสมาชิก
        </button>
      </div>
    </div>
  );
};

export default RegistrationFlyoutLink;
