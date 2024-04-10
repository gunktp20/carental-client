import { Logo } from ".";
import RegistrationFlyoutLink from "./RegistrationFlyoutLink";

function Navbar() {
  return (
    <div className="flex justify-center py-3 bg-white shadow-md top-[0] w-[100%]">
      <div className="w-[60%] flex justify-between items-center xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[91%]">
        <Logo width="135px" />
        <RegistrationFlyoutLink />
      </div>
    </div>
  );
}

export default Navbar;
