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
  mode: "direct" | "courses";
  gpa: number | string;
  credits: number | string;
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

function createBlankSemester(idx: number, scale: "4" | "10"): Semester {
  return {
    id: nextId(),
    name: `Semester ${idx}`,
    mode: "direct",
    gpa: "",
    credits: "",
    subjects: [],
  };
}

export function SemesterEditor({ value, onChange, scale = "10" }: SemesterEditorProps) {
  const raw: Semester[] = Array.isArray(value) ? value : [];
  const semesters: Semester[] = raw.map((s, i) => ({
    ...createBlankSemester(i + 1, scale === "4" ? "4" : "10"),
    ...s,
    subjects: Array.isArray(s.subjects) ? s.subjects : [],
  }));
  const scaleKey: "4" | "10" = scale === "4" ? "4" : "10";
  const grades = GRADES[scaleKey];

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addSemester = () => {
    onChange([...semesters, createBlankSemester(semesters.length + 1, scaleKey)]);
  };

  const removeSemester = (semIdx: number) => {
    onChange(semesters.filter((_, i) => i !== semIdx));
  };

  const updateSemester = (semIdx: number, patch: Partial<Semester>) => {
    onChange(semesters.map((s, i) => (i === semIdx ? { ...s, ...patch } : s)));
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

  const computeSemesterFromCourses = (subjects: SemesterSubject[]) => {
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

  const getSemesterStats = (sem: Semester) => {
    if (sem.mode === "courses") {
      return computeSemesterFromCourses(sem.subjects);
    }
    const gpa = parseFloat(String(sem.gpa)) || 0;
    const totalCr = parseFloat(String(sem.credits)) || 0;
    return { gpa, totalCr, totalGP: gpa * totalCr };
  };

  const computeOverallCGPA = () => {
    let totalGP = 0;
    let totalCr = 0;
    for (const sem of semesters) {
      const { totalGP: sGP, totalCr: sCr } = getSemesterStats(sem);
      totalGP += sGP;
      totalCr += sCr;
    }
    return totalCr > 0 ? totalGP / totalCr : 0;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase font-bold text-foreground">
          Add Semester Sections
        </label>
        {semesters.length > 0 && (
          <span className="font-mono text-[10px] text-muted-foreground">
            CGPA: {computeOverallCGPA().toFixed(2)} | {semesters.length} section{semesters.length !== 1 && "s"}
          </span>
        )}
      </div>

      {semesters.map((sem, semIdx) => {
        const isCollapsed = collapsed[sem.id] ?? false;
        const stats = getSemesterStats(sem);

        return (
          <div
            key={sem.id}
            className="border border-border rounded-lg overflow-hidden bg-background"
          >
            {/* Section Header */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-secondary/50 border-b border-border">
              <button
                onClick={() => toggleCollapse(sem.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isCollapsed ? "Expand section" : "Collapse section"}
              >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              </button>
              <input
                type="text"
                value={sem.name}
                onChange={(e) => updateSemester(semIdx, { name: e.target.value })}
                className="flex-1 min-w-0 bg-transparent border-none font-mono text-xs font-bold text-foreground focus:outline-none p-0"
                placeholder="Semester name"
              />
              <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                GPA: {stats.gpa.toFixed(2)} | Cr: {stats.totalCr}
              </span>
              <button
                onClick={() => removeSemester(semIdx)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                title="Remove section"
                aria-label="Remove section"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {!isCollapsed && (
              <div className="p-3 space-y-3">
                {/* Mode Toggle */}
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                    Entry Mode:
                  </span>
                  <div className="inline-flex border border-border rounded-md overflow-hidden">
                    <button
                      onClick={() => updateSemester(semIdx, { mode: "direct" })}
                      className={`px-3 py-1 font-mono text-[10px] uppercase font-bold transition-colors ${
                        sem.mode === "direct"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Direct GPA + Credits
                    </button>
                    <button
                      onClick={() => updateSemester(semIdx, { mode: "courses" })}
                      className={`px-3 py-1 font-mono text-[10px] uppercase font-bold border-l border-border transition-colors ${
                        sem.mode === "courses"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Add Courses
                    </button>
                  </div>
                </div>

                {sem.mode === "direct" ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-[1fr_1fr] gap-2">
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                          Semester GPA
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={scaleKey === "4" ? 4 : 10}
                          step={0.01}
                          value={sem.gpa}
                          placeholder={scaleKey === "4" ? "e.g. 3.5" : "e.g. 8.5"}
                          onChange={(e) => updateSemester(semIdx, { gpa: e.target.value })}
                          className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                          Total Credits
                        </label>
                        <input
                          type="number"
                          min={0}
                          step={0.5}
                          value={sem.credits}
                          placeholder="e.g. 24"
                          onChange={(e) => updateSemester(semIdx, { credits: e.target.value })}
                          className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-normal italic">
                      Enter your semester GPA and total credits directly. Used as-is in the CGPA calculation.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
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

                    {sem.subjects.length === 0 && (
                      <p className="text-[10px] text-muted-foreground leading-normal italic text-center py-2">
                        No courses yet — click "Add Course" below to start.
                      </p>
                    )}

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

                {/* Section subtotal */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                    Section Weight
                  </span>
                  <span className="font-mono text-[11px] font-bold text-foreground">
                    GPA {stats.gpa.toFixed(2)} × {stats.totalCr} credits
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={addSemester}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-primary/40 text-[11px] font-bold font-mono uppercase text-primary hover:bg-primary/5 transition-colors rounded-lg"
      >
        <Plus size={14} />
        Add Semester Section
      </button>

      {semesters.length === 0 && (
        <p className="text-[10px] text-muted-foreground leading-normal italic text-center">
          Add semester sections above — each can use direct GPA entry OR add individual courses. You can also paste a whole grade sheet to auto-detect subjects.
        </p>
      )}
    </div>
  );
}
