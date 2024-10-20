/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomField } from "./CustomField";
import MediaUploader from "./MediaUploader";
import { addLogo } from "@/lib/actions/logo.actions";

export const formSchema = z.object({
  title: z.string().min(3, "The title is required"),
  publicId: z.string().min(1, "The image is required"),
  secureURL: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const LogoForm = ({ data, userId }: LogoFormProps) => {
  const [image, setImage] = useState(data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = data
    ? {
        title: data?.title,
        publicId: data?.publicId,
        secureURL: data?.secureURL,
        width: data?.width,
        height: data?.height,
      }
    : {
        title: "",
        publicId: "",
        secureURL: "",
        width: undefined,
        height: undefined,
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const logoData = {
      secureURL: image?.secureURL,
      publicId: values.publicId,
      title: values.title,
      width: image?.width,
      height: image?.height,
    };

    try {
      const newLogo = await addLogo({
        logo: logoData,
        userId,
        path: "/logos",
      });

      if (newLogo) {
        form.reset();
        setImage(null);
        router.push(`/logos`);
      }
    } catch (error) {
      console.error(error);
    }

    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-1">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Logo Title"
          className="max-w-xs"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={""}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="group flex h-10 items-center justify-center rounded-md border border-blue-600 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#93c5fd] hover:from-blue-600 hover:via-blue-600 hover:to-blue-600 active:[box-shadow:none]"
        >
          <span className="block group-active:[transform:translate3d(0,1px,0)]">
            {isSubmitting ? "Saving..." : "Save Logo"}
          </span>
        </Button>
      </form>
    </Form>
  );
};

export default LogoForm;
