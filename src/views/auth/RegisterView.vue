<template>
  <div class="auth-shell">

    <!-- ── Gauche marketing ── -->
    <div class="auth-left">
      <RouterLink to="/" class="auth-logo">
        <div class="logo-mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span class="logo-text">Carrière <strong>Pro Plus</strong></span>
      </RouterLink>

      <div class="auth-hero">
        <!-- Étape 1 -->
        <template v-if="step === 1">
          <div class="ah-tag">Commençons 🚀</div>
          <h1 class="ah-title">Construis<br>ta carrière.</h1>
          <p class="ah-desc">Crée un compte gratuit. CV pro, offres d'emploi, formations — tout t'attend.</p>
        </template>
        <!-- Étape 2 -->
        <template v-else-if="step === 2">
          <div class="ah-tag">Vérification</div>
          <h1 class="ah-title">Vérifions<br>ton email. 📬</h1>
          <p class="ah-desc">Un code à 6 chiffres a été envoyé à <strong style="color:#fff">{{ form.email }}</strong>. Vérifie ta boîte de réception.</p>
        </template>
        <!-- Étape 3 -->
        <template v-else>
          <div class="ah-tag">Dernière étape</div>
          <h1 class="ah-title">Plus qu'un pas<br>et tu es prêt. ✅</h1>
          <p class="ah-desc">Crée un mot de passe pour finaliser ton compte Carrière Pro Plus.</p>
        </template>

        <!-- ── Piliers de la plateforme ── -->
        <div class="pillars-list">
          <div class="pillar-item">
            <span class="pillar-icon">📝</span>
            <div class="pillar-body">
              <div class="pillar-title">CV Pro en minutes</div>
              <div class="pillar-desc">Généré automatiquement, optimisé ATS.</div>
            </div>
          </div>

          <div class="pillar-item">
            <span class="pillar-icon">💼</span>
            <div class="pillar-body">
              <div class="pillar-title">100+ offres d'emploi</div>
              <div class="pillar-desc">Exclusives avec partenaires tech CI.</div>
            </div>
          </div>

          <div class="pillar-item">
            <span class="pillar-icon">🎓</span>
            <div class="pillar-body">
              <div class="pillar-title">Formations gratuites</div>
              <div class="pillar-desc">Leadership, tech, finance, management.</div>
            </div>
          </div>
        </div>

        <!-- Steps indicator -->
        <div class="steps-indicator">
          <div v-for="n in 3" :key="n" class="step-dot" :class="{ active: step >= n, current: step === n }"/>
        </div>
      </div>
    </div>

    <!-- ── Droite formulaire ── -->
    <div class="auth-right">

      <!-- Logo visible uniquement en mobile -->
      <RouterLink to="/" class="auth-logo-mobile">
        <div class="logo-mark-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span class="logo-text-sm">Carrière <strong>Pro Plus</strong></span>
      </RouterLink>

      <div class="auth-form-wrap">

        <!-- ══ ÉTAPE 1 : Email ══ -->
        <div v-if="step === 1">
          <h2 class="auth-title">Créer un compte</h2>
          <p class="auth-sub">Commence par entrer ton adresse email.</p>

          <div v-if="errors.global" class="auth-error">{{ errors.global }}</div>

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
                @keyup.enter="submitEmail"
                autofocus
              />
            </div>
            <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
          </div>

          <button
            class="btn btn-primary btn-lg"
            style="width:100%;justify-content:center"
            :disabled="loading"
            @click="submitEmail"
          >
            <span v-if="!loading">Recevoir le code →</span>
            <span v-else class="spinner"/>
          </button>

          <p class="auth-switch">Déjà membre ? <RouterLink to="/login">Se connecter</RouterLink></p>
        </div>

        <!-- ══ ÉTAPE 2 : Code OTP ══ -->
        <div v-else-if="step === 2">
          <h2 class="auth-title">Entrer le code</h2>
          <p class="auth-sub">Code envoyé à <strong>{{ form.email }}</strong></p>

          <div v-if="errors.global" class="auth-error">{{ errors.global }}</div>

          <div class="otp-wrap">
            <input
              v-for="(_, i) in otp"
              :key="i"
              :ref="el => otpRefs[i] = el"
              v-model="otp[i]"
              type="text"
              inputmode="numeric"
              maxlength="1"
              class="otp-input"
              :class="{ 'input-error': errors.otp, filled: otp[i] }"
              @input="onOtpInput(i)"
              @keydown.backspace="onOtpBackspace(i)"
              @paste.prevent="onOtpPaste"
            />
          </div>
          <div v-if="errors.otp" class="field-error" style="text-align:center;margin-top:8px">{{ errors.otp }}</div>

          <button
            class="btn btn-primary btn-lg"
            style="width:100%;justify-content:center;margin-top:24px"
            :disabled="loading || otpValue.length < 6"
            @click="submitOtp"
          >
            <span v-if="!loading">Vérifier le code →</span>
            <span v-else class="spinner"/>
          </button>

          <div class="resend-row">
            <span v-if="resendCountdown > 0" style="color:var(--text4)">
              Renvoyer dans {{ resendCountdown }}s
            </span>
            <button v-else class="btn-link" @click="resendCode" :disabled="resendLoading">
              {{ resendLoading ? 'Envoi...' : 'Renvoyer le code' }}
            </button>
            <button class="btn-link" @click="step = 1; errors = {}">Changer d'email</button>
          </div>
        </div>

        <!-- ══ ÉTAPE 3 : Nom + Password ══ -->
        <div v-else>
          <h2 class="auth-title">Finalise ton compte</h2>
          <p class="auth-sub">Email vérifié ✅ — crée ton mot de passe !</p>

          <div v-if="errors.global" class="auth-error">{{ errors.global }}</div>

          <div class="form-group">
            <label class="form-label">Prénom et Nom</label>
            <div class="input-icon-wrap">
              <span class="ii-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                v-model="form.name"
                type="text"
                class="form-input ii-input"
                :class="{ 'input-error': errors.name }"
                placeholder="Jean Dupont"
              />
            </div>
            <div v-if="errors.name" class="field-error">{{ errors.name }}</div>
          </div>

          <div class="form-group">
            <label class="form-label">Mot de passe</label>
            <div class="input-icon-wrap">
              <span class="ii-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input ii-input"
                style="padding-right:44px"
                :class="{ 'input-error': errors.password }"
                placeholder="Min. 8 caractères"
              />
              <button type="button" class="input-eye" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
            <div class="pwd-strength">
              <div
                v-for="n in 4" :key="n"
                class="pwd-bar"
                :class="{ active: passwordStrength >= n, [strengthColor]: passwordStrength >= n }"
              />
            </div>
            <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
          </div>

          <button
            class="btn btn-primary btn-lg"
            style="width:100%;justify-content:center"
            :disabled="loading"
            @click="submitRegister"
          >
            <span v-if="!loading">Créer mon compte 🎉</span>
            <span v-else class="spinner"/>
          </button>

          <p class="auth-switch" style="margin-top:16px;font-size:12px;color:var(--text5)">
            En créant un compte, tu acceptes les
            <RouterLink to="/terms" style="color:var(--text3)">Conditions</RouterLink>
            et la
            <RouterLink to="/privacy" style="color:var(--text3)">Politique de confidentialité</RouterLink>.
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const router = useRouter()
const auth   = useAuthStore()

// ── État ──
const step          = ref(1)
const loading       = ref(false)
const resendLoading = ref(false)
const showPassword  = ref(false)
const errors        = ref({})

const form    = reactive({ email: '', name: '', password: '' })
const otp     = reactive(['', '', '', '', '', ''])
const otpRefs = ref([])

const resendCountdown = ref(0)
let countdownTimer    = null

// ── Computed ──
const otpValue = computed(() => otp.join(''))

const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return 0
  let s = 0
  if (p.length >= 8)           s++
  if (/[A-Z]/.test(p))         s++
  if (/[0-9]/.test(p))         s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})

const strengthColor = computed(() => {
  if (passwordStrength.value <= 1) return 'weak'
  if (passwordStrength.value <= 2) return 'fair'
  if (passwordStrength.value === 3) return 'good'
  return 'strong'
})

// ── OTP helpers ──
function onOtpInput(i) {
  if (otp[i] && i < 5) otpRefs.value[i + 1]?.focus()
}
function onOtpBackspace(i) {
  if (!otp[i] && i > 0) {
    otp[i - 1] = ''
    otpRefs.value[i - 1]?.focus()
  }
}
function onOtpPaste(e) {
  const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  for (let i = 0; i < 6; i++) otp[i] = text[i] || ''
  otpRefs.value[Math.min(text.length, 5)]?.focus()
}

// ── Countdown renvoi code ──
function startCountdown() {
  resendCountdown.value = 60
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) clearInterval(countdownTimer)
  }, 1000)
}
onUnmounted(() => clearInterval(countdownTimer))

// ── ÉTAPE 1 : Envoi email ──
async function submitEmail() {
  errors.value = {}
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = 'Adresse email invalide'
    return
  }
  loading.value = true
  try {
    await api.post('/auth/send-otp', { email: form.email })
    step.value = 2
    startCountdown()
    setTimeout(() => otpRefs.value[0]?.focus(), 100)
  } catch (e) {
    errors.value.global = e.response?.data?.message || "Erreur lors de l'envoi du code."
  } finally {
    loading.value = false
  }
}

// ── Renvoyer le code ──
async function resendCode() {
  resendLoading.value = true
  try {
    await api.post('/auth/send-otp', { email: form.email })
    startCountdown()
    otp.fill('')
    otpRefs.value[0]?.focus()
  } catch (e) {
    errors.value.global = 'Impossible de renvoyer le code.'
  } finally {
    resendLoading.value = false
  }
}

// ── ÉTAPE 2 : Vérification OTP ──
async function submitOtp() {
  errors.value = {}
  if (otpValue.value.length < 6) {
    errors.value.otp = 'Saisis les 6 chiffres du code reçu.'
    return
  }
  loading.value = true
  try {
    await api.post('/auth/verify-otp', { email: form.email, code: otpValue.value })
    step.value = 3
  } catch (e) {
    errors.value.otp = 'Code incorrect ou expiré. Vérifie et réessaie.'
    otp.fill('')
    otpRefs.value[0]?.focus()
  } finally {
    loading.value = false
  }
}

// ── ÉTAPE 3 : Finalisation ──
async function submitRegister() {
  errors.value = {}
  if (!form.name.trim() || form.name.length < 3) {
    errors.value.name = 'Le nom doit faire au moins 3 caractères.'
    return
  }
  if (form.password.length < 8) {
    errors.value.password = 'Le mot de passe doit faire au moins 8 caractères.'
    return
  }
  loading.value = true
  try {
    const { data } = await api.post('/auth/register', {
      email:    form.email,
      name:     form.name,
      password: form.password,
      otp_code: otpValue.value,
    })
    auth.setToken(data.token)
    auth.setUser(data.user)
    router.push('/dashboard')
  } catch (e) {
    const errs = e.response?.data?.errors
    if (errs) {
      if (errs.name)     errors.value.name     = errs.name[0]
      if (errs.password) errors.value.password = errs.password[0]
    } else {
      errors.value.global = e.response?.data?.message || 'Erreur lors de la création du compte.'
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
  background: #0f172a;
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
  background: rgba(255,255,255,.03);
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
  background: rgba(255,255,255,.1);
  color: #fff;
  width: 34px;
  height: 34px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-text {
  color: rgba(255,255,255,.7);
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
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,.4);
  text-transform: uppercase;
  font-family: var(--font-mono);
  letter-spacing: .8px;
  margin-bottom: 20px;
}
.ah-title {
  font-family: var(--font-alt);
  font-size: 30px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
  line-height: 1.18;
  margin-bottom: 14px;
}
.ah-desc {
  font-size: 13.5px;
  color: rgba(255,255,255,.45);
  line-height: 1.7;
  margin-bottom: 28px;
}

/* ── Piliers de la plateforme ── */
.pillars-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}
.pillar-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 12px;
  padding: 13px 16px;
}
.pillar-icon {
  font-size: 20px;
  flex-shrink: 0;
  width: 32px;
  text-align: center;
}
.pillar-body {
  flex: 1;
  min-width: 0;
}
.pillar-title {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2px;
}
.pillar-desc {
  font-size: 11.5px;
  color: rgba(255,255,255,.4);
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Steps indicator */
.steps-indicator {
  display: flex;
  gap: 8px;
  align-items: center;
}
.step-dot {
  width: 8px;
  height: 8px;
  border-radius: 99px;
  background: rgba(255,255,255,.15);
  transition: all .3s;
}
.step-dot.active  { background: rgba(255,255,255,.4); }
.step-dot.current { width: 24px; background: #fff; }

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
  background: #0f172a;
  color: #fff;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -.5px;
  margin-bottom: 5px;
}
.auth-sub {
  font-size: 13.5px;
  color: var(--text3);
  margin-bottom: 24px;
}

/* ══ Erreurs ══ */
.auth-error {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 16px;
}
.field-error {
  font-size: 12px;
  color: #dc2626;
  margin-top: 5px;
}
.input-error { border-color: #fca5a5 !important; }

/* ══ Input avec icône (email étape 1) ══ */
.input-icon-wrap { position: relative; }
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
.ii-input { padding-left: 38px !important; }

/* ══ OTP ══ */
.otp-wrap {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
.otp-input {
  width: 52px;
  height: 60px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  font-family: var(--font-mono);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text);
  outline: none;
  transition: all .15s;
}
.otp-input:focus      { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(79,70,229,.12); }
.otp-input.filled     { border-color: var(--accent); background: var(--surface2); }
.otp-input.input-error { border-color: #fca5a5; }

.resend-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
}
.btn-link {
  background: none;
  border: none;
  color: var(--accent);
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
}
.btn-link:hover    { text-decoration: underline; }
.btn-link:disabled { opacity: .5; cursor: not-allowed; }

/* ══ Input préfixe @ et œil mot de passe ══ */
.input-prefix-wrap { position: relative; }
.input-prefix {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: var(--text4);
  pointer-events: none;
  font-weight: 600;
}
.input-eye {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text4);
  display: flex;
  padding: 4px;
}
.input-eye:hover { color: var(--text); }

/* ══ Barre de force du mot de passe ══ */
.pwd-strength {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}
.pwd-bar {
  flex: 1;
  height: 3px;
  border-radius: 99px;
  background: var(--border2);
  transition: background .2s;
}
.pwd-bar.weak.active   { background: #ef4444; }
.pwd-bar.fair.active   { background: #f59e0b; }
.pwd-bar.good.active   { background: #3b82f6; }
.pwd-bar.strong.active { background: #22c55e; }

/* ══ Switch ══ */
.auth-switch {
  text-align: center;
  font-size: 13.5px;
  color: var(--text3);
  margin-top: 20px;
}
.auth-switch a { color: var(--text); font-weight: 600; text-decoration: none; }
.auth-switch a:hover { text-decoration: underline; }

/* ══ Spinner ══ */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .65s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ══════════════════════════════
   RESPONSIVE MOBILE
══════════════════════════════ */
@media (max-width: 700px) {
  /* Cacher le panneau gauche */
  .auth-left { display: none; }

  /* Droite prend tout l'écran */
  .auth-right {
    padding: 40px 24px 32px;
    justify-content: flex-start;
  }

  /* Afficher le logo en mobile */
  .auth-logo-mobile { display: flex; }

  /* Centrer le formulaire verticalement */
  .auth-form-wrap {
    margin: auto 0;
    padding-bottom: 40px;
  }
}
</style>