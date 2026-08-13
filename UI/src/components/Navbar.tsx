import React, { useState, useEffect } from "react";
import { logo } from "../assets";
import { useNavigate } from "react-router-dom";
import { IconLogout, IconUser } from "@tabler/icons-react";

const Navbar: React.FC = () => {
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
          src={logo}
          alt="sumz_logo"
          className="w-28 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="flex items-center space-x-6">
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
    </header>
  );
};

export default Navbar;
