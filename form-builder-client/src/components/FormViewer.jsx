// import React from "react";
// import { ArrowLeft } from "lucide-react";
// import CategorizeViewer from "./CategorizeViewer";
// import ClozeViewer from "./ClozeViewer";
// import ComprehensionViewer from "./ComprehensionViewer";

// const FormViewer = ({
//   formTitle,
//   headerImage,
//   questions,
//   onBackToEditor,
//   isPublicView = false,
//   onAnswerChange,
//   answers,
//   onSubmit,
// }) => {
//   const renderQuestion = (question) => {
//     switch (question.type || question.questionType) {
//       case "Categorize":
//         return (
//           <CategorizeViewer
//             question={question}
//             onAnswerChange={onAnswerChange || (() => {})}
//             value={answers && answers[question._id]}
//           />
//         );
//       case "Cloze":
//         return (
//           <ClozeViewer
//             question={question}
//             onAnswerChange={onAnswerChange || (() => {})}
//             value={answers && answers[question._id]}
//           />
//         );
//       case "Comprehension":
//         return (
//           <ComprehensionViewer
//             question={question}
//             onAnswerChange={onAnswerChange || (() => {})}
//             value={answers && answers[question._id]}
//           />
//         );
//       default:
//         return <div>Unsupported question type</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <div className="max-w-3xl mx-auto">
//           {!isPublicView && (
//             <button
//               onClick={onBackToEditor}
//               className="flex items-center px-4 py-2 mb-6 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
//             >
//               <ArrowLeft size={16} className="mr-2" />
//               Back to Editor
//             </button>
//           )}

//           {headerImage && (
//             <div className="mb-8">
//               <img
//                 src={headerImage}
//                 alt="Form Header"
//                 className="w-full h-48 object-cover rounded-lg shadow-md"
//               />
//             </div>
//           )}
//           <h1 className="text-4xl font-bold text-center mb-10">{formTitle}</h1>

//           <div className="space-y-6">
//             {Array.isArray(questions) &&
//               questions.map((q) => (
//                 <div key={q._id || q.id}>{renderQuestion(q)}</div>
//               ))}
//           </div>

//           <div className="mt-10 flex justify-end">
//             <button
//               onClick={onSubmit}
//               className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormViewer;
import React from "react";
import { ArrowLeft } from "lucide-react";
import CategorizeViewer from "./CategorizeViewer";
import ClozeViewer from "./ClozeViewer";
import ComprehensionViewer from "./ComprehensionViewer";

const FormViewer = ({
  formTitle,
  headerImage,
  questions,
  onBackToEditor,
  isPublicView = false,
  onAnswerChange,
  answers,
  onSubmit,
}) => {
  const renderQuestion = (question) => {
    console.log("Rendering question object:", question);

    const type = (question.type || question.questionType || "").toLowerCase();

    switch (type) {
      case "categorize":
        return (
          <CategorizeViewer
            question={question}
            onAnswerChange={onAnswerChange || (() => {})}
            value={answers && answers[question._id]}
          />
        );
      case "cloze":
        return (
          <ClozeViewer
            question={question}
            onAnswerChange={onAnswerChange || (() => {})}
            value={answers && answers[question._id]}
          />
        );
      case "comprehension":
        return (
          <ComprehensionViewer
            question={question}
            onAnswerChange={onAnswerChange || (() => {})}
            value={answers && answers[question._id]}
          />
        );
      default:
        return (
          <div className="p-4 bg-red-100 border border-red-300 rounded-md">
            Unsupported question type:{" "}
            <strong>
              {question.type || question.questionType || "undefined"}
            </strong>
          </div>
        );
    }
  };

  console.log("FormViewer received questions:", questions);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {!isPublicView && (
            <button
              onClick={onBackToEditor}
              className="flex items-center px-4 py-2 mb-6 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Editor
            </button>
          )}

          {headerImage && (
            <div className="mb-8">
              <img
                src={headerImage}
                alt="Form Header"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold text-center mb-10">{formTitle}</h1>

          <div className="space-y-6">
            {Array.isArray(questions) &&
              questions.map((q, idx) => (
                <div key={q._id || q.id || idx}>{renderQuestion(q)}</div>
              ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={onSubmit}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormViewer;
