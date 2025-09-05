import React, { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

export type FeedbackFormProps = {
  onAddItem: (text: string) => void;
};

export default function FeedbackForm({ onAddItem }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const charCount = MAX_CHARACTERS - text.length;

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddItem(text);
    setText("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        onChange={handleOnChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to add a #hashtag of the topic.
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
