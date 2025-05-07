// visible.ts
"use client";
import { useState } from "react";

// Custom hook to manage visibility
export function useVisibility(initial = false) {
  const [isVisible, setIsVisible] = useState(initial);
  const toggleVisibility = () => setIsVisible(prev => !prev);

  return { isVisible, toggleVisibility, setIsVisible };
}
