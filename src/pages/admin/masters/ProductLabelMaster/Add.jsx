import HeaderWrapper from "@/shared/HeaderWrapper";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { toast } from "react-hot-toast";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shadcn/components/ui/form";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    name: z.string().trim().min(2, {
        message: "Label name must be at least 2 characters.",
    }),
    description: z.optional(z.string()),
});

const Add = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const { handleSubmit, control } = form;

    const navigate = useNavigate();

    async function onSubmit(values) {
        try {
            await api.post("/master/product-label", values);
            toast.success("Created Successfully");
            navigate(-1);
        } catch (message) {
            toast.error(message);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
                        <FormField
                            control={control}
                            name={"name"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"Enter label name"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={"description"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={1}
                                            placeholder="Enter description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <Button
                            type="submit"
                            size="lg"
                            variant="rounded"
                            disabled={form.formState.isSubmitting}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default HeaderWrapper(Add, { isBack: true, isBtn: false });
