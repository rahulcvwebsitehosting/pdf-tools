"use client";

import { Plus, X, ChevronDown, ChevronRight, Trash2, BookOpen } from "lucide-react";
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

function createBlankSemester(idx: number): Semester {
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
    ...createBlankSemester(i + 1),
    ...s,
    subjects: Array.isArray(s.subjects) ? s.subjects : [],
  }));
  const scaleKey: "4" | "10" = scale === "4" ? "4" : "10";
  const grades = GRADES[scaleKey];
  const gpaMax = scaleKey === "4" ? 4 : 10;

  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

  const addSemester = () => {
    onChange([...semesters, createBlankSemester(semesters.length + 1)]);
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h4 className="font-mono text-[13px] uppercase font-bold text-foreground flex items-center gap-2">
          <BookOpen size={14} />
          Semester Sections
        </h4>
        {semesters.length > 0 && (
          <span className="font-mono text-[11px] text-muted-foreground">
            CGPA: {computeOverallCGPA().toFixed(2)} | {semesters.length} section{semesters.length !== 1 && "s"}
          </span>
        )}
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[1.5fr_1fr_1fr_auto] gap-3 px-1">
        <span className="font-mono text-[11px] uppercase font-bold text-muted-foreground tracking-wider">
          Semester
        </span>
        <span className="font-mono text-[11px] uppercase font-bold text-muted-foreground tracking-wider">
          GPA
        </span>
        <span className="font-mono text-[11px] uppercase font-bold text-muted-foreground tracking-wider">
          Total Credits
        </span>
        <span className="w-6" />
      </div>

      {/* Semester Rows */}
      <div className="space-y-2">
        {semesters.map((sem, semIdx) => {
          const stats = getSemesterStats(sem);
          const showCourses = expandedCourses[sem.id] ?? (sem.mode === "courses");

          return (
            <div key={sem.id} className="space-y-2">
              {/* Main Row: Semester | GPA | Credits | Actions */}
              <div className="grid grid-cols-[1.5fr_1fr_1fr_auto] gap-3 items-center">
                <input
                  type="text"
                  value={sem.name}
                  onChange={(e) => updateSemester(semIdx, { name: e.target.value })}
                  className="w-full p-2.5 border border-border bg-background font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary rounded-lg"
                  placeholder={`Semester ${semIdx + 1}`}
                />
                <input
                  type="number"
                  min={0}
                  max={gpaMax}
                  step={0.01}
                  value={sem.gpa}
                  placeholder={scaleKey === "4" ? "e.g. 3.5" : "e.g. 8.5"}
                  title="Enter GPA directly OR add courses below to compute it"
                  onChange={(e) => updateSemester(semIdx, { gpa: e.target.value, mode: "direct" })}
                  className="w-full p-2.5 border border-border bg-background font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={sem.credits}
                  placeholder="e.g. 24"
                  title="Enter total credits directly OR add courses below to compute it"
                  onChange={(e) => updateSemester(semIdx, { credits: e.target.value, mode: "direct" })}
                  className="w-full p-2.5 border border-border bg-background font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setExpandedCourses((p) => ({ ...p, [sem.id]: !showCourses }))}
                    className={`p-1.5 transition-colors rounded-md ${
                      showCourses
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    title={showCourses ? "Hide course details" : "Add courses (auto-compute GPA)"}
                    aria-label="Toggle courses"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${showCourses ? "rotate-180" : ""}`}
                    />
                  </button>
                  <button
                    onClick={() => removeSemester(semIdx)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md"
                    title="Remove semester"
                    aria-label="Remove semester"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Course Details (collapsible) */}
              {showCourses && (
                <div className="ml-2 pl-3 border-l-2 border-primary/20 space-y-2 py-1">
                  <div className="grid grid-cols-[1fr_4rem_5rem_4rem_5rem_auto] gap-1.5 px-1">
                    <span className="text-[9px] uppercase text-muted-foreground font-bold font-mono">
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
                    <span className="w-5" />
                  </div>

                  {sem.subjects.length === 0 && (
                    <p className="text-[11px] text-muted-foreground leading-normal italic text-center py-1">
                      No courses — click "Add Course" or use the GPA input above.
                    </p>
                  )}

                  {sem.subjects.map((sub, subIdx) => {
                    const gp = gradePointFor(String(sub.grade), scaleKey);
                    return (
                      <div
                        key={subIdx}
                        className="grid grid-cols-[1fr_4rem_5rem_4rem_5rem_auto] gap-1.5 items-center"
                      >
                        <input
                          type="text"
                          value={sub.subject}
                          placeholder="Course name"
                          onChange={(e) =>
                            updateSubject(semIdx, subIdx, { subject: e.target.value })
                          }
                          className="w-full p-1.5 border border-border bg-background font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                        />
                        <input
                          type="number"
                          min={0}
                          step={0.5}
                          value={sub.credits}
                          placeholder="Cr"
                          onChange={(e) => {
                            updateSubject(semIdx, subIdx, { credits: e.target.value });
                            updateSemester(semIdx, { mode: "courses" });
                          }}
                          className="w-full p-1.5 border border-border bg-background font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <select
                          value={sub.grade}
                          onChange={(e) => {
                            updateSubject(semIdx, subIdx, { grade: e.target.value });
                            updateSemester(semIdx, { mode: "courses" });
                          }}
                          className="w-full p-1.5 border border-border bg-background font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary rounded-md cursor-pointer"
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
                          onChange={(e) => {
                            updateSubject(semIdx, subIdx, { gradePoint: e.target.value });
                            updateSemester(semIdx, { mode: "courses" });
                          }}
                          className="w-full p-1.5 border border-border bg-background font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <select
                          value={sub.result}
                          onChange={(e) => {
                            updateSubject(semIdx, subIdx, { result: e.target.value });
                            updateSemester(semIdx, { mode: "courses" });
                          }}
                          className="w-full p-1.5 border border-border bg-background font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary rounded-md cursor-pointer"
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
                          <X size={13} />
                        </button>
                      </div>
                    );
                  })}

                  <button
                    onClick={() => {
                      addSubject(semIdx);
                      updateSemester(semIdx, { mode: "courses" });
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 border border-dashed border-border text-[11px] font-bold font-mono uppercase text-muted-foreground hover:text-foreground hover:border-primary transition-colors rounded-md"
                  >
                    <Plus size={12} />
                    Add Course
                  </button>

                  {sem.subjects.length > 0 && (
                    <div className="flex items-center justify-between text-[11px] font-mono pt-1 px-1">
                      <span className="text-muted-foreground">
                        Auto-computed:{" "}
                        <span className="font-bold text-foreground">
                          GPA {stats.gpa.toFixed(2)} | {stats.totalCr} credits
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Semester Button */}
      <button
        onClick={addSemester}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-primary/50 bg-primary/5 text-[11px] font-bold font-mono uppercase text-primary hover:bg-primary/10 transition-colors rounded-lg"
      >
        <Plus size={14} />
        Add Semester +
      </button>

      {semesters.length === 0 && (
        <p className="text-[11px] text-muted-foreground leading-normal italic text-center">
          Click "Add Semester +" above to start. Each semester can have direct GPA + credits, OR expand to add individual courses for auto-computation.
        </p>
      )}
    </div>
  );
}
