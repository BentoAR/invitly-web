import ExperienceSurvey from "@/components/features/experience/ExperienceSurvey";

export default async function ExperiencePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ExperienceSurvey token={token} />;
}
