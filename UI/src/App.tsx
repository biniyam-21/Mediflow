import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import AllMeds from "./pages/viewall";
import VendorDashboard from "./pages/VendorDashboard";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";

import "./App.css";
import medContext, { MedContextType } from "./components/context";
import { Medicine } from "./types";
import { getAllMedicines } from "./services/medicineService";

const App: React.FC = () => {
  const [searchedMed, setSearchedMed] = useState<Medicine[]>(getAllMedicines());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const contextValue: MedContextType = [
    searchedMed,
    setSearchedMed,
    searchQuery,
    setSearchQuery,
  ];

  return (
    <BrowserRouter>
      <medContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/product" element={<AllMeds />} />
          <Route path="/vendordashboard" element={<VendorDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </medContext.Provider>
    </BrowserRouter>
  );
};

export default App;
