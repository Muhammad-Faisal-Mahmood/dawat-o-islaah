import MenuItems from "./MenuItems";
import ToggleLanguage from "./ToggleLanguage";

const Header = () => {
  return (
    <div className="flex gap-x-32 p-4 px-20 items-center bg-[#C9A227]">
      <img
        src="../../../../assets/Icons/IconMain.jpeg"
        className="w-14 items-center "
      />
      <MenuItems />
    </div>
  );
};

export default Header;
