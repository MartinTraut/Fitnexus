"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  Calendar,
  MessageCircle,
  Flame,
  Trophy,
  Target,
  ChevronRight,
} from "lucide-react";

function DashboardMockup() {
  return (
    <div className="h-full w-full bg-[#0B0F1A] text-white p-3 md:p-6 overflow-hidden flex">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-48 shrink-0 bg-[#0D1320] rounded-xl border border-[rgba(0,168,255,0.1)] p-4 mr-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00A8FF] to-[#00FF94]" />
          <span className="text-xs font-bold tracking-wider gradient-brand-text">FITNEXUS</span>
        </div>
        {[
          { icon: LayoutDashboard, label: "Dashboard", active: true },
          { icon: Dumbbell, label: "Training", active: false },
          { icon: Calendar, label: "Kalender", active: false },
          { icon: MessageCircle, label: "Chat", active: false },
          { icon: TrendingUp, label: "Fortschritt", active: false },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium mb-1 ${
              item.active
                ? "bg-[#00A8FF]/10 text-[#00D4FF]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm md:text-base font-bold text-white">
              Guten Morgen, Alex
            </h2>
            <p className="text-[10px] md:text-xs text-[#94A3B8]">
              Bereit für dein Training?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#00A8FF] to-[#00D4FF] flex items-center justify-center text-[10px] font-bold text-[#0B0F1A]">
              A
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {[
            { icon: Flame, label: "Streak", value: "12 Tage", color: "#FF6B35" },
            { icon: Trophy, label: "Workouts", value: "48", color: "#00FF94" },
            { icon: Target, label: "Ziel", value: "78%", color: "#00A8FF" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111827] rounded-xl border border-[rgba(0,168,255,0.08)] p-2.5 md:p-3"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <stat.icon
                  className="w-3 h-3 md:w-3.5 md:h-3.5"
                  style={{ color: stat.color }}
                />
                <span className="text-[9px] md:text-[10px] text-[#94A3B8]">
                  {stat.label}
                </span>
              </div>
              <p className="text-sm md:text-lg font-bold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Progress Chart Mockup */}
        <div className="bg-[#111827] rounded-xl border border-[rgba(0,168,255,0.08)] p-3 md:p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] md:text-xs font-semibold text-white">
              Trainingsfortschritt
            </h3>
            <span className="text-[9px] md:text-[10px] text-[#00D4FF]">
              Diese Woche
            </span>
          </div>
          <div className="flex items-end gap-1.5 md:gap-2 h-16 md:h-24">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-md transition-all duration-500"
                  style={{
                    height: `${h}%`,
                    background:
                      i === 5
                        ? "linear-gradient(to top, #00A8FF, #00FF94)"
                        : "rgba(0, 168, 255, 0.15)",
                  }}
                />
                <span className="text-[8px] md:text-[9px] text-[#64748B]">
                  {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Session */}
        <div className="bg-[#111827] rounded-xl border border-[rgba(0,168,255,0.08)] p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#00FF94]/20 to-[#00A8FF]/20 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-[#00FF94]" />
              </div>
              <div>
                <p className="text-[11px] md:text-xs font-semibold text-white">
                  Nächstes Training
                </p>
                <p className="text-[9px] md:text-[10px] text-[#94A3B8]">
                  Heute, 18:00 · Coach Sarah
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardScrollPreview() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00A8FF]/[0.04] blur-[200px]"
        aria-hidden="true"
      />
      <ContainerScroll
        titleComponent={
          <div className="mb-4">
            <p className="text-sm font-semibold tracking-[0.1em] uppercase gradient-cyan-text mb-4">
              Plattform-Preview
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] font-heading font-bold leading-[1.1] text-foreground">
              Alles im Blick mit deinem{" "}
              <span className="gradient-brand-text">Dashboard</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Trainingspläne, Fortschritte und Termine – übersichtlich und
              intuitiv an einem Ort.
            </p>
          </div>
        }
      >
        <DashboardMockup />
      </ContainerScroll>
    </section>
  );
}
