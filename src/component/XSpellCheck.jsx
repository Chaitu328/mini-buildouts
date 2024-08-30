import React, { useState } from "react";

const SpellCheckApp = () => {
  const customDictionary = {
    teh: "the",
    wrok: "work",
    fot: "for",
    exampl: "example",
  };

  const [inputText, setInputText] = useState("");
  const [suggestedText, setSuggestedText] = useState("");
  const [correctedText, setCorrectedText] = useState("");

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    // Implement a basic spelling check and correction
    const words = text.split(" ");
    const correctedWords = words.map((word) => {
      const correctedWord = customDictionary[word.toLowerCase()];
      return correctedWord || word;
    });

    const newCorrectedText = correctedWords.join(" ");
    setCorrectedText(newCorrectedText);

    // Set the suggested text (first corrected word)
    const firstCorrection = correctedWords.find(
      (word, index) => word !== words[index]
    );
    setSuggestedText(firstCorrection || "");
  };

  return (
    <div>
      <h1>Spell Check and Auto-Correction</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text..."
        rows={5}
        cols={40}
      />
      {suggestedText && (
        <p>
          Did you mean: <strong>{suggestedText}</strong>?
        </p>
      )}
      {correctedText && (
        <div>
          <h2>Corrected Text:</h2>
          <p>{correctedText}</p>
        </div>
      )}
    </div>
  );
};

export default SpellCheckApp;
