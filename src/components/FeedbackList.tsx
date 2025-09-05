import type { Feedback } from "../lib/types";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export type FeedBackListProps = {
  feedbackItems: Feedback[];
  isLoading: boolean;
  errorMessage: string;
};

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errorMessage,
}: FeedBackListProps) {
  const validFeedbackItems = Array.isArray(feedbackItems);
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {validFeedbackItems &&
        feedbackItems.map((item) => <FeedbackItem key={item.id} {...item} />)}
    </ol>
  );
}
