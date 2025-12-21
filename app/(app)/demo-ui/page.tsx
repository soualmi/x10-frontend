import * as React from "react";
import { Card, Button, Badge, KpiCard, SectionHeader, OracleScore } from "@/components/ui";

export default function DemoUIPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        icon="🎨"
        title="Design System - Composants UI"
        subtitle="Tous les composants réutilisables Oracle"
      />

      {/* Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Cards</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card variant="default">
            <div className="font-medium mb-2">Card Default</div>
            <p className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
              Standard card avec background dark
            </p>
          </Card>
          <Card variant="gradient">
            <div className="font-medium mb-2">Card Gradient</div>
            <p className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
              Card avec gradient subtil
            </p>
          </Card>
          <Card variant="glass" hover>
            <div className="font-medium mb-2">Card Glass Hover</div>
            <p className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
              Card glassmorphism avec hover
            </p>
          </Card>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">✅ Success</Badge>
          <Badge variant="warning">⚠️ Warning</Badge>
          <Badge variant="danger">❌ Danger</Badge>
          <Badge variant="info">ℹ️ Info</Badge>
          <Badge variant="hot">🔥 HOT</Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">KPI Cards</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <KpiCard label="Produits" value="2,847" icon="📦" color="#d4a574" trend="+12%" />
          <KpiCard label="Opportunités" value="143" icon="💎" color="rgb(96, 165, 250)" trend="+8%" />
          <KpiCard label="Hot" value="23" icon="🔥" color="rgb(239, 68, 68)" />
          <KpiCard label="Sources" value="6/6" icon="📡" color="rgb(74, 222, 128)" />
        </div>
      </div>

      {/* Oracle Scores */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Oracle Scores</h3>
        <Card>
          <div className="flex flex-wrap items-center justify-around gap-8">
            <OracleScore score={87.5} size="sm" confidence="high" />
            <OracleScore score={72.3} size="md" confidence="medium" />
            <OracleScore score={91.8} size="lg" confidence="high" />
          </div>
        </Card>
      </div>
    </div>
  );
}
