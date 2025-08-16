import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FormViewer from "../components/FormViewer";
import { Loader2 } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/forms";

const FormFillPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/${formId}`);
        setForm(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching form:", err);
        setError("Form not found or an error occurred.");
        setForm(null);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  const handleAnswerChange = useCallback((questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };

      await axios.post(`${API_URL}/${formId}/responses`, payload);

      alert("Thank you! Your response has been submitted.");
    } catch (err) {
      console.error("Error submitting response:", err);
      alert("There was an error submitting your response. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={48} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!form) {
    return null;
  }

  return (
    <FormViewer
      formTitle={form.title}
      headerImage={form.headerImage}
      questions={form.questions}
      isPublicView={true}
      onAnswerChange={handleAnswerChange}
      answers={answers}
      onSubmit={handleSubmit}
    />
  );
};

export default FormFillPage;
