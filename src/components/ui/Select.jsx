import useFetch from "@/hooks/useFetch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/components/ui/select";
import { useEffect } from "react";

const EmbitehSelect = ({
    from = "",
    extractKey,
    keys = {
        value: "_id",
        label: "name",
    },
    placeholder = "Select",
    field,
    options,
    ...props
} = {}) => {
    const [selectOptions, , { setData }] = useFetch(from, {
        extractKey,
        autoFetchOnce: from,
    });

    useEffect(() => {
        if(from) return;
        setData(options)
    }, [from, options, setData])



    return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className={props.className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {selectOptions?.map((option) => {
                    return (
                        <SelectItem
                            key={option[keys.value]}
                            value={option[keys.value]}
                        >
                            {option[keys.label]}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

export default EmbitehSelect;
