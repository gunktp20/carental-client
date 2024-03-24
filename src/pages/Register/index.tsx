import Wrapper from "../../assets/wrappers/pages/Register";
import { Navbar, Footer } from "../../components";
import wallpaper from "../../assets/images/wallpaper-register.jpg";

function Register() {
  return (
    <Wrapper>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        {/* Login Form Start*/}
        <div className="bg-white w-[540px] rounded-xl p-5 absolute z-[2] top-[9rem]">
          <div className="flex flex-col">
            <div className="font-[400] text-[27px] text-gray-800">
              ลงทะเบียนเป็นสมาชิก
            </div>
            <div className="font-[300] text-[13.5px] text-gray-500">
              กรอกข้อมูลสำหรับการลงทะเบียน กรุณาใช้ข้อมูลจริง
            </div>
          </div>
          {/* <label
          htmlFor="input-group-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label> */}
          <div className="relative mb-6 mt-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 outline-1 text-[13px] focus:outline-primary-400 focus:outline-[1px] rounded-lg  block w-full ps-10 p-2.5 "
              placeholder="carental.co@gmail.com"
            ></input>
            <div className="absolute text-red-500 text-[11.4px] bottom-[-1.3rem]">
              * กรุณากรอก อีเมลล์ ของคุณ
            </div>
          </div>
        </div>

        {/* Login Form End */}
        <div className="relative h-[824px] w-[100%]">
          <div className="absolute bg-[#0000007a] top-0 w-[100%] h-[100%]"></div>
          <img
            src={wallpaper}
            className="h-[100%] w-[100%] object-cover object-right-top"
          ></img>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
}

export default Register;
