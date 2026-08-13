import React, { useState, useEffect } from "react";
import TypewriterComponent from "typewriter-effect";
import { MediFlow } from "../assets";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconUser, IconShoppingCart } from "@tabler/icons-react";
import { getSession } from "../services/authService";
import { useCart } from "../context/CartContext";
import { NavProfileDropdown } from "./NavProfileDropdown";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(getSession());
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    setSession(getSession());
  }, []);

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
            All Medicines
          </button>

          {/* Cart Icon in Navbar */}
          <button
            type="button"
            onClick={openCart}
            style={{
              position: "relative",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.15s ease",
            }}
            title="Open Quick Cart"
          >
            <IconShoppingCart size={18} color="#15803d" />
            {itemCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  background: "#16a34a",
                  color: "white",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid white",
                }}
              >
                {itemCount}
              </span>
            )}
          </button>

          {/* User Logged-in State: Shadcn Nav Profile Dropdown */}
          {session.isLoggedIn ? (
            <NavProfileDropdown />
          ) : (
            <button
              type="button"
              className="btn-primary"
              style={{ padding: "7px 16px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 5 }}
              onClick={() => navigate("/login")}
            >
              <IconUser size={16} /> Login
            </button>
          )}
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
