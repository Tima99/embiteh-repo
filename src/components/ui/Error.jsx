import { FormDescription } from "@/shadcn/components/ui/form";

const Error = ({ children }) => {
    return <FormDescription className="!text-red-500">{children}</FormDescription>;
};

export default Error;
