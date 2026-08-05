import React from "react";

/** Espeja el formato de `InvitationsList` para evitar salto de layout. */
export function InvitationsListSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="-mx-4 flex gap-5 overflow-hidden px-4 pb-6 sm:mx-auto sm:grid sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:max-w-7xl lg:grid-cols-5 lg:items-start lg:gap-5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className={`flex w-[78vw] max-w-sm shrink-0 flex-col sm:w-auto sm:max-w-none ${
              ["lg:mt-16", "lg:mt-8", "lg:mt-0", "lg:mt-8", "lg:mt-16"][idx]
            }`}
          >
            <div
              className="animate-pulse w-full rounded-2xl"
              style={{
                aspectRatio: "1358 / 2150",
                backgroundColor: "rgba(32, 0, 65, 0.07)",
              }}
            />
            <div className="mt-5 space-y-2 px-1">
              <div
                className="animate-pulse h-2 w-16 rounded"
                style={{ backgroundColor: "rgba(32, 0, 65, 0.07)" }}
              />
              <div
                className="animate-pulse h-5 w-32 rounded"
                style={{ backgroundColor: "rgba(32, 0, 65, 0.07)" }}
              />
              <div
                className="animate-pulse h-11 w-full rounded-full"
                style={{ backgroundColor: "rgba(32, 0, 65, 0.05)" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="animate-pulse rounded-2xl mt-12"
        style={{ height: "6rem", backgroundColor: "rgba(32, 0, 65, 0.05)" }}
      />
    </div>
  );
}
