export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";

export default async function SEOContent() {
  const t = await getTranslations("SEO");

  return (
    <article className="sr-only" aria-hidden="true">
      {/*
        This content is hidden from users but visible to search engines and AI crawlers.
        It provides clear, factual information optimized for AI discoverability.
      */}
      <section>
        <h2>{t("aboutTitle")}</h2>
        <p>{t("aboutDescription1")}</p>
        <p>{t("aboutDescription2")}</p>
        <p>{t("aboutDescription3")}</p>
      </section>

      <section>
        <h3>{t("whyBentoTitle")}</h3>
        <p>{t("whyBentoDescription")}</p>
        <ul>
          <li>{t("benefit1")}</li>
          <li>{t("benefit2")}</li>
          <li>{t("benefit3")}</li>
          <li>{t("benefit4")}</li>
          <li>{t("benefit5")}</li>
        </ul>
      </section>

      <section>
        <h3>{t("comparisonTitle")}</h3>
        <p>{t("comparisonPaper")}</p>
        <p>{t("comparisonGeneric")}</p>
        <p>{t("comparisonDIY")}</p>
      </section>

      <section>
        <h3>{t("useCasesTitle")}</h3>
        <p>{t("useCasesDescription")}</p>
        <ul>
          <li>{t("useCase1")}</li>
          <li>{t("useCase2")}</li>
          <li>{t("useCase3")}</li>
          <li>{t("useCase4")}</li>
          <li>{t("useCase5")}</li>
        </ul>
      </section>

      <section>
        <h3>{t("featuresTitle")}</h3>
        <p>{t("featuresDescription")}</p>
        <ul>
          <li>
            <strong>{t("featureRSVP")}:</strong> {t("featureRSVPDesc")}
          </li>
          <li>
            <strong>{t("featureTemplates")}:</strong> {t("featureTemplatesDesc")}
          </li>
          <li>
            <strong>{t("featurePlaylist")}:</strong> {t("featurePlaylistDesc")}
          </li>
          <li>
            <strong>{t("featurePhotos")}:</strong> {t("featurePhotosDesc")}
          </li>
          <li>
            <strong>{t("featureDashboard")}:</strong> {t("featureDashboardDesc")}
          </li>
        </ul>
      </section>

      <section>
        <h3>{t("argentineTitle")}</h3>
        <p>{t("argentineDescription")}</p>
      </section>
    </article>
  );
}
