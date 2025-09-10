import { create } from "zustand";
import type { Feedback } from "../lib/types";
import { fakeFetch } from "../utils/feedbackServices";
import { feedbackData } from "../lib/constants";

type FeedbackStore = {
  feedbackItems: Feedback[];
  selectedCompany: string;
  isLoading: boolean;
  errorMessage: string;
  delay: number;
  shouldFail: boolean;

  //actions
  fetchFeedbackItems: () => Promise<void>;
  addItemToList: (text: string) => void;
  filterFeedbackItems: () => Feedback[];
  getCompanyList: () => string[];
  selectCompany: (company: string) => void;
  manageUpVote: (id: number) => void;
};

export const useFeedbackStore = create<FeedbackStore>((set, get) => ({
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
    return feedbackItems
      .filter(
        (item) => item.company === selectedCompany || selectedCompany === ""
      )
      .sort((a, b) => b.upvoteCount - a.upvoteCount);
  },
  getCompanyList: () => {
    return Array.from(new Set(get().feedbackItems.map((item) => item.company)));
  },
  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },
  manageUpVote: (id: number) => {
    set((state) => {
      const updatedItems = state.feedbackItems.map((item) =>
        item.id === id ? { ...item, upvoteCount: item.upvoteCount + 1 } : item
      );
      localStorage.setItem("feedbackItems", JSON.stringify(updatedItems));
      return { feedbackItems: updatedItems };
    });
  },
}));
