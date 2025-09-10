import Pattern from "./Pattern";
import Logo from "./Logo";
import PageHeading from "./Pageheading";
import { useFeedbackStore } from "../store/feedbackItemsStore";
import FeedbackForm from "./FeedbackForm";

export default function Header() {
  const { addItemToList } = useFeedbackStore();

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddItem={addItemToList} />
    </header>
  );
}
