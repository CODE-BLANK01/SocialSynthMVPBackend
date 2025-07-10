import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRoutes from "./routes/authRoutes"; // ✅ this is a router, not a function
import contentRoutes from "./routes/contentRoutes"; // ✅ this is a router, not a function
import linkedinRoutes from "./routes/linkedinRoutes";
import oauthRoutes from "./routes/oauthRoutes"; // ✅ this is a router, not a function

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // ✅ Correct usage
app.use("/api/content", contentRoutes); // ✅ Correct usage
app.use("/api/linkedin", linkedinRoutes);
app.use("/api/oauth", oauthRoutes); // ✅ Correct usage

app.get("/", (_, res) => {
  res.send("Social Synth Backend Running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
