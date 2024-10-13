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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  imagen: z.string().optional(),
  mostrarFondo: z.boolean(),
  fondo: z.string().optional(),
  mostrarTexto: z.boolean(),
  texto: z
    .string()
    .min(1, {
      message: "Enter text.",
    })
    .optional(),
  posicionTexto: z
    .string()
    .min(1, {
      message: "Select text position.",
    })
    .optional(),
  mostrarLogo: z.boolean(),
  logo: z
    .string()
    .min(1, {
      message: "Select a logo.",
    })
    .optional(),
  posicionLogo: z
    .string()
    .min(1, {
      message: "Select logo position.",
    })
    .optional(),
});

interface LogoCustomizationFormProps {
  logos: Array<{
    _id: string;
    title: string;
    publicId: string;
  }>;
  images: Array<{
    _id: string;
    title: string;
    publicId: string;
  }>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const CustomizationGalleryForm: React.FC<LogoCustomizationFormProps> = ({
  logos,
  images,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mostrarTexto: false,
      texto: "Sale",
      mostrarFondo: false,
      posicionTexto: "north_east",
      mostrarLogo: false,
      logo: "Nike",
      posicionLogo: "south_east",
      imagen: "",
      fondo: "background1",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="imagen"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Choose an image
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      <SelectValue placeholder="Select an image" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    {images.map((image) => (
                      <SelectItem
                        key={image._id}
                        value={image.publicId}
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {image.title}
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
            name="mostrarFondo"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2">
                <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 pt-1">
                  Show Background Image
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="pb-2 rounded-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("mostrarFondo") && (
            <FormField
              control={form.control}
              name="fondo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Select a Background
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                        <SelectValue placeholder="Select a background" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <SelectItem
                        key="background1"
                        value="imageai/background1"
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Background 1
                      </SelectItem>
                      <SelectItem
                        key="background2"
                        value="imageai/background2"
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Background 2
                      </SelectItem>
                      <SelectItem
                        key="background3"
                        value="imageai/background3"
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Background 3
                      </SelectItem>
                      <SelectItem
                        key="background4"
                        value="imageai/background4"
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Background 4
                      </SelectItem>
                      <SelectItem
                        key="background5"
                        value="imageai/background5"
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Background 5
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="mostrarTexto"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2">
                <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 pt-1">
                  Show Text
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="pb-2 rounded-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("mostrarTexto") && (
            <>
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
                        className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-transparent"
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
                        <SelectTrigger className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
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
            </>
          )}
          <FormField
            control={form.control}
            name="mostrarLogo"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2">
                <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 pt-1">
                  Show Logo
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="pb-2 rounded-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("mostrarLogo") && (
            <>
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
                        <SelectTrigger className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                          <SelectValue
                            placeholder="Change Nike to..."
                            className="text-white bg-blue-500 z-10"
                          />
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
                        <SelectTrigger className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
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
            </>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors duration-300"
          >
            Apply Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CustomizationGalleryForm;
