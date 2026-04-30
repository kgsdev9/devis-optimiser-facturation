<template>
  <div class="settings-wrap">

    <!-- Header -->
    <div class="settings-header">
      <div class="settings-title">Paramètres</div>
      <div class="settings-sub">Gérez vos informations personnelles et votre sécurité</div>
    </div>

    <!-- ══ LOADER ══ -->
    <div v-if="pageLoading" class="settings-skeleton">
      <!-- Tabs skeleton -->
      <div class="skel-tabs">
        <div class="skel skel-tab"/>
        <div class="skel skel-tab"/>
      </div>
      <!-- Grid skeleton -->
      <div class="skel-grid">
        <!-- Colonne avatar -->
        <div class="skel-card">
          <div class="skel skel-avatar"/>
          <div class="skel skel-line" style="width:70%;margin:0 auto"/>
          <div class="skel skel-line" style="width:50%;margin:0 auto"/>
        </div>
        <!-- Colonne form -->
        <div class="skel-card">
          <div class="skel skel-line" style="width:40%"/>
          <div class="skel skel-field"/>
          <div class="skel skel-line" style="width:40%;margin-top:4px"/>
          <div class="skel skel-field"/>
          <div class="skel skel-line" style="width:40%;margin-top:4px"/>
          <div class="skel skel-field"/>
          <div class="skel skel-line" style="width:40%;margin-top:4px"/>
          <div class="skel skel-field"/>
          <div style="display:flex;gap:6px;margin-top:8px">
            <div class="skel skel-tag"/>
            <div class="skel skel-tag"/>
            <div class="skel skel-tag"/>
            <div class="skel skel-tag"/>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ CONTENU ══ -->
    <template v-else>

    <!-- Tabs -->
    <div class="settings-tabs">
      <button
        v-for="t in tabs" :key="t.key"
        class="settings-tab"
        :class="{ active: activeTab === t.key }"
        @click="activeTab = t.key"
      >
        <span v-html="t.icon" class="tab-ico"/>
        {{ t.label }}
      </button>
    </div>

    <!-- ══ ONGLET PROFIL ══ -->
    <Transition name="tab-slide" mode="out-in">
    <div v-if="activeTab === 'profil'" key="profil" class="settings-pane">

      <div class="settings-grid">

        <!-- Avatar -->
        <div class="settings-card avatar-card">
          <div class="avatar-section">
            <div class="user-avatar-big">
              <span>{{ initials }}</span>
            </div>
            <div class="avatar-info">
              <div class="avatar-name">{{ form.name || auth.user?.name || '—' }}</div>
              <div class="avatar-role">{{ auth.user?.role || 'Utilisateur' }}</div>
            </div>
          </div>
        </div>

        <!-- Infos principales -->
        <div class="settings-card">
          <div class="settings-card-ttl">Informations personnelles</div>

          <div class="sf-field">
            <label class="sf-label">Nom complet <span class="req">*</span></label>
            <input v-model="form.name" class="sf-input" placeholder="Ex: Jean Kouassi"/>
          </div>

          <div class="sf-field">
            <label class="sf-label">Adresse email <span class="req">*</span></label>
            <input v-model="form.email" class="sf-input" type="email" placeholder="jean@exemple.com"/>
          </div>

          <div class="sf-field">
            <label class="sf-label">Téléphone</label>
            <input v-model="form.phone" class="sf-input" placeholder="+225 07 00 00 00"/>
          </div>

          <div class="sf-field">
            <label class="sf-label">Site web</label>
            <div class="sf-input-icon-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sf-input-ico"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <input v-model="form.website" class="sf-input sf-input-with-ico" placeholder="https://monsite.com"/>
            </div>
          </div>

          <div class="sf-field">
            <label class="sf-label">Catégorie / Spécialité</label>
            <div class="sf-specialty-hint">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              En choisissant ta spécialité, on te recommande les produits digitaux les plus adaptés à ton domaine.
            </div>
            <div v-if="tagsLoading" class="sf-tag-skel-row">
              <span v-for="n in 5" :key="n" class="sf-tag-skel"/>
            </div>
            <div v-else class="sf-tag-cloud">
              <span
                v-for="tag in allTags" :key="tag.id"
                class="sf-tag"
                :class="{ on: form.tag_id === tag.id }"
                @click="form.tag_id = form.tag_id === tag.id ? null : tag.id"
              >
                {{ form.tag_id === tag.id ? '✓' : '+' }} {{ tag.name }}
              </span>
              <span v-if="allTags.length === 0" style="font-size:12px;color:var(--text5)">Aucun tag disponible</span>
            </div>
          </div>

          <div v-if="profileError" class="sf-alert sf-alert-err">{{ profileError }}</div>
          <div v-if="profileSuccess" class="sf-alert sf-alert-ok">{{ profileSuccess }}</div>

          <div class="sf-actions">
            <button class="sf-btn sf-btn-primary" :disabled="savingProfile" @click="saveProfile">
              <span v-if="savingProfile" class="sf-spinner"/>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Sauvegarder le profil
            </button>
          </div>
        </div>

      </div>
    </div>
    </Transition>

    <!-- ══ ONGLET SÉCURITÉ ══ -->
    <Transition name="tab-slide" mode="out-in">
    <div v-if="activeTab === 'securite'" key="securite" class="settings-pane">

      <div class="settings-grid settings-grid--single">
        <div class="settings-card">
          <div class="settings-card-ttl">Changer le mot de passe</div>
          <div class="sf-hint-block">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Choisis un mot de passe fort d'au moins 8 caractères.
          </div>

          <div class="sf-field">
            <label class="sf-label">Mot de passe actuel <span class="req">*</span></label>
            <div class="sf-pwd-wrap">
              <input v-model="pwd.current" :type="showPwd.current ? 'text' : 'password'" class="sf-input sf-input-pwd" placeholder="••••••••"/>
              <button class="sf-eye" @click="showPwd.current = !showPwd.current" type="button">
                <svg v-if="showPwd.current" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          <div class="sf-field">
            <label class="sf-label">Nouveau mot de passe <span class="req">*</span></label>
            <div class="sf-pwd-wrap">
              <input v-model="pwd.new" :type="showPwd.new ? 'text' : 'password'" class="sf-input sf-input-pwd" placeholder="Min. 8 caractères"/>
              <button class="sf-eye" @click="showPwd.new = !showPwd.new" type="button">
                <svg v-if="showPwd.new" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <!-- Force du mot de passe -->
            <div v-if="pwd.new" class="sf-strength">
              <div class="sf-strength-bars">
                <div class="sf-strength-bar" :class="{ active: pwdStrength >= 1 }"/>
                <div class="sf-strength-bar" :class="{ active: pwdStrength >= 2 }"/>
                <div class="sf-strength-bar" :class="{ active: pwdStrength >= 3 }"/>
                <div class="sf-strength-bar" :class="{ active: pwdStrength >= 4 }"/>
              </div>
              <span class="sf-strength-label" :class="pwdStrengthClass">{{ pwdStrengthLabel }}</span>
            </div>
          </div>

          <div class="sf-field">
            <label class="sf-label">Confirmer le nouveau mot de passe <span class="req">*</span></label>
            <div class="sf-pwd-wrap">
              <input v-model="pwd.confirm" :type="showPwd.confirm ? 'text' : 'password'" class="sf-input sf-input-pwd" :class="{ 'sf-input-err': pwd.confirm && pwd.new !== pwd.confirm }" placeholder="••••••••"/>
              <button class="sf-eye" @click="showPwd.confirm = !showPwd.confirm" type="button">
                <svg v-if="showPwd.confirm" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <div v-if="pwd.confirm && pwd.new !== pwd.confirm" class="sf-field-err">Les mots de passe ne correspondent pas</div>
          </div>

          <div v-if="pwdError"   class="sf-alert sf-alert-err">{{ pwdError }}</div>
          <div v-if="pwdSuccess" class="sf-alert sf-alert-ok">{{ pwdSuccess }}</div>

          <div class="sf-actions">
            <button
              class="sf-btn sf-btn-primary"
              :disabled="savingPwd || !pwd.current || !pwd.new || pwd.new !== pwd.confirm || pwd.new.length < 8"
              @click="savePassword"
            >
              <span v-if="savingPwd" class="sf-spinner"/>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Changer le mot de passe
            </button>
          </div>
        </div>
      </div>

    </div>
    </Transition>

    </template><!-- fin v-else -->

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// ── Tabs ──
const activeTab = ref('profil')
const tabs = [
  {
    key: 'profil', label: 'Profil',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  },
  {
    key: 'securite', label: 'Sécurité',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  },
]

// ── État ──
const pageLoading   = ref(true)
const allTags     = ref([])
const tagsLoading = ref(false)
const savingProfile = ref(false)
const savingPwd     = ref(false)
const profileError   = ref('')
const profileSuccess = ref('')
const pwdError   = ref('')
const pwdSuccess = ref('')

// ── Formulaire profil ──
const form = ref({
  name:    '',
  email:   '',
  phone:   '',
  website: '',
  tag_id:  null,
})

// ── Formulaire mot de passe ──
const pwd = ref({ current: '', new: '', confirm: '' })
const showPwd = ref({ current: false, new: false, confirm: false })

// ── Initiales avatar ──
const initials = computed(() => {
  const name = form.value.name || auth.user?.name || ''
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'KS'
})

// ── Force du mot de passe ──
const pwdStrength = computed(() => {
  const p = pwd.value.new
  if (!p) return 0
  let score = 0
  if (p.length >= 8)  score++
  if (p.length >= 12) score++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return Math.min(score, 4)
})
const pwdStrengthLabel = computed(() => ['', 'Faible', 'Moyen', 'Bon', 'Excellent'][pwdStrength.value])
const pwdStrengthClass = computed(() => ['', 'weak', 'medium', 'good', 'strong'][pwdStrength.value])

// ── Fetch tags ──
async function fetchTags() {
  tagsLoading.value = true
  try {
    const { data } = await api.get('/admin/tags')
    allTags.value = Array.isArray(data) ? data : (data.data ?? [])
  } catch {}
  finally { tagsLoading.value = false }
}

// ── Charger le profil depuis l'API (pas juste le store) ──
async function fetchProfile() {
  try {
    const { data } = await api.get('/admin/profile')
    form.value = {
      name:    data.name    || '',
      email:   data.email   || '',
      phone:   data.phone   || '',
      website: data.website || '',
      tag_id:  data.tag_id  ?? null,
    }
    // Mettre à jour le store aussi
    if (auth.user) Object.assign(auth.user, data)
  } catch {
    // Fallback sur le store si l'API échoue
    const u = auth.user
    if (u) form.value = {
      name:    u.name    || '',
      email:   u.email   || '',
      phone:   u.phone   || '',
      website: u.website || '',
      tag_id:  u.tag_id  ?? null,
    }
  }
}

onMounted(async () => {
  await Promise.all([fetchProfile(), fetchTags()])
  pageLoading.value = false
})

// ── Sauvegarder le profil ──
async function saveProfile() {
  profileError.value   = ''
  profileSuccess.value = ''
  if (!form.value.name.trim() || !form.value.email.trim()) {
    profileError.value = 'Le nom et l\'email sont obligatoires.'; return
  }
  savingProfile.value = true
  try {
    const { data } = await api.put('/admin/profile', {
      name:    form.value.name,
      email:   form.value.email,
      phone:   form.value.phone   || null,
      website: form.value.website || null,
      tag_id:  form.value.tag_id  ?? null,
    })
    // Mettre à jour le store auth si possible
    if (auth.user) Object.assign(auth.user, data)
    profileSuccess.value = '✓ Profil mis à jour avec succès'
    setTimeout(() => { profileSuccess.value = '' }, 3500)
  } catch (e) {
    if (e.response?.status === 422) {
      profileError.value = Object.values(e.response.data.errors).flat().join(' — ')
    } else {
      profileError.value = 'Une erreur est survenue.'
    }
  } finally {
    savingProfile.value = false
  }
}

// ── Changer le mot de passe ──
async function savePassword() {
  pwdError.value   = ''
  pwdSuccess.value = ''
  if (pwd.value.new !== pwd.value.confirm) {
    pwdError.value = 'Les mots de passe ne correspondent pas.'; return
  }
  if (pwd.value.new.length < 8) {
    pwdError.value = 'Le mot de passe doit faire au moins 8 caractères.'; return
  }
  savingPwd.value = true
  try {
    await api.put('/admin/profile/password', {
      current_password:      pwd.value.current,
      password:              pwd.value.new,
      password_confirmation: pwd.value.confirm,
    })
    pwdSuccess.value = '✓ Mot de passe changé avec succès'
    pwd.value = { current: '', new: '', confirm: '' }
    setTimeout(() => { pwdSuccess.value = '' }, 3500)
  } catch (e) {
    if (e.response?.status === 422) {
      pwdError.value = Object.values(e.response.data.errors).flat().join(' — ')
    } else if (e.response?.status === 403) {
      pwdError.value = 'Mot de passe actuel incorrect.'
    } else {
      pwdError.value = 'Une erreur est survenue.'
    }
  } finally {
    savingPwd.value = false
  }
}
</script>

<style scoped>
/* ══ SKELETON LOADER ══ */
.settings-skeleton { display:flex; flex-direction:column; gap:20px; }
.skel-tabs { display:flex; gap:8px; border-bottom:1px solid var(--border); padding-bottom:1px; }
.skel-grid { display:grid; grid-template-columns:220px 1fr; gap:20px; }
.skel-card { background:var(--surface); border:1.5px solid var(--border); border-radius:14px; padding:22px; display:flex; flex-direction:column; gap:14px; }
.skel { background:var(--surface2); border-radius:6px; animation:skpulse .9s ease-in-out infinite alternate; }
.skel-tab    { height:38px; width:90px; border-radius:8px; }
.skel-avatar { width:72px; height:72px; border-radius:50%; align-self:center; }
.skel-line   { height:12px; border-radius:4px; }
.skel-field  { height:40px; border-radius:8px; }
.skel-tag    { height:26px; width:70px; border-radius:20px; }
@keyframes skpulse { from{opacity:.4} to{opacity:.9} }

/* ══ SHELL ══ */
.settings-wrap { padding-bottom: 60px; max-width: 820px; }

/* ══ HEADER ══ */
.settings-header { margin-bottom: 28px; }
.settings-title  { font-family:var(--font-alt); font-size:22px; font-weight:800; color:var(--text); margin-bottom:4px; }
.settings-sub    { font-size:13.5px; color:var(--text3); }

/* ══ TABS ══ */
.settings-tabs { display:flex; gap:4px; margin-bottom:28px; border-bottom:1px solid var(--border); }
.settings-tab  {
  display:flex; align-items:center; gap:7px;
  padding:10px 18px; font-size:13.5px; font-weight:600;
  color:var(--text3); background:none; border:none;
  border-bottom:2px solid transparent; margin-bottom:-1px;
  cursor:pointer; transition:all .15s;
}
.settings-tab:hover { color:var(--text); }
.settings-tab.active { color:var(--text); border-bottom-color:var(--text); }
.tab-ico { display:flex; opacity:.7; }
.settings-tab.active .tab-ico { opacity:1; }

/* ══ PANE ══ */
.settings-pane { animation:fadeIn .2s ease; }
@keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }

/* ══ GRID ══ */
.settings-grid { display:grid; grid-template-columns:220px 1fr; gap:20px; align-items:start; }
.settings-grid--single { grid-template-columns:1fr; max-width:520px; }

/* ══ CARDS ══ */
.settings-card { background:var(--surface); border:1.5px solid var(--border); border-radius:14px; padding:22px; display:flex; flex-direction:column; gap:16px; }
.settings-card-ttl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color:var(--text4); font-family:monospace; }

/* ══ AVATAR CARD ══ */
.avatar-card { align-items:center; text-align:center; padding:28px 20px; }
.avatar-section { display:flex; flex-direction:column; align-items:center; gap:14px; }
.user-avatar-big {
  width:72px; height:72px; border-radius:50%;
  background:var(--text); color:var(--surface);
  display:flex; align-items:center; justify-content:center;
  font-size:22px; font-weight:800; font-family:monospace;
  box-shadow:0 4px 16px rgba(0,0,0,.12);
}
.avatar-name { font-size:15px; font-weight:700; color:var(--text); }
.avatar-role { font-size:12px; color:var(--text4); text-transform:capitalize; margin-top:2px; }

/* ══ FIELDS ══ */
.sf-field { display:flex; flex-direction:column; gap:6px; }
.sf-label { font-size:11.5px; font-weight:700; color:var(--text3); text-transform:uppercase; letter-spacing:.4px; font-family:monospace; }
.req { color:#ef4444; }
.sf-input {
  padding:9px 12px; border:1.5px solid var(--border); border-radius:8px;
  background:var(--surface); color:var(--text); font-size:13.5px;
  font-family:inherit; width:100%; transition:all .18s;
}
.sf-input:focus { outline:none; border-color:var(--text); box-shadow:0 0 0 3px rgba(0,0,0,.05); }
.sf-input-err { border-color:#ef4444 !important; }

/* Icône dans l'input */
.sf-input-icon-wrap { position:relative; }
.sf-input-ico { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--text4); pointer-events:none; }
.sf-input-with-ico { padding-left:34px; }

/* ══ MOT DE PASSE ══ */
.sf-pwd-wrap { position:relative; }
.sf-input-pwd { padding-right:38px; }
.sf-eye {
  position:absolute; right:10px; top:50%; transform:translateY(-50%);
  background:none; border:none; color:var(--text4); cursor:pointer; padding:2px;
  display:flex; align-items:center; transition:color .15s;
}
.sf-eye:hover { color:var(--text); }
.sf-field-err { font-size:11.5px; color:#ef4444; }

/* ══ FORCE MOT DE PASSE ══ */
.sf-strength { display:flex; align-items:center; gap:8px; margin-top:4px; }
.sf-strength-bars { display:flex; gap:3px; }
.sf-strength-bar  { width:36px; height:4px; border-radius:2px; background:var(--border2); transition:background .2s; }
.sf-strength-bar.active { background:var(--text); }
.sf-strength-label { font-size:11.5px; font-weight:600; }
.sf-strength-label.weak   { color:#ef4444; }
.sf-strength-label.medium { color:#f97316; }
.sf-strength-label.good   { color:#eab308; }
.sf-strength-label.strong { color:#16a34a; }

/* ══ HINT BLOCK ══ */
.sf-hint-block { display:flex; align-items:center; gap:8px; padding:10px 14px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; font-size:13px; color:#0369a1; }
[data-theme="dark"] .sf-hint-block { background:rgba(3,105,161,.1); border-color:rgba(3,105,161,.3); color:#38bdf8; }

/* ══ ALERTS ══ */
.sf-alert { padding:10px 14px; border-radius:8px; font-size:13px; font-weight:500; }
.sf-alert-err { background:#fef2f2; border:1px solid #fecaca; color:#dc2626; }
.sf-alert-ok  { background:#f0fdf4; border:1px solid #bbf7d0; color:#15803d; }

/* ══ SPECIALTY HINT ══ */
.sf-specialty-hint {
  display:flex; align-items:flex-start; gap:7px;
  padding:9px 12px; border-radius:8px;
  background:linear-gradient(135deg, #fffbeb, #fef9c3);
  border:1px solid #fde68a;
  font-size:12.5px; color:#92400e; line-height:1.5;
  font-weight:500;
}
[data-theme="dark"] .sf-specialty-hint {
  background:rgba(234,179,8,.08);
  border-color:rgba(234,179,8,.25);
  color:#fbbf24;
}
.sf-specialty-hint svg { flex-shrink:0; margin-top:1px; color:#f59e0b; }

/* ══ TAGS ══ */
.sf-tag-cloud { display:flex; flex-wrap:wrap; gap:6px; }
.sf-tag { display:inline-flex; align-items:center; padding:4px 10px; border-radius:20px; background:var(--surface2); color:var(--text3); border:1px solid var(--border); font-size:12px; font-weight:500; cursor:pointer; transition:all .12s; }
.sf-tag:hover { border-color:var(--text3); color:var(--text); }
.sf-tag.on    { background:var(--text); color:var(--surface); border-color:var(--text); }
.sf-tag-skel-row { display:flex; flex-wrap:wrap; gap:5px; }
.sf-tag-skel     { height:26px; width:70px; border-radius:20px; background:var(--surface2); animation:pulse .9s ease-in-out infinite alternate; }
@keyframes pulse { from{opacity:.5} to{opacity:1} }

/* ══ ACTIONS ══ */
.sf-actions { display:flex; justify-content:flex-end; padding-top:4px; }
.sf-btn { display:flex; align-items:center; gap:7px; padding:10px 20px; border-radius:9px; font-size:13.5px; font-weight:700; cursor:pointer; border:none; transition:all .15s; }
.sf-btn-primary { background:var(--text); color:var(--surface); }
.sf-btn-primary:hover:not(:disabled) { opacity:.85; transform:translateY(-1px); }
.sf-btn-primary:disabled { opacity:.35; cursor:not-allowed; }
.sf-spinner { width:13px; height:13px; border-radius:50%; border:2px solid rgba(255,255,255,.25); border-top-color:#fff; animation:spin .7s linear infinite; }
@keyframes spin { to { transform:rotate(360deg) } }

/* ══ TRANSITION ══ */
.tab-slide-enter-active { transition:all .22s ease; }
.tab-slide-leave-active { transition:all .15s ease; }
.tab-slide-enter-from   { opacity:0; transform:translateX(10px); }
.tab-slide-leave-to     { opacity:0; transform:translateX(-10px); }

/* ══ RESPONSIVE ══ */
@media (max-width: 680px) {
  .settings-grid { grid-template-columns:1fr; }
  .avatar-card   { flex-direction:row; text-align:left; padding:18px; }
  .avatar-section { flex-direction:row; }
}
</style>