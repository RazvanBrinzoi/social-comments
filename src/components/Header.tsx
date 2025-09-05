import Pattern from "./Pattern";
import Logo from "./Logo";
import PageHeading from "./Pageheading";
import FeedbackForm, { type FeedbackFormProps } from "./FeedbackForm";

export default function Header({
  onAddItem: handleAddToList,
}: FeedbackFormProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddItem={handleAddToList} />
    </header>
  );
}
