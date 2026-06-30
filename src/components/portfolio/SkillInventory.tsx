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
          className="rounded-3xl border border-hairline bg-canvas p-6"
        >
          <h3 className="text-lg font-semibold text-ink">{group.category}</h3>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-body">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
