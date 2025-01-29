import MenuItems from "./MenuItems";
import ToggleLanguage from "./toggleLanguage";

const Header = () => {
  return (
    <div className="flex justify-between p-4 px-20 items-center bg-gradient-to-r from-green-500 to-green-500">
      <img
        src="../../../../assets/Icons/IconMain.jpeg"
        className="w-20 items-center "
      />
      <div className="flex space-x-8">
        <MenuItems />
        <ToggleLanguage />
      </div>
    </div>
  );
};

export default Header;
