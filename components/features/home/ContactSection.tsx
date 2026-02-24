import { Container } from "@/components/shared/Container";
import ContactTitle from "@/components/features/contact/ContactTitle";
import ContactInfo from "@/components/features/contact/ContactInfo";
import ContactForm from "@/components/features/contact/ContactForm";

export default async function ContactSection() {
  return (
    <section id="contacto" className="py-20 bg-secondary/20" role="main">
      <Container>
        <ContactTitle />
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
