<template>
  <div class="auth-shell">

    <!-- ── Gauche ── -->
    <div class="auth-left">
      <RouterLink to="/" class="auth-logo">
        <div class="logo-mark">CPP</div>
        <span class="logo-text">Carrière Pro Plus</span>
      </RouterLink>

      <div class="auth-hero">
        <template v-if="step === 1">
          <div class="ah-tag">Mot de passe oublié</div>
          <h1 class="ah-title">Pas de panique,<br>on te couvre. 🔐</h1>
          <p class="ah-desc">Entre ton email et on t'envoie un code pour réinitialiser ton mot de passe en quelques secondes.</p>
        </template>
        <template v-else-if="step === 2">
          <div class="ah-tag">Vérification</div>
          <h1 class="ah-title">Vérifions<br>que c'est toi. 📬</h1>
          <p class="ah-desc">Un code à 6 chiffres a été envoyé à <strong style="color:#fff">{{ email }}</strong>.</p>
        </template>
        <template v-else>
          <div class="ah-tag">Nouveau mot de passe</div>
          <h1 class="ah-title">Choisis un nouveau<br>mot de passe. ✅</h1>
          <p class="ah-desc">Choisis quelque chose de solide — au moins 8 caractères avec des chiffres et des majuscules.</p>
        </template>

        <div class="steps-indicator">
          <div v-for="n in 3" :key="n" class="step-dot" :class="{ active: step >= n, current: step === n }"/>
        </div>
      </div>
    </div>

    <!-- ── Droite formulaire ── -->
    <div class="auth-right">
      <div class="auth-form-wrap">

        <!-- ══ ÉTAPE 1 : Email ══ -->
        <div v-if="step === 1">
          <h2 class="auth-title">Réinitialiser le mot de passe</h2>
          <p class="auth-sub">Entre l'email associé à ton compte Carrière Pro Plus.</p>

          <div v-if="errors.global" class="auth-error">{{ errors.global }}</div>

          <div class="form-group">
            <label class="form-label">Adresse email</label>
            <div class="input-icon-wrap">
              <span class="ii-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <input
                v-model="email"
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

          <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center" :disabled="loading" @click="submitEmail">
            <span v-if="!loading">Envoyer le code →</span>
            <span v-else class="spinner"/>
          </button>

          <p class="auth-switch">
            Tu te souviens ? <RouterLink to="/login">Se connecter</RouterLink>
          </p>
        </div>

        <!-- ══ ÉTAPE 2 : Code OTP ══ -->
        <div v-else-if="step === 2">
          <h2 class="auth-title">Entrer le code</h2>
          <p class="auth-sub">Code envoyé à <strong>{{ email }}</strong></p>

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
            <span v-if="resendCountdown > 0" style="color:var(--text4)">Renvoyer dans {{ resendCountdown }}s</span>
            <button v-else class="btn-link" @click="resendCode" :disabled="resendLoading">
              {{ resendLoading ? 'Envoi...' : 'Renvoyer le code' }}
            </button>
            <button class="btn-link" @click="step = 1; errors = {}">Changer d'email</button>
          </div>
        </div>

        <!-- ══ ÉTAPE 3 : Nouveau mot de passe ══ -->
        <div v-else>
          <h2 class="auth-title">Nouveau mot de passe</h2>
          <p class="auth-sub">Email vérifié ✅ — choisis ton nouveau mot de passe.</p>

          <div v-if="errors.global" class="auth-error">{{ errors.global }}</div>

          <div class="form-group">
            <label class="form-label">Nouveau mot de passe</label>
            <div class="input-prefix-wrap">
              <input
                v-model="password"
                :type="showPwd ? 'text' : 'password'"
                class="form-input"
                style="padding-right:44px"
                :class="{ 'input-error': errors.password }"
                placeholder="Min. 8 caractères"
              />
              <button type="button" class="input-eye" @click="showPwd = !showPwd">
                <svg v-if="!showPwd" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
            <div class="pwd-strength">
              <div v-for="n in 4" :key="n" class="pwd-bar" :class="{ active: passwordStrength >= n, [strengthColor]: passwordStrength >= n }"/>
            </div>
            <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
          </div>

          <div class="form-group">
            <label class="form-label">Confirmer le mot de passe</label>
            <div class="input-prefix-wrap">
              <input
                v-model="passwordConfirm"
                :type="showPwd ? 'text' : 'password'"
                class="form-input"
                :class="{ 'input-error': errors.passwordConfirm }"
                placeholder="Répète ton mot de passe"
              />
            </div>
            <div v-if="errors.passwordConfirm" class="field-error">{{ errors.passwordConfirm }}</div>
          </div>

          <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center" :disabled="loading" @click="submitReset">
            <span v-if="!loading">Réinitialiser mon mot de passe →</span>
            <span v-else class="spinner"/>
          </button>
        </div>

        <!-- ══ SUCCÈS ══ -->
        <div v-if="success" class="auth-success">
          <div class="success-icon">✅</div>
          <h3>Mot de passe réinitialisé !</h3>
          <p>Tu peux maintenant te connecter avec ton nouveau mot de passe sur Carrière Pro Plus.</p>
          <RouterLink to="/login" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:16px">
            Se connecter →
          </RouterLink>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/services/api'

const step            = ref(1)
const loading         = ref(false)
const resendLoading   = ref(false)
const showPwd         = ref(false)
const success         = ref(false)
const errors          = ref({})

const email           = ref('')
const password        = ref('')
const passwordConfirm = ref('')
const otp             = reactive(['', '', '', '', '', ''])
const otpRefs         = ref([])
const resendCountdown = ref(0)
let   countdownTimer  = null

const otpValue = computed(() => otp.join(''))

const passwordStrength = computed(() => {
  const p = password.value
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
function onOtpInput(i)     { if (otp[i] && i < 5) otpRefs.value[i + 1]?.focus() }
function onOtpBackspace(i) { if (!otp[i] && i > 0) { otp[i-1] = ''; otpRefs.value[i-1]?.focus() } }
function onOtpPaste(e) {
  const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  for (let i = 0; i < 6; i++) otp[i] = text[i] || ''
  otpRefs.value[Math.min(text.length, 5)]?.focus()
}

// ── Countdown ──
function startCountdown() {
  resendCountdown.value = 60
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) clearInterval(countdownTimer)
  }, 1000)
}
onUnmounted(() => clearInterval(countdownTimer))

// ── ÉTAPE 1 ──
async function submitEmail() {
  errors.value = {}
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Adresse email invalide'; return
  }
  loading.value = true
  try {
    await api.post('/auth/forgot-password', { email: email.value })
    step.value = 2
    startCountdown()
    setTimeout(() => otpRefs.value[0]?.focus(), 100)
  } catch (e) {
    errors.value.global = e.response?.data?.message || "Erreur lors de l'envoi du code."
  } finally { loading.value = false }
}

// ── Renvoyer ──
async function resendCode() {
  resendLoading.value = true
  try {
    await api.post('/auth/forgot-password', { email: email.value })
    startCountdown(); otp.fill(''); otpRefs.value[0]?.focus()
  } catch (e) {
    errors.value.global = 'Impossible de renvoyer le code.'
  } finally { resendLoading.value = false }
}

// ── ÉTAPE 2 ──
async function submitOtp() {
  errors.value = {}
  if (otpValue.value.length < 6) { errors.value.otp = 'Saisis les 6 chiffres.'; return }
  loading.value = true
  try {
    await api.post('/auth/verify-reset-otp', { email: email.value, code: otpValue.value })
    step.value = 3
  } catch (e) {
    errors.value.otp = 'Code incorrect ou expiré.'
    otp.fill(''); otpRefs.value[0]?.focus()
  } finally { loading.value = false }
}

// ── ÉTAPE 3 ──
async function submitReset() {
  errors.value = {}
  if (password.value.length < 8) { errors.value.password = 'Min. 8 caractères.'; return }
  if (password.value !== passwordConfirm.value) {
    errors.value.passwordConfirm = 'Les mots de passe ne correspondent pas.'; return
  }
  loading.value = true
  try {
    await api.post('/auth/reset-password', {
      email:    email.value,
      code:     otpValue.value,
      password: password.value,
    })
    success.value = true
    step.value    = 0
  } catch (e) {
    errors.value.global = e.response?.data?.message || 'Erreur lors de la réinitialisation.'
  } finally { loading.value = false }
}
</script>

<style scoped>
.auth-shell { display: flex; height: 100vh; overflow: hidden; }
.auth-left { width: 380px; flex-shrink: 0; background: linear-gradient(135deg, #1c2b4a 0%, #243558 100%); display: flex; flex-direction: column; padding: 36px 40px; overflow: hidden; }
.auth-logo { display: flex; align-items: center; gap: 10px; margin-bottom: auto; text-decoration: none; }
.logo-mark { background: rgba(212, 166, 52, .15); color: #fff; font-family: var(--font-mono); width: 34px; height: 34px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; }
.logo-text { color: rgba(255, 255, 255, .6); font-size: 15px; font-weight: 400; }
.auth-hero { margin: auto 0; padding: 32px 0; }
.ah-tag { display: inline-block; padding: 3px 12px; border: 1px solid rgba(212, 166, 52, .3); border-radius: 20px; font-size: 11px; font-weight: 600; color: rgba(212, 166, 52, .8); text-transform: uppercase; font-family: var(--font-mono); margin-bottom: 20px; }
.ah-title { font-family: var(--font-alt); font-size: 30px; font-weight: 800; color: #fff; letter-spacing: -1px; line-height: 1.18; margin-bottom: 14px; }
.ah-desc  { font-size: 13.5px; color: rgba(255, 255, 255, .5); line-height: 1.7; margin-bottom: 32px; }
.steps-indicator { display: flex; gap: 8px; align-items: center; }
.step-dot { width: 8px; height: 8px; border-radius: 99px; background: rgba(255, 255, 255, .15); transition: all .3s; }
.step-dot.active  { background: rgba(255, 255, 255, .4); }
.step-dot.current { width: 24px; background: #fff; }

.auth-right { flex: 1; background: var(--bg); display: flex; align-items: center; justify-content: center; padding: 40px 24px; overflow-y: auto; }
.auth-form-wrap { width: 100%; max-width: 400px; }
.auth-title { font-family: var(--font-alt); font-size: 22px; font-weight: 800; color: var(--text); margin-bottom: 5px; }
.auth-sub   { font-size: 13.5px; color: var(--text3); margin-bottom: 24px; }
.auth-error { background: #fee2e2; border: 1px solid #fca5a5; color: #dc2626; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
.field-error { font-size: 12px; color: #dc2626; margin-top: 5px; }
.input-error { border-color: #fca5a5 !important; }

.input-icon-wrap { position: relative; }
.ii-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text4); display: flex; pointer-events: none; }
.ii-input { padding-left: 38px !important; }

.otp-wrap { display: flex; gap: 8px; justify-content: center; margin-top: 8px; }
.otp-input { width: 52px; height: 60px; text-align: center; font-size: 22px; font-weight: 700; font-family: var(--font-mono); border: 1.5px solid var(--border); border-radius: 10px; background: var(--surface); color: var(--text); outline: none; transition: all .15s; }
.otp-input:focus  { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(28, 43, 74, .12); }
.otp-input.filled { border-color: var(--accent); background: var(--surface2); }
.otp-input.input-error { border-color: #fca5a5; }

.resend-row { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-size: 13px; }
.btn-link { background: none; border: none; color: #1c2b4a; font-weight: 600; cursor: pointer; font-size: 13px; padding: 0; }
.btn-link:hover { text-decoration: underline; }
.btn-link:disabled { opacity: .5; pointer-events: none; }

.input-prefix-wrap { position: relative; }
.input-eye { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text4); display: flex; padding: 4px; }
.input-eye:hover { color: var(--text); }

.pwd-strength { display: flex; gap: 4px; margin-top: 8px; }
.pwd-bar { flex: 1; height: 3px; border-radius: 99px; background: var(--border2); transition: background .2s; }
.pwd-bar.weak.active   { background: #ef4444; }
.pwd-bar.fair.active   { background: #f59e0b; }
.pwd-bar.good.active   { background: #3b82f6; }
.pwd-bar.strong.active { background: #22c55e; }

.auth-switch { text-align: center; font-size: 13.5px; color: var(--text3); margin-top: 20px; }
.auth-switch a { color: var(--text); font-weight: 600; text-decoration: none; }
.auth-switch a:hover { text-decoration: underline; }

.auth-success { text-align: center; padding: 32px 0; }
.success-icon { font-size: 48px; margin-bottom: 16px; }
.auth-success h3 { font-size: 20px; font-weight: 800; color: var(--text); margin-bottom: 8px; }
.auth-success p  { font-size: 14px; color: var(--text3); line-height: 1.6; }

.spinner { width: 18px; height: 18px; border: 2px solid rgba(255, 255, 255, .3); border-top-color: #fff; border-radius: 50%; animation: spin .65s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 700px) {
  .auth-left  { display: none; }
  .auth-right { padding: 32px 20px; }
}
</style>