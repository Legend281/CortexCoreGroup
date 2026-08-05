"use client";

import React from "react";
import { ProjectItem } from "@/data/projects";
import { Activity, BarChart3, ShieldCheck, Zap, ShoppingBag, Utensils, Wifi, BookOpen, CheckCircle2, TrendingUp } from "lucide-react";

export interface ProjectMockupPreviewProps {
  project: ProjectItem;
}

export const ProjectMockupPreview: React.FC<ProjectMockupPreviewProps> = ({ project }) => {
  switch (project.id) {
    case "foodops-dashboard":
      return (
        <div className="w-full h-full bg-[#080B18] p-5 flex flex-col justify-between font-sans text-white text-xs select-none">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-accent-purple" />
              <span className="font-bold text-sm">FoodOps OS v4.2</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Orders: 42 Active
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 my-3">
            <div className="p-3 rounded-xl bg-surface/80 border border-white/10">
              <span className="text-[10px] text-text-secondary">Today&apos;s Revenue</span>
              <div className="text-base font-bold text-white font-mono mt-0.5">$3,840.50</div>
              <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> +24% vs yesterday
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface/80 border border-white/10">
              <span className="text-[10px] text-text-secondary">Avg Prep Time</span>
              <div className="text-base font-bold text-accent-cyan font-mono mt-0.5">11.4 mins</div>
              <span className="text-[9px] text-accent-purple font-mono block mt-0.5">-3.2 mins faster</span>
            </div>

            <div className="p-3 rounded-xl bg-surface/80 border border-white/10">
              <span className="text-[10px] text-text-secondary">Kitchen Load</span>
              <div className="text-base font-bold text-amber-400 font-mono mt-0.5">78% Optimal</div>
              <span className="text-[9px] text-emerald-400 font-mono block mt-0.5">Normal Capacity</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#050714] border border-white/10">
            <div className="flex items-center justify-between text-[11px] mb-2 font-mono text-text-secondary">
              <span>Order Queue Pipeline</span>
              <span>kitchen-display-link</span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-emerald-500/30">
                <span className="text-white font-bold">#ORD-4829 — Gourmet Salmon Bowl</span>
                <span className="text-emerald-400">READY FOR SERVING</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-accent-purple/30">
                <span className="text-white font-bold">#ORD-4830 — Truffle Wagyu Burger</span>
                <span className="text-accent-cyan">PREPARING (4 mins)</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "smartmeal-ai":
      return (
        <div className="w-full h-full bg-[#080B18] p-5 flex flex-col justify-between font-sans text-white text-xs select-none">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-cyan" />
              <span className="font-bold text-sm">SmartMeal AI Engine</span>
            </div>
            <span className="text-[10px] font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/30 px-2 py-0.5 rounded-full">
              TensorFlow Lite Active
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-white/10 my-3">
            <span className="text-[10px] font-mono text-text-secondary uppercase block">AI RECOMMENDED MEAL</span>
            <h4 className="text-base font-bold text-white mt-1">Avocado & Quinoa Power Bowl</h4>
            <div className="flex items-center gap-3 mt-2 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">520 kcal</span>
              <span className="text-accent-cyan">34g Protein</span>
              <span className="text-amber-400">42g Carbs</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
            <div className="p-3 rounded-xl bg-surface/80 border border-white/10">
              <span className="text-text-secondary block">Macro Goal Match</span>
              <span className="text-sm font-bold text-emerald-400 block mt-1">98.4% Precision</span>
            </div>
            <div className="p-3 rounded-xl bg-surface/80 border border-white/10">
              <span className="text-text-secondary block">Grocery Budget Savings</span>
              <span className="text-sm font-bold text-accent-purple block mt-1">$45 / Week</span>
            </div>
          </div>
        </div>
      );

    case "payswift":
      return (
        <div className="w-full h-full bg-[#080B18] p-5 flex flex-col justify-between font-sans text-white text-xs select-none">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-sm">PaySwift Enterprise Vault</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded-full">
              AES-256 Encrypted
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface/80 border border-white/10 my-3">
            <span className="text-[10px] font-mono text-text-secondary block">TOTAL ACCOUNT BALANCE</span>
            <div className="text-2xl font-bold text-white font-mono mt-1">$142,850.00 <span className="text-xs text-emerald-400">USD</span></div>
            <div className="flex items-center gap-2 text-[10px] text-text-secondary font-mono mt-2">
              <span>Settlement SLA: Sub-2s</span>
              <span>•</span>
              <span className="text-accent-purple">0 Transaction Failures</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#050714] border border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono text-text-secondary mb-2">
              <span>Recent Transactions</span>
              <span>Status</span>
            </div>
            <div className="space-y-1 font-mono text-[10px]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50">
                <span className="text-white">Payout to Vendor #829</span>
                <span className="text-emerald-400 font-bold">+$12,500.00 [CLEARED]</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "stylehub":
      return (
        <div className="w-full h-full bg-[#080B18] p-5 flex flex-col justify-between font-sans text-white text-xs select-none">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-accent-purple" />
              <span className="font-bold text-sm">StyleHub Fashion Platform</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Conversion +240%</span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="p-3 rounded-xl bg-surface/80 border border-white/10">
              <div className="w-full h-16 rounded-lg bg-surface-hover border border-white/10 mb-2 flex items-center justify-center text-text-secondary text-[10px] font-mono">
                [Product Gallery]
              </div>
              <span className="font-bold text-white block">Minimalist Jacket</span>
              <span className="text-accent-cyan font-mono text-xs block">$189.00</span>
            </div>

            <div className="p-3 rounded-xl bg-surface/80 border border-white/10">
              <div className="w-full h-16 rounded-lg bg-surface-hover border border-white/10 mb-2 flex items-center justify-center text-text-secondary text-[10px] font-mono">
                [Product Gallery]
              </div>
              <span className="font-bold text-white block">Urban Sneakers</span>
              <span className="text-accent-cyan font-mono text-xs block">$240.00</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-accent-purple/20 border border-accent-purple/40 text-center font-mono text-xs font-bold text-white">
            Checkout Conversion Engine Active (Sub-1s Cart Sync)
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-[#080B18] p-5 flex flex-col justify-between font-sans text-white text-xs select-none">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent-cyan" />
              <span className="font-bold text-sm">{project.title} Interface</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Status: Production Live</span>
          </div>

          <div className="p-6 rounded-2xl bg-surface/80 border border-white/10 my-3 text-center">
            <span className="text-xs font-mono text-accent-purple block mb-1">CORTEX ENTERPRISE SYSTEM</span>
            <h4 className="text-lg font-bold text-white">{project.title}</h4>
            <p className="text-xs text-text-secondary mt-2 line-clamp-2">{project.description}</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-text-secondary">
            <span>Uptime: 99.99% SLA</span>
            <span className="text-accent-cyan">Sub-15ms Latency</span>
          </div>
        </div>
      );
  }
};
