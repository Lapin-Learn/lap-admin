import { X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ChangeImageDialogProps = React.PropsWithChildren<{
  onSubmit?: (file: File[]) => void;
  isLoading?: boolean;
}>;

export default function ChangeImageDialog({ children, onSubmit }: ChangeImageDialogProps) {
  const methods = useForm<{
    file: FileList;
  }>();
  const [open, setOpen] = React.useState(false);
  const { register, watch } = methods;
  const files = watch("file");

  const handleRemoveFile = (index: number) => {
    const newFiles = Array.from(files);
    newFiles.splice(index, 1);
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    methods.setValue("file", dataTransfer.files);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          methods.reset();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <DialogTitle>Upload image</DialogTitle>
          <DialogDescription>Upload an image for this question type</DialogDescription>
        </DialogTitle>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit((data: { file: FileList }) => {
              if (data.file.length > 0) {
                if (typeof onSubmit === "function") {
                  onSubmit(Array.from(data.file));
                }
              }
              setOpen(false);
            })}
          >
            <Input type="file" {...register("file")} accept="image/*" />
            {files && (
              <div className="mt-4 flex flex-wrap gap-4">
                {Array.from(files).map((file, index) => {
                  if (file.type.startsWith("image/"))
                    return (
                      <div className="relative">
                        <img
                          key={index}
                          alt=""
                          src={URL.createObjectURL(file)}
                          className="size-20 object-cover"
                        />
                        <Button
                          className="absolute right-0 top-0 size-7 rounded-full p-1"
                          variant="outline"
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X />
                        </Button>
                      </div>
                    );
                })}
              </div>
            )}
            <DialogFooter>
              <DialogClose>
                <Button variant="outline" type="reset">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Done</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
