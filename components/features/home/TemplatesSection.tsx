import { Container } from "@/components/shared/Container";
import { TemplatesHeader } from "@/components/features/templates/TemplatesHeader";
import { InvitationsList } from "@/components/features/templates/InvitationsList";
import { CategorySelect } from "@/components/features/templates/CategorySelect";
import { getTranslations } from "next-intl/server";
import { WaveDivider } from "@/components/shared/WaveDivider";

export default async function TemplatesSection() {
  const t = await getTranslations("Templates");
  return (
    <>
      <WaveDivider flipY height={80} color="accent" />
      <section
        id="invitaciones"
        className="py-20 bg-linear-to-b from-accent to-background"
        role="main"
      >
        <Container>
          <TemplatesHeader
            title={t("featuredInvitations")}
            description={t("featuredDescription")}
          />
          <CategorySelect />
          <InvitationsList />
        </Container>
      </section>
    </>
  );
}
