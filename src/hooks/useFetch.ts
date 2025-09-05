import { useState, useEffect } from "react";
import { fakeFetch } from "../utils/feedbackServices";
import { feedbackData } from "../lib/constants";
import type { Feedback } from "../lib/types";

type UseFetchOptions = {
  delay?: number;
  shouldFail?: boolean;
};

export function useFetch(options?: UseFetchOptions) {
  const [data, setData] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { delay = 1000, shouldFail = false } = options || {};
  const stored = localStorage.getItem("feedbackItems");

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (stored) {
        const result = await fakeFetch(JSON.parse(stored), delay, shouldFail);
        setData(result);
      } else {
        const result = await fakeFetch(feedbackData, delay, shouldFail);
        setData(result);
      }
    } catch (err) {
      setErrorMessage("Fetch error: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
