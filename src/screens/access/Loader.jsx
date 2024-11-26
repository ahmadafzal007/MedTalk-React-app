// Loader.jsx
import React from "react";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
  </div>
);

export default Loader;
