"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Star, CalendarCheck, SlidersHorizontal } from "lucide-react";
import css from "./page.module.css";

const FEATURES = [
  {
    icon: Star,
    title: "Priority scoring",
    description: "Rate every task from 1 to 10 and always know what to tackle first.",
  },
  {
    icon: CalendarCheck,
    title: "Due dates",
    description: "Set deadlines and get visual alerts when a task is overdue.",
  },
  {
    icon: SlidersHorizontal,
    title: "Smart filters",
    description: "Filter by status, search by title, and sort by priority in one click.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  function handleGetStarted() {
    setLeaving(true);
    setTimeout(() => router.push("/tasks"), 380);
  }

  return (
    <div className={`${css.page} ${leaving ? css.leaving : ""}`}>
      <header className={css.header}>
        <span className={css.logo}>
          Prio<span className={css.logoAccent}>rix</span>
        </span>
        <button className={css.headerLink} onClick={handleGetStarted}>
          Open app <ArrowRight size={14} />
        </button>
      </header>

      <main className={css.main}>
        <div className={css.hero}>
          <div className={css.badge}>Task Manager</div>

          <h1 className={css.title}>
            Manage tasks by&nbsp;
            <span className={css.titleAccent}>priority</span>
          </h1>

          <p className={css.subtitle}>
            Priorix helps you stay focused on what truly matters.
            Score every task, set deadlines, and filter your way to&nbsp;zero.
          </p>

          <button className={css.cta} onClick={handleGetStarted}>
            Get started
            <ArrowRight size={16} />
          </button>
        </div>

        <div className={css.features}>
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className={css.featureCard}>
              <div className={css.featureIcon}>
                <Icon size={20} />
              </div>
              <h3 className={css.featureTitle}>{title}</h3>
              <p className={css.featureDescription}>{description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
