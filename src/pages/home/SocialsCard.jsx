import React from "react";
import SocialMediaCard from "../../components/AppComponents/Home/SocialMediaCard";

const SocialsCard = () => {
  const Socials = [
    { PlatformName: "Youtube", Followers: "45k" },
    { PlatformName: "Instagram", Followers: "45k" },
    { PlatformName: "Vimeo", Followers: "45k" },
    { PlatformName: "Skype", Followers: "45k" },
    { PlatformName: "X", Followers: "45k" },
    { PlatformName: "LinkedIn", Followers: "45k" },
    { PlatformName: "Dribble", Followers: "45k" },
  ];

  return (
    <div className="rounded-md bg-white shadow-lg p-5 mb-10">
      <div className="item items-center flex justify-center border py-2 rounded-full w-full">
        <h3 className="text-xl font-bold">Follow Us</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Socials.map((social, index) => (
          <SocialMediaCard
            key={index} // Use a unique key for each item
            PlatformName={social.PlatformName}
            Followers={social.Followers}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialsCard;
