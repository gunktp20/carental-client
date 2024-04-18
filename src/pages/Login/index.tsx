import Wrapper from "../../assets/wrappers/pages/Login";
import { Navbar, Footer, FormRow } from "../../components";
import wallpaper from "../../assets/images/wallpaper-register.jpg";
import { validate } from "email-validator";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { Alert } from "@mui/material";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormattEmailValid, setIsFormattEmailValid] = useState<boolean>(true);
  const [isPasswordExist, setIsPasswordExist] = useState<boolean>(true);
  //handler alert
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");
  //msg of error for expand
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  const clearAllTimeouts = () => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    setTimeoutIds([]);
  };

  const clearAlert = () => {
    clearAllTimeouts();
    const newTimeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    setTimeoutIds([newTimeoutId]);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailErrorMessage("* กรุณากรอกอีเมลของคุณ");
      setIsFormattEmailValid(false);
      return;
    }
    if (validate(e.target.value)) {
      setEmailErrorMessage("* อีเมลล์ไม่ถูกต้อง");
      setIsFormattEmailValid(true);
    } else {
      setEmailErrorMessage("* อีเมลล์ไม่ถูกต้อง");
      setIsFormattEmailValid(false);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordErrorMessage("* กรุณากรอกรหัสผ่านของคุณ");
      setIsPasswordExist(false);
      return;
    }
    setIsPasswordExist(true);
  };

  return (
    <Wrapper>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white w-[540px] rounded-xl p-8 absolute z-[2] top-[9rem]">
          <div className="flex flex-col">
            <div className="font-[400] text-[27px] text-gray-800">
              ลงชื่อเข้าใช้งาน
            </div>
            <div className="font-[300] text-[13.5px] text-gray-500">
              กรอกข้อมูลของคุณเพื่อเข้าสู่ระบบ
            </div>
          </div>
          <div className="">
            <Alert
              severity={"error"}
              sx={{
                fontSize: "11.8px",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              รหัสผ่านของคุณไม่ถูกต้อง
            </Alert>
          </div>
          <FormRow
            type="text"
            name="email"
            labelText="อีเมลล์"
            value={email}
            handleChange={handleChangeEmail}
            error={!isFormattEmailValid}
            errMsg={emailErrorMessage}
            icon={<MdOutlineEmail />}
            tailwindClass="mt-[1.5rem]"
          />
          <FormRow
            type="text"
            name="password"
            labelText="รหัสผ่าน"
            value={password}
            handleChange={handleChangePassword}
            error={!isPasswordExist}
            errMsg={passwordErrorMessage}
            icon={<FiLock />}
            tailwindClass="mt-[1.3rem]"
          />

          <button
            disabled={
              !password || !email || !isFormattEmailValid || !isPasswordExist
            }
            className="bg-primary-500 text-[14.5px] font-[300] text-white w-[100%] h-[42px] transition-all rounded-lg mb-8 disabled:bg-primary-100 mt-4"
          >
            เข้าสู่ระบบ
          </button>
          <div className="flex relative justify-center items-center mb-7">
            <div className="absolute bg-white z-[2] px-2 rounded-[100%] text-gray-600 text-[12.2px]">
              หรือ
            </div>
            <div className="bg-gray-300 absolute w-[75%] h-[1px]"></div>
          </div>
          <button className="border-[1px] h-[42px] mb-5 w-[100%] border-gray-300 rounded-lg flex items-center justify-center">
            <FcGoogle className="text-[23px]" />
            <div className="text-[12.8px] ml-2 ">เข้าสู่ระบบด้วย Google</div>
          </button>

          <div className="text-[12px]">
            การลงทะเบียนเป็นสมาชิก Carental ถือว่าท่านยอมรับใน{" "}
            <a className="text-primary-500 underline mr-2">เงื่อนไข ข้อกำหนด</a>
            เเละ{" "}
            <a className="text-primary-500 underline">นโยบายความเป็นส่วนตัว</a>
          </div>
        </div>

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

export default Login;
