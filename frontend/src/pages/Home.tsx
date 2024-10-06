import { Button, Textarea } from "@nextui-org/react";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home: FC = () => {
  // const location = useLocation();
  // const navigate = useNavigate();

  // const handleStartQuestions = () => {
  //   navigate('/editor');
  // }

  console.log(location.state);
  return (
    <div className="flex items-center flex-col h-full w-full relative">
      <h1 className="text-3xl font-mono text-white">sitdownand.study</h1>
      <Textarea
        className="p-6 h-full"
        placeholder="What programming language do you want to learn today?..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log(e.currentTarget.value);
          }
        }}
      />
      <Button
        className="absolute bottom-4"
        onClick={() => handleStartQuestions()}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Home;
