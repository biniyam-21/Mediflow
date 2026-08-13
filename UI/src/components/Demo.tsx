import React, { useState, useContext, FormEvent } from "react";
import { searchIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import medContext from "./context";
import { searchMedicines } from "../services/medicineService";

const Demo: React.FC = () => {
  const [medicine, setMedicine] = useState("");
  const navigate = useNavigate();
  const context = useContext(medContext);
  const setSearched = context ? context[1] : undefined;

  function searchMedicine(e?: FormEvent) {
    if (e) e.preventDefault();
    const results = searchMedicines(medicine);
    if (setSearched) {
      setSearched(results);
    }
    navigate("/searchresults");
  }

  return (
    <div className="w-full max-w-xl mx-auto my-4">
      <form
        className="relative flex justify-center items-center w-full"
        onSubmit={searchMedicine}
      >
        <input
          type="text"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          autoFocus
          required
          className="url_input peer"
        />
        <button
          type="submit"
          className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
        >
          <img
            src={searchIcon}
            alt="search-icon"
            className="w-4 h-4 object-contain"
          />
        </button>
      </form>
    </div>
  );
};

export default Demo;
