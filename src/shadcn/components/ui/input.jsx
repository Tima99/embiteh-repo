import * as React from "react";

import { cn } from "@/shadcn/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = React.forwardRef(
    (
        {
            className,
            type,
            styleCheckIcon,
            isValidInput,
            onPasswordToggle,
            ...props
        },
        ref
    ) => {
        return (
            <span className="relative flex items-center">
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <AnimatePresence>
                    {isValidInput && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            className={cn("absolute right-4 text-green-600")}
                        >
                            <FaCheckCircle className={styleCheckIcon} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {typeof onPasswordToggle === "function" && (
                    <span
                        className={`absolute ${isValidInput ? "right-10" : "right-4"} text-lg text-gray-600 cursor-pointer`}
                        onClick={onPasswordToggle}
                    >
                        {props.isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                )}
            </span>
        );
    }
);

Input.displayName = "Input";

export { Input };
