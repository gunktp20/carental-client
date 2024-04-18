import Wrapper from "../../assets/wrappers/pages/Register";
import { Navbar, Footer, FormRow } from "../../components";
import wallpaper from "../../assets/images/wallpaper-register.jpg";
import { validate } from "email-validator";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import api from "../../services/api";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../app/hook";
import { setCredential } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from "react-google-login";

function Register() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [token, setToken] = useState<string>("");

  return (
    <Wrapper>
      <Navbar />
      {step === 1 && (
        <SendEmailVerification
          setStep={setStep}
          setEmail={setEmail}
          email={email}
        />
      )}
      {step === 2 && (
        <OTPVerificationForm
          setStep={setStep}
          email={email}
          otp={otp}
          setOtp={setOtp}
          setToken={setToken}
        />
      )}
      {step === 3 && <SetPasswordForm setStep={setStep} token={token} />}
      <Footer />
    </Wrapper>
  );
}

interface IPropSendEmailVerification {
  setStep: (step: 1 | 2 | 3) => void;
  setEmail: (email: string) => void;
  email: string;
}

const SendEmailVerification = ({
  setStep,
  setEmail,
  email,
}: IPropSendEmailVerification) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSentEmailError, setIsSentEmailError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const tokens = "profileObj" in res ? res.tokenObj : undefined;
    try {
      const { data } = await api.post(`/auth/google-auth/`, {
        tokens,
      });
      setIsLoading(false);
      dispatch(setCredential({ user: data?.user, token: data?.accessToken }));
      return navigate("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const msg =
          typeof err?.response?.data?.msg === "object"
            ? err?.response?.data?.msg[0]
            : err?.response?.data?.msg;
        setIsLoading(false);
        setIsSentEmailError(true);
        setErrorMessage(msg);
        return;
      }
    }
  };
  const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log("LOGIN FAILED! res:", res);
  };

  const clientId =
    "58393219866-rgf9c2p16vop971javfn875ehtigi20k.apps.googleusercontent.com";

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    cookiePolicy: "single_host_origin",
    isSignedIn: false,
  });

  const sendEmailOtp = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/auth/send-otp/${email}`);
      console.log(data);
      setIsLoading(false);
      setStep(2);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        const msg =
          typeof err?.response?.data?.msg === "object"
            ? err?.response?.data?.msg[0]
            : err?.response?.data?.msg;
        setIsSentEmailError(true);
        setErrorMessage(msg);
        setIsLoading(false);
        return;
      }
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setErrorMessage("* กรุณากรอกอีเมลของคุณ");
      setIsSentEmailError(true);
      return;
    }
    if (validate(e.target.value)) {
      setErrorMessage("* อีเมลล์ไม่ถูกต้อง");
      setIsSentEmailError(false);
    } else {
      setErrorMessage("* อีเมลล์ไม่ถูกต้อง");
      setIsSentEmailError(true);
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
          error={isSentEmailError}
          errMsg={errorMessage}
          icon={<MdOutlineEmail />}
          tailwindClass="mt-[1.5rem]"
        />

        <button
          className="bg-primary-500 text-[14.5px] font-[300] text-white w-[100%] h-[42px] transition-all rounded-lg mb-8 disabled:bg-primary-100 mt-4 flex justify-center items-center"
          onClick={() => {
            sendEmailOtp();
          }}
          disabled={isSentEmailError || email === "" || isLoading}
        >
          {isLoading ? (
            <div className="loader w-[25px] h-[25px]"></div>
          ) : (
            "ถัดไป"
          )}
        </button>
        <div className="flex relative justify-center items-center mb-7">
          <div className="absolute bg-white z-[2] px-2 rounded-[100%] text-gray-600 text-[12.2px]">
            หรือ
          </div>
          <div className="bg-gray-300 absolute w-[75%] h-[1px]"></div>
        </div>
        <button
          onClick={signIn}
          className="border-[1px] h-[42px] mb-5 w-[100%] border-gray-300 rounded-lg flex items-center justify-center"
        >
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

interface IPropOTPVerificationForm {
  setStep: (step: 1 | 2 | 3) => void;
  setOtp: (otp: string) => void;
  setToken: (token: string) => void;
  email: string;
  otp: string;
}

const OTPVerificationForm = ({
  setStep,
  setOtp,
  setToken,
  email,
  otp,
}: IPropOTPVerificationForm) => {
  const handleOTPChange = (otp: string) => setOtp(otp);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  const clearAllTimeouts = () => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    setTimeoutIds([]);
  };

  const clearAlert = () => {
    clearAllTimeouts();
    const newTimeoutId = setTimeout(() => {
      setError(false);
      setAlertText("");
    }, 3000);
    setTimeoutIds([newTimeoutId]);
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    if (!email) {
      return;
    }
    if (!otp) {
      return;
    }
    setError(false);
    try {
      const { data } = await api.post(`/auth/verify/${email}`, {
        OTP: otp,
      });
      setToken(data?.token);
      setIsLoading(false);
      setStep(3);
    } catch (err) {
      if (err instanceof AxiosError) {
        const msg =
          typeof err?.response?.data?.msg === "object"
            ? err?.response?.data?.msg[0]
            : err?.response?.data?.msg;
        setError(true);
        setAlertText(msg);
        setIsLoading(false);
        return clearAlert();
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-[540px] rounded-xl p-8 absolute z-[2] top-[9rem]">
        <button
          onClick={() => {
            setStep(1);
          }}
          className="text-gray-400 text-sm"
        >
          <FaChevronLeft />
        </button>
        <div className="flex flex-col mt-3">
          <div className="font-[400] text-[27px] text-gray-800">
            กรอกรหัสยืนยันตัวตน
          </div>
          <div className="font-[300] text-[13.5px] text-gray-500">
            ระบุรหัสผ่านทาง อีเมล ที่ส่งไปยัง
          </div>
          <div className="text-primary-500 text-[14px] mt-2">{email}</div>
        </div>
        <div className="w-[100%] flex justify-center items-center mt-12 mb-2">
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
              backgroundColor: "#fff",
              zIndex: "2",
            }}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "40px",
              marginBottom: "1px",
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
        <div
          className={`text-red-500 text-[11.5px] transition-all text-center duration-300 ${
            error ? "mt-[1rem] " : "mt-[-25px]"
          } z-2`}
        >
          {alertText}
        </div>
        <button
          className={`bg-primary-500 text-[14.5px] font-[300] text-white w-[100%] h-[42px] transition-all rounded-lg mb-8 mt-10 disabled:bg-primary-100 z-[1]`}
          onClick={() => {
            verifyOTP();
          }}
          disabled={otp.length < 6 ? true : false || isLoading || error}
        >
          {isLoading ? (
            <div className="loader w-[25px] h-[25px]"></div>
          ) : (
            "ยืนยัน"
          )}
        </button>

        <div className="flex text-sm justify-center">
          ไม่ได้รับรหัสผ่าน?{" "}
          <p
            onClick={() => {}}
            className="text-primary-500 ml-2 cursor-pointer"
          >
            ส่งรหัสผ่านใหม่ อีกครั้ง
          </p>
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

interface IPropSetPasswordForm {
  setStep: (step: 1 | 2 | 3) => void;
  token: string;
}

const SetPasswordForm = ({ setStep, token }: IPropSetPasswordForm) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<{
    password: string;
    confirm_password: string;
  }>({ password: "", confirm_password: "" });
  const [errorMessage, setErrorMsg] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isConfirmValid, setIsConfirmPasswordValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // validated states
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  const clearAllTimeouts = () => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    setTimeoutIds([]);
  };

  const clearAlert = () => {
    clearAllTimeouts();
    const newTimeoutId = setTimeout(() => {
      setPasswordError(false);
      setErrorMsg("");
    }, 3000);
    setTimeoutIds([newTimeoutId]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    if (lower.test(e.target.value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(e.target.value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(e.target.value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(e.target.value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(e.target.value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: e.target.value });
    if (e.target.value === "") {
      return;
    }
    // eslint-disable-next-line no-useless-escape
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (!regex.test(e.target.value)) {
      setPasswordError(true);
      setErrorMsg("กรอกภาษาอังกฤษเเละตัวเลขเท่านั้น");
    } else {
      setPasswordError(false);
    }
  };
  const setPassword = async () => {
    const { password } = values;
    setIsLoading(true);

    try {
      const { data } = await api.put(`/user/password/`, {
        token,
        password,
      });
      setIsLoading(false);
      dispatch(setCredential({ user: data?.user, token: data?.accessToken }));
      return navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        const msg =
          typeof err?.response?.data?.msg === "object"
            ? err?.response?.data?.msg[0]
            : err?.response?.data?.msg;
        setErrorMsg(msg);
        setPasswordError(true);
        setIsLoading(false);
        return clearAlert();
      }
    }
  };

  useEffect(() => {
    if (
      values.confirm_password === values.password &&
      values.confirm_password &&
      values.password
    ) {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(false);
    }
  }, [values.confirm_password, values.password]);

  useEffect(() => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    if (lower.test(values.password)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(values.password)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(values.password)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(values.password)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(values.password)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  }, [values.confirm_password, values.password]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-[540px] rounded-xl p-8 absolute z-[2] top-[9rem]">
        <button
          onClick={() => {
            setStep(2);
          }}
          className="text-gray-400 text-sm"
        >
          <FaChevronLeft />
        </button>
        <div className="flex flex-col mt-4">
          <div className="font-[400] text-[27px] text-gray-800">
            ตั้งรหัสผ่านของคุณ
          </div>
          <div className="font-[300] text-[13.5px] text-gray-500">
            กรุณาตั้งรหัสผ่านที่ตรงกับเงื่อนไขที่เว็ปไซต์กำหนด
          </div>
        </div>
        <div className="flex gap-5 mt-3 items-start">
          <FormRow
            type="text"
            name="password"
            labelText="รหัสผ่าน"
            value={values.password}
            handleChange={handlePasswordChange}
            error={passwordError}
            errMsg={errorMessage}
            icon={<CiLock />}
            tailwindClass="mt-[1.5rem] bg-green-500"
          />
          <FormRow
            type="text"
            name="confirm_password"
            labelText="ยืนยันรหัสผ่าน"
            value={values.confirm_password}
            handleChange={handleChange}
            icon={<CiLock />}
            tailwindClass="mt-[1.5rem]"
          />
        </div>
        <div className="flex flex-col gap-2 mb-7 mt-5">
          <div className="flex text-[11.3px] text-gray-500 pl-3 items-center gap-4">
            <IoIosCheckmarkCircle
              className={`text-[16px] ${
                lowerValidated ? "text-primary-500" : "text-gray-400"
              }`}
            />{" "}
            ตัวพิมพ์เล็ก อย่างน้อย 1 ตัว
          </div>
          <div className="flex text-[11.3px] text-gray-500 pl-3 items-center gap-4">
            <IoIosCheckmarkCircle
              className={`text-[16px] ${
                upperValidated ? "text-primary-500" : "text-gray-400"
              }`}
            />{" "}
            ตัวพิมพ์ใหญ่ อย่างน้อย 1 ตัว
          </div>
          <div className="flex text-[11.3px] text-gray-500 pl-3 items-center gap-4">
            <IoIosCheckmarkCircle
              className={`text-[16px] ${
                numberValidated ? "text-primary-500" : "text-gray-400"
              }`}
            />{" "}
            ตัวเลข อย่างน้อย 1 ตัว
          </div>
          <div className="flex text-[11.3px] text-gray-500 pl-3 items-center gap-4">
            <IoIosCheckmarkCircle
              className={`text-[16px] ${
                specialValidated ? "text-primary-500" : "text-gray-400"
              }`}
            />{" "}
            ตัวอักษรพิเศษ อย่างน้อย 1 ตัว
          </div>
          <div className="flex text-[11.3px] text-gray-500 pl-3 items-center gap-4">
            <IoIosCheckmarkCircle
              className={`text-[16px] ${
                lengthValidated ? "text-primary-500" : "text-gray-400"
              }`}
            />{" "}
            ประกอบด้วยตัวอักษรอย่างน้อง 8 ตัว
          </div>
          <div className="flex text-[11.3px] text-gray-500 pl-3 items-center gap-4 mb-3">
            <IoIosCheckmarkCircle
              className={`text-[16px] ${
                isConfirmValid ? "text-primary-500" : "text-gray-400"
              }`}
            />{" "}
            รหัสผ่าน เเละ ยืนยันรหัสผ่าน ต้องตรงกัน
          </div>
        </div>

        <button
          disabled={
            !lowerValidated ||
            !upperValidated ||
            !numberValidated ||
            !specialValidated ||
            !lengthValidated ||
            values.password !== values.confirm_password ||
            !values.password.match(
              // eslint-disable-next-line no-useless-escape
              /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
            ) ||
            passwordError
          }
          onClick={setPassword}
          className="bg-primary-500 text-[14.5px] font-[300] text-white w-[100%] h-[42px] transition-all rounded-lg mb-5 disabled:bg-primary-100"
        >
          {isLoading ? (
            <div className="loader w-[25px] h-[25px]"></div>
          ) : (
            "ยืนยัน"
          )}
        </button>

        <div className="flex text-sm justify-center">
          ไม่ได้รับรหัสผ่าน?{" "}
          <p
            onClick={() => {}}
            className="text-primary-500 ml-2 cursor-pointer"
          >
            ส่งรหัสผ่านใหม่ อีกครั้ง
          </p>
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
