import { Textarea } from "@nextui-org/react";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="flex items-center flex-col h-full w-full">
      <h1 className="text-3xl font-mono">sitdownand.study</h1>
      <Textarea
        className="p-6 h-full     "
        placeholder="What programming language do you want to learn today?..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
};

export default Home;
