import express from "express";
import Tutor from "../models/tutor.js";

const router = express.Router();

/**
 * CREATE Tutor
 * POST /api/tutors
 */
// router.post("/", async (req, res) => {
//   console.log("Checking request body:", req.body);
//   console.log("cheking heasders:", req.headers);
//   try {
//     const { name, topic } = req.body;

//     if (!name || !topic) {
//       return res.status(400).json({
//         message: "Name and topic are required",
//       });
//     }

//     const tutor = await Tutor.create({ name, topic });

//     res.status(201).json({
//       message: "Tutor created successfully",
//       data: tutor,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });
router.post("/", async (req, res) => {
  try {
    // Works with form-data (text fields)
    const name = req.body.name;
    const topic = req.body.topic;

    if (!name || !topic) {
      return res.status(400).json({
        message: "Name and topic are required",
      });
    }

    const tutor = await Tutor.create({
      name: name.trim(),
      topic: topic.trim(),
    });

    res.status(201).json({
      message: "Tutor created successfully",
      data: tutor,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
/**
 * GET All Tutors
 * GET /api/tutors
 */
router.get("/", async (req, res) => {
  try {
    const tutors = await Tutor.find();

    res.status(200).json({
      count: tutors.length,
      data: tutors,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * GET Single Tutor
 * GET /api/tutors/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }

    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * UPDATE Tutor
 * PUT /api/tutors/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTutor) {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }

    res.status(200).json({
      message: "Tutor updated successfully",
      data: updatedTutor,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

/**
 * DELETE Tutor
 * DELETE /api/tutors/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedTutor = await Tutor.findByIdAndDelete(req.params.id);

    if (!deletedTutor) {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }

    res.status(200).json({
      message: "Tutor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
