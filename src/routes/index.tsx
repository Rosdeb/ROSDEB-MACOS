import { createFileRoute } from "@tanstack/react-router";
import { OsShell } from "@/components/os/OsShell";
import { profile } from "@/lib/os/data";

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          email: profile.email,
          url: profile.github,
          sameAs: [profile.github, profile.linkedin],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return <OsShell />;
}
