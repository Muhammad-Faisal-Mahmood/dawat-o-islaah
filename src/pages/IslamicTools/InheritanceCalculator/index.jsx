import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const formFields = [
  {
    name: "totalLandArea",
    type: "number",
    min: 0,
  },
  {
    name: "landUnit",
    type: "select",
    options: ["acres", "kanal", "marla"],
  },
  {
    name: "totalCashAmount",
    type: "number",
    min: 0,
  },
  {
    name: "spouse",
    type: "select",
    options: ["noSpouse", "wife", "husband"],
  },
  {
    name: "numberOfSons",
    type: "number",
    min: 0,
  },
  {
    name: "numberOfDaughters",
    type: "number",
    min: 0,
  },
  {
    name: "motherAlive",
    type: "checkbox",
  },
  {
    name: "fatherAlive",
    type: "checkbox",
  },
];

const InheritanceCalculator = () => {
  const { t } = useLanguage();
  const [values, setValues] = useState({
    totalLandArea: null,
    landUnit: "acres",
    totalCashAmount: null,
    spouse: "noSpouse",
    numberOfSons: null,
    numberOfDaughters: null,
    motherAlive: false,
    fatherAlive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value === "" ? null : value,
    });
  };

  // Convert land area to acres for calculation
  const convertToAcres = (landArea, unit) => {
    if (unit === "kanal") return landArea * 0.125;
    if (unit === "marla") return landArea * 0.00625;
    return landArea;
  };

  // Convert acres to the selected unit
  const convertFromAcres = (landArea, unit) => {
    const numLandArea = Number(landArea);
    if (!numLandArea || isNaN(numLandArea)) return 0;
    if (unit === "kanal") return numLandArea / 0.125;
    if (unit === "marla") return numLandArea / 0.00625;
    return numLandArea;
  };

  // Calculate inheritance shares
  const calculateInheritance = () => {
    const {
      totalLandArea,
      landUnit,
      totalCashAmount,
      spouse,
      numberOfSons,
      numberOfDaughters,
      motherAlive,
      fatherAlive,
    } = values;

    const landInAcres = totalLandArea
      ? convertToAcres(totalLandArea, landUnit)
      : 0;
    const totalWealth = {
      cash: totalCashAmount || 0,
      land: landInAcres || 0,
    };

    let spouseShare = { cash: 0, land: 0 };
    let motherShare = { cash: 0, land: 0 };
    let fatherShare = { cash: 0, land: 0 };
    let childrenShare = {
      sons: { cash: 0, land: 0 },
      daughters: { cash: 0, land: 0 },
    };

    if (spouse === "husband") {
      spouseShare.cash =
        totalWealth.cash * (numberOfSons || numberOfDaughters ? 1 / 4 : 1 / 2);
      spouseShare.land =
        totalWealth.land * (numberOfSons || numberOfDaughters ? 1 / 4 : 1 / 2);
    } else if (spouse === "wife") {
      spouseShare.cash =
        totalWealth.cash * (numberOfSons || numberOfDaughters ? 1 / 8 : 1 / 4);
      spouseShare.land =
        totalWealth.land * (numberOfSons || numberOfDaughters ? 1 / 8 : 1 / 4);
    }

    if (motherAlive) {
      motherShare.cash =
        totalWealth.cash *
        (numberOfSons || numberOfDaughters || fatherAlive ? 1 / 6 : 1 / 3);
      motherShare.land =
        totalWealth.land *
        (numberOfSons || numberOfDaughters || fatherAlive ? 1 / 6 : 1 / 3);
    }

    if (fatherAlive) {
      fatherShare.cash =
        numberOfSons || numberOfDaughters
          ? totalWealth.cash * (1 / 6)
          : totalWealth.cash - spouseShare.cash - motherShare.cash;
      fatherShare.land =
        numberOfSons || numberOfDaughters
          ? totalWealth.land * (1 / 6)
          : totalWealth.land - spouseShare.land - motherShare.land;
    }

    const remainingWealth = {
      cash:
        totalWealth.cash -
        spouseShare.cash -
        motherShare.cash -
        fatherShare.cash,
      land:
        totalWealth.land -
        spouseShare.land -
        motherShare.land -
        fatherShare.land,
    };

    if (numberOfSons > 0 || numberOfDaughters > 0) {
      const totalShares = 2 * numberOfSons + numberOfDaughters;
      const sonShare = {
        cash: (remainingWealth.cash * 2) / totalShares,
        land: (remainingWealth.land * 2) / totalShares,
      };
      const daughterShare = {
        cash: remainingWealth.cash / totalShares,
        land: remainingWealth.land / totalShares,
      };

      childrenShare = {
        sons: {
          cash: numberOfSons > 0 ? sonShare.cash : 0,
          land: numberOfSons > 0 ? sonShare.land : 0,
        },
        daughters: {
          cash: numberOfDaughters > 0 ? daughterShare.cash : 0,
          land: numberOfDaughters > 0 ? daughterShare.land : 0,
        },
      };
    }

    return {
      totalWealth,
      spouseShare: spouse ? spouseShare : null,
      motherShare: motherAlive ? motherShare : null,
      fatherShare: fatherAlive ? fatherShare : null,
      childrenShare:
        numberOfSons > 0 || numberOfDaughters > 0
          ? childrenShare
          : { sons: null, daughters: null },
    };
  };

  const { totalWealth, spouseShare, motherShare, fatherShare, childrenShare } =
    calculateInheritance();

  const convertLandShares = (landInAcres, unit) => {
    if (!landInAcres || landInAcres === 0) return "0.00";
    const converted = convertFromAcres(landInAcres, unit);
    const numConverted = Number(converted);
    return !isNaN(numConverted) ? numConverted.toFixed(2) : "0.00";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-green-500 py-4 sm:py-12">
          <h2 className="text-4xl font-extrabold text-center text-white">
            🕌 {t("islamicTools.inheritanceCalculator.title")}
          </h2>
        </div>
        <div className="p-8 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {formFields.map((field) => (
              <div key={field.name} className="flex flex-col space-y-2">
                <label
                  className="font-semibold text-gray-700 text-lg"
                  htmlFor={field.name}
                >
                  {t(`islamicTools.inheritanceCalculator.fields.${field.name}`)}
                </label>
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={values[field.name]}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:shadow-md"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {field.name === "landUnit"
                          ? t(
                              `islamicTools.inheritanceCalculator.units.${option}`
                            )
                          : t(
                              `islamicTools.inheritanceCalculator.spouseOptions.${option}`
                            )}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={values[field.name]}
                    onChange={handleChange}
                    className="w-5 h-5 accent-green-400 cursor-pointer"
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={values[field.name] || ""}
                    onChange={handleChange}
                    placeholder={t(
                      "islamicTools.inheritanceCalculator.placeholder"
                    )}
                    min={field.min}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:shadow-md"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-green-500 to-amber-600 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-semibold text-center mb-6">
              {t("islamicTools.inheritanceCalculator.shares")}
            </h3>
            <div className="space-y-4">
              <p className="text-xl font-medium">
                {t("islamicTools.inheritanceCalculator.totalWealth")} -{" "}
                {t("islamicTools.inheritanceCalculator.cash")}:{" "}
                <span className="font-bold">
                  PKR {Number(totalWealth.cash || 0).toFixed(2)}
                </span>
                , {t("islamicTools.inheritanceCalculator.land")}:{" "}
                <span className="font-bold">
                  {convertLandShares(totalWealth.land, values.landUnit)}{" "}
                  {t(
                    `islamicTools.inheritanceCalculator.units.${values.landUnit}`
                  )}
                </span>
              </p>
              {spouseShare !== null && (
                <p className="text-xl font-medium">
                  {t(
                    `islamicTools.inheritanceCalculator.spouseOptions.${values.spouse}`
                  )}{" "}
                  - {t("islamicTools.inheritanceCalculator.cash")}:{" "}
                  <span className="font-bold">
                    PKR {Number(spouseShare?.cash || 0).toFixed(2)}
                  </span>
                  , {t("islamicTools.inheritanceCalculator.land")}:{" "}
                  <span className="font-bold">
                    {convertLandShares(spouseShare?.land, values.landUnit)}{" "}
                    {t(
                      `islamicTools.inheritanceCalculator.units.${values.landUnit}`
                    )}
                  </span>
                </p>
              )}
              {motherShare !== null && (
                <p className="text-xl font-medium">
                  {t("islamicTools.inheritanceCalculator.mother")} -{" "}
                  {t("islamicTools.inheritanceCalculator.cash")}:{" "}
                  <span className="font-bold">
                    PKR {Number(motherShare?.cash || 0).toFixed(2)}
                  </span>
                  , {t("islamicTools.inheritanceCalculator.land")}:{" "}
                  <span className="font-bold">
                    {convertLandShares(motherShare?.land, values.landUnit)}{" "}
                    {t(
                      `islamicTools.inheritanceCalculator.units.${values.landUnit}`
                    )}
                  </span>
                </p>
              )}
              {fatherShare !== null && (
                <p className="text-xl font-medium">
                  {t("islamicTools.inheritanceCalculator.father")} -{" "}
                  {t("islamicTools.inheritanceCalculator.cash")}:{" "}
                  <span className="font-bold">
                    PKR {Number(fatherShare?.cash || 0).toFixed(2)}
                  </span>
                  , {t("islamicTools.inheritanceCalculator.land")}:{" "}
                  <span className="font-bold">
                    {convertLandShares(fatherShare?.land, values.landUnit)}{" "}
                    {t(
                      `islamicTools.inheritanceCalculator.units.${values.landUnit}`
                    )}
                  </span>
                </p>
              )}
              {childrenShare.sons !== null && (
                <p className="text-xl font-medium">
                  {t("islamicTools.inheritanceCalculator.sons")} -{" "}
                  {t("islamicTools.inheritanceCalculator.cash")}:{" "}
                  <span className="font-bold">
                    PKR {childrenShare?.sons?.cash?.toFixed(2)}
                  </span>
                  , {t("islamicTools.inheritanceCalculator.land")}:{" "}
                  <span className="font-bold">
                    {convertLandShares(
                      childrenShare?.sons?.land,
                      values.landUnit
                    )}{" "}
                    {t(
                      `islamicTools.inheritanceCalculator.units.${values.landUnit}`
                    )}
                  </span>
                </p>
              )}
              {childrenShare.daughters !== null && (
                <p className="text-xl font-medium">
                  {t("islamicTools.inheritanceCalculator.daughters")} -{" "}
                  {t("islamicTools.inheritanceCalculator.cash")}:{" "}
                  <span className="font-bold">
                    PKR {Number(childrenShare?.daughters?.cash || 0).toFixed(2)}
                  </span>
                  , {t("islamicTools.inheritanceCalculator.land")}:{" "}
                  <span className="font-bold">
                    {convertLandShares(
                      childrenShare?.daughters?.land,
                      values.landUnit
                    )}{" "}
                    {t(
                      `islamicTools.inheritanceCalculator.units.${values.landUnit}`
                    )}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InheritanceCalculator;
