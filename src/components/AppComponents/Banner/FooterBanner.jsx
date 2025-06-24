import React from "react";
import { useLanguage } from "../../../context/LanguageContext";

const FooterBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-[#C9A227] text-center text-white uppercase py-5">
      {t("footerBanner.copyright")}
    </div>
  );
};

export default FooterBanner;
