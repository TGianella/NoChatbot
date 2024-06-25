"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  request: z.string().min(2),
  url0: z.string(),
  url1: z.optional(z.string()),
  url2: z.optional(z.string()),
  url3: z.optional(z.string()),
  url4: z.optional(z.string()),
});

export function RequestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      request: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleAddField() {
    if (fields.length < 5) {
      append({ url: "" });
    }
  }

  function handleRemoveField() {
    remove(-1);
  }

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "urls", // unique name for your Field Array
      defaultValue: [{ url: "" }],
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="request"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I want to know what I should do to get a tourist visa to visit the US."
                  {...field}
                />
              </FormControl>
              <FormDescription>Describe your situation.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url0"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url 1</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormDescription>
                Add urls from which we can infer the form.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => (
          <div key={field.id}>
            <FormField
              control={form.control}
              name={`url${index + 1}`}
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url {index + 2}</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          {fields.length < 5 ? (
            <Button type="button" onClick={handleAddField}>
              Add URL
            </Button>
          ) : null}
          {fields.length > 0 ? (
            <Button type="button" onClick={handleRemoveField}>
              Remove URL
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
}
