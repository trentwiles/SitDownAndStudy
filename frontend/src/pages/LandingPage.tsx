import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (selectedOption !== "") {
      navigate(`/home`, { state: { language: selectedOption } });
    }
  };

  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col relative">
        <header className="flex-grow text-white flex items-center justify-center">
          <div className="text-center px-4">
            <div className="py-24 bg-gradient-to-r from-sky-500 to-amber-500 bg-clip-text text-transparent">
              <h1 className="text-4xl md:text-[200px] font-qwitcherb">
                Sit Down & Study
              </h1>
            </div>
            <p className="mt-4 text-lg md:text-xl">
              An easy way to practice your favorite programming languages.
            </p>
            <select
              id="options"
              value={selectedOption}
              onChange={handleOptionChange}
              className="w-full px-3 py-2 mt-8 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Pick a Language</option>
              <option value="python">Python</option>
              <option value="javascript">Javascript</option>
              <option value="java">Java</option>
            </select>
            <Button
              className={`mt-4 bg-white text-indigo-600 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 ${selectedOption === "" ? "opacity-0 invisible" : ""}`}
              onClick={handleSubmit}
            >
              Get Started
            </Button>
          </div>
        </header>
        <footer className="py-4 bg-transparent">
          <div className="max-w-7xl mx-auto text-center text-gray-300">
            Developed by{" "}
            <a href="https://www.trentwiles.com/" className="hover:underline">
              Trent Wiles
            </a>{" "}
            &{" "}
            <a className="hover:underline" href="https://asahoo.dev">
              Anish Sahoo
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
