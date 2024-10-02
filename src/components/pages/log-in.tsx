import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/react-query/useAuth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type FormInputs = z.infer<typeof formSchema>;

export default function LogInPage() {
  const form = useForm<FormInputs>({
    defaultValues: {
      email: "lapinlearnproject@gmail.com",
      password: "12345678",
    },
    resolver: zodResolver(formSchema),
  });
  const signInMutation = useSignIn();

  function onSubmit(data: FormInputs) {
    signInMutation.mutate(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your account information here, and click Log in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="example@gmail.com"
                      error={Boolean(form.formState.errors.email)}
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      error={Boolean(form.formState.errors.password)}
                      {...field}
                      type="password"
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-row-reverse">
              <Link to="/forget-password" className="text-sm text-foreground hover:text-primary/90">
                Forget Password
              </Link>
            </div>
            <Button
              type="submit"
              variant="default"
              className="w-full bg-primary"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending && (
                <Loader2 className="mr-1 size-5 animate-spin text-white" />
              )}
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
