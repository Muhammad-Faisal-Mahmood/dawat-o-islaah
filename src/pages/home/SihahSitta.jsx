import SihahSittaGrid from "../../components/AppComponents/Home/SihahSittaGrid";

const SihahSitta = () => {
  const sihahSitta = [
    { title: "جامع الترمذي", transliteration: "Jami' at-Tirmidhi", link: "#" },
    { title: "صحيح البخاري", transliteration: "Sahih al-Bukhari", link: "#" },
    { title: "صحيح مسلم", transliteration: "Sahih Muslim", link: "#" },
    { title: "سنن أبي داود", transliteration: "Sunan Abi Dawood", link: "#" },
    { title: "سنن النسائي", transliteration: "Sunan an-Nasa'i", link: "#" },
    { title: "سنن ابن ماجه", transliteration: "Sunan Ibn Majah", link: "#" },
  ];

  return (
    <div className="px-10 sm:px-14 md:px-20 lg:px-32 flex flex-col gap-y-10">
      <h2 className="text-center font-bold text-2xl sm:text-3xl mb-4">
        SIHAH SITTA
      </h2>
      <SihahSittaGrid books={sihahSitta} />
      <div className="text-center mt-4">
        <button className="px-4 py-2 bg-[#1E3A5F] uppercase font-bold text-white rounded">
          View All Books
        </button>
      </div>
    </div>
  );
};

export default SihahSitta;
