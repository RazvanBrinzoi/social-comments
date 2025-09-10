import { TriangleUpIcon } from "@radix-ui/react-icons";
import type { Feedback } from "../lib/types";
import { useState } from "react";
import { useFeedbackStore } from "../store/feedbackItemsStore";

type FeedbackItemProps = Feedback;

export default function FeedbackItem({
  id,
  upvoteCount,
  badgeLetter,
  company,
  text,
  daysAgo,
}: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const manageUpVote = useFeedbackStore((state) => state.manageUpVote);

  return (
    <li
      className={`feedback ${open ? "feedback--expand" : ""}`}
      onClick={(e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        setOpen(!open);
      }}
    >
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          e.currentTarget.disabled = true;
          manageUpVote(id);
        }}
      >
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{badgeLetter}</p>
      </div>
      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>
      <p>{daysAgo === 0 ? "new" : `${daysAgo}d`}</p>
    </li>
  );
}
