"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function About() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-6 hover:bg-[#6556CD] hover:text-white gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-card border rounded-lg shadow-2xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About Cineverse</h1>
            <p className="text-muted-foreground text-lg">
              A casual project
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Project Goals</h2>
              <p className="text-muted-foreground">
                Cineverse helped me in learning :
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "TanStack Query",
                  "Tailwind CSS",
                  "Next.js",
                  "TypeScript"
                ].map((tech) => (
                  <Badge 
                    key={tech}
                    variant="secondary"
                    className="text-sm py-2 px-4 hover:bg-[#6556CD] hover:text-white transition-colors duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Connect With Me</h2>
              <div className="flex space-x-4">
                <Link 
                  href="https://github.com/abhinavkale-dev" 
                  target="_blank"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaGithub className="h-6 w-6" />
                  <span>GitHub</span>
                </Link>
                <Link 
                  href="https://x.com/Abhinavstwt" 
                  target="_blank"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaTwitter className="h-6 w-6" />
                  <span>Twitter</span>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js 15",
                  "TypeScript",
                  "TanStack Query",
                  "Tailwind CSS",
                  "Shadcn UI",
                  "NextAuth.js"
                ].map((tech) => (
                  <Badge 
                    key={tech}
                    variant="secondary"
                    className="text-sm py-2 px-4 hover:bg-[#6556CD] hover:text-white transition-colors duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
