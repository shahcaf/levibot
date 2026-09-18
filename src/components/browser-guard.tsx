"use client";

import { useEffect } from "react";

export function BrowserGuard() {
  useEffect(() => {
    const blockDevToolsShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey || event.metaKey;
      const blocked =
        event.key === "F12" ||
        (modifier && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (modifier && key === "u");

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const blockContextMenu = (event: MouseEvent) => event.preventDefault();

    window.addEventListener("keydown", blockDevToolsShortcuts, true);
    window.addEventListener("contextmenu", blockContextMenu);

    return () => {
      window.removeEventListener("keydown", blockDevToolsShortcuts, true);
      window.removeEventListener("contextmenu", blockContextMenu);
    };
  }, []);

  return null;
}
