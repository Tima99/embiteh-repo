import { Input } from "@/shadcn/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/shadcn/components/ui/form";
import { Textarea } from "@/shadcn/components/ui/textarea";
import EmbitehSelect from "@/components/ui/Select";
import INPUT_TYPES from "@/constants/InputTypes";
import { Button } from "@/shadcn/components/ui/button";

const FormUI = ({ FORM_UI, form, onSubmit }) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
                    {FORM_UI?.map((formui) => {
                        const fieldRef = form.register(formui.name)

                        return (
                            <FormField
                                key={formui.id}
                                control={form.control}
                                name={formui.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{formui.label}</FormLabel>
                                        <FormControl>
                                            {formui.type ===
                                            INPUT_TYPES.TEXTAREA ? (
                                                <Textarea
                                                    rows={formui.rows || 1}
                                                    placeholder={
                                                        formui.placeholder
                                                    }
                                                    {...field}
                                                />
                                            ) : formui.type ===
                                              INPUT_TYPES.SELECT ? (
                                                <EmbitehSelect
                                                    {...formui}
                                                    field={field}
                                                />
                                            ) : formui.jsx ? (
                                                <formui.jsx
                                                    value={field.value || []}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    ref={field.ref}
                                                    {...formui.props}
                                                />
                                            ) : (
                                                <Input
                                                    placeholder={
                                                        formui.placeholder
                                                    }
                                                    type={formui.type}
                                                    {...formui.props}
                                                    // {...field}
                                                    {...fieldRef}
                                                />
                                            )}
                                        </FormControl>
                                        {formui.hint && <FormDescription> {formui.hint} </FormDescription>}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        );
                    })}
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
    );
};

export default FormUI;
