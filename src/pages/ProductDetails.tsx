import React, { useEffect, useState } from "react";
import NavbarOne from "../components/NavbarOne";
import Footer from "../components/Footer";
import ResultCard from "../components/ResultCard";
import ColdChainTracker from "../components/ColdChainTracker";
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
import { useLocation, useNavigate } from "react-router-dom";
import { getAllMedicines, getMedicineById } from "../services/medicineService";
import { isFavorite, toggleFavorite } from "../services/favoriteService";
import { useToast } from "../context/ToastContext";
import { IconHeart, IconHeartFilled, IconStar, IconStarFilled, IconSend, IconBuildingHospital } from "@tabler/icons-react";
import { Medicine } from "../types";

interface Review {
  id: string;
  author: string;
  hospital: string;
  rating: number;
  date: string;
  comment: string;
}

const mockReviews: Review[] = [
  {
    id: "r1",
    author: "Dr. Abera Worku",
    hospital: "Tikur Anbessa Specialized Hospital",
    rating: 5,
    date: "August 10, 2026",
    comment: "Excellent batch quality and temperature logs were fully compliant upon arrival. Will reorder monthly.",
  },
  {
    id: "r2",
    author: "Pharm. Tigist Haile",
    hospital: "St. Paul's Hospital Millennium Medical College",
    rating: 5,
    date: "July 28, 2026",
    comment: "Verified FMHACA barcode and long shelf life (expires 2028). Fast dispatch from Addis Ababa depot.",
  },
  {
    id: "r3",
    author: "Dr. Solomon Tadesse",
    hospital: "Hawassa Referral Hospital",
    rating: 4,
    date: "July 15, 2026",
    comment: "Good delivery, cold chain packaging maintained 4.2°C all through transit to Hawassa.",
  },
];

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [medicine, setMedicine] = useState<Medicine[]>([]);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);

  const [bookmarked, setBookmarked] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    const meds = getAllMedicines();
    setMedicine(meds);

    let active: Medicine | null = null;
    if (location.state?.id) {
      active = getMedicineById(location.state.id) || null;
    }
    if (!active && meds.length > 0) active = meds[0];

    setSelectedMed(active);

    if (active) {
      setBookmarked(isFavorite(active._id));
    }
  }, [location.state]);

  const displayMed = selectedMed || (medicine[0] ? medicine[0] : null);

  const handleToggleBookmark = () => {
    if (!displayMed) return;
    const isFavNow = toggleFavorite(displayMed._id);
    setBookmarked(isFavNow);
    if (isFavNow) {
      showToast(`Saved "${displayMed.Title}" to Favorites!`, "success");
    } else {
      showToast(`Removed "${displayMed.Title}" from Favorites`, "info");
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const userOrg = localStorage.getItem("userOrg") || "Regional Hospital";
    const userName = localStorage.getItem("userName") || "Pharmacist";

    const created: Review = {
      id: Date.now().toString(),
      author: userName,
      hospital: userOrg,
      rating: newRating,
      date: new Date().toLocaleDateString("en-ET", { day: "numeric", month: "long", year: "numeric" }),
      comment: newReviewText.trim(),
    };

    setReviews([created, ...reviews]);
    setNewReviewText("");
    showToast("Thank you! Your hospital review has been submitted.", "success");
  };

  const isColdChain = displayMed?.isColdChain ||
    displayMed?.Title.toLowerCase().includes("insulin") ||
    displayMed?.Title.toLowerCase().includes("vaccine") ||
    displayMed?.Title.toLowerCase().includes("oxytocin");

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
            <Card w={260} h={335} withBorder style={{ position: "relative" }}>
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

          {/* Product basic details */}
          <Grid.Col span={7}>
            <Card withBorder pl={40} style={{ position: "relative" }}>
              {/* Bookmark Heart Button Top Right */}
              <button
                onClick={handleToggleBookmark}
                style={{
                  position: "absolute", top: 16, right: 16,
                  background: bookmarked ? "#fee2e2" : "var(--surface-2)",
                  border: `1px solid ${bookmarked ? "#fecaca" : "var(--border)"}`,
                  borderRadius: "50%", width: 38, height: 38, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s"
                }}
                title={bookmarked ? "Saved in Favorites" : "Save to Favorites"}
              >
                {bookmarked ? <IconHeartFilled size={20} color="#ef4444" /> : <IconHeart size={20} color="#64748b" />}
              </button>

              <Stack
                align="flex-start"
                justify="flex-start"
                spacing="xs"
                h={300}
              >
                <Text fz="xl" fw={700} style={{ paddingRight: 40 }}>{displayMed?.Title || "Ecosprin 75mg Strip Of 14 Tablets"}</Text>

                {/* Rating badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "2px 0" }}>
                  <div style={{ display: "flex", color: "#f59e0b" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconStarFilled key={star} size={15} />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>4.8</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>({reviews.length} hospital reviews)</span>
                </div>

                <Text c="dimmed">By {displayMed?.PharmacyName || displayMed?.City || "Ethiopian Medical Supplier"}</Text>
                <Text fz="lg">{displayMed?.Unit || "14 Tablet(s) in Strip"}</Text>
                <Button variant="light" color="green">
                  {displayMed?.Price || "500 ETB"}{" "}
                  <Text c="Red" pl={10}>
                    {displayMed?.Discount || "15% OFF"}
                  </Text>
                </Button>
                <Text fz="xs" c="dimmed">FMHACA Verified Drug · Batch Traceable</Text>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button
                    className="green_btn"
                    onClick={() => {
                      showToast(`Added "${displayMed?.Title}" to cart!`, "success");
                      navigate("/cart");
                    }}
                  >
                    ADD TO CART / BUY NOW
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => navigate("/favorites")}
                    style={{ fontSize: "0.8rem", padding: "8px 14px" }}
                  >
                    Go to Fast Reorder
                  </button>
                </div>

                <Text fz="sm" fw={500} style={{ marginTop: 6 }}>
                  Delivery by 2-3 business days across Ethiopia
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Center>

      {/* Cold chain telemetry section if cold-chain item */}
      {isColdChain && (
        <Center maw={900} pt={20} pb={10} mx="auto">
          <div style={{ width: "100%" }}>
            <ColdChainTracker
              medicineId={displayMed?._id || "med-004"}
              medicineName={displayMed?.Title}
            />
          </div>
        </Center>
      )}

      {/* description and product summary */}
      <Center maw={900} pt={20} pb={10} mx="auto">
        <Card pl={30} w={900} withBorder>
          <Accordion defaultValue="Description">
            <Accordion.Item value="Description">
              <Accordion.Control fw={700} fz="xl">
                {displayMed?.Title || "Medicine"} Description
              </Accordion.Control>
              <Accordion.Panel>
                {displayMed?.Description || "Ecosprin 75 tablet is an antiplatelet medicine. It is used to prevent the risk of heart attacks, stroke and angina. It is also used in patients who have had angioplasty."}
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="Uses">
              <Accordion.Control fw={700} fz="xl">
                Uses
              </Accordion.Control>
              <Accordion.Panel>
                {displayMed?.Uses || "Uses of medicine for prevention of medical complications as prescribed by a licensed Ethiopian physician."}
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="Contraindications">
              <Accordion.Control fw={700} fz="xl">
                Contraindications
              </Accordion.Control>
              <Accordion.Panel>
                {Array.isArray(displayMed?.Contraindications) ? (
                  displayMed?.Contraindications.map((c, i) => <li key={i}>{c}</li>)
                ) : (
                  <>
                    <li>If you are allergic to active pharmaceutical ingredients of this medicine.</li>
                    <li>If you have severe liver, kidney, or bleeding disorders.</li>
                    <li>If taking conflicting medications without medical supervision.</li>
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
                    <li>Mild nausea or indigestion</li>
                    <li>Headache or dizziness</li>
                  </>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Card>
      </Center>

      {/* Hospital Reviews Section */}
      <Center maw={900} pt={20} pb={10} mx="auto">
        <Card pl={30} pr={30} pt={24} pb={24} w={900} withBorder>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>Verified Hospital & Pharmacy Reviews</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 2 }}>
                Quality & cold-chain ratings from Ethiopian health facility pharmacists
              </div>
            </div>
            <div style={{ background: "#fef3c7", padding: "6px 14px", borderRadius: 999, fontWeight: 800, color: "#b45309", fontSize: "0.85rem" }}>
              ★ 4.8 / 5.0 Rating
            </div>
          </div>

          {/* Reviews list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            {reviews.map((rev) => (
              <div key={rev.id} style={{ background: "#f8fafc", padding: 14, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)" }}>{rev.author}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--primary-dark)", marginLeft: 8, fontWeight: 600 }}>
                      <IconBuildingHospital size={12} style={{ verticalAlign: -1 }} /> {rev.hospital}
                    </span>
                  </div>
                  <div style={{ display: "flex", color: "#f59e0b" }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <IconStarFilled key={i} size={13} />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{rev.comment}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 6 }}>{rev.date}</div>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} style={{ background: "var(--surface-2)", padding: 16, borderRadius: 10, border: "1px solid var(--border)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: 10, color: "var(--text-primary)" }}>
              Submit a Hospital Quality Review
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>Your Rating:</span>
              <div style={{ display: "flex", gap: 4, cursor: "pointer" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    style={{ background: "none", border: "none", padding: 2, cursor: "pointer", color: star <= newRating ? "#f59e0b" : "#cbd5e1" }}
                  >
                    <IconStarFilled size={18} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="form-input"
              rows={3}
              placeholder="Write feedback regarding batch quality, packaging, or delivery lead time..."
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              required
              style={{ marginBottom: 12 }}
            />

            <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", padding: "8px 16px" }}>
              <IconSend size={15} /> Post Review
            </button>
          </form>
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
              <Box>
                <Typography variant="h5">
                  No medicine available
                </Typography>
              </Box>
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
