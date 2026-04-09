import express from "express";

const router = express.Router();

router.post("/repair", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: "Code is required" });
    }

    // Call the Python ML Microservice
    const response = await fetch("http://localhost:5001/api/repair", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ buggy_code: code }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data.error || "Failed to repair code" });
    }

    return res.status(200).json({ success: true, fixed_code: data.fixed_code });
  } catch (error) {
    console.error("Error in AI Repair Route:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default router;
