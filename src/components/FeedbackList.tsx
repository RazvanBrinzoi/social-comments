import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { useFeedbackStore } from "../store/feedbackItemsStore";

export default function FeedbackList() {
  const { feedbackItems, isLoading, errorMessage, filterFeedbackItems } =
    useFeedbackStore();

  const filteredFeedbackItems = filterFeedbackItems();

  const validFeedbackItems = Array.isArray(feedbackItems);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {validFeedbackItems &&
        filteredFeedbackItems.map((item) => (
          <FeedbackItem key={item.id} {...item} />
        ))}
    </ol>
  );
}
