import React from "react";
import { FC, useEffect, useRef } from "react";

interface SmartInputType {
  className: string;
  event: string;
  onEventTriggered?: (val: string) => void;
}

const SmartInput: FC<SmartInputType> = ({ className, event, onEventTriggered }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: any) => {
    if (e.key === event) {
      if (onEventTriggered) {
        const theInput = inputRef.current as HTMLInputElement;
        if (theInput.value) {
          onEventTriggered(theInput.value);
          theInput.value = "";
        }
      }
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const targetEl = e.target as EventTarget & HTMLInputElement;

    if (targetEl) {
      targetEl.addEventListener("keydown", handleKeyDown);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.removeEventListener("keydown", handleKeyDown);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      className={className}
      ref={inputRef}
      type="text"
      onClick={(e) => e.stopPropagation()}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
    />
  );
};

export { SmartInput };
