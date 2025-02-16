"use client";

import { Hero } from "@/components/blocks/hero";
import { Footer } from "@/components/blocks/footer";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (!session) {
      router.push("/auth/signin");
    } else {
      router.push("/home");
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Hero
        title="Welcome to Cineverse"
        subtitle="Discover and explore your favorite movies and TV shows in one place. Immerse yourself in endless entertainment."
        actions={[
          {
            label: "Get Started",
            onClick: handleGetStarted,
            variant: "default"
          }
        ]}
        titleClassName="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
        subtitleClassName="text-lg md:text-xl max-w-[800px] text-gray-300"
        actionsClassName="mt-8"
      />
      <Footer />
  </main>
  );
}
