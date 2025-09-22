"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "../ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "../ui/form.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "../ui/input.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { Toaster, toast } from "sonner";
import ContactButton from "./ContactButton.jsx";
import SendButton from "./SendButton.jsx";
import { Link, useLocation } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  email: z.string().email("Invalid email address.").min(2, {
    message: "Email must be at least 2 characters."
  }),
  message: z.string().min(10, {
    message: "Message should be at least 10 characters."
  }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and policies" })
  })
});

export function ContactForm() {
  const formRef = useRef(null);
  const location = useLocation();
  // configure Zod default values for the form
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data) => {
    const extraMessage = `It looks like this client is interested in ${location.pathname
      .split("/")
      .pop()}. Here is his message:\n`;
    const messageField = formRef.current.message;
    messageField.value = extraMessage + messageField.value;
    if (formRef.current) {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formRef.current,
          {
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          }
        )
        .then(
          () => {
            form.reset(); //clear the fields after submission
            toast.success("Email sent", {
              description: "Thanks, we'll be in touch."
            });
          },
          (error) => {
            toast.error("Failed to send. Check your internet connection.");
            console.warn("FAILED...", JSON.stringify(error));
          }
        );
    }
  };

  return (
    <Dialog className="bg-slate-800">
      <DialogTrigger>
        <ContactButton className="contact-button" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dialog h-auto !p-6">
        <DialogHeader>
          <DialogTitle className="dialog-title text-[#dcdfe2] !text-2xl">
            Contact Us
          </DialogTitle>
          <DialogDescription className="text-[#dcdfe2]">
            We’d be delighted to read your message and get back to you as soon
            as possible!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={formRef} //Required by EmailJS
            onSubmit={form.handleSubmit(onSubmit)}
            className=" !space-y-6"
          >
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-[#dcdfe2]">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-white"
                      placeholder="Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-[#dcdfe2]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-white"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-[#dcdfe2]">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-primary bg-white field-sizing-fixed"
                      placeholder="Type your message here."
                      id="message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row">
                  <FormControl>
                    <Checkbox
                      className="!w-5 !h-5 !data-[state=checked]:bg-red-500"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none flex flex-col">
                    <FormLabel className="text-[#bac0c6]">
                      Accept terms and conditions
                    </FormLabel>
                    <FormDescription>
                      You agree to our Terms of Service and{" "}
                      <Link target="_blank" to="/privacy-policy">
                        <strong>
                          <u>Privacy Policy</u>
                        </strong>
                        .
                      </Link>
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <SendButton type="submit" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
