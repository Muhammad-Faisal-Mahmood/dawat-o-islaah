import React from "react";
import { AiFillYoutube } from "react-icons/ai";
import {
  FaDribbble,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaSkype,
  FaVimeo,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaCard = ({ PlatformName, Followers }) => {
  const iconColors = {
    Facebook: "bg-blue-600 border-blue-400",
    Instagram: "bg-purple-600 border-purple-400",
    LinkedIn: "bg-blue-600 border-blue-400",
    X: "bg-gray-600 border-gray-400",
    Skype: "bg-blue-600 border-blue-400",
    Youtube: "bg-red-600 border-red-400",
    Dribble: "bg-pink-600 border-pink-400",
    Vimeo: "bg-blue-600 border-blue-400",
  };

  const platformClass =
    iconColors[PlatformName] || "bg-gray-600 border-gray-400";
  return (
    <div
      className={`rounded-md ${
        platformClass.split(" ")[1]
      } flex items-center space-x-2 border w-fit p-4`}
    >
      <div className={`${platformClass.split(" ")[0]} rounded-full p-2`}>
        {PlatformName == "Facebook" && (
          <FaFacebookF className="text-white" size={32} />
        )}
        {PlatformName == "X" && <FaXTwitter className="text-white" size={32} />}
        {PlatformName == "Instagram" && (
          <FaInstagram className="text-white" size={32} />
        )}
        {PlatformName == "Youtube" && (
          <AiFillYoutube className="text-white" size={32} />
        )}
        {PlatformName == "LinkedIn" && (
          <FaLinkedin className="text-white" size={32} />
        )}
        {PlatformName == "Dribble" && (
          <FaDribbble className="text-white" size={32} />
        )}
        {PlatformName == "Vimeo" && (
          <FaVimeo className="text-white" size={32} />
        )}
        {PlatformName == "Skype" && (
          <FaSkype className="text-white" size={32} />
        )}
      </div>
      <div>
        <h1 className="text-lg font-semibold">{Followers}</h1>
        <p className="text-base font-medium"> Followers</p>
      </div>
    </div>
  );
};

export default SocialMediaCard;
