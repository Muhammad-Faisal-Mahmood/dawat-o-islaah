import React, { useState } from "react";

const ZakatCalculator = () => {
  const [values, setValues] = useState({
    cashAtHome: null,
    bankAccountBalance: null,
    stocksAndEquities: null,
    profitsAndInventory: null,
    goldAndSilver: null,
    investmentProperty: null,
    AnyOtherIncome: null,
    debts: null,
    expenses: null,
  });

  // ✅ Format numbers with thousands separator
  const formatNumber = (num) => {
    if (num === null || isNaN(num)) return ""; // Show empty string if value is null
    return new Intl.NumberFormat("en-US").format(num);
  };

  // ✅ Parse number safely, handling empty inputs
  const parseNumber = (value) => {
    const numericValue = parseFloat(value.replace(/,/g, "")); // Remove commas before parsing
    return isNaN(numericValue) ? null : numericValue; // Convert empty input to null
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: parseNumber(value), // Store number safely
    }));
  };

  const totalWealth =
    (values.cashAtHome || 0) +
    (values.bankAccountBalance || 0) +
    (values.stocksAndEquities || 0) +
    (values.profitsAndInventory || 0) +
    (values.goldAndSilver || 0) +
    (values.investmentProperty || 0) +
    (values.AnyOtherIncome || 0);

  const totalDeductions = (values.debts || 0) + (values.expenses || 0);
  const eligibleAmount = Math.max(totalWealth - totalDeductions, 0); // Ensure no negative values
  const zakatAmount = eligibleAmount * 0.025;

  return (
    <div className="min-h-screen my-12 bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-[0px_5px_40px_rgba(0,0,0,0.2)] overflow-hidden">
        <div className="bg-green-500 text-white py-2 sm:py-6 px-8 text-center">
          <div className="justify-center sm:flex ">
            <h2 className="text-4xl font-extrabold tracking-wide py-2 sm:p-0">
              💰
            </h2>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide">
              Zakat Calculator
            </h2>
          </div>
          <p className="text-base sm:text-lg font-light mt-2">
            Calculate your Zakat easily with this tool.
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.keys(values).map((key) => (
              <div key={key} className="flex flex-col space-y-2">
                <label
                  className="font-semibold text-gray-700 text-lg"
                  htmlFor={key}
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace("cash At", "Cash at")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formatNumber(values[key])} // Show formatted value
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:shadow-md"
                  placeholder="Enter amount"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-amber-500 to-green-600 p-6 sm:p-8 rounded-xl text-white shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-2 sm:mb-6">
              Total Summary
            </h3>
            <div className="space-y-2 sm:space-y-4">
              <p className="text-xl font-medium text-center">
                Amount Eligible for Zakat:{" "}
                <span className="font-bold">
                  PKR {formatNumber(eligibleAmount)}
                </span>
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-center">
                Your Zakat (2.5%):{" "}
                <span className="text-yellow-300">
                  PKR {formatNumber(Math.ceil(zakatAmount))}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg transform hover:scale-105 cursor-pointer"
              onClick={() =>
                setValues({
                  cashAtHome: null,
                  bankAccountBalance: null,
                  stocksAndEquities: null,
                  profitsAndInventory: null,
                  goldAndSilver: null,
                  investmentProperty: null,
                  AnyOtherIncome: null,
                  debts: null,
                  expenses: null,
                })
              }
            >
              Reset Values
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
