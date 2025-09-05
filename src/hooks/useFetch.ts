import { useState, useEffect } from "react";
import { fakeFetch } from "../utils/feedbackServices";
import { feedbackData } from "../lib/constants";
import type { Feedback } from "../lib/types";

type UseFetchOptions = {
  delay?: number;
  shouldFail?: boolean;
};

export function useFetch(options?: UseFetchOptions) {
  const { delay = 1000, shouldFail = false } = options || {};

  const [data, setData] = useState<Feedback[]>(feedbackData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = await fakeFetch(feedbackData, delay, shouldFail);
      setData(result);
    } catch (err) {
      setErrorMessage("Fetch error: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // fetch automat la mount
  }, []);

  return { data, setData, isLoading, errorMessage, fetchData };
}

// Simulate fetching data from an API but without async await
// fakeFetch(feedbackData, 300, false)
//   .then((data) => {
//     setFeedbackItems(data);
//   })
//   .catch((err) => {
//     setErrorMessage("Failed to fetch the feedback: " + err);
//   })
//   .finally(() => {
//     setIsLoading(false);
//   });
