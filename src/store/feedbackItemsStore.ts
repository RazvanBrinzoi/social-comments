import { create } from "zustand";
import type { Feedback } from "../lib/types";
import { fakeFetch } from "../utils/feedbackServices";
import { feedbackData } from "../lib/constants";

export const useFeedbackStore = create((set, get) => ({
  feedbackItems: [],
  selectedCompany: "",
  isLoading: false,
  errorMessage: "",
  delay: 300,
  shouldFail: false,
  fetchFeedbackItems: async () => {
    set({ isLoading: true, errorMessage: "" });
    const { delay, shouldFail } = get();
    const stored = localStorage.getItem("feedbackItems");

    try {
      const data = stored
        ? await fakeFetch(JSON.parse(stored), delay, shouldFail)
        : await fakeFetch(feedbackData, delay, shouldFail);

      set({ feedbackItems: data });
    } catch (err) {
      set({ errorMessage: "Fetch error: " + err });
    } finally {
      set({ isLoading: false });
    }
  },
  addItemToList: (text: string) => {
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

    // set((feedbackItems) => {
    //   const newArray = feedbackItems ? [...feedbackItems, newItem] : [newItem];
    //   localStorage.setItem("feedbackItems", JSON.stringify(newArray));
    //   return newArray;
    // });

    set((state) => {
      const newArray = [...state.feedbackItems, newItem];
      localStorage.setItem("feedbackItems", JSON.stringify(newArray));
      return {
        feedbackItems: newArray,
      };
    });
  },
  filterFeedbackItems: () => {
    const { feedbackItems, selectedCompany } = get();
    return feedbackItems.filter(
      (item) => item.company === selectedCompany || selectedCompany === ""
    );
  },
  getCompanyList: () => {
    return new Set(get().feedbackItems.map((item) => item.company));
  },
  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },
}));
