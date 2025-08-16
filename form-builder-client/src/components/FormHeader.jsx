import React from "react";
import { Image as ImageIcon } from "lucide-react";

const FormHeader = ({
  title,
  onTitleChange,
  headerImage,
  onHeaderImageChange,
}) => (
  <>
    <div className="mb-8 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
      {headerImage ? (
        <img
          src={headerImage}
          alt="Form Header"
          className="w-full h-48 object-cover rounded-md"
        />
      ) : (
        <label className="cursor-pointer flex flex-col items-center justify-center h-48 text-gray-500">
          <ImageIcon size={40} className="mb-2" />
          <span className="font-semibold">Click to upload a header image</span>
          <input
            type="file"
            className="hidden"
            onChange={onHeaderImageChange}
            accept="image/*"
          />
        </label>
      )}
    </div>
    <input
      type="text"
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      className="text-4xl font-bold w-full bg-transparent focus:outline-none mb-10 text-center"
      placeholder="Form Title"
    />
  </>
);

export default FormHeader;
