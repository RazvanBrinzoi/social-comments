import { TriangleUpIcon } from "@radix-ui/react-icons";
import type { Feedback } from "../lib/types";
import { useState } from "react";

type FeedbackItemProps = Feedback;

export default function FeedbackItem({
  upvoteCount,
  badgeLetter,
  company,
  text,
  daysAgo,
}: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upVote, setUpvote] = useState(upvoteCount);

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
          setUpvote(upVote + 1);
        }}
      >
        <TriangleUpIcon />
        <span>{upVote}</span>
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
