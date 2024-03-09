import api from "@/services/api";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  
} from "@/shadcn/components/ui/sheet";
import serializeForm from "@/utils/serializeForm";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UploadImages = ({ children, productId, setSortedImages }) => {
  const form = useForm();
  const { register, formState: { isSubmitting } } = form;
  async function onSubmit(data) {
    try {
      const formData = serializeForm(data);

      const resData = await api.patch(
        `/product/upload/images/${productId}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      typeof setSortedImages === "function" &&
        setSortedImages((prev) => [...prev, ...(resData.uploadedImageNames || [])]);

      toast.success("Successfully uploaded");
    } catch (error) {
      toast.error("Try Again");
    }
  }

  return (
    <Sheet>
      {children}
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Upload Images?</SheetTitle>
          <SheetDescription>Upload Product Images</SheetDescription>
        </SheetHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-8">
          <Label htmlFor="picture">Picture</Label>
          <Input
            id="picture"
            type="file"
            multiple={true}
            {...register("images")}
          />
        </div>

        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>Upload</Button>
      </SheetContent>
    </Sheet>
  );
};

export default UploadImages;
