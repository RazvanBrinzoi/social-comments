type HashtagListProps = {
  companyList: string[];
  onHashtagClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export default function HashtagList({
  companyList,
  onHashtagClick,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <li key={company}>
          <button onClick={(e) => onHashtagClick(e)}>#{company}</button>
        </li>
      ))}
    </ul>
  );
}
