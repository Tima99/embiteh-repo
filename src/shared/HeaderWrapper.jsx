import { motion } from "framer-motion";
import Typography from "@/components/ui/Heading";
import { Button } from "@/shadcn/components/ui/button";
import React from "react";

const HeaderWrapper = (
    WrappedComponent,
    { isBack = false, btnText = "Create", to = "add", isBtn, subTitle, onClick } = {
        isBack: false,
        btnText: "Create",
        to: "add",
    }
) => {
    return () => {
        return (
            <React.Fragment>
                <Typography.Heading isBack={isBack} subTitle={subTitle}>
                    {isBtn && (
                        <Button.Add variant="rounded" to={!onClick && to} onClick={onClick}>
                            {btnText}
                        </Button.Add>
                    )}
                </Typography.Heading>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                >
                    <WrappedComponent />
                </motion.div>
            </React.Fragment>
        );
    };
};

export default HeaderWrapper;
