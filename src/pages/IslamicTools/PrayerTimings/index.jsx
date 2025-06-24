import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const PrayerTimings = () => {
  const { t } = useLanguage();
  const [city, setCity] = useState("Lahore"); // default city
  const [timings, setTimings] = useState(null);

  // The order in which to display the prayers
  const prayersOrder = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Sunset",
    "Maghrib",
    "Isha",
    "Imsak",
    "Midnight",
    "Firstthird",
    "Lastthird",
  ];

  const handleGetTimings = async () => {
    try {
      // If city is Dubai, use country=UAE, otherwise PK
      const country = city === "Dubai" ? "UAE" : "PK";

      // Hard-coded date for demonstration: 16-03-2025
      const date = "16-03-2025";

      // Construct the API URL
      const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=${country}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.code === 200) {
        setTimings(data.data.timings);
      } else {
        alert("Error fetching prayer timings. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching prayer timings. Check console for details.");
    }
  };

  return (
    <div className="flex justify-center items-center my-12 ">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {t("islamicTools.prayerTimings.title")}
        </h1>

        {/* City Dropdown */}
        <label htmlFor="citySelect" className="block mb-2 font-semibold">
          {t("islamicTools.prayerTimings.selectCity")}
        </label>
        <select
          id="citySelect"
          className="w-full border border-gray-300 rounded p-3 mb-4 outline-none focus:ring-2 focus:ring-green-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="Lahore">
            {t("islamicTools.prayerTimings.cities.Lahore")}
          </option>
          <option value="Islamabad">
            {t("islamicTools.prayerTimings.cities.Islamabad")}
          </option>
          <option value="Karachi">
            {t("islamicTools.prayerTimings.cities.Karachi")}
          </option>
          <option value="Dubai">
            {t("islamicTools.prayerTimings.cities.Dubai")}
          </option>
        </select>

        {/* Button to fetch timings */}
        <button
          onClick={handleGetTimings}
          className="w-full bg-green-500 cursor-pointer text-white py-2 px-4 rounded "
        >
          {t("islamicTools.prayerTimings.getTimings")}
        </button>

        {/* Display Timings Table if timings are available */}
        {timings && (
          <div className="mt-6">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="p-2 border border-gray-200">
                    {t("islamicTools.prayerTimings.prayer")}
                  </th>
                  <th className="p-2 border border-gray-200">
                    {t("islamicTools.prayerTimings.time")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {prayersOrder.map((prayer) => (
                  <tr key={prayer} className="hover:bg-gray-100">
                    <td className="p-2 border border-gray-200 font-semibold">
                      {t(`islamicTools.prayerTimings.prayerNames.${prayer}`)}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {timings[prayer] || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerTimings;
