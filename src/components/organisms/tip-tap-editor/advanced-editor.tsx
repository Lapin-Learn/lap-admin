import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent,
} from "novel";
import { handleCommandNavigation } from "novel/extensions";
import { useState } from "react";

import { Button } from "@/components/ui";
import { Separator } from "@/components/ui/separator";

import { defaultExtensions } from "./extensions";
import MenuBar from "./menu-bar";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";

type EditorProps = {
  initialValue?: JSONContent;
  onChange: (value: string) => void;
};

const extensions = [...defaultExtensions, slashCommand];

export default function TailwindAdvancedEditor({ initialValue, onChange }: EditorProps) {
  // const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  // const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
  //   const json = editor.getJSON();

  //   window.localStorage.setItem("novel-content", JSON.stringify(json));
  //   setSaveStatus("Đã lưu");
  // }, 500);

  return (
    <EditorRoot>
      <EditorContent
        slotBefore={<MenuBar />}
        className="rounded-xl border p-6"
        {...(initialValue && { initialContent: initialValue })}
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          // handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          // handleDrop: (view, event, _slice, moved) =>
          //   handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-strong:text-current prose-h1:mb-2 prose-h2:my-2 prose-p:my-0 prose-md dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
        }}
        // slotAfter={<ImageResizer />}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
                key={item.title}
              >
                <div className="flex size-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
        >
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
}
