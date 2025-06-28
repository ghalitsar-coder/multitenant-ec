"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const SignUpView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError(error) {
        toast.error(error.message);
      },
      onSuccess() {
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;
  console.log(`THIS IS  usernameErrors:`, usernameErrors);
  const showPreview = username && !usernameErrors;
  console.log("FORM ,", form.formState.defaultValues);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto ">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span
                  className={cn("text-2xl font-semibold", poppins.className)}
                >
                  funroad
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size={"sm"}
                className="text-base border-none underline"
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1,582 creators earning money on FunRoad.
            </h1>
            {(["username", "email", "password"] as const).map((item) => (
              <FormField
                key={item}
                name={item}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base capitalize ">
                      {item}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={item === "password" ? "password" : "text"}
                      />
                    </FormControl>
                    {item === "username" && (
                      <FormDescription
                        className={cn("hidden", showPreview && "block")}
                      >
                        {" "}
                        Yor store will be available at &nbsp;
                        <strong> {username} </strong>.shop.com
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              disabled={register.isPending}
              type="submit"
              size="lg"
              variant={"elevated"}
              className="bg-black text-white hover:bg-pink-400  hover:text-primary"
            >
              Create account
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
