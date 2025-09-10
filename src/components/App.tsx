import { useEffect } from "react";
import { useFeedbackStore } from "../store/feedbackItemsStore";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import MainContainer from "./MainContainer";

function App() {
  const { fetchFeedbackItems } = useFeedbackStore();

  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <MainContainer />
      <HashtagList />
    </div>
  );
}

export default App;
