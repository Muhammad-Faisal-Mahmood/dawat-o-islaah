import { useTranslation } from "../../../hooks/useTranslation";
import ToggleLanguage from "./toggleLanguage";

const Header = () => {
  const translation = useTranslation();

  return (
    <div>
      <ToggleLanguage />
      <div>{translation?.header?.home}</div>
    </div>
  );
};

export default Header;
