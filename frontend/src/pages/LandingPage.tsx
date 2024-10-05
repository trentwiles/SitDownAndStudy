import React, { useState } from "react";

const LandingPage = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location = `/${selectedOption}`
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <header className="flex-grow bg-indigo-600 text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Sit Down & Study</h1>
          <p className="mt-4 text-lg md:text-xl">
            An easy way to practice your favorite programming languages.
          </p>
          <select
            id="options"
            value={selectedOption}
            onChange={handleOptionChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Pick a Language</option>
            <option value="python">Python</option>
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
          </select>
          <button className="mt-8 bg-white text-indigo-600 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200" onClick={handleSubmit}>
              Get Started
          </button>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-white py-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          Developed by <a href="https://www.trentwiles.com/">Trent Wiles</a> & <a href="https://asahoo.dev">Anish Sahoo</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
