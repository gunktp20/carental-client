import Wrapper from "../../assets/wrappers/pages/Register";
import { Navbar, Footer, FormRow } from "../../components";
import wallpaper from "../../assets/images/wallpaper-register.jpg";
import { validate } from "email-validator";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { MdOutlineEmail } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { setStep, setEmail, setOtp } from "../../features/auth/auth.slice";

function Register() {
  const { step } = useAppSelector((state) => state.auth);
  return (
    <Wrapper>
      <Navbar />
      {step === 1 && <SendEmailVerification />}
      {step === 2 && <OTPVerificationForm />}
      <Footer />
    </Wrapper>
  );
}

const SendEmailVerification = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);
  const [isFormattEmailValid, setIsFormattEmailValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
    if (e.target.value === "") {
      setErrorMessage("* กรุณากรอกอีเมลของคุณ");
      setIsFormattEmailValid(false);
      return;
    }
    if (validate(e.target.value)) {
      setErrorMessage("* อีเมลล์ไม่ถูกต้อง");
      setIsFormattEmailValid(true);
    } else {
      setErrorMessage("* อีเมลล์ไม่ถูกต้อง");
      setIsFormattEmailValid(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-[540px] rounded-xl p-8 absolute z-[2] top-[9rem]">
        <div className="flex flex-col">
          <div className="font-[400] text-[27px] text-gray-800">
            ลงทะเบียนเป็นสมาชิก
          </div>
          <div className="font-[300] text-[13.5px] text-gray-500">
            กรอกข้อมูลสำหรับการลงทะเบียน กรุณาใช้ข้อมูลจริง
          </div>
        </div>
        <FormRow
          type="text"
          name="email"
          labelText="E-mail"
          value={email}
          handleChange={handleChangeEmail}
          error={!isFormattEmailValid}
          errMsg={errorMessage}
          icon={<MdOutlineEmail />}
          tailwindClass="mt-[1.5rem]"
        />

        <button
          className="bg-primary-500 text-[14.5px] font-[300] text-white w-[100%] h-[42px] transition-all rounded-lg mb-8 disabled:bg-primary-100"
          onClick={() => {
            dispatch(setStep(2));
            dispatch(setEmail(email));
          }}
          disabled={!isFormattEmailValid || email === ""}
        >
          ถัดไป
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
  );
};

const OTPVerificationForm = () => {
  const dispatch = useAppDispatch();
  const { email, otp } = useAppSelector((state) => state.auth);

  const handleOTPChange = (otp: string) => dispatch(setOtp(otp));

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-[540px] rounded-xl p-8 absolute z-[2] top-[9rem]">
        <div className="flex flex-col">
          <div className="font-[400] text-[27px] text-gray-800">
            กรอกรหัสยืนยันตัวตน
          </div>
          <div className="font-[300] text-[13.5px] text-gray-500">
            ระบุรหัสผ่านทาง อีเมล ที่ส่งไปยัง
          </div>
          <div className="text-primary-500 text-[14px] mt-2">{email}</div>
        </div>

        <div className="w-[100%] flex justify-center items-center mt-12 mb-6">
          <OtpInput
            value={otp}
            onChange={handleOTPChange}
            numInputs={6}
            inputType="tel"
            containerStyle={{
              width: "90%",
              display: "flex",
              gridGap: "8px",
              justifyContent: "center",
            }}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "40px",
              marginBottom: "10px",
              height: "30px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              backgroundColor: "transparent",
              outline: "none",
              borderBottom: "2px solid #4195fc",
            }}
          />
        </div>
        <button
          className="bg-primary-500 text-[14.5px] font-[300] text-white w-[100%] h-[42px] transition-all rounded-lg mb-8 disabled:bg-primary-100"
          onClick={() => {
            dispatch(setStep(2));
            dispatch(setEmail(email));
          }}
          disabled={!otp ? true : false}
        >
          ยืนยัน
        </button>
        <div className="flex text-sm justify-center">
          ไม่ได้รับรหัสผ่าน?{" "}
          <p onClick={()=>{

          }} className="text-primary-500 ml-2 cursor-pointer">ส่งรหัสผ่านใหม่ อีกครั้ง</p>
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
  );
};

export default Register;
