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

const UploadImages = ({ children, id, setSortedImages, postUrl, cb, UI }) => {
    const form = useForm();
    const {
        register,
        formState: { isSubmitting },
    } = form;

    async function onSubmit(data) {
        try {
            const formData = serializeForm(data);

            let resData = null;
            if (id) {
                resData = await api.patch(
                    `/product/upload/images/${id}`,
                    formData,
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }
                );
            } else {
                resData = await api.post(postUrl, formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });
            }

            typeof setSortedImages === "function" &&
                setSortedImages((prev) => [
                    ...prev,
                    ...(resData.uploadedImageNames || []),
                ]);
            typeof cb === "function" && cb();

            toast.success("Successfully uploaded");
        } catch (error) {
            let errs = [];
            if (typeof error === "object") {
                errs = Object.values(error);
            }
            toast.error(errs?.[0] || "Try Again");
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
                {typeof UI === "function" && UI(register)}

                <div className="grid w-full max-w-sm items-center gap-1.5 my-8">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                        id="picture"
                        type="file"
                        multiple={true}
                        {...register("images")}
                    />
                </div>

                <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    Upload
                </Button>
            </SheetContent>
        </Sheet>
    );
};

export default UploadImages;
