"use client";
import { motion } from "framer-motion";

interface KpiCardProps {
  value: string;
  label: string;
  color: string;
}

export function KpiCard({ value, label, color }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: `0 20px 40px ${color}30` }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border p-4 transition-all"
      style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}
    >
      <div className="text-xs font-medium uppercase tracking-wider" style={{ color: 'rgb(148, 163, 184)' }}>
        {label}
      </div>
      <motion.div
        className="mt-2 text-3xl font-bold"
        style={{ color }}
        whileHover={{ scale: 1.05 }}
      >
        {value}
      </motion.div>
    </motion.div>
  );
}
