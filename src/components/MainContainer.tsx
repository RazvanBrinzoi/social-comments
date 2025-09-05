import type { FeedbackFormProps } from "./FeedbackForm";
import FeedbackList, { type FeedBackListProps } from "./FeedbackList";
import Header from "./Header";

type MainContainerProps = FeedBackListProps & FeedbackFormProps;

export default function MainContainer({
  feedbackItems,
  isLoading,
  errorMessage,
  onAddItem: handleAddToList,
}: MainContainerProps) {
  return (
    <main className="container">
      <Header onAddItem={handleAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  );
}
