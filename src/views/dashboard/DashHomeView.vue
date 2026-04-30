<template>
  <div class="dashboard">

    <!-- ── Header ── -->
    <div class="dh-header">
      <div class="dh-greeting">
        <div class="dh-eyebrow">{{ greetingText }}</div>
        <div class="dh-title">{{ auth.user?.name || 'Admin' }} <span class="dh-wave">👋</span></div>
        <div class="dh-sub">Vraiment content de vous revoir !.</div>
      </div>
    </div>

    <!-- ── 3 cartes ── -->
    <div class="kpi-row">

      <!-- Concevoir mon CV -->
        <RouterLink to="/cv-builder" class="stat-card" style="--c:#8b5cf6;--bg:#ede9fe">
        <div class="stat-icon">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <div class="stat-label">Concevoir mon cv </div>
        <div class="stat-val">Commencer →</div>
      </RouterLink>

  
      <!-- Mes Formations -->
      <RouterLink to="/dashboard/enrollments" class="stat-card" style="--c:#8b5cf6;--bg:#ede9fe">
        <div class="stat-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <div class="stat-label">Mes Cours</div>
        <div class="stat-val">Consulter →</div>
      </RouterLink>

      <!-- Mes Achats -->
      <RouterLink to="/dashboard/commandes" class="stat-card" style="--c:#f97316;--bg:#ffedd5">
        <div class="stat-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
          <div class="stat-label">Mes Achats</div>
        <div class="stat-val">Consulter →</div>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const greetingText = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Bonjour,'
  if (h < 18) return 'Bon après-midi,'
  return 'Bonsoir,'
})

function genererCV() {
  // TODO: navigation vers la page CV
  console.log('Générer le CV')
}
</script>

<style scoped>
.dashboard { padding-bottom: 32px; }

/* ── Header ── */
.dh-header {
  display: flex; align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px; gap: 16px; flex-wrap: wrap;
}
.dh-eyebrow {
  font-size: 12px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 1px; color: var(--text4);
  font-family: var(--font-mono); margin-bottom: 4px;
}
.dh-title {
  font-size: 26px; font-weight: 800; color: var(--text);
  line-height: 1.2; font-family: var(--font-alt);
}
.dh-wave {
  display: inline-block;
  animation: wave 1.8s ease-in-out infinite;
  transform-origin: 70% 70%;
}
@keyframes wave {
  0%,100% { transform: rotate(0deg) }
  20% { transform: rotate(18deg) } 40% { transform: rotate(-10deg) }
  60% { transform: rotate(14deg) } 80% { transform: rotate(-6deg) }
}
.dh-sub { font-size: 13.5px; color: var(--text3); margin-top: 5px; }

/* ── Cartes ── */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px 18px;
  display: flex; flex-direction: column; gap: 10px;
  cursor: pointer; text-decoration: none;
  transition: box-shadow .2s, transform .2s;
}
.stat-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,.07);
  transform: translateY(-2px);
}

.stat-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
}

.stat-label {
  font-size: 13px; font-weight: 600; color: var(--text3);
}

.stat-val {
  font-size: 22px; font-weight: 800; color: var(--text);
  font-family: var(--font-alt); line-height: 1;
}
.stat-val span {
  font-size: 13px; font-weight: 500; color: var(--text4);
}

/* ── Responsive ── */
@media (max-width: 700px) { .kpi-row { grid-template-columns: 1fr; } }
</style>