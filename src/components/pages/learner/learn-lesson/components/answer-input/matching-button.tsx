import { cva, VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui";

const matchingButtonVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      default: "",
      selected: "border-orange-500",
      correct: "border-green-500 bg-green-100 text-green-700",
      incorrect: "border-red-500 bg-red-100 text-red-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pairVariants = cva("absolute right-0 top-0 px-2 py-1 text-xs text-white", {
  variants: {
    variant: {
      default: "bg-orange-500",
      selected: "bg-orange-500",
      correct: "bg-green-500",
      incorrect: "bg-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function MatchingButton({
  option,
  variant,
  pair,
  handlePress,
}: { option: string; pair: number | null; handlePress: () => void } & VariantProps<
  typeof matchingButtonVariants
>) {
  return (
    <Button variant="outline" className={matchingButtonVariants({ variant })} onClick={handlePress}>
      {pair ? <div className={pairVariants({ variant })}>{pair}</div> : null}
      {option}
    </Button>
  );
}
