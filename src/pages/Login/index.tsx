import Wrapper from "../../assets/wrappers/pages/Login";
import { Navbar, Footer, FormRow } from "../../components";
import wallpaper from "../../assets/images/wallpaper-register.jpg";
import { validate } from "email-validator";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import api from "../../services/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { setCredential } from "../../features/auth/auth.slice";
import { useAppDispatch } from "../../app/hook";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from "react-google-login";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordExist, setIsPasswordExist] = useState<boolean>(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thatPassInCorrect, SetThatPassInCorrect] = useState<string>("");

  const onSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const tokens = "profileObj" in res ? res.tokenObj : undefined;
    console.log("onSuccess");
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
        console.log(msg);
        setIsLoading(false);
        setEmailError(true);
        setEmailErrorMessage(msg);
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

  const clearAllTimeouts = () => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    setTimeoutIds([]);
  };

  const clearAlert = () => {
    clearAllTimeouts();
    const newTimeoutId = setTimeout(() => {
      setEmailError(false);
    }, 3000);
    setTimeoutIds([newTimeoutId]);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailErrorMessage("* กรุณากรอกอีเมลของคุณ");
      setEmailError(true);
      return;
    }
    if (validate(e.target.value)) {
      setEmailErrorMessage("* อีเมลล์ไม่ถูกต้อง");
      setEmailError(false);
    } else {
      setEmailErrorMessage("* อีเมลล์ไม่ถูกต้อง");
      setEmailError(true);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordErrorMessage("* กรุณากรอกรหัสผ่านของคุณ");
      setIsPasswordExist(false);
      return;
    }
    if (thatPassInCorrect !== "" && e.target.value !== thatPassInCorrect) {
      return setEmailError(false);
    }
    setIsPasswordExist(true);
  };

  const login = async () => {
    try {
      const { data } = await api.post(`/auth/login/`, {
        email,
        password,
      });
      dispatch(setCredential({ user: data?.user, token: data?.accessToken }));
      setIsLoading(false);
      dispatch(setCredential({ user: data?.user, token: data?.accessToken }));
      return navigate("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setIsLoading(false);
        if (err?.response?.request.status === 401) {
          SetThatPassInCorrect(password);
        }
        const msg =
          typeof err?.response?.data?.msg === "object"
            ? err?.response?.data?.msg[0]
            : err?.response?.data?.msg;
        setEmailError(true);
        setEmailErrorMessage(msg);
        return clearAlert();
      }
    }
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
          <FormRow
            type="text"
            name="email"
            labelText="อีเมลล์"
            value={email}
            handleChange={handleChangeEmail}
            error={emailError}
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
              !password ||
              !email ||
              !isPasswordExist ||
              isLoading ||
              emailError ||
              password === thatPassInCorrect ||
              !validate(email)
            }
            onClick={login}
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
      <Footer />
    </Wrapper>
  );
}

export default Login;
