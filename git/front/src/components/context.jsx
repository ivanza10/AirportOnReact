import { createContext, useState, useEffect } from "react";

// Создаем контекст для управления размером текста
export const TextSizeContext = createContext();

// eslint-disable-next-line react/prop-types
export const TextSizeProvider = ({ children }) => {
  const [textSize, setTextSize] = useState("medium");

  useEffect(() => {
    const savedTextSize = localStorage.getItem("textSize");
    if (savedTextSize) {
      setTextSize(savedTextSize);
    }
  }, []);

  const changeTextSize = (size) => {
    setTextSize(size);
    localStorage.setItem("textSize", size);
  };

  return (
    <TextSizeContext.Provider value={{ textSize, changeTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};
