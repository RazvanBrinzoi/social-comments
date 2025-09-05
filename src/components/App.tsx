import { useFetch } from "../hooks/useFetch";
import type { Feedback } from "../lib/types";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import MainContainer from "./MainContainer";

function App() {
  const {
    data: feedbackItems,
    setData,
    isLoading,
    errorMessage,
  } = useFetch({
    delay: 300,
    shouldFail: false,
  });

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

  return (
    <div className="app">
      <Footer />
      <MainContainer
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onAddItem={handleAddToList}
      />
      <HashtagList />
    </div>
  );
}

export default App;
