const Form = require("../models/Form");
const Question = require("../models/Question");
const Response = require("../models/Response");

const createForm = async (req, res) => {
  try {
    const { title, headerImage, questions } = req.body;
    const newForm = new Form({ title, headerImage, questions: [] });
    const questionDocs = questions.map((q) => ({
      formId: newForm._id,
      questionText: q.data.title,
      questionType: q.type,
      data: q.data,
    }));
    const createdQuestions = await Question.insertMany(questionDocs);
    const questionIds = createdQuestions.map((q) => q._id);
    newForm.questions = questionIds;
    await newForm.save();
    res
      .status(201)
      .json({ message: "Form created successfully!", form: newForm });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ message: "Server error while creating form." });
  }
};

const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id).populate("questions");
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Server error while fetching form." });
  }
};

const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;
    const { answers } = req.body;
    const formExists = await Form.findById(formId);
    if (!formExists) {
      return res.status(404).json({ message: "Form not found" });
    }
    const newResponse = new Response({ formId, answers });
    await newResponse.save();
    res
      .status(201)
      .json({
        message: "Response submitted successfully!",
        response: newResponse,
      });
  } catch (error) {
    console.error("Error submitting response:", error);
    res
      .status(500)
      .json({ message: "Server error while submitting response." });
  }
};

const generateAiQuestions = async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }
  const prompt = `Generate 3 diverse questions for a form about "${topic}". The questions should be of the types 'Categorize', 'Cloze', and 'Comprehension'. For the 'Cloze' question, use double underscores for blanks (e.g., __word__). For 'Categorize', provide a few categories and items. For 'Comprehension', provide a short passage and one multiple-choice question about it.`;
  const schema = {};
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not set in the environment variables."
      );
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    };
    const apiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(
        `Gemini API request failed with status ${apiResponse.status}: ${errorText}`
      );
    }
    const result = await apiResponse.json();
    const generatedText = result.candidates[0].content.parts[0].text;
    const generatedQuestions = JSON.parse(generatedText);
    res.status(200).json(generatedQuestions);
  } catch (error) {
    console.error("Error generating AI questions:", error);
    res.status(500).json({ message: "Failed to generate questions from AI." });
  }
};

module.exports = {
  createForm,
  getFormById,
  submitResponse,
  generateAiQuestions,
};
