import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { ListIcon, ListOrderedIcon, Redo, Undo } from "lucide-react";
import { useEditor } from "novel";
import { useEffect, useState } from "react";

import { Button, Separator } from "@/components/ui";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

enum TextStyle {
  bold = "bold",
  italic = "italic",
  strikethrough = "strikethrough",
  underline = "underline",
}
export default function MenuBar() {
  const [textStyle, setTextStyle] = useState<Set<TextStyle>>(new Set<TextStyle>());
  const { editor } = useEditor();
  const activeItalic = editor?.isActive("italic");
  useEffect(() => {
    if (!editor) return;
    setTextStyle((prev: Set<TextStyle>) => {
      if (activeItalic) {
        prev.add(TextStyle.italic);
        return prev;
      } else {
        prev.delete(TextStyle.italic);
        return prev;
      }
    });
  }, [editor, activeItalic]);
  if (!editor) {
    return null;
  }

  return (
    <div className="mb-6 flex w-full flex-wrap gap-2 border-b pb-4">
      <ToggleGroup
        type="multiple"
        className="gap-0"
        value={Array.from(textStyle.values())}
        onValueChange={(value: TextStyle[]) => setTextStyle(new Set(value))}
      >
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <FontBoldIcon className="size-4" />
        </ToggleGroupItem>
        <Separator orientation="vertical" className="h-6" />
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FontItalicIcon className="size-4" />
        </ToggleGroupItem>
        <Separator orientation="vertical" className="h-6" />
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon className="size-4" />
        </ToggleGroupItem>
        <Separator orientation="vertical" className="h-6" />
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <Button
        type="button"
        variant={editor.isActive("code") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <CodeIcon />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("heading", { level: 1 }) ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </Button>
      <Button
        type="button"
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </Button>
      <Button
        type="button"
        variant={editor.isActive("heading", { level: 3 }) ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </Button>
      <Button
        type="button"
        variant={editor.isActive("heading", { level: 4 }) ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        H4
      </Button>
      <Button
        type="button"
        variant={editor.isActive("heading", { level: 5 }) ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        H5
      </Button>
      <Button
        type="button"
        variant={editor.isActive("heading", { level: 6 }) ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        H6
      </Button>
      <Button
        type="button"
        variant={editor.isActive("bulletList") ? "default" : "secondary"}
        className="size-9 p-2"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("orderedList") ? "default" : "secondary"}
        className="size-9 p-2"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("codeBlock") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        Code block
      </Button>
      <Button
        type="button"
        variant={editor.isActive("blockquote") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <QuoteIcon />
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        Horizontal rule
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="size-9 p-2"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo />
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="size-9 p-2"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo />
      </Button>
    </div>
  );
}
