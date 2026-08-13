import React, { useEffect, useState } from "react";
import NavbarOne from "../components/NavbarOne";
import Footer from "../components/Footer";
import ResultCard from "../components/ResultCard";
import { Box, Typography } from "@mui/material";
import {
  Center,
  Grid,
  SimpleGrid,
  Image,
  Text,
  Button,
  Accordion,
  Card,
  Stack,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import { getAllMedicines, getMedicineById } from "../services/medicineService";
import { Medicine } from "../types";

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const [medicine, setMedicine] = useState<Medicine[]>([]);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);

  useEffect(() => {
    const meds = getAllMedicines();
    setMedicine(meds);
    if (location.state?.id) {
      const found = getMedicineById(location.state.id);
      if (found) setSelectedMed(found);
    } else {
      setSelectedMed(meds[0]);
    }
  }, [location.state]);

  const displayMed = selectedMed || (medicine[0] ? medicine[0] : null);

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <NavbarOne />
      </div>

      <Center>
        <h1 className="sub_head_text">
          Product Details:
          <br className="max-md:hidden" />
        </h1>
      </Center>

      <Center maw={1100} pt={30} pb={10} mx="auto">
        <Grid columns={12} mx="auto">
          <Grid.Col span={5}>
            <Card w={260} h={335} withBorder>
              <Image
                w={260}
                h={335}
                my="auto"
                mx="auto"
                radius="md"
                src={displayMed?.ImageUrl || "https://cdn01.pharmeasy.in/dam/products/064425/ecosprin-75mg-strip-of-14-tablets-1-1647434835.jpg?dim=320x320&dpr=1&q=100"}
                alt="Product image"
              />
            </Card>
          </Grid.Col>

          {/* here we start name price and add to cart section */}
          <Grid.Col span={7}>
            <Card withBorder pl={40}>
              <Stack
                align="flex-start"
                justify="flex-start"
                spacing="xs"
                h={300}
              >
                <Text fz="xl">{displayMed?.Title || "Ecosprin 75mg Strip Of 14 Tablets"}</Text>
                <Text c="dimmed">By {displayMed?.PharmacyName || displayMed?.City || "a Certain vendor"}</Text>
                <Text fz="lg">{displayMed?.Unit || "14 Tablet(s) in Strip"}</Text>
                <Button variant="light" color="green">
                  {displayMed?.Price || "Tsh 13,000"}{" "}
                  <Text c="Red" pl={10}>
                    {displayMed?.Discount || "15% OFF"}
                  </Text>
                </Button>
                <Text fz="xs">Extra small information to be added</Text>
                <button className="green_btn">BUY NOW</button>
                <Text fz="sm" fw={500}>
                  Delivery by Today, 5:00 pm - 10:00 pm
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Center>

      {/* description and product summary */}
      <Center maw={900} pt={30} pb={10} mx="auto">
        <Card pl={30} w={900} withBorder>
          <Accordion defaultValue="Description">
            <Accordion.Item value="Description">
              <Accordion.Control fw={700} fz="xl">
                {displayMed?.Title || "Ecosprin 75 MG"} Description{" "}
              </Accordion.Control>
              <Accordion.Panel>
                {displayMed?.Description || "Ecosprin 75 tablet is an antiplatelet medicine. It is used to prevent the risk of heart attacks, stroke and angina. It is also used in patients who have had angioplasty. Blood clots can limit or block the passage of blood to essential organs, resulting in a heart attack or stroke."}
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="Uses">
              <Accordion.Control fw={700} fz="xl">
                Uses
              </Accordion.Control>
              <Accordion.Panel>
                {displayMed?.Uses || "Uses of Ecosprin 75 MG For prevention of heart attack, clot-related stroke (ischemic), heart conditions like stable or unstable angina (chest pain)."}
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="Contraindications">
              <Accordion.Control fw={700} fz="xl">
                Contraindications{" "}
              </Accordion.Control>
              <Accordion.Panel>
                {Array.isArray(displayMed?.Contraindications) ? (
                  displayMed?.Contraindications.map((c, i) => <li key={i}>{c}</li>)
                ) : (
                  <>
                    <li>If you are allergic to aspirin or other ingredients of Ecosprin 75 tablet.</li>
                    <li>If you have an active bleeding or clotting disorder like haemophilia and low platelet count.</li>
                    <li>If you have a history of ulcers or bleeding in the stomach or small intestine.</li>
                    <li>If you have gout, liver or kidney disorder or bleeding in the brain.</li>
                    <li>If you are pregnant (last three months) or breastfeeding.</li>
                    <li>Taking medicines for cancer or rheumatoid arthritis-like methotrexate.</li>
                  </>
                )}
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="Side effects">
              <Accordion.Control fw={700} fz="xl">
                Side effects
              </Accordion.Control>
              <Accordion.Panel>
                {Array.isArray(displayMed?.SideEffects) ? (
                  displayMed?.SideEffects.map((s, i) => <li key={i}>{s}</li>)
                ) : (
                  <>
                    <li>Indigestion</li>
                    <li>Nausea</li>
                    <li>Vomiting</li>
                    <li>Diarrhoea</li>
                    <li>Increased risk of bleeding</li>
                  </>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Text fz="md"></Text>
        </Card>
      </Center>

      <Center pt={30}>
        <Text fz="xl" fw={700}>
          Other suggestions For you:
        </Text>
      </Center>

      <Center maw={900} pt={30} pb={10} mx="auto">
        <SimpleGrid cols={4}>
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
            medicine.slice(0, 8).map((c) => {
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

      <Footer />
    </main>
  );
};

export default ProductDetails;
