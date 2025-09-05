import { TriangleUpIcon } from "@radix-ui/react-icons";
import type { Feedback } from "../lib/types";

type FeedbackItemProps = Feedback;

export default function FeedbackItem({
  upvoteCount,
  badgeLetter,
  company,
  text,
  daysAgo,
}: FeedbackItemProps) {
  return (
    <li className="feedback">
      <button>
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
