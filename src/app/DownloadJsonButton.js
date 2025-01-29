/* global chrome */
import React from 'react';
import { FaDownload, FaCopy } from 'react-icons/fa';
import { getData } from '../services/data_services';

export default function DownloadJsonButton() {
  const sampleJson = getData();

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(sampleJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download(
      {
        url,
        filename: 'GrowthChain_data.json',
        saveAs: true
      },
      () => URL.revokeObjectURL(url)
    );
  };

  const handleCopy = async () => {
    try {
      const jsonString = JSON.stringify(sampleJson, null, 2);
      await navigator.clipboard.writeText(jsonString);
      alert('JSON copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy JSON:', error);
    }
  };

  return (
    <div className="flex">
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="flex items-center px-3 py-2 
                   bg-yellow-400 text-black font-semibold 
                   rounded hover:bg-yellow-500 
                   transition-colors"
      >
        <FaDownload className="mr-1" />
      </button>

    </div>
  );
}
