import React, { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string; // The full text to animate
  speed?: number; // Typing speed in milliseconds per character
  trigger?: boolean; // Starts animation when set to true
  onComplete?: () => void; // Callback when animation is complete
  className?: string; // Additional class name
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  speed = 50,
  trigger = true,
  className,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState(""); // Text currently displayed
  const [index, setIndex] = useState(0); // Current character index

  useEffect(() => {
    if (trigger && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout); // Cleanup timeout
    } else if (trigger && index === text.length && onComplete) {
      onComplete(); // Trigger the onComplete callback if provided
    }
  }, [index, text, speed, trigger, onComplete]);

  useEffect(() => {
    // Reset the animation when the trigger changes to true
    if (trigger) {
      setDisplayedText("");
      setIndex(0);
    }
  }, [trigger]);

  return <span className={className}>{displayedText}</span>;
};

export default AnimatedText;
