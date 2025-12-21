"use client";
import * as React from "react";
import { 
  AnimatedCard, 
  AnimatedButton, 
  FadeIn, 
  StaggerContainer, 
  StaggerItem,
  PulseGlow,
  LoadingSpinner,
  Badge,
  OracleScore
} from "@/components/ui";

export default function DemoAnimationsPage() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Animations - Démo</h1>
          <p className="mt-1 text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
            Micro-interactions Framer Motion
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h3 className="text-lg font-semibold mb-4">Animated Cards (hover)</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <AnimatedCard delay={0}>
            <div className="font-medium mb-2">Card 1</div>
            <p className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>Survolez pour voir l'animation</p>
          </AnimatedCard>
          <AnimatedCard delay={0.1} variant="gradient">
            <div className="font-medium mb-2">Card 2</div>
            <p className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>Gradient avec hover</p>
          </AnimatedCard>
          <AnimatedCard delay={0.2} variant="glass">
            <div className="font-medium mb-2">Card 3</div>
            <p className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>Glass effect animé</p>
          </AnimatedCard>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h3 className="text-lg font-semibold mb-4">Animated Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <AnimatedButton variant="default">Hover moi</AnimatedButton>
          <AnimatedButton variant="primary">Primary animé</AnimatedButton>
          <AnimatedButton variant="accent">Accent animé</AnimatedButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <h3 className="text-lg font-semibold mb-4">Loading Spinners</h3>
        <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <LoadingSpinner size="sm" />
              <div className="mt-2 text-xs" style={{ color: 'rgb(148, 163, 184)' }}>Small</div>
            </div>
            <div className="text-center">
              <LoadingSpinner size="md" />
              <div className="mt-2 text-xs" style={{ color: 'rgb(148, 163, 184)' }}>Medium</div>
            </div>
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <div className="mt-2 text-xs" style={{ color: 'rgb(148, 163, 184)' }}>Large</div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <h3 className="text-lg font-semibold mb-4">Pulse Glow</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PulseGlow intensity="low">
            <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
              <Badge variant="hot">HOT</Badge>
              <div className="mt-2 font-medium">Low intensity</div>
            </div>
          </PulseGlow>
          <PulseGlow intensity="medium">
            <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
              <OracleScore score={87.5} size="sm" confidence="high" />
            </div>
          </PulseGlow>
          <PulseGlow intensity="high" color="rgba(239, 68, 68, 0.4)">
            <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
              <div className="text-center">
                <div className="text-2xl mb-2">🔥</div>
                <div className="font-bold">High intensity</div>
              </div>
            </div>
          </PulseGlow>
        </div>
      </FadeIn>
    </div>
  );
}
