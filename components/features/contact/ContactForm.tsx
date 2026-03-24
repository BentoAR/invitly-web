"use client";
import { Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { contactFormSchema, type ContactFormValues } from "@/utils/validations";
import { postNewInquiry } from "@/services/contact";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      eventType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await postNewInquiry(data);
      toast.success(t("form.success"), {
        description: t("form.successDescription"),
        position: "top-right",
      });
      form.reset();
    } catch {
      toast.error(t("form.error"), {
        description: t("form.errorDescription"),
        position: "top-right",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-card rounded-2xl p-8 shadow-soft"
        role="form"
        aria-labelledby="contact-title contact-subtitle"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="name-input">{t("form.name")}</FormLabel>
              <FormControl>
                <Input
                  id="name-input"
                  placeholder={t("form.namePlaceholder")}
                  aria-required="true"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="email-input">{t("form.email")}</FormLabel>
              <FormControl>
                <Input
                  id="email-input"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  aria-required="true"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventType"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="event-type-select">
                {t("form.eventType")}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? ""}
              >
                <FormControl>
                  <SelectTrigger
                    id="event-type-select"
                    aria-required="true"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder={t("form.eventTypePlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="boda">
                    {t("form.eventTypes.boda")}
                  </SelectItem>
                  <SelectItem value="quince">
                    {t("form.eventTypes.quince")}
                  </SelectItem>
                  <SelectItem value="babyshower">
                    {t("form.eventTypes.babyshower")}
                  </SelectItem>
                  <SelectItem value="cumpleanos">
                    {t("form.eventTypes.cumpleanos")}
                  </SelectItem>
                  <SelectItem value="corporativo">
                    {t("form.eventTypes.corporativo")}
                  </SelectItem>
                  <SelectItem value="otro">
                    {t("form.eventTypes.otro")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="message-input">{t("form.message")}</FormLabel>
              <FormControl>
                <Textarea
                  id="message-input"
                  placeholder={t("form.messagePlaceholder")}
                  rows={5}
                  aria-required="true"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`w-full shadow-elegant${
            form.formState.isSubmitting ? " opacity-50" : ""
          }`}
          size="lg"
          aria-label={t("form.submit")}
          disabled={form.formState.isSubmitting}
        >
          <Send className="h-4 w-4 mr-2" aria-hidden="true" />
          {t("form.submit")}
        </Button>
      </form>
    </Form>
  );
}
