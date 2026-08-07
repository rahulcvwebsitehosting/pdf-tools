"use client";

import { Plus, X } from "lucide-react";

export interface SubjectRow {
  subject: string;
  credits: number | string;
  grade: string;
  gradePoint: number | string;
  result: string;
}

interface SubjectEditorProps {
  value: unknown;
  onChange: (rows: SubjectRow[]) => void;
  scale?: string;
}

const GRADES: Record<"4" | "10", string[]> = {
  "10": ["O", "A+", "A", "B+", "B", "C+", "C", "D", "E", "F"],
  "4": ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"],
};

const GRADE_POINT_MAP_10: Record<string, number> = {
  o: 10, "a+": 9, a: 8, "b+": 7, b: 6, "c+": 5, c: 4, d: 3, e: 2, f: 0,
};

const GRADE_POINT_MAP_4: Record<string, number> = {
  "a+": 4, a: 4, "a-": 3.7, "b+": 3.3, b: 3, "b-": 2.7, "c+": 2.3, c: 2, "c-": 1.7, d: 1, f: 0,
};

function gradePointFor(grade: string, scale: "4" | "10"): number | null {
  const g = grade.trim().toLowerCase();
  const map = scale === "4" ? GRADE_POINT_MAP_4 : GRADE_POINT_MAP_10;
  return map[g] !== undefined ? map[g] : null;
}

export function SubjectEditor({ value, onChange, scale = "10" }: SubjectEditorProps) {
  const rows: SubjectRow[] = Array.isArray(value) ? value : [];
  const scaleKey: "4" | "10" = scale === "4" ? "4" : "10";
  const grades = GRADES[scaleKey];

  const update = (idx: number, patch: Partial<SubjectRow>) => {
    const next = rows.map((r, i) => {
      if (i !== idx) return r;
      const merged = { ...r, ...patch };
      if (patch.grade !== undefined && merged.grade) {
        const gp = gradePointFor(String(merged.grade), scaleKey);
        if (gp !== null) merged.gradePoint = gp;
        if (String(merged.grade).toUpperCase() === "F") merged.result = "Fail";
      }
      return merged;
    });
    onChange(next);
  };

  const addRow = () => {
    onChange([
      ...rows,
      {
        subject: "",
        credits: 4,
        grade: "A",
        gradePoint: scaleKey === "4" ? 4 : 8,
        result: "Pass",
      },
    ]);
  };

  const removeRow = (idx: number) => {
    onChange(rows.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      <label className="font-mono text-[11px] uppercase font-bold text-foreground">
        Add Subjects Manually
      </label>

      {rows.length === 0 ? (
        <p className="text-[10px] text-muted-foreground leading-normal italic">
          No subjects added yet — or paste a whole grade sheet above and they are detected automatically.
        </p>
      ) : (
        <div className="space-y-2">
          {rows.map((row, idx) => {
            const gp = gradePointFor(String(row.grade), scaleKey);
            return (
              <div
                key={idx}
                className="grid grid-cols-[1fr_3.5rem_4.5rem_3.5rem_4.5rem_auto] gap-1.5 items-center"
              >
                <input
                  type="text"
                  value={row.subject}
                  placeholder="Subject name"
                  onChange={(e) => update(idx, { subject: e.target.value })}
                  className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                />
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={row.credits}
                  placeholder="Cr"
                  title="Credit hours"
                  onChange={(e) => update(idx, { credits: e.target.value })}
                  className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <select
                  value={row.grade}
                  onChange={(e) => update(idx, { grade: e.target.value })}
                  className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md cursor-pointer"
                >
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0}
                  max={20}
                  step={0.1}
                  value={row.gradePoint}
                  title={`Grade point (auto from grade: ${gp ?? "—"})`}
                  onChange={(e) => update(idx, { gradePoint: e.target.value })}
                  className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <select
                  value={row.result}
                  onChange={(e) => update(idx, { result: e.target.value })}
                  className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md cursor-pointer"
                >
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
                <button
                  onClick={() => removeRow(idx)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remove subject"
                  aria-label="Remove subject"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={addRow}
        className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border text-[11px] font-bold font-mono uppercase text-muted-foreground hover:text-foreground hover:border-primary transition-colors rounded-lg"
      >
        <Plus size={13} />
        Add Subject
      </button>
    </div>
  );
}
