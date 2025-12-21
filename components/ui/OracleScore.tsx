interface OracleScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  confidence?: "high" | "medium" | "low";
}

export function OracleScore({ score, size = "md", confidence }: OracleScoreProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl"
  };
  
  const confidenceColors = {
    high: "rgb(74, 222, 128)",
    medium: "rgb(251, 191, 36)",
    low: "rgb(148, 163, 184)"
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`${sizes[size]} font-bold`}
        style={{ 
          background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {score}
      </div>
      <div className="mt-1 text-xs font-semibold" style={{ color: 'rgb(148, 163, 184)' }}>
        Oracle Score
      </div>
      {confidence && (
        <div 
          className="mt-1 rounded px-2 py-0.5 text-xs font-medium"
          style={{ 
            background: `${confidenceColors[confidence]}20`,
            color: confidenceColors[confidence]
          }}
        >
          {confidence === "high" ? "Haute confiance" : confidence === "medium" ? "Moyenne" : "Faible"}
        </div>
      )}
    </div>
  );
}
