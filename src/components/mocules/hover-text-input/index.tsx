import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type HoverTextInputProps = React.PropsWithChildren<{
  onSubmit: (value: string) => void;
}>;

export default function HoverTextInput({ children, onSubmit }: HoverTextInputProps) {
  const [value, setValue] = useState(children?.toString() || "");
  useEffect(() => {
    setValue(children?.toString() || "");
  }, [children?.toString()]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value);
    }
  };

  return (
    <div className="relative inline-flex h-9 items-baseline gap-4 [&_span]:w-0 [&_span]:hover:w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className="text-2xl font-semibold focus-visible:outline-none"
        onKeyDown={handleKeyDown}
      />
      <span className="absolute bottom-0 left-1/2 h-[0.5px] -translate-x-1/2 bg-black transition-all duration-300"></span>
      {value !== children?.toString() && (
        <div className="absolute right-0 inline-flex gap-1">
          <Button
            variant="ghost"
            className="size-9 p-2 text-muted-foreground"
            onClick={() => onSubmit(value)}
          >
            <Check />
          </Button>
        </div>
      )}
    </div>
  );
}
