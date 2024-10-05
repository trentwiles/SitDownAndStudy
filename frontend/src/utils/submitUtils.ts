import axios from "axios";

interface Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

export const submitCode = async (submission: Submission) => {
  const url =
    "https://judge.asahoo.dev/submissions/?base64_encoded=false&wait=true";
  try {
    const response = await axios.post(url, submission);
    return response.data;
  } catch (error) {
    console.error("Error submitting code:", error);
    throw error;
  }
};

export const getResult = async (submissionId: string) => {
  const url = `https://judge.asahoo.dev/submissions/${submissionId}/?base64_encoded=false`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting result for submission:", error);
    throw error;
  }
};
