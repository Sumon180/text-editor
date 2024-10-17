"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "./_components/text-editor";

// Function to extract text from HTML
function extractTextFromHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

// Define the schema using zod
const formSchema = z.object({
  post: z
    .string()
    .refine((value) => extractTextFromHTML(value).trim().length >= 5, {
      message: "The text must be at least 5 characters long after trimming",
    }),
});

// Define the form values type
type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  // Initialize the form using useForm hook
  const form = useForm<FormValues>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      post: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-3xl mx-auto py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={(value: string) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
