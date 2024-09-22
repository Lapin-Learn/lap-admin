import { BookOpen, FileQuestion } from "lucide-react";
import { SideBarFeature, SideBarFeatureProps } from "./side-bar-feature";

const features: SideBarFeatureProps[] = [
  {
    to: "/daily-lessons",
    icon: <BookOpen size={16} />,
    label: "Daily lessons",
  },
  { to: "/questions", icon: <FileQuestion size={16} />, label: "Questions" },
];
export default function SideBar() {
  return (
    <aside>
      <div className="relative flex h-full w-[240px] flex-col border-r py-[36px]">
        <nav className="w-full">
          <ul className="flex w-full flex-col space-y-2 overflow-hidden pt-6">
            {features.map((feat, idx) => {
              if (typeof feat === "object")
                return <SideBarFeature key={idx} feature={feat} isExpanded={true} />;
              return <div key={idx} className="h-px w-full bg-border" />;
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
