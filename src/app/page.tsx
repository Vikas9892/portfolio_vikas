import dynamic from "next/dynamic";

import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Metrics } from "@/components/site/metrics";
import { About } from "@/components/site/about";
import { Footer } from "@/components/site/footer";

// Below-the-fold sections carry the animation and gallery weight — keep them
// out of the initial bundle so the hero paints first.
const Projects = dynamic(() =>
  import("@/components/site/projects").then((m) => m.Projects),
);
const Competitive = dynamic(() =>
  import("@/components/site/competitive").then((m) => m.Competitive),
);
const Skills = dynamic(() => import("@/components/site/skills").then((m) => m.Skills));
const Experience = dynamic(() =>
  import("@/components/site/experience").then((m) => m.Experience),
);
const Contact = dynamic(() =>
  import("@/components/site/contact").then((m) => m.Contact),
);

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        <About />
        <Projects />
        <Competitive />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
