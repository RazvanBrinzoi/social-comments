import { useFeedbackStore } from "../store/feedbackItemsStore";

export default function HashtagList() {
  const { getCompanyList, selectedCompany, selectCompany } = useFeedbackStore();
  const companyList = getCompanyList();

  const handleHashtagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const targetCompany = e.currentTarget.textContent?.substring(1) || "";
    selectCompany(targetCompany === selectedCompany ? "" : targetCompany);
  };

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <li key={company}>
          <button onClick={handleHashtagClick}>#{company}</button>
        </li>
      ))}
    </ul>
  );
}
