import Error from "@/components/ui/Error";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Form } from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      ),
    // confirmPassword: z.string(),
  })
  .refine((data) => {
    console.log(data);
    return data.password === data.confirmPassword
  }, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function AccountAuth() {
  const form = useForm({
    resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
    mode: "onChange",
  });

  const {
    register,
    formState: { errors, dirtyFields, isSubmitting },
    handleSubmit,
  } = form;

  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <div className="container bg-shad-100 h-screen overflow-y-auto grid place-items-center">
      <Tabs defaultValue="account" className="w-[420px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Create Account</TabsTrigger>
          <TabsTrigger value="password">Login</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create new account here. Click submit when you&#39;re done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    type="email"
                    isValidInput={dirtyFields.email && !errors.email}
                    {...register("email")}
                  />
                  {errors.email && <Error>{errors.email.message}</Error>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={togglePassword ? "text" : "password"}
                    isValidInput={dirtyFields.password && !errors.password}
                    isPasswordVisible={togglePassword}
                    onPasswordToggle={() => setTogglePassword((prev) => !prev)}
                    {...register("password")}
                  />
                  {errors.password && <Error>{errors.password.message}</Error>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={"text"}
                    isValidInput={
                      dirtyFields.confirmPassword && !errors.confirmPassword
                    }
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <Error>{errors.confirmPassword.message}</Error>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login into your account using your email and password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Email</Label>
                  <Input id="current" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Form>
      </Tabs>
    </div>
  );
}

export default AccountAuth;
