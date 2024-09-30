import { useState } from "react";

import TailwindAdvancedEditor from "../organisms/editor/advanced-editor";
import { Button } from "../ui";

export default function InstructionsPage() {
  const [content, setContent] = useState<string>();
  return (
    <div className="p-6">
      <TailwindAdvancedEditor
        onChange={(value) => {
          setContent(value);
        }}
      />
      <Button onClick={() => console.log(content)}>Save</Button>
    </div>
  );
}
