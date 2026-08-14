import { SpecRow } from "@/lib/types";

export function SpecTable({ specs }: { specs: SpecRow[] }) {
  return (
    <div className="overflow-hidden rounded-none border border-border">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-stone/60" : "bg-cream"}>
              <td className="w-1/3 px-5 py-3.5 font-medium text-ink">{row.label}</td>
              <td className="px-5 py-3.5 text-ink-soft">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
