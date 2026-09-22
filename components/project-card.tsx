"use client";

import { useRef, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectArt } from "@/components/project-art";
import type { Project } from "@/lib/projects";

const TILT_DEG = 8;

/** Card with a mouse-driven tilt + a radial "light" that follows the
 *  cursor, tinted per project via --card-accent. Same technique as
 *  MouseGlow (CSS custom properties updated on mousemove), just applied
 *  to rotation as well as gradient position — no external tilt library. */
export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations(`projects.${project.slug}`);
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(px - 0.5) * TILT_DEG}deg`);
    el.style.setProperty("--ry", `${(0.5 - py) * TILT_DEG}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <Link
      ref={ref}
      href={`/projetos/${project.slug}`}
      className="pcard"
      style={{ "--card-accent": project.accent } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pgrid__thumb">
        <ProjectArt project={project} className="thumb-canvas" />
      </div>
      <div className="pgrid__body">
        <div className="pgrid__meta">
          <span>{t("status")}</span>
          <span>{project.year}</span>
        </div>
        <div className="pgrid__name">{t("name")}</div>
        <p className="pgrid__desc">{t("tagline")}</p>
        <div className="pgrid__stack">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
