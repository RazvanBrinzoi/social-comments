import { useEffect, useMemo, useState } from "react";
import type { Feedback } from "../lib/types";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import MainContainer from "./MainContainer";
import { useFeedbackStore } from "../store/feedbackItemsStore";

function App() {
  const { feedbackItems, fetchFeedbackItems, isLoading, errorMessage } =
    useFeedbackStore();

  const companyList: string[] = Array.from(
    new Set(feedbackItems.map((item) => item.company))
  );

  const [selectedCompany, setSelectedCompany] = useState("");
  const filteredFeedbackItems = useMemo(
    () =>
      feedbackItems.filter(
        (item) => item.company === selectedCompany || selectedCompany === ""
      ),
    [feedbackItems, selectedCompany]
  );

  const handleHashtagClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const company = event.currentTarget.textContent?.substring(1) || "";
    setSelectedCompany(company === selectedCompany ? "" : company);
  };

  const handleAddToList = (text: string) => {
    const companyName =
      text
        .split(" ")
        .find((word) => word.includes("#"))
        ?.substring(1) || "N/A";

    const newItem: Feedback = {
      id: new Date().getTime(),
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.charAt(0).toUpperCase(),
      text: text,
    };

    setData((prev) => {
      const newArray = prev ? [...prev, newItem] : [newItem];
      localStorage.setItem("feedbackItems", JSON.stringify(newArray));
      return newArray;
    });
  };

  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <MainContainer
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onAddItem={handleAddToList}
      />
      <HashtagList
        onHashtagClick={handleHashtagClick}
        companyList={companyList}
      />
    </div>
  );
}

export default App;
