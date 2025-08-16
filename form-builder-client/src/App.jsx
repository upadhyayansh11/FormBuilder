import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import FormHeader from "./components/FormHeader";
import QuestionList from "./components/QuestionList";
import FormViewer from "./components/FormViewer";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/forms";

export default function App() {
  const initialQuestions = [
    {
      id: 1,
      type: "Categorize",
      data: {
        title: "Categorize these items",
        categories: ["Fruit", "Vegetable"],
        items: [
          { id: 1, text: "Apple" },
          { id: 2, text: "Carrot" },
        ],
      },
    },
    {
      id: 2,
      type: "Cloze",
      data: {
        title: "Fill in the blanks",
        sentence: "The quick brown __fox__ jumps over the lazy __dog__.",
      },
    },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [formTitle, setFormTitle] = useState("My Awesome Form");
  const [headerImage, setHeaderImage] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiGenerate = async (topic) => {
    console.log(`App.jsx received topic: ${topic}`);
    setIsAiLoading(true);

    try {
      const response = await axios.post(`${API_URL}/generate-ai`, { topic });
      console.log("Raw AI Response:", response.data);

      const processedQuestions = response.data.map((q) => {
        const questionData = q.data || q;
        let questionType = q.questionType;

      
        if (!questionType) {
          if (questionData.categories) questionType = "Categorize";
          else if (questionData.sentence) questionType = "Cloze";
          else if (questionData.passage) questionType = "Comprehension";
        }

        
        if (questionData.items && Array.isArray(questionData.items)) {
          questionData.items = questionData.items.map((item, index) => {
            if (typeof item === "string") {
              return {
                id: Date.now() + Math.random() + index,
                text: item,
              };
            } else if (item.text) {
              return {
                ...item,
                id: item.id || Date.now() + Math.random() + index,
              };
            } else {
             
              return {
                id: Date.now() + Math.random() + index,
                text: Object.values(item).join(""),
              };
            }
          });
        }

        
        if (questionData.mcqs && Array.isArray(questionData.mcqs)) {
          questionData.mcqs = questionData.mcqs.map((mcq, index) => {
            if (typeof mcq === "string") {
              return {
                id: Date.now() + Math.random() + index,
                text: mcq,
              };
            } else {
              return {
                ...mcq,
                id: mcq.id || Date.now() + Math.random() + index,
              };
            }
          });
        }

        return {
          id: Date.now() + Math.random(),
          type: questionType,
          data: questionData,
        };
      });

      const validQuestions = processedQuestions.filter((q) => q.type);

      if (validQuestions.length === 0 && response.data.length > 0) {
        alert(
          "The AI returned data in an unexpected format. Please check the console for the raw response data."
        );
      }

      setQuestions((prev) => [...prev, ...validQuestions]);
    } catch (error) {
      console.error("Error generating AI questions:", error);
      alert("Failed to generate questions. Please check the console.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSaveForm = async () => {
    try {
      const processedQuestions = questions.map((q) => ({
        ...q,
        data: {
          ...q.data,
          title: q.data.title || "Untitled Question",
        },
      }));
      const formPayload = {
        title: formTitle,
        questions: processedQuestions,
      };
      const response = await axios.post(API_URL, formPayload);
      console.log("Form saved successfully:", response.data);
      alert("Form saved successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save form. Check the console for details.");
    }
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  const addQuestion = (type) => {
    let newData;
    switch (type) {
      case "Categorize":
        newData = {
          title: "New Categorize Question",
          categories: [],
          items: [],
        };
        break;
      case "Cloze":
        newData = {
          title: "New Cloze Question",
          sentence: "Use __blanks__ to create fillable words.",
        };
        break;
      case "Comprehension":
        newData = {
          title: "New Comprehension Question",
          passage: "",
          mcqs: [],
        };
        break;
      default:
        newData = { title: `New ${type} Question` };
    }
    const newQuestion = { id: Date.now(), type: type, data: newData };
    setQuestions((prev) => [...prev, newQuestion]);
  };
  const removeQuestion = (id) => {
    setQuestions((items) => items.filter((q) => q.id !== id));
  };
  const updateQuestionData = (id, newData) => {
    setQuestions((items) =>
      items.map((q) => (q.id === id ? { ...q, data: newData } : q))
    );
  };
  const handleHeaderImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setHeaderImage(URL.createObjectURL(e.getFiles.files[0]));
    }
  };

  if (isPreview) {
    return (
      <FormViewer
        formTitle={formTitle}
        headerImage={headerImage}
        questions={questions}
        onBackToEditor={() => setIsPreview(false)}
        answers={{}}
        onSubmit={() => alert("This is a preview. Submission is disabled.")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-12 gap-8">
          <Sidebar
            onAddQuestion={addQuestion}
            onGenerate={handleAiGenerate}
            isAiLoading={isAiLoading}
          />
          <main className="col-span-12 md:col-span-9 lg-col-span-10">
            <div className="max-w-3xl mx-auto">
              <FormHeader
                title={formTitle}
                onTitleChange={setFormTitle}
                headerImage={headerImage}
                onHeaderImageChange={handleHeaderImageUpload}
              />
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <QuestionList
                  questions={questions}
                  onRemoveQuestion={removeQuestion}
                  onUpdateQuestion={updateQuestionData}
                />
              </DndContext>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => setIsPreview(true)}
                  className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:shadow-sm transition-all"
                >
                  Preview
                </button>
                <button
                  onClick={handleSaveForm}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all"
                >
                  Save Form
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
