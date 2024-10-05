import { Button, Textarea } from "@nextui-org/react";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <p className="text-white">Code learn</p>
      <Button>Click Me</Button>
      <Textarea
        placeholder="Write something..."
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
