"use client";

import { useState } from "react";
import { getSkillIcon, getSkillLabel, skillIconUrl } from "@/data/skillIcons";

type SkillIconCarouselProps = {
  skills: string[];
};

function SkillIcon({ skill, index }: { skill: string; index: number }) {
  const def = getSkillIcon(skill);
  const label = getSkillLabel(skill);
  const url = skillIconUrl(def);
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = url && !imgFailed;

  return (
    <div
      className="skill-icon-item"
      style={{ animationDelay: `${(index % 6) * 0.35}s` }}
    >
      <div className="skill-icon-chip">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            width={24}
            height={24}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span
            className="skill-icon-fallback"
            style={{ backgroundColor: def.bg ?? "#52525B" }}
            aria-hidden="true"
          >
            {def.initials}
          </span>
        )}
      </div>
      <span className="skill-icon-label">{label}</span>
    </div>
  );
}

function CarouselRow({
  skills,
  direction,
  duration,
}: {
  skills: string[];
  direction: "left" | "right";
  duration: number;
}) {
  const loop = [...skills, ...skills];

  return (
    <div
      className={`skill-carousel-row skill-carousel-row--${direction}`}
      style={{ animationDuration: `${duration}s` }}
    >
      {loop.map((skill, i) => (
        <SkillIcon key={`${skill}-${i}`} skill={skill} index={i} />
      ))}
    </div>
  );
}

export default function SkillIconCarousel({ skills }: SkillIconCarouselProps) {
  const paddedSkills =
    skills.length < 4 ? [...skills, ...skills, ...skills] : skills;
  const midpoint = Math.ceil(paddedSkills.length / 2);
  const row1 = paddedSkills.slice(0, midpoint);
  const row2 =
    paddedSkills.slice(midpoint).length > 0
      ? paddedSkills.slice(midpoint)
      : paddedSkills;

  return (
    <div className="skill-carousel" aria-label={skills.join(", ")}>
      <div className="skill-carousel-mask">
        <CarouselRow skills={row1} direction="left" duration={28} />
        <CarouselRow skills={row2} direction="right" duration={32} />
      </div>
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
