const express = require("express");
const router = express.Router();

const {
  createForm,
  getFormById,
  submitResponse,
  generateAiQuestions,
} = require("../controllers/formController");

router.post("/generate-ai", generateAiQuestions);

router.post("/", createForm);
router.get("/:id", getFormById);
router.post("/:formId/responses", submitResponse);

module.exports = router;
