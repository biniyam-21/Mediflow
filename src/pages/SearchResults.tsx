import React, { useContext } from "react";
import NavbarOne from "../components/NavbarOne";
import Footer from "../components/Footer";
import ResultCard from "../components/ResultCard";
import { Center, Container, SimpleGrid } from "@mantine/core";
import medContext from "../components/context";
import { Box, Typography } from "@mui/material";
import { Medicine } from "../types";

const SearchResults: React.FC = () => {
  const context = useContext(medContext);
  const searchedMed: Medicine[] = context ? context[0] : [];

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
              {searchedMed.length === 0 ? (
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
                searchedMed.map((c) => {
                  return (
                    <ResultCard
                      key={c._id}
                      Title={c.Title}
                      pharmacy={c.City}
                      id={c._id}
                      url={c.ImageUrl}
                      price={c.Price}
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

export default SearchResults;
