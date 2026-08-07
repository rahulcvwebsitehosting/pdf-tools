"use client";

import { Plus, X, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";

export interface SemesterSubject {
  subject: string;
  credits: number | string;
  grade: string;
  gradePoint: number | string;
  result: string;
}

export interface Semester {
  id: string;
  name: string;
  subjects: SemesterSubject[];
}

interface SemesterEditorProps {
  value: unknown;
  onChange: (semesters: Semester[]) => void;
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

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `sem-${Date.now()}-${idCounter}`;
}

export function SemesterEditor({ value, onChange, scale = "10" }: SemesterEditorProps) {
  const semesters: Semester[] = Array.isArray(value) && value.length > 0
    ? value
    : [];
  const scaleKey: "4" | "10" = scale === "4" ? "4" : "10";
  const grades = GRADES[scaleKey];

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addSemester = () => {
    const idx = semesters.length + 1;
    onChange([
      ...semesters,
      {
        id: nextId(),
        name: `Semester ${idx}`,
        subjects: [
          {
            subject: "",
            credits: 4,
            grade: "A",
            gradePoint: scaleKey === "4" ? 4 : 8,
            result: "Pass",
          },
        ],
      },
    ]);
  };

  const removeSemester = (semIdx: number) => {
    onChange(semesters.filter((_, i) => i !== semIdx));
  };

  const updateSemesterName = (semIdx: number, name: string) => {
    onChange(semesters.map((s, i) => (i === semIdx ? { ...s, name } : s)));
  };

  const updateSubject = (semIdx: number, subIdx: number, patch: Partial<SemesterSubject>) => {
    onChange(
      semesters.map((s, i) => {
        if (i !== semIdx) return s;
        return {
          ...s,
          subjects: s.subjects.map((sub, j) => {
            if (j !== subIdx) return sub;
            const merged = { ...sub, ...patch };
            if (patch.grade !== undefined && merged.grade) {
              const gp = gradePointFor(String(merged.grade), scaleKey);
              if (gp !== null) merged.gradePoint = gp;
              if (String(merged.grade).toUpperCase() === "F") merged.result = "Fail";
            }
            return merged;
          }),
        };
      })
    );
  };

  const addSubject = (semIdx: number) => {
    onChange(
      semesters.map((s, i) => {
        if (i !== semIdx) return s;
        return {
          ...s,
          subjects: [
            ...s.subjects,
            {
              subject: "",
              credits: 4,
              grade: "A",
              gradePoint: scaleKey === "4" ? 4 : 8,
              result: "Pass",
            },
          ],
        };
      })
    );
  };

  const removeSubject = (semIdx: number, subIdx: number) => {
    onChange(
      semesters.map((s, i) => {
        if (i !== semIdx) return s;
        return { ...s, subjects: s.subjects.filter((_, j) => j !== subIdx) };
      })
    );
  };

  const computeSemesterGPA = (subjects: SemesterSubject[]) => {
    let totalGP = 0;
    let totalCr = 0;
    for (const sub of subjects) {
      const cr = parseFloat(String(sub.credits)) || 0;
      const gp = parseFloat(String(sub.gradePoint)) || 0;
      totalGP += gp * cr;
      totalCr += cr;
    }
    const gpa = totalCr > 0 ? totalGP / totalCr : 0;
    return { gpa, totalCr, totalGP };
  };

  const computeOverallCGPA = () => {
    let totalGP = 0;
    let totalCr = 0;
    for (const sem of semesters) {
      const { totalGP: sGP, totalCr: sCr } = computeSemesterGPA(sem.subjects);
      totalGP += sGP;
      totalCr += sCr;
    }
    return totalCr > 0 ? totalGP / totalCr : 0;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase font-bold text-foreground">
          Add Semesters & Subjects
        </label>
        {semesters.length > 0 && (
          <span className="font-mono text-[10px] text-muted-foreground">
            CGPA: {computeOverallCGPA().toFixed(2)} | {semesters.length} semester{semesters.length !== 1 && "s"}
          </span>
        )}
      </div>

      {semesters.map((sem, semIdx) => {
        const isCollapsed = collapsed[sem.id] ?? false;
        const { gpa, totalCr } = computeSemesterGPA(sem.subjects);

        return (
          <div
            key={sem.id}
            className="border border-border rounded-lg overflow-hidden"
          >
            {/* Semester Header */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-secondary/50">
              <button
                onClick={() => toggleCollapse(sem.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isCollapsed ? "Expand semester" : "Collapse semester"}
              >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              </button>
              <input
                type="text"
                value={sem.name}
                onChange={(e) => updateSemesterName(semIdx, e.target.value)}
                className="flex-1 bg-transparent border-none font-mono text-xs font-bold text-foreground focus:outline-none p-0"
                placeholder="Semester name"
              />
              <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                GPA: {gpa.toFixed(2)} | Cr: {totalCr}
              </span>
              <button
                onClick={() => removeSemester(semIdx)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                title="Remove semester"
                aria-label="Remove semester"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {!isCollapsed && (
              <div className="p-3 space-y-2">
                {/* Column Headers */}
                <div className="grid grid-cols-[1fr_3.5rem_4.5rem_3.5rem_4.5rem_auto] gap-1.5">
                  <span className="text-[9px] uppercase text-muted-foreground font-bold font-mono pl-1">
                    Course
                  </span>
                  <span className="text-[9px] uppercase text-muted-foreground font-bold font-mono text-center">
                    Cr
                  </span>
                  <span className="text-[9px] uppercase text-muted-foreground font-bold font-mono text-center">
                    Grade
                  </span>
                  <span className="text-[9px] uppercase text-muted-foreground font-bold font-mono text-center">
                    GP
                  </span>
                  <span className="text-[9px] uppercase text-muted-foreground font-bold font-mono text-center">
                    Result
                  </span>
                  <span />
                </div>

                {sem.subjects.map((sub, subIdx) => {
                  const gp = gradePointFor(String(sub.grade), scaleKey);
                  return (
                    <div
                      key={subIdx}
                      className="grid grid-cols-[1fr_3.5rem_4.5rem_3.5rem_4.5rem_auto] gap-1.5 items-center"
                    >
                      <input
                        type="text"
                        value={sub.subject}
                        placeholder="Course name"
                        onChange={(e) =>
                          updateSubject(semIdx, subIdx, { subject: e.target.value })
                        }
                        className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                      />
                      <input
                        type="number"
                        min={0}
                        step={0.5}
                        value={sub.credits}
                        placeholder="Cr"
                        title="Credit hours"
                        onChange={(e) =>
                          updateSubject(semIdx, subIdx, { credits: e.target.value })
                        }
                        className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <select
                        value={sub.grade}
                        onChange={(e) =>
                          updateSubject(semIdx, subIdx, { grade: e.target.value })
                        }
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
                        value={sub.gradePoint}
                        title={`Grade point (auto from grade: ${gp ?? "—"})`}
                        onChange={(e) =>
                          updateSubject(semIdx, subIdx, { gradePoint: e.target.value })
                        }
                        className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <select
                        value={sub.result}
                        onChange={(e) =>
                          updateSubject(semIdx, subIdx, { result: e.target.value })
                        }
                        className="w-full p-1.5 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md cursor-pointer"
                      >
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>
                      </select>
                      <button
                        onClick={() => removeSubject(semIdx, subIdx)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                        title="Remove course"
                        aria-label="Remove course"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}

                <button
                  onClick={() => addSubject(semIdx)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border text-[11px] font-bold font-mono uppercase text-muted-foreground hover:text-foreground hover:border-primary transition-colors rounded-lg"
                >
                  <Plus size={13} />
                  Add Course
                </button>
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={addSemester}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-primary/40 text-[11px] font-bold font-mono uppercase text-primary hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors rounded-lg"
      >
        <Plus size={14} />
        Add Semester
      </button>

      {semesters.length === 0 && (
        <p className="text-[10px] text-muted-foreground leading-normal italic text-center">
          Add semesters above, then add courses to each semester — or paste a whole grade sheet to auto-detect subjects.
        </p>
      )}
    </div>
  );
}
