import type { SkillGroup } from '@/data/skills';

type SkillInventoryProps = {
  skills: SkillGroup[];
};

export function SkillInventory({ skills }: SkillInventoryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group) => (
        <article
          key={group.category}
          className="rounded-lg border border-slate-200 bg-panel p-5"
        >
          <h3 className="font-black text-ink">{group.category}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
