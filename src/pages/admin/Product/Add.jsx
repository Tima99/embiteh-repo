import HeaderWrapper from "@/shared/HeaderWrapper";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { toast } from "react-hot-toast";

import { useLocation, useNavigate } from "react-router-dom";
import INPUT_TYPES from "@/constants/InputTypes";
import FormUI from "@/components/FormUI";
import TagsInput from "react-tagsinput";
import serializeForm from "@/utils/serializeForm";

const FORM_UI = [
    {
        type: INPUT_TYPES.TEXT,
        label: "Name",
        name: "name",
        placeholder: "Enter product name",
        id: 1,
    },
    {
        type: INPUT_TYPES.TEXTAREA,
        label: "Description",
        name: "description",
        placeholder: "Enter product description",
        id: 2,
    },
    {
        type: INPUT_TYPES.NUMBER,
        label: "Price",
        name: "price",
        placeholder: "Enter product price",
        id: 3,
    },
    {
        type: INPUT_TYPES.NUMBER,
        label: "Discount Amount",
        name: "discountPrice",
        placeholder: "Enter product dicount price",
        id: 4,
    },
    {
        type: INPUT_TYPES.NUMBER,
        label: "Quantity",
        name: "quantity",
        placeholder: "Enter product quantity",
        id: 5,
    },
    {
        type: INPUT_TYPES.SELECT,
        label: "Label",
        name: "label",
        placeholder: "Select product label",
        from: "/master/product-label",
        extractKey: "labels",
        id: 6,
    },
    {
        id: 7,
        type: INPUT_TYPES.SELECT,
        label: "Currency",
        name: "currency",
        placeholder: "Select Product Currency",
        options: [
            {
                value: "ruppee",
                label: "Ruppee",
            },
            {
                value: "dollar",
                label: "Dollar",
            },
        ],
        keys: {
            label: "label",
            value: "value",
        },
    },
    {
        id: 8,
        jsx: TagsInput,
        props: {
            onlyUnique: true,
            className:
                "flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            tagProps: {
                className: "react-tagsinput-tag rounded-md !py-0",
            },
            inputProps: {
                className:
                    "react-tagsinput-input w-[84px] outline-none py-0 mb-0",
                placeholder: "Add new tag",
            },
        },
        hint: "Press `Tab` to enter a tag",
        label: "Tags",
        name: "tags",
    },
    {
        type: INPUT_TYPES.FILE,
        label: "Pictures",
        name: "images",
        placeholder: "Enter product images",
        props: {
            multiple: true,
        },
        id: 9,
    },
];

const formSchema = z
    .object({
        name: z.string().trim().min(2, {
            message: "Product name must be at least 2 characters.",
        }),
        description: z.optional(z.string()),
        price: z
            .number({
                coerce: Number,
            })
            .positive("Min. price value must be 1."),
        discountPrice: z.optional(
            z
                .number({ coerce: Number })
                .nonnegative("Discount price must be non-negative number.")
        ),
        quantity: z
            .number({
                coerce: Number,
            })
            .positive("Min. Quantity must be 1."),
        label: z.string().min(1, { message: "Product label is required." }),
        currency: z.string().min(1, { message: "Product currency is required." }),
        tags: z.optional(z.array(z.string())),
        images: z.optional(z.instanceof(FileList)
            .refine(files => [...files].every(file => file.type.startsWith("image")), "Only images allowed."))
        }
        )
    .refine(
        (schema) => {
            return (
                (!schema.price && !schema.discountPrice) ||
                schema.discountPrice < schema.price
            );
        },
        {
            message: "Discount price must be less than price",
            path: ["discountPrice"],
        }
    );

const Add = () => {
    const {state: editProduct} = useLocation()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: editProduct ? {...editProduct, images: undefined} :{
            name: "",
            description: "",
            price: "",
            discountPrice: "",
            quantity: "",
            label: "",
            currency: "ruppee",
            tags: [],
        },
    });

    const navigate = useNavigate();

    async function onSubmit(values) {
        try {
            if(editProduct){
                await api.put(`/product/${editProduct?._id}`, {...values, images: undefined});
                toast.success("Updated Successfully");
            }else{
                await api.post("/product", serializeForm(values), {
                    headers: {
                        "content-type": "multipart/form-data",
                    }
                });
                toast.success("Created Successfully");
            }
            navigate(-1);
        } catch (message) {
            toast.error(message);
        }
    }

    console.log(form.getValues("tags"));

    return (
        <>
            <FormUI form={form} onSubmit={onSubmit} FORM_UI={editProduct ? FORM_UI.slice(0, FORM_UI.length - 1) : FORM_UI}></FormUI>
        </>
    );
};

export default HeaderWrapper(Add, { isBack: true, isBtn: false });
