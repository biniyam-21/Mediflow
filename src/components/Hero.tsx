import React, { useState, useEffect } from "react";
import TypewriterComponent from "typewriter-effect";
import { MediFlow } from "../assets";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconLogout, IconUser } from "@tabler/icons-react";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userLoggedIn") === "true");
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-8 pt-1">
        <img
          src={MediFlow}
          alt="MediFlow Logo"
          className="w-28 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="flex justify-between items-center space-x-6">
          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            onClick={() => navigate("/")}
          >
            Search
          </button>

          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            onClick={() => navigate("/product")}
          >
            All
          </button>

          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors flex items-center gap-1"
            onClick={handleAuthAction}
          >
            {isLoggedIn ? (
              <>
                <IconLogout size={16} /> Logout
              </>
            ) : (
              <>
                <IconUser size={16} /> Login
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              window.open(
                "https://github.com/Team-clear/pharmacySupplyChainManagementSystem",
                "_blank"
              )
            }
            className="black_btn"
          >
            GitHub
          </button>
        </div>
      </nav>

      <h1 className="head_text">
        medical supplies <br className="max-md:hidden" />
        <span className="orange_gradient">Management system</span>
      </h1>
      <h2 className="desc">
        <TypewriterComponent
          options={{
            strings: [
              "Welcome an online system for Health centers and pharmacies to order medicines and equipment from their suppliers.",
            ],
            autoStart: true,
          }}
        />
      </h2>
      <br />
      <h2 className="desc">
        <Typography variant="h4" sx={{ color: "#4b5563" }}>
          What are you looking for?
        </Typography>
      </h2>
    </header>
  );
};

export default Hero;
