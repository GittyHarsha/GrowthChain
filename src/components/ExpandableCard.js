import React, { useState, useEffect } from "react";

const ExpandableCard = ({ title, preview = "", children }) => {
  const [expanded, setExpanded] = useState(false);
  const [renderCard, setRenderCard] = useState(false);

  useEffect(() => {
    if (expanded) {
      setRenderCard(true);
    }
  }, [expanded]);

  const handleClose = () => {
    setExpanded(false);
    setTimeout(() => {
      setRenderCard(false);
    }, 300);
  };

  const handleOpen = () => {
    setRenderCard(true);
    setExpanded(true);
  };

  return (
    <>
      {/* Collapsed Card */}
      {!expanded && (
        <div
          className="relative border border-black rounded-lg bg-white w-80 
                     cursor-pointer p-4 shadow-md 
                     hover:scale-105 transition-transform duration-300"
          onClick={handleOpen}
        >
          <h2 className="text-lg font-bold font-sans">{title}</h2>
          <div className="text-sm text-gray-700 line-clamp-3 mt-2">
            {preview}...
          </div>
        </div>
      )}

      {/* Expanded Modal-Like Card */}
      {renderCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black 
                        transition-opacity duration-300
                        ${expanded ? "opacity-50" : "opacity-0"}`}
            onClick={handleClose}
          />

          {/* Centered card container with scrolling support */}
          <div
            className={`
              relative bg-white border border-black rounded-lg shadow-lg p-4
              transition duration-300 transform
              ${expanded ? "animate-scaleFadeIn" : "animate-scaleFadeOut"}
            `}
            style={{
              width: "40rem",
              maxWidth: "90%",
              maxHeight: "80vh", // Limits the height
              overflowY: "auto", // Enables scrolling if content overflows
            }}
          >
            <h2 className="text-lg font-bold font-sans">{title}</h2>
            <div className="mt-2">{children}</div>
            <button
              className="mt-2 bg-black text-white px-3 py-1 rounded text-sm"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpandableCard;
