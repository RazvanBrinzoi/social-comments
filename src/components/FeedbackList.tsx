import { useState } from "react";
import type { Feedback } from "../lib/types";
import FeedbackItem from "./FeedbackItem";
import { feedbackData } from "../lib/constants";

export default function FeedbackList() {
  const [feedbackItems] = useState<Feedback[]>(feedbackData);

  return (
    <ol className="feedback-list">
      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} {...item} />
      ))}
    </ol>
  );
}
