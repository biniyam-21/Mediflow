import React, { useState, useContext, FormEvent } from "react";
import Sidebar from "../components/Sidebar";
import NavbarOne from "../components/NavbarOne";
import Header from "../components/Header";
import { Card, Grid, Button, Table, Badge } from "@mantine/core";
import { TextField, Box } from "@mui/material";
import { getAllMedicines, addMedicine, deleteMedicine } from "../services/medicineService";
import { Medicine } from "../types";
import medContext from "../components/context";

const AdminPanel: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(getAllMedicines());
  const context = useContext(medContext);
  const setSearched = context ? context[1] : undefined;

  // Form fields
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleAddMedicine = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const added = addMedicine({
      Title: title,
      City: city || "Dar es Salaam",
      PharmacyName: pharmacyName || "Central Medical Depot",
      Price: price.includes("Tsh") ? price : `${price} Tsh`,
      Unit: unit || "10 Tablets in Strip",
      ImageUrl: imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
      Description: description || "Pharmaceutical supply item registered via admin portal.",
      Uses: "Bacterial or general relief treatment.",
      InStock: true,
    });

    const updated = getAllMedicines();
    setMedicines([...updated]);
    if (setSearched) {
      setSearched([...updated]);
    }

    // Clear form
    setTitle("");
    setCity("");
    setPharmacyName("");
    setPrice("");
    setUnit("");
    setImageUrl("");
    setDescription("");
  };

  const handleDelete = (id: string) => {
    const updated = deleteMedicine(id);
    setMedicines([...updated]);
    if (setSearched) {
      setSearched([...updated]);
    }
  };

  return (
    <div>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <NavbarOne />
      </div>

      <Grid columns={2}>
        <Sidebar span={2} />
        <Card miw={860} mx="auto" p={30} withBorder>
          <Header px={10} py={10} span={10} category="App" title="Update Inventory" />

          {/* Add Medicine Form */}
          <Box component="form" onSubmit={handleAddMedicine} sx={{ mb: 4 }}>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Add New Medicine</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                label="Medicine Title *"
                variant="outlined"
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Price (e.g. 12,000 Tsh) *"
                variant="outlined"
                size="small"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Pharmacy / Vendor Name"
                variant="outlined"
                size="small"
                value={pharmacyName}
                onChange={(e) => setPharmacyName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Location / City"
                variant="outlined"
                size="small"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
              <TextField
                label="Packaging Unit (e.g. 10 Tablets)"
                variant="outlined"
                size="small"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                fullWidth
              />
              <TextField
                label="Image URL"
                variant="outlined"
                size="small"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                fullWidth
              />
            </div>
            <TextField
              label="Description"
              variant="outlined"
              size="small"
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button type="submit" color="green" radius="md">
              Load Medicine to Inventory
            </Button>
          </Box>

          <hr className="my-6 border-gray-200" />

          {/* Medicines Inventory Table */}
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            Current Loaded Medicines ({medicines.length})
          </h3>
          <div style={{ overflowX: "auto" }}>
            <Table horizontalSpacing="md" verticalSpacing="xs" fontSize="sm" highlightOnHover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location / Vendor</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med._id}>
                    <td style={{ fontWeight: 600 }}>{med.Title}</td>
                    <td>{med.City}</td>
                    <td>{med.Price || "3,000 Tsh"}</td>
                    <td>
                      <Badge color={med.InStock ? "green" : "red"} variant="light">
                        {med.InStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline"
                        color="red"
                        size="xs"
                        onClick={() => handleDelete(med._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default AdminPanel;
