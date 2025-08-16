import React from "react";
const Input = ({ ...props }) => (
  <input
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    {...props}
  />
);

export default Input;
