import React, { useState, useEffect } from "react";

const ExpandableCard = ({ title, preview = "", children }) => {
  // "expanded" => is the card in the "open" state?
  const [expanded, setExpanded] = useState(false);

  // "renderCard" => do we render the expanded card at all in the DOM?
  const [renderCard, setRenderCard] = useState(false);

  // When expanded changes from false -> true, show the modal in the DOM
  useEffect(() => {
    if (expanded) {
      setRenderCard(true);
    }
  }, [expanded]);

  // Close logic: start fade-out animation, then remove from DOM after 300ms
  const handleClose = () => {
    setExpanded(false);
    // After the fade-out animation completes (0.3s), remove from DOM
    setTimeout(() => {
      setRenderCard(false);
    }, 300);
  };

  const handleOpen = () => {
    // Show the expanded card in DOM (renderCard = true)
    setRenderCard(true);
    // Trigger fade-in
    setExpanded(true);
  };

  return (
    <>
      {/* ========== Collapsed Card in normal flow ========== */}
      {/* Only show if NOT expanded (the small preview card) */}
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

      {/* ========== Expanded Modal-Like Card ========== */}
      {renderCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop: fade in/out using the same durations or a simpler approach */}
          <div
            className={`absolute inset-0 bg-black 
                        transition-opacity duration-300
                        ${expanded ? 'opacity-50' : 'opacity-0'}
                       `}
            onClick={handleClose}
          />

          {/* Centered card container with scale & fade transitions */}
          <div
            className={`
              relative bg-white border border-black rounded-lg shadow-lg p-4
              transition duration-300 transform
              ${expanded ? 'animate-scaleFadeIn' : 'animate-scaleFadeOut'}
            `}
            style={{ width: '40rem', maxWidth: '90%' }}
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
