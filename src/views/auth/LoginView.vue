<template>
  <div class="auth-shell">
    <!-- ── Gauche marketing ── -->
    <div class="auth-left">
      <RouterLink to="/" class="auth-logo">
        <div class="logo-mark">
          CPP
        </div>
        <span class="logo-text">Carrière <strong>Pro Plus</strong></span>
      </RouterLink>

      <div class="auth-hero">
        <div class="ah-tag">Bon retour 👋</div>
        <h1 class="ah-title">Décrochez<br>l'emploi.</h1>
        <p class="ah-desc">
          Reprends où tu t'es arrêté. CV, formations, offres d'emploi —
          tout ce que tu as créé est là.
        </p>

        <!-- ── Piliers de la plateforme ── -->
        <div class="pillars-list">
          <div class="pillar-item">
            <span class="pillar-icon">📝</span>
            <div class="pillar-body">
              <div class="pillar-title">Crée ton CV Pro</div>
              <div class="pillar-desc">Un CV pro généré en quelques minutes, optimisé ATS.</div>
            </div>
          </div>

          <div class="pillar-item">
            <span class="pillar-icon">💼</span>
            <div class="pillar-body">
              <div class="pillar-title">Trouve l'emploi</div>
              <div class="pillar-desc">100+ offres exclusives en CDI, CDD, stages et missions.</div>
            </div>
          </div>

          <div class="pillar-item">
            <span class="pillar-icon">🎓</span>
            <div class="pillar-body">
              <div class="pillar-title">Apprends</div>
              <div class="pillar-desc">Leadership, tech, finance, management — par des experts.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Droite formulaire ── -->
    <div class="auth-right">
      <!-- Logo visible uniquement en mobile -->
      <RouterLink to="/" class="auth-logo-mobile">
        <div class="logo-mark-sm">
          CPP
        </div>
        <span class="logo-text-sm">Carrière <strong>Pro Plus</strong></span>
      </RouterLink>

      <div class="auth-form-wrap">
        <h2 class="auth-title">Connexion</h2>
        <p class="auth-sub">Heureux de te revoir sur Carrière Pro Plus.</p>

        <div v-if="globalErr" class="auth-error">{{ globalErr }}</div>

        <div class="form-group">
          <label class="form-label">Adresse email</label>
          <div class="input-icon-wrap">
            <span class="ii-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <input
              v-model="form.email"
              type="email"
              class="form-input ii-input"
              :class="{ 'input-error': errors.email }"
              placeholder="toi@example.com"
              @keyup.enter="submit"
              autofocus
            />
          </div>
          <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
        </div>

        <div class="form-group">
          <div class="label-row">
            <label class="form-label" style="margin:0">Mot de passe</label>
            <RouterLink to="/forgot-password" class="auth-forgot">Mot de passe oublié ?</RouterLink>
          </div>
          <div class="input-icon-wrap">
            <span class="ii-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </span>
            <input
              v-model="form.password"
              :type="showPwd ? 'text' : 'password'"
              class="form-input ii-input"
              :class="{ 'input-error': errors.password }"
              placeholder="••••••••"
              @keyup.enter="submit"
            />
            <button type="button" class="ii-eye" @click="showPwd = !showPwd">
              <svg v-if="!showPwd" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
          <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
        </div>

        <button
          class="btn btn-primary btn-lg"
          style="width:100%;justify-content:center"
          :disabled="loading"
          @click="submit"
        >
          <span v-if="!loading">Se connecter →</span>
          <span v-else class="spinner"/>
        </button>

        <p class="auth-switch">
          Pas encore de compte ?
          <RouterLink to="/register">Créer un compte gratuit</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const router = useRouter()
const route  = useRoute()
const auth   = useAuthStore()

const form      = reactive({ email: '', password: '' })
const errors    = ref({})
const globalErr = ref('')
const loading   = ref(false)
const showPwd   = ref(false)

// ── Validation & soumission ──
function validate() {
  errors.value = {}
  let ok = true
  if (!form.email)    { errors.value.email    = 'Email requis';         ok = false }
  if (!form.password) { errors.value.password = 'Mot de passe requis'; ok = false }
  return ok
}

async function submit() {
  if (!validate()) return
  loading.value   = true
  globalErr.value = ''
  try {
    const { data } = await api.post('/auth/login', {
      email:    form.email,
      password: form.password,
    })
    auth.setToken(data.token)
    auth.setUser(data.user)
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } catch (e) {
    const status = e.response?.status
    if (status === 401) {
      globalErr.value = 'Email ou mot de passe incorrect.'
    } else if (status === 422) {
      const errs = e.response.data?.errors ?? {}
      if (errs.email)    errors.value.email    = errs.email[0]
      if (errs.password) errors.value.password = errs.password[0]
    } else {
      globalErr.value = 'Une erreur est survenue. Réessaie.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ══ Shell ══ */
.auth-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* ══════════════════════════════
   GAUCHE – panneau marketing
══════════════════════════════ */
.auth-left {
  width: 420px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #1c2b4a 0%, #243558 100%);
  display: flex;
  flex-direction: column;
  padding: 36px 40px;
  position: relative;
  overflow: hidden;
}

/* Cercle décoratif fond */
.auth-left::before {
  content: '';
  position: absolute;
  bottom: -80px;
  right: -80px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(212, 166, 52, .05);
  pointer-events: none;
}

/* Logo gauche */
.auth-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: auto;
  text-decoration: none;
}
.logo-mark {
  background: rgba(212, 166, 52, .15);
  color: #fff;
  width: 34px;
  height: 34px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  font-family: var(--font-mono);
}
.logo-text {
  color: rgba(255, 255, 255, .6);
  font-size: 15px;
  font-weight: 400;
  letter-spacing: .5px;
}
.logo-text strong {
  color: #fff;
  font-weight: 800;
}

/* Héro */
.auth-hero {
  margin: auto 0;
  padding: 32px 0;
}
.ah-tag {
  display: inline-block;
  padding: 3px 12px;
  border: 1px solid rgba(212, 166, 52, .3);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(212, 166, 52, .8);
  text-transform: uppercase;
  font-family: var(--font-mono);
  letter-spacing: .8px;
  margin-bottom: 20px;
}
.ah-title {
  font-family: var(--font-alt);
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
  line-height: 1.15;
  margin-bottom: 14px;
}
.ah-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, .5);
  line-height: 1.75;
  margin-bottom: 28px;
}

/* ── Piliers de la plateforme ── */
.pillars-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pillar-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(212, 166, 52, .08);
  border: 1px solid rgba(212, 166, 52, .15);
  border-radius: 12px;
  padding: 14px 16px;
}

.pillar-icon {
  font-size: 22px;
  flex-shrink: 0;
  width: 36px;
  text-align: center;
}
.pillar-body {
  flex: 1;
  min-width: 0;
}
.pillar-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2px;
}
.pillar-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, .5);
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* ══════════════════════════════
   DROITE – formulaire
══════════════════════════════ */
.auth-right {
  flex: 1;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  overflow-y: auto;
}

/* Logo mobile (caché sur desktop) */
.auth-logo-mobile {
  display: none;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-bottom: 32px;
}
.logo-mark-sm {
  background: #1c2b4a;
  color: #fff;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  font-family: var(--font-mono);
}
.logo-text-sm {
  color: var(--text);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: .5px;
}
.logo-text-sm strong {
  font-weight: 800;
}

.auth-form-wrap {
  width: 100%;
  max-width: 400px;
}

.auth-title {
  font-family: var(--font-alt);
  font-size: 24px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -.5px;
  margin-bottom: 5px;
}
.auth-sub {
  font-size: 13.5px;
  color: var(--text3);
  margin-bottom: 28px;
}

/* ══ Erreurs ══ */
.auth-error {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 18px;
}
.field-error {
  font-size: 12px;
  color: #dc2626;
  margin-top: 5px;
}
.input-error {
  border-color: #fca5a5 !important;
}

/* ══ Input avec icône ══ */
.input-icon-wrap {
  position: relative;
}
.ii-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text4);
  display: flex;
  align-items: center;
  pointer-events: none;
}
.ii-input {
  padding-left: 38px !important;
}
.ii-eye {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text4);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  transition: color .12s;
}
.ii-eye:hover {
  color: var(--text);
}

/* ══ Label row mot de passe ══ */
.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

/* ══ Forgot ══ */
.auth-forgot {
  font-size: 12.5px;
  color: var(--text4);
  text-decoration: none;
}
.auth-forgot:hover {
  color: var(--text);
}

/* ══ Switch ══ */
.auth-switch {
  text-align: center;
  font-size: 13.5px;
  color: var(--text3);
  margin-top: 20px;
}
.auth-switch a {
  color: var(--text);
  font-weight: 600;
  text-decoration: none;
}
.auth-switch a:hover {
  text-decoration: underline;
}

/* ══ Spinner ══ */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, .3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .65s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ══════════════════════════════
   RESPONSIVE MOBILE
══════════════════════════════ */
@media (max-width: 700px) {
  /* Cacher le panneau gauche */
  .auth-left {
    display: none;
  }

  /* Droite prend tout l'écran */
  .auth-right {
    padding: 40px 24px 32px;
    justify-content: flex-start;
  }

  /* Afficher le logo en mobile */
  .auth-logo-mobile {
    display: flex;
  }

  /* Centrer le tout verticalement sur petit écran */
  .auth-form-wrap {
    margin: auto 0;
    padding-bottom: 40px;
  }
}
</style>