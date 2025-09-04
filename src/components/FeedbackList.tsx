import { useEffect, useState } from "react";
import type { Feedback } from "../lib/types";
import FeedbackItem from "./FeedbackItem";
import { feedbackData } from "../lib/constants";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

function fakeFetch<T>(data: T, delay = 1000, shouldFail = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject("Simulated fetch error 🚨");
      } else {
        resolve(data);
      }
    }, delay);
  });
}

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fakeFetch(feedbackData, 300, false);
        setFeedbackItems(data);
      } catch (err) {
        setErrorMessage("Failed to fetch the feedback: " + err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

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
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} {...item} />
      ))}
    </ol>
  );
}
