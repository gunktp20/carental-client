import { useNavigate } from "react-router-dom";
import { Logo } from ".";
import { useAppSelector } from "../app/hook";
import RegistrationFlyoutLink from "./RegistrationFlyoutLink";

function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="flex justify-center py-3 bg-white shadow-md top-[0] w-[100%]">
      <div className="w-[60%] flex justify-between items-center xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[91%]">
        <Logo width="135px" />
        {user && (
          <div className="flex justify-center items-center cursor-pointer">
            <img
              className="rounded-[10px] w-[40px] border-[1px] border-[#fff] hover:border-primary-200 transition-all"
              src={
                user?.profileURL
                  ? user.profileURL
                  : "https://static.vecteezy.com/system/resources/previews/023/556/431/non_2x/cute-robot-waving-hand-cartoon-icon-illustration-science-technology-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg"
              }
              onClick={() => navigate("/user")}
            ></img>
          </div>
        )}
        {!user && <RegistrationFlyoutLink />}
      </div>
    </div>
  );
}

export default Navbar;
