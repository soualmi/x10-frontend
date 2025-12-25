import OracleShell from "../_components/OracleShell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function IconBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "h-9 w-9 rounded-xl border border-white/10 bg-white/[0.035] backdrop-blur-xl flex items-center justify-center shrink-0 " +
        className
      }
    >
      {children}
    </div>
  );
}

function BrandIcon({
  src,
  alt,
  sizeClass = "h-5 w-5",
  invert = true,
  className = "",
}: {
  src: string;
  alt: string;
  sizeClass?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} ${invert ? "filter invert" : ""} ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}

/**
 * Icône "Trends" inline (pas de dépendance externe → s’affiche toujours).
 * Style: monochrome, discret, cohérent avec Oracle.
 */
function TrendsMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 18.5V5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <path
        d="M4 18.5H20"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <path
        d="M7 14.5l4-4 3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <circle cx="7" cy="14.5" r="1" fill="currentColor" opacity="0.9" />
      <circle cx="11" cy="10.5" r="1" fill="currentColor" opacity="0.9" />
      <circle cx="14" cy="13.5" r="1" fill="currentColor" opacity="0.9" />
      <circle cx="19" cy="7.5" r="1" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export default function SignalsPage() {
  return (
    <OracleShell title="Signaux" subtitle="Surveillance multi-plateformes.">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="text-[11px] tracking-[0.22em] text-white/45">ORACLE // SIGNALS</div>
          <h1 className="mt-2 text-2xl font-semibold text-white">Signaux par source</h1>
          <p className="mt-2 text-sm text-white/60">
            Surveillance multi-plateformes en temps réel pour détection d’opportunités.
          </p>
        </div>

        {/* Stats globaux */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4">
            <div className="text-[11px] tracking-[0.18em] text-white/45">PRODUITS</div>
            <div className="mt-1 text-white text-2xl font-semibold">2847</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4">
            <div className="text-[11px] tracking-[0.18em] text-white/45">SIGNAUX</div>
            <div className="mt-1 text-white text-2xl font-semibold">451</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4">
            <div className="text-[11px] tracking-[0.18em] text-white/45">HOT</div>
            <div className="mt-1 text-white text-2xl font-semibold">80</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4">
            <div className="text-[11px] tracking-[0.18em] text-white/45">SOURCES</div>
            <div className="mt-1 text-white text-2xl font-semibold">7/7</div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <IconBox>
                <BrandIcon
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg"
                  alt="TikTok"
                />
              </IconBox>
              <h3 className="text-white font-semibold">TikTok</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/55">Produits</span><span className="text-white/85">1247</span></div>
              <div className="flex justify-between"><span className="text-white/55">Signaux</span><span className="text-white/85">143</span></div>
              <div className="flex justify-between"><span className="text-white/55">Hot</span><span className="text-white/85">23</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <IconBox>
                <BrandIcon
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazon.svg"
                  alt="Amazon"
                />
              </IconBox>
              <h3 className="text-white font-semibold">Amazon</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/55">Produits</span><span className="text-white/85">892</span></div>
              <div className="flex justify-between"><span className="text-white/55">Signaux</span><span className="text-white/85">98</span></div>
              <div className="flex justify-between"><span className="text-white/55">Hot</span><span className="text-white/85">18</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              {/* AliExpress aligné (boîte identique + icône centrée) */}
              <IconBox>
                <BrandIcon
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/aliexpress.svg"
                  alt="AliExpress"
                  sizeClass="h-5 w-5"
                  className="translate-y-[0.5px]"
                />
              </IconBox>
              <h3 className="text-white font-semibold">AliExpress</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/55">Produits</span><span className="text-white/85">456</span></div>
              <div className="flex justify-between"><span className="text-white/55">Signaux</span><span className="text-white/85">67</span></div>
              <div className="flex justify-between"><span className="text-white/55">Hot</span><span className="text-white/85">12</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <IconBox>
                <BrandIcon
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
                  alt="YouTube"
                />
              </IconBox>
              <h3 className="text-white font-semibold">YouTube</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/55">Produits</span><span className="text-white/85">178</span></div>
              <div className="flex justify-between"><span className="text-white/55">Signaux</span><span className="text-white/85">34</span></div>
              <div className="flex justify-between"><span className="text-white/55">Hot</span><span className="text-white/85">8</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <IconBox>
                <BrandIcon
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                  alt="Instagram"
                />
              </IconBox>
              <h3 className="text-white font-semibold">Instagram</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/55">Produits</span><span className="text-white/85">52</span></div>
              <div className="flex justify-between"><span className="text-white/55">Signaux</span><span className="text-white/85">12</span></div>
              <div className="flex justify-between"><span className="text-white/55">Hot</span><span className="text-white/85">3</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <IconBox>
                <BrandIcon
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                  alt="Facebook"
                />
              </IconBox>
              <h3 className="text-white font-semibold">Facebook</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/55">Produits</span><span className="text-white/85">22</span></div>
              <div className="flex justify-between"><span className="text-white/55">Signaux</span><span className="text-white/85">8</span></div>
              <div className="flex justify-between"><span className="text-white/55">Hot</span><span className="text-white/85">2</span></div>
            </div>
          </div>
        </div>

        {/* TRENDS */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-8 relative">
          <div className="absolute top-4 right-4">
            <span className="text-[11px] tracking-[0.16em] border border-white/10 bg-black/25 text-white/75 px-3 py-1 rounded-full font-semibold">
              NOUVEAU
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <IconBox className="h-10 w-10 rounded-2xl">
                  <span className="text-white/85">
                    <TrendsMark className="h-6 w-6" />
                  </span>
                </IconBox>

                {/* IMPORTANT : on enlève le texte "Google Trends" */}
                <div>
                  <div className="text-[11px] tracking-[0.22em] text-white/45">TRENDS</div>
                  <p className="text-sm text-white/55 mt-1">Analyse de tendances en temps réel</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-2xl font-semibold text-white">324</div>
                  <div className="text-[11px] tracking-[0.18em] text-white/45">PRODUITS</div>
                </div>
                <div className="text-center rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-2xl font-semibold text-white">89</div>
                  <div className="text-[11px] tracking-[0.18em] text-white/45">SIGNAUX</div>
                </div>
                <div className="text-center rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-2xl font-semibold text-white">14</div>
                  <div className="text-[11px] tracking-[0.18em] text-white/45">HOT</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Search volume spike</span>
                  <span className="text-white/85 font-semibold">+89%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Seasonal trends</span>
                  <span className="text-white/85 font-semibold">+34%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Analyse prédictive</span>
                  <span className="text-white/85 font-semibold">+67%</span>
                </div>
              </div>
            </div>

            {/* Graphique */}
            <div>
              <div className="text-white font-semibold mb-4">Graphique tendances</div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
                <div className="flex items-end justify-between h-32 gap-2">
                  {[
                    ["Jan", "h-16", "bg-white/45"],
                    ["Fév", "h-12", "bg-white/35"],
                    ["Mar", "h-20", "bg-white/50"],
                    ["Avr", "h-24", "bg-white/60"],
                    ["Mai", "h-28", "bg-white/70"],
                    ["Juin", "h-32", "bg-white/80"],
                  ].map(([label, h, tone]) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div className={`w-8 ${h} ${tone} rounded-t`} />
                      <span className="text-xs text-white/45">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <span className="text-white/75 text-sm font-semibold">Croissance +89% sur 6 mois</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BARRE RÉSUMÉ */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
          <h3 className="text-white font-semibold mb-4">Analyse par plateforme</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {[
              ["GOOGLE", "324", "+89%"],
              ["TIKTOK", "1247", "+72%"],
              ["AMAZON", "892", "+45%"],
              ["ALIEXPRESS", "456", "+28%"],
              ["YOUTUBE", "178", "+42%"],
              ["INSTAGRAM", "52", "-8%"],
              ["FACEBOOK", "22", "+18%"],
            ].map(([name, val, delta]) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <div className="text-[11px] tracking-[0.18em] text-white/45 mb-1">{name}</div>
                <div className="text-white font-semibold">{val}</div>
                <div className="text-xs text-white/55">{delta}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Légende */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4">
          <h3 className="text-white font-semibold mb-3">Légende des tendances</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
              <span className="text-white/70">Hot — Croissance forte</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
              <span className="text-white/70">Rising — En hausse</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full opacity-45"></div>
              <span className="text-white/70">Stable — Constant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full opacity-30"></div>
              <span className="text-white/70">Declining — En baisse</span>
            </div>
          </div>
        </div>
      </div>
    </OracleShell>
  );
}
