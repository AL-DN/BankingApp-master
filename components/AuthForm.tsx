"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import SignUp from "@/app/(auth)/sign-up/page";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  // inorder to navigate to homepage on signIn we need router
  const router = useRouter();
    
  
  /*So we can save user data set to null at first*/
  const [user, setUser] = useState(null);
  /*allows us to create respoonsive button loading animation*/
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    
    
    setIsLoading(true);

    try {
      if(type === 'sign-up') {
        const newUser = await signUp(data);
        setUser(newUser);
      }
     /* if(type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if(response) router.push('/') 
      } */

  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 mid:gap-8">
        {/*Horizon Logo/Image from MobileNav*/}
        <Link
          href="/"
          className="gap-1 px-4 cursor-pointer flex items-center gap-2"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900 mt-5">
            {/*If we have user, render Link Account else:
                if type === sign-in render sign in else render sign up*/}
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}

            <p className="text-16 font-normal text-gray-600">
              {/*If we have user render "Link your account to get started" 
              else render "Please enter your details"*/}
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {/*If we have user render TODO: Plaid Link else render form*/}
      {user ? (
        <div className="flex flex-col gap-4">{/*Plaid Link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/*Allows Us ot create new input fields based on type */}
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name:"
                      placeholder="Enter your first name"
                    />

                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name:"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address:"
                    placeholder="Enter your Address"
                  />
                   <CustomInput
                    control={form.control}
                    name="city"
                    label="City:"
                    placeholder="Ex: Brooklyn"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State:"
                      placeholder="Example: NY"
                    />

                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Zip Code:"
                      placeholder="Example: 11334"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth:"
                      placeholder="YYYY-MM-DD"
                    />

                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="Social Security # :"
                      placeholder="###-##-####"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email:"
                placeholder="Email"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password:"
                placeholder="Password"
              />

              {/* prevents from spamming database  */}
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-grey-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
