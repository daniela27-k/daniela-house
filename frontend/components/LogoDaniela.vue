<template>
  <svg width="100%" viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradD" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F5E0A0"/>
        <stop offset="50%" stop-color="#C9A84C"/>
        <stop offset="100%" stop-color="#9A7B2E"/>
      </linearGradient>
    </defs>
    <circle cx="340" cy="165" r="148" fill="#0D0D0D"/>
    <circle cx="340" cy="165" r="144" fill="none" stroke="#C9A84C" stroke-width="1.2"/>
    <circle cx="340" cy="165" r="140" fill="none" stroke="#9A7B2E" stroke-width="0.4"/>
    <g class="anillo">
      <circle cx="340" cy="165" r="154" fill="none" stroke="#C9A84C" stroke-width="0.5" stroke-dasharray="3 7"/>
    </g>
    <g class="letra">
      <text x="340" y="230" text-anchor="middle"
        font-family="Palatino Linotype, Palatino, Georgia, serif"
        font-size="190" font-weight="700" font-style="italic"
        fill="url(#gradD)">D</text>
      <text x="340" y="230" text-anchor="middle"
        font-family="Palatino Linotype, Palatino, Georgia, serif"
        font-size="190" font-weight="700" font-style="italic"
        fill="none" stroke="#F5E0A0" stroke-width="0.6">D</text>
    </g>
    <text x="340" y="278" text-anchor="middle"
      font-family="Georgia, serif" font-size="10"
      fill="#C9A84C" class="aparecer2" letter-spacing="7">DANIELA HOUSE</text>
    <line x1="245" y1="274" x2="308" y2="274" stroke="#C9A84C" stroke-width="0.5" class="linea-izq"/>
    <line x1="372" y1="274" x2="435" y2="274" stroke="#C9A84C" stroke-width="0.5" class="linea-der"/>
    <polygon points="340,283 344,288 340,293 336,288" fill="#C9A84C"/>
  </svg>
</template>

<style scoped>
@keyframes aparecerD {
  0% { opacity: 0; transform: scale(0.3) translateY(20px); }
  60% { opacity: 1; transform: scale(1.05) translateY(-4px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes brillarD { 0%,100%{opacity:1} 50%{opacity:0.7} }
@keyframes aparecer { 0%{opacity:0} 100%{opacity:1} }
@keyframes aparecerLinea { 0%{stroke-dashoffset:200;opacity:0} 100%{stroke-dashoffset:0;opacity:1} }
@keyframes rotar { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

.letra { transform-origin:340px 165px; animation:aparecerD 2s cubic-bezier(.17,.67,.35,1.2) forwards, brillarD 4s ease-in-out 2s infinite; }
.aparecer2 { animation:aparecer 2s ease-out 2s forwards; opacity:0; }
.linea-izq { stroke-dasharray:200; animation:aparecerLinea 1.5s ease-out 2s forwards; }
.linea-der { stroke-dasharray:200; animation:aparecerLinea 1.5s ease-out 2.2s forwards; }
.anillo { transform-origin:340px 165px; animation:rotar 20s linear infinite; }
</style>