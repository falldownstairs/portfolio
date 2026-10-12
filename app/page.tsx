import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

const projects = [
  {
    title: "Lumi",
    description:
      "An alarm clock app that forces you to wake up by ringing continuously until you tap your phone on a physical dock.",
    href: "https://www.lumialarmclock.com/",
    image: "/lumi.png",
    info: "50+ paying users",
    accent: "bg-cyan-300/25",
  },
  {
    title: "Physics Roadmap",
    description:
      "Free AP Physics C resource with a clear roadmap covering Mechanics and Electricity & Magnetism.",
    href: "https://www.physicsroadmap.com/",
    image: "/physicsroadmap.png",
    info: "3000+ MAU",
    accent: "bg-violet-300/25",
  },
  {
    title: "Quadruped Robot",
    description:
      "A lightweight robot powered by a Raspberry Pi, giving LLMs access to real-world interactions.",
    href: "https://github.com/falldownstairs/quadruped-robot",
    image: "/quadruped.png",
    info: "Project",
    accent: "bg-emerald-300/25",
  },
  {
    title: "Re-Vision",
    description:
      "An AI-powered carbon footprint tracker that uses Ray-Ban Meta glasses to automatically track your carbon footprint.",
    href: "https://devpost.com/software/re-vision-ujhc19",
    image: "/revision.png",
    info: "Hack the Coast Winner",
    accent: "bg-amber-300/25",
  },
  {
    title: "Handy Andy",
    description:
      "A mechanical hand that translates speech into American Sign Language.",
    href: "https://github.com/falldownstairs/Handy-Andy",
    image: "/handy andy.jpg",
    imagePosition: "object-[center_45%]",
    info: "Project",
    accent: "bg-rose-300/25",
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <a
      className="group block h-full w-full"
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex h-full w-full flex-col border border-border/70 bg-[var(--control-bg)] transition-colors hover:border-foreground/20 hover:bg-[var(--project-media)]">
        <div className="relative aspect-[2/1] overflow-hidden bg-[var(--project-media)]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1400px) 408px, (min-width: 1280px) calc((100vw - 176px) / 3), (min-width: 768px) calc((100vw - 152px) / 2), calc(100vw - 48px)"
              className={`object-cover transition-all duration-300 select-none group-hover:saturate-150 ${project.imagePosition ?? "object-center"}`}
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--project-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--project-grid)_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute inset-6 border border-border bg-[var(--project-panel)] md:inset-8" />
              <div className="absolute left-8 right-8 top-8 flex items-center gap-2 border-b border-border pb-3 md:left-12 md:right-12 md:top-12">
                <span className={`h-2.5 w-2.5 rounded-full ${project.accent}`} />
                <span className="h-2 w-20 bg-[var(--project-skeleton-strong)]" />
                <span className="h-2 w-12 bg-[var(--project-skeleton)]" />
              </div>
              <div className="absolute left-8 right-8 top-20 grid grid-cols-4 gap-3 md:left-12 md:right-12 md:top-24">
                <span className="col-span-3 h-12 bg-[var(--project-skeleton)] md:h-16" />
                <span className="h-12 bg-[var(--project-skeleton-soft)] md:h-16" />
                <span className="h-8 bg-[var(--project-skeleton-soft)] md:h-10" />
                <span className="col-span-3 h-8 bg-[var(--project-skeleton)] md:h-10" />
              </div>
            </>
          )}
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-[var(--project-overlay)] transition-opacity duration-300 group-hover:opacity-0" />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-sm">{project.title}</h3>
              <svg
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-secondary"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  d="M5 4h7v7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  d="m4 12 8-8"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="shrink-0 text-right text-sm text-secondary">
              {project.info}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-secondary">
            {project.description}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-6 py-8 md:px-16">
        <nav aria-label="Social links" className="flex items-center gap-6">
          <a
            href="https://github.com/falldownstairs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-secondary transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            <svg
              aria-hidden="true"
              className="h-[22px] w-[22px] sm:h-[26px] sm:w-[26px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56v-2.14c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.04c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.12 3.04.73.8 1.17 1.83 1.17 3.08 0 4.42-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.16c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/junericchen/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-secondary transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            <svg
              aria-hidden="true"
              className="h-[22px] w-[22px] sm:h-[26px] sm:w-[26px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
            </svg>
          </a>
        </nav>

        <ThemeToggle />
      </header>

      <main className="mx-auto w-full max-w-[1400px] pb-24">
        <section aria-label="Introduction" className="w-full px-6 pt-6 md:px-16 md:pt-6">
          <h1 className="text-5xl font-semibold text-foreground">Eric Chen</h1>
          <p className="mt-8 w-full text-lg font-normal leading-tight text-secondary md:text-2xl">
            Current computer engineering student at the University of British
            Columbia building{" "}
            <span className="font-medium text-foreground">full-stack applications</span>
            , <span className="font-medium text-foreground">mobile experiences</span>,
            and <span className="font-medium text-foreground">hardware/embedded projects</span>.
          </p>
        </section>

        <section
          aria-labelledby="projects-heading"
          className="mt-8 w-full px-6 md:mt-12 md:px-16"
        >
          <h2
            id="projects-heading"
            className="text-2xl font-semibold text-foreground"
          >
            What I&apos;ve worked on
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
