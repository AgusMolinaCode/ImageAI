import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  texto: z.string().min(1, {
    message: "Text is required.",
  }),
  posicionTexto: z.string().min(1, {
    message: "Select text position.",
  }),
  logo: z.string().min(1, {
    message: "Select a logo.",
  }),
  posicionLogo: z.string().min(1, {
    message: "Select logo position.",
  }),
});

interface LogoCustomizationFormProps {
  logos: Array<{
    _id: string;
    title: string;
    publicId: string;
  }>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const LogoCustomizationForm: React.FC<LogoCustomizationFormProps> = ({
  logos,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      texto: "Text",
      posicionTexto: "north_east",
      logo: "",
      posicionLogo: "south_east",
    },
  });

  const posiciones = [
    { value: "north_west", label: "Top Left" },
    { value: "north", label: "Top Center" },
    { value: "north_east", label: "Top Right" },
    { value: "west", label: "Middle Left" },
    { value: "center", label: "Middle Center" },
    { value: "east", label: "Middle Right" },
    { value: "south_west", label: "Bottom Left" },
    { value: "south", label: "Bottom Center" },
    { value: "south_east", label: "Bottom Right" },
  ];

  return (
    <div className="max-w-xl md:w-1/2 h-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-300">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="texto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Overlay Text
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter text"
                    {...field}
                    className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="posicionTexto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Text Position
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                      <SelectValue placeholder="Select text position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    {posiciones.map((pos) => (
                      <SelectItem
                        key={pos.value}
                        value={pos.value}
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Select a logo
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                      <SelectValue placeholder="Select a logo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    {logos.map((logo) => (
                      <SelectItem
                        key={logo._id}
                        value={logo.publicId}
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {logo.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="posicionLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Logo Position
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                      <SelectValue placeholder="Select logo position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    {posiciones.map((pos) => (
                      <SelectItem
                        key={pos.value}
                        value={pos.value}
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors duration-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
          >
            Apply Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LogoCustomizationForm;
