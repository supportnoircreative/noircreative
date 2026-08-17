import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/shared/WorkCard";
import { projects } from "@/data/projects";

export function WorkGrid({ limit }) {
  const items = limit ? projects.slice(0, limit) : projects;
  return (
    <Reveal stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {items.map((project) => (
        <WorkCard key={project.id} project={project} />
      ))}
    </Reveal>
  );
}