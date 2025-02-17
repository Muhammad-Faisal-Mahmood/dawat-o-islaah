import MenuItems from "./MenuItems";
import ToggleLanguage from "./ToggleLanguage";

const Header = () => {
  return (
    <div className="flex justify-between p-4 px-20 items-center bg-[#C9A227]">
      <img
        src="../../../../assets/Icons/IconMain.jpeg"
        className="w-20 items-center "
      />
      <MenuItems />
      <div className="flex space-x-8">{/* <ToggleLanguage /> */}</div>
    </div>
  );
};

export default Header;
