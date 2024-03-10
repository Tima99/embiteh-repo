import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "@/shadcn/components/ui/card";
import { Label } from "@/shadcn/components/ui/label";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "@/components/ui/Error";
import api from "@/services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Form
} from "@/shadcn/components/ui/form";

const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
        ),
});

export default function Component() {
    const form = useForm({
        resolver: zodResolver(schema),
        shouldUseNativeValidation: false,
        mode: "onChange"
    });
    const {
        register,
        formState: { errors, dirtyFields, isSubmitting },
        handleSubmit,
    } = form;

    const navigate = useNavigate()
    const [togglePassword, setTogglePassword] = useState(false);

    async function submitHandler(data){
        try {
            await api.post("/auth/login", data)
            toast.success("Logged In")
            navigate("/admin/masters/productLabel")
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="container bg-shad-100 h-screen overflow-y-auto grid place-items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={handleSubmit(submitHandler)} >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="m@example.com"
                                    type="email"
                                    isValidInput={dirtyFields.email && !errors.email}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <Error>
                                        {errors.email.message}
                                    </Error>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type={togglePassword ? "text" : "password"}
                                    isValidInput={dirtyFields.password && !errors.password}
                                    isPasswordVisible={togglePassword}
                                    onPasswordToggle={() => setTogglePassword(prev => !prev)}
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <Error>
                                        {errors.password.message}
                                    </Error>
                                )}
                            </div>
                            <Button className="w-full" type="submit" disabled={isSubmitting}>
                                Login
                            </Button>
                        </div>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
