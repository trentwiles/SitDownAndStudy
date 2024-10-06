import { Button, Textarea, Modal, ModalBody, ModalHeader, ModalContent, ModalFooter } from "@nextui-org/react";
import { FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CopyBlock, atomOneDark } from 'react-code-blocks';
import axios from "axios";

interface SummaryProps {
  title: string;
  text_summary: string;
  code_example: string;
  footer_conclusion: string;
}

const Home: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalOpenChange = () => setIsModalOpen(!isModalOpen);
  const [modalData, setModalData] = useState<SummaryProps>({
    title: "",
    text_summary: "",
    code_example: "",
    footer_conclusion: "",
  });

  const BASE_URL = "https://api.sitdownand.study";
  axios.defaults.baseURL = BASE_URL;

  useEffect(() => {
    if (!location.state?.language) {
      navigate("/"); // Redirect to "/" if language is missing
    }
  }, [location, navigate]);

  const handleStartQuestions = (topic: string) => {
    navigate("/editor", { state: { language: location.state.language, topic: topic } });
  };

  const handleTopicSummary = (topic: string, language: string) => {
    axios.post("/topicSummary", {topic: topic, language: language}).then((res) => {
      setModalData(res.data);
      setIsModalOpen(true);
    });
  }

  return (
    <>
    <Modal scrollBehavior="outside" size="5xl" className="dark" isOpen={isModalOpen} onOpenChange={onModalOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">{modalData.title}</ModalHeader>
              <ModalBody>
                  <p className="text-white">{modalData.text_summary}</p>
                <div>
                <CopyBlock
                  theme={atomOneDark}
                  text={modalData.code_example}
                  language={location.state?.language}
                  wrapLongLines={true}
                  showLineNumbers={true}
                />
                </div>
                <p className="text-white">{modalData.footer_conclusion}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    <div className="flex items-center flex-col h-full w-full relative">
      <h1 className="text-3xl font-mono text-white">sitdownand.study</h1>
      <div className="w-full px-24 py-8 my-auto text-4xl">
      {/* backdrop-blur-sm backdrop-brightness-125" */}
        <Textarea
          className="text-2xl p-8 text-white rounded-2xl bg-gray-900" 
          size="lg"
          variant="bordered"
          placeholder={`What topic related to ${location.state?.language} do you want to learn today?...`}
          value={topic}
          onValueChange={(value) => setTopic(value)}
        />
        <div className="w-full flex flex-row gap-1 items-center justify-center py-4">
        <Button
            size="lg"
            className="bg-white text-indigo-600 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 text-xl"
            onClick={() => handleTopicSummary(topic, location.state?.language)}
          >
            Learn about this topic
          </Button>
          <Button
            size="lg"
            className="bg-white text-indigo-600 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 text-xl"
            onClick={() => handleStartQuestions(topic)}
          >
            Practice Questions
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
