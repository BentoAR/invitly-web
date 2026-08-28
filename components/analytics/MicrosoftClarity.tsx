"use client";

import Script from "next/script";
import { useDeferredLoad } from "@/hooks/useDeferredLoad";

export default function MicrosoftClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const shouldLoad = useDeferredLoad();

  if (!clarityId || !shouldLoad) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}
