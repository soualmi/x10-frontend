"use client";
import * as React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function SignalsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Signaux par Source</h1>
        <p className="text-slate-400">Surveillance multi-plateformes en temps réel pour détection d'opportunités</p>
      </div>

      {/* Stats - bonnes valeurs 451, 80, 7/7 */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">PRODUITS SCANNÉS</div>
          <div className="text-2xl font-bold text-white">2847</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">SIGNAUX DÉTECTÉS</div>
          <div className="text-2xl font-bold text-blue-400">451</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">HOT DÉTECTÉS</div>
          <div className="text-2xl font-bold text-red-400">80</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">SOURCES ACTIVES</div>
          <div className="text-2xl font-bold text-green-400">7/7</div>
        </div>
      </div>

      {/* Grid COMPACT avec Google Trends + mini-graphiques */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* TikTok */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🎵</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">TikTok</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></div>
                  <span className="text-xs text-green-400">Opérationnel</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">il y a 2 min</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><div className="text-xs text-slate-400">PRODUITS</div><div className="text-lg font-bold text-red-400">1247</div></div>
              <div><div className="text-xs text-slate-400">SIGNAUX</div><div className="text-lg font-bold text-white">143</div></div>
              <div><div className="text-xs text-slate-400">HOT</div><div className="text-lg font-bold text-red-400">23</div></div>
              <div><div className="text-xs text-slate-400">QUALITÉ</div><div className="text-sm text-green-400">High</div></div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 mb-2">TENDANCES DÉTECTÉES</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Récupération active</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-2 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
                  <span className="text-green-400">+72%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Mobilité quotidienne</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-2 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"></div>
                  <span className="text-red-400">-58%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Amazon */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📦</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Amazon</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></div>
                  <span className="text-xs text-green-400">Opérationnel</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">il y a 3 min</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><div className="text-xs text-slate-400">PRODUITS</div><div className="text-lg font-bold text-red-400">892</div></div>
              <div><div className="text-xs text-slate-400">SIGNAUX</div><div className="text-lg font-bold text-white">98</div></div>
              <div><div className="text-xs text-slate-400">HOT</div><div className="text-lg font-bold text-red-400">18</div></div>
              <div><div className="text-xs text-slate-400">QUALITÉ</div><div className="text-sm text-green-400">High</div></div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 mb-2">TENDANCES DÉTECTÉES</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Tech posture bureau</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-2 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
                  <span className="text-green-400">+45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Accessoires fitness</span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-2 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
                  <span className="text-green-400">+38%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AliExpress */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🛒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AliExpress</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></div>
                  <span className="text-xs text-green-400">Opérationnel</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">il y a 5 min</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><div className="text-xs text-slate-400">PRODUITS</div><div className="text-lg font-bold text-red-400">456</div></div>
              <div><div className="text-xs text-slate-400">SIGNAUX</div><div className="text-lg font-bold text-white">67</div></div>
              <div><div className="text-xs text-slate-400">HOT</div><div className="text-lg font-bold text-red-400">12</div></div>
              <div><div className="text-xs text-slate-400">QUALITÉ</div><div className="text-sm text-yellow-400">Medium</div></div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 mb-2">TENDANCES DÉTECTÉES</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Nouveaux fournisseurs tech</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-2 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
                  <span className="text-green-400">+28%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Prix compétitifs gadgets</span>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-2 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"></div>
                  <span className="text-orange-400">+19%</span>
                </div>
              </div>
            </div>
          </div>

          {/* GOOGLE TRENDS - AVEC GRAPHIQUES */}
          <div className="bg-slate-800 rounded-xl p-6 border border-green-500 hover:-translate-y-1 transition-all duration-300 relative">
            <div className="absolute top-3 right-3">
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">NOUVEAU</span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Google Trends</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></div>
                  <span className="text-xs text-green-400">Opérationnel</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">il y a 1 min</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><div className="text-xs text-slate-400">PRODUITS</div><div className="text-lg font-bold text-red-400">324</div></div>
              <div><div className="text-xs text-slate-400">SIGNAUX</div><div className="text-lg font-bold text-white">89</div></div>
              <div><div className="text-xs text-slate-400">HOT</div><div className="text-lg font-bold text-red-400">14</div></div>
              <div><div className="text-xs text-slate-400">QUALITÉ</div><div className="text-sm text-green-400">High</div></div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 mb-2">TENDANCES DÉTECTÉES</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Search volume spike</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-px h-3">
                    <div className="w-1 h-1 bg-green-400"></div>
                    <div className="w-1 h-2 bg-green-400"></div>
                    <div className="w-1 h-3 bg-green-400"></div>
                    <div className="w-1 h-2 bg-green-400"></div>
                    <div className="w-1 h-3 bg-green-400"></div>
                  </div>
                  <span className="text-green-400">+89%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Seasonal trends</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-px h-3">
                    <div className="w-1 h-2 bg-blue-400"></div>
                    <div className="w-1 h-1 bg-blue-400"></div>
                    <div className="w-1 h-3 bg-blue-400"></div>
                    <div className="w-1 h-2 bg-blue-400"></div>
                    <div className="w-1 h-2 bg-blue-400"></div>
                  </div>
                  <span className="text-green-400">+34%</span>
                </div>
              </div>
            </div>
          </div>

          {/* YouTube, Instagram, Facebook avec mêmes styles... */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📺</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">YouTube</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></div>
                  <span className="text-xs text-green-400">Opérationnel</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">il y a 8 min</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><div className="text-xs text-slate-400">PRODUITS</div><div className="text-lg font-bold text-red-400">178</div></div>
              <div><div className="text-xs text-slate-400">SIGNAUX</div><div className="text-lg font-bold text-white">34</div></div>
              <div><div className="text-xs text-slate-400">HOT</div><div className="text-lg font-bold text-red-400">8</div></div>
              <div><div className="text-xs text-slate-400">QUALITÉ</div><div className="text-sm text-green-400">High</div></div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📸</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Instagram</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></div>
                  <span className="text-xs text-green-400">Opérationnel</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">il y a 12 min</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><div className="text-xs text-slate-400">PRODUITS</div><div className="text-lg font-bold text-red-400">52</div></div>
              <div><div className="text-xs text-slate-400">SIGNAUX</div><div className="text-lg font-bold text-white">12</div></div>
              <div><div className="text-xs text-slate-400">HOT</div><div className="text-lg font-bold text-red-400">3</div></div>
              <div><div className="text-xs text-slate-400">QUALITÉ</div><div className="text-sm text-yellow-400">Medium</div></div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">👥</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Facebook</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></div>
                  <span className="text-xs text-green-400">Opérationnel</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">il y a 15 min</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><div className="text-xs text-slate-400">PRODUITS</div><div className="text-lg font-bold text-red-400">22</div></div>
              <div><div className="text-xs text-slate-400">SIGNAUX</div><div className="text-lg font-bold text-white">8</div></div>
              <div><div className="text-xs text-slate-400">HOT</div><div className="text-lg font-bold text-red-400">2</div></div>
              <div><div className="text-xs text-slate-400">QUALITÉ</div><div className="text-sm text-red-400">Low</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
