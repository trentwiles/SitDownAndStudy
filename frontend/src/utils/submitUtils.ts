import axios from 'axios';

interface Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

export const submitCode = async (submission: Submission) => {
  const url = 'https://judge.asahoo.dev/submissions/?base64_encoded=false&wait=true';
  try {
    // console.log('Submitting code:', submission);
    const response = await axios.post(url, submission);
    // console.log('Submission response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting code:', error);
    throw error;  
  }
};

export const getResult = async (submissionId: string) => {
  const url = `https://judge.asahoo.dev/submissions/${submissionId}/?base64_encoded=false`;
  try {
    // console.log('Getting result for submission:', submissionId);
    const response = await axios.get(url);
    // console.log('Submission result:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting result for submission:', error);
    throw error;
  }
}