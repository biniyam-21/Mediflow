import React, { useEffect, useState } from "react";
import NavbarOne from "../components/NavbarOne";
import Footer from "../components/Footer";
import ResultCard from "../components/ResultCard";
import { Center, Container, SimpleGrid } from "@mantine/core";
import { Box, Typography } from "@mui/material";
import { getAllMedicines } from "../services/medicineService";
import { Medicine } from "../types";

const AllMeds: React.FC = () => {
  const [medicine, setMedicine] = useState<Medicine[]>([]);

  useEffect(() => {
    setMedicine(getAllMedicines());
  }, []);

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <NavbarOne />
        <Center>
          <h1 className="sub_head_text">
            Search Results for:
            <br className="max-md:hidden" />
          </h1>
        </Center>
        <Container>
          <Center maw={1100} mx="auto" pt={30}>
            <SimpleGrid cols={3}>
              {medicine.length === 0 ? (
                <div
                  style={{
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Box>
                      <Typography variant="h5">
                        No medicine available
                      </Typography>
                    </Box>
                  </div>
                </div>
              ) : (
                medicine.map((c) => {
                  return (
                    <ResultCard
                      key={c._id}
                      Title={c.Title}
                      pharmacy={c.City}
                      id={c._id}
                      url={c.ImageUrl}
                    />
                  );
                })
              )}
            </SimpleGrid>
          </Center>
        </Container>
      </div>

      <Footer />
    </main>
  );
};

export default AllMeds;
