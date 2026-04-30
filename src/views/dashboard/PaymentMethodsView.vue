<template>
  <div>
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:16px">
      <div>
        <div style="font-family:var(--font-alt);font-size:20px;font-weight:700;color:var(--text)">Moyens de paiement</div>
        <div style="font-size:13px;color:var(--text3);margin-top:3px">
          {{ paymentMethods.length }} moyen{{ paymentMethods.length !== 1 ? 's' : '' }} configuré{{ paymentMethods.length !== 1 ? 's' : '' }}
        </div>
      </div>
      <button class="btn btn-primary" @click="openModal()">+ Nouveau moyen</button>
    </div>

    <!-- Filtres -->
    <div class="card" style="overflow:hidden">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);background:var(--surface2);display:flex;gap:8px;flex-wrap:wrap">
        <input
          v-model="search"
          class="form-input"
          style="max-width:220px;padding:7px 12px"
          placeholder="Rechercher..."
        />
        <select v-model="filterCountry" class="form-input" style="max-width:180px;padding:7px 12px">
          <option value="">Tous les pays</option>
          <option v-for="c in countries" :key="c.id" :value="c.id">
            {{ c.flag_emoji }} {{ c.name }}
          </option>
        </select>
      </div>

      <!-- Skeleton -->
      <table v-if="loading" style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid var(--border)">
            <th class="th">Nom</th>
            <th class="th">Pays</th>
            <th class="th">Taux</th>
            <th class="th">Devise</th>
            <th class="th">Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 4" :key="n" style="border-bottom:1px solid var(--border2)">
            <td style="padding:11px 16px"><div style="display:flex;align-items:center;gap:9px"><div class="skel" style="width:32px;height:32px;border-radius:8px"/><div class="skel" style="width:110px;height:13px;border-radius:4px"/></div></td>
            <td style="padding:11px 16px"><div class="skel" style="width:80px;height:22px;border-radius:20px"/></td>
            <td style="padding:11px 16px"><div class="skel" style="width:48px;height:13px;border-radius:4px"/></td>
            <td style="padding:11px 16px"><div class="skel" style="width:48px;height:13px;border-radius:4px"/></td>
            <td style="padding:11px 16px"><div class="skel" style="width:50px;height:22px;border-radius:20px"/></td>
            <td style="padding:11px 16px"><div class="skel" style="width:28px;height:28px;border-radius:6px"/></td>
          </tr>
        </tbody>
      </table>

      <!-- Error -->
      <div v-else-if="error" style="text-align:center;padding:40px">
        <div style="font-size:28px;margin-bottom:8px">⚠️</div>
        <div style="font-size:14px;color:var(--text3);margin-bottom:16px">{{ error }}</div>
        <button class="btn btn-secondary btn-sm" @click="fetchAll">Réessayer</button>
      </div>

      <!-- Empty -->
      <div v-else-if="filtered.length === 0" style="text-align:center;padding:48px">
        <div style="font-size:32px;margin-bottom:10px">💳</div>
        <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px">Aucun moyen de paiement</div>
        <div style="font-size:13px;color:var(--text3)">{{ search ? 'Essaie un autre terme.' : 'Commence par en ajouter un.' }}</div>
      </div>

      <!-- Table -->
      <table v-else style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid var(--border)">
            <th class="th">Nom</th>
            <th class="th">Pays</th>
            <th class="th">Taux</th>
            <th class="th">Devise</th>
            <th class="th">Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pm in filtered" :key="pm.id"
            style="border-bottom:1px solid var(--border2);transition:background .08s"
            @mouseover="e => e.currentTarget.style.background = 'var(--surface2)'"
            @mouseleave="e => e.currentTarget.style.background = ''"
          >
            <!-- Nom + logo -->
            <td style="padding:11px 16px">
              <div style="display:flex;align-items:center;gap:10px">
                <img v-if="pm.logo" :src="pm.logo" :alt="pm.name" style="width:32px;height:32px;object-fit:contain;border-radius:8px;border:1px solid var(--border)"/>
                <div v-else style="width:32px;height:32px;border-radius:8px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:16px">💳</div>
                <div>
                  <div style="font-size:13px;font-weight:600;color:var(--text)">{{ pm.name }}</div>
                  <div v-if="pm.description" style="font-size:11px;color:var(--text5);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ pm.description }}</div>
                </div>
              </div>
            </td>

            <!-- Pays -->
            <td style="padding:11px 16px">
              <span v-if="pm.country" style="display:flex;align-items:center;gap:5px;font-size:13px;color:var(--text2)">
                <span>{{ pm.country.flag_emoji || '🌍' }}</span>
                <span>{{ pm.country.name }}</span>
              </span>
              <span v-else style="font-size:12px;color:var(--text5)">—</span>
            </td>

            <!-- Taux -->
            <td style="padding:11px 16px;font-size:13px;color:var(--text2);font-family:var(--font-mono)">
              {{ pm.taux }}%
            </td>

            <!-- Devise -->
            <td style="padding:11px 16px;font-size:13px;color:var(--text3);font-family:var(--font-mono)">
              {{ pm.currency || '—' }}
            </td>

            <!-- Statut -->
            <td style="padding:11px 16px">
              <button
                class="badge"
                :class="pm.is_active ? 'badge-green' : 'badge-gray'"
                style="cursor:pointer;border:none;font-size:11px"
                @click="toggleActive(pm)"
              >
                {{ pm.is_active ? 'Actif' : 'Inactif' }}
              </button>
            </td>

            <!-- Actions -->
            <td style="padding:11px 16px">
              <div style="display:flex;gap:4px">
                <button class="btn btn-icon btn-ghost btn-sm" v-html="ICONS.edit" @click="openModal(pm)"/>
                <button class="btn btn-icon btn-ghost btn-sm" v-html="ICONS.trash" style="color:var(--text4)" @click="confirmDelete(pm)"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ══ MODAL Créer / Modifier ══ -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-box">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <div style="font-size:15px;font-weight:700;color:var(--text)">
            {{ isEdit ? 'Modifier le moyen de paiement' : 'Nouveau moyen de paiement' }}
          </div>
          <button class="btn btn-icon btn-ghost btn-sm" @click="closeModal">✕</button>
        </div>

        <!-- Nom -->
        <div class="form-group">
          <label class="form-label">Nom <span class="req">*</span></label>
          <input v-model="form.name" class="form-input" placeholder="Orange Money"/>
        </div>

        <!-- Pays -->
        <div class="form-group">
          <label class="form-label">Pays</label>
          <select v-model="form.country_id" class="form-input">
            <option :value="null">— Aucun pays —</option>
            <option v-for="c in countries" :key="c.id" :value="c.id">
              {{ c.flag_emoji }} {{ c.name }}
            </option>
          </select>
        </div>

        <!-- Taux + Devise -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="form-group">
            <label class="form-label">Taux de commission (%)</label>
            <input v-model="form.taux" class="form-input" type="number" min="0" max="100" step="0.01" placeholder="2.50"/>
          </div>
          <div class="form-group">
            <label class="form-label">Devise</label>
            <input
              v-model="form.currency"
              class="form-input"
              placeholder="FCFA"
              maxlength="10"
              @input="form.currency = form.currency.toUpperCase()"
            />
          </div>
        </div>

        <!-- Description -->
        <div class="form-group">
          <label class="form-label">Description / instructions</label>
          <input v-model="form.description" class="form-input" placeholder="Ex: Paiement via l'application Orange Money"/>
        </div>

        <!-- Logo -->
        <div class="form-group">
          <label class="form-label">Logo <span style="font-size:10px;color:var(--text5);font-weight:400">(S3 — PNG, JPG, SVG)</span></label>
          <input ref="logoFileRef" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" style="display:none" @change="onLogoChange"/>
          <div style="display:flex;align-items:center;gap:10px">
            <button type="button" class="btn btn-secondary btn-sm" @click="logoFileRef.click()">📁 Choisir</button>
            <span style="font-size:12px;color:var(--text4)">{{ logoFile ? logoFile.name : (form.logo ? 'Logo existant' : 'Aucun') }}</span>
            <img v-if="logoPreview || form.logo" :src="logoPreview || form.logo" style="height:32px;border-radius:6px;border:1px solid var(--border);object-fit:contain"/>
          </div>
        </div>

        <!-- Actif -->
        <div class="form-group">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;font-weight:500;color:var(--text2)">
            <input type="checkbox" v-model="form.is_active" style="cursor:pointer"/>
            Moyen de paiement actif
          </label>
        </div>

        <div v-if="formError" style="font-size:12.5px;color:#ef4444;margin-bottom:12px;padding:8px 12px;background:#fef2f2;border-radius:6px;border:1px solid #fecaca">
          {{ formError }}
        </div>

        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px">
          <button class="btn btn-ghost btn-sm" @click="closeModal">Annuler</button>
          <button class="btn btn-primary btn-sm" :disabled="saving" @click="save">
            {{ saving ? 'Enregistrement...' : (isEdit ? '💾 Mettre à jour' : '+ Créer') }}
          </button>
        </div>
      </div>
    </div>

    <!-- ══ MODAL Suppression ══ -->
    <div v-if="toDelete" class="modal-overlay" @click.self="toDelete = null">
      <div class="modal-box" style="max-width:360px">
        <div style="font-size:24px;margin-bottom:10px;text-align:center">🗑️</div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;text-align:center">Supprimer ?</div>
        <div style="font-size:13px;color:var(--text3);margin-bottom:20px;text-align:center">
          « {{ toDelete.name }} » sera supprimé définitivement.
        </div>
        <div style="display:flex;gap:8px;justify-content:center">
          <button class="btn btn-ghost btn-sm" @click="toDelete = null">Annuler</button>
          <button class="btn btn-danger btn-sm" :disabled="deleting" @click="deletepm">
            {{ deleting ? 'Suppression...' : 'Supprimer' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import { ICONS } from '@/composables/icons'

// ── État ──
const paymentMethods = ref([])
const countries      = ref([])
const loading        = ref(true)
const error          = ref(null)
const search         = ref('')
const filterCountry  = ref('')
const showModal      = ref(false)
const saving         = ref(false)
const formError      = ref(null)
const toDelete       = ref(null)
const deleting       = ref(false)
const editId         = ref(null)

// ── Fichiers ──
const logoFileRef = ref(null)
const logoFile    = ref(null)
const logoPreview = ref(null)

function onLogoChange(e) {
  const f = e.target.files[0]
  if (!f) return
  logoFile.value    = f
  logoPreview.value = URL.createObjectURL(f)
}
function onDocChange(e) {
  const f = e.target.files[0]
  if (!f) return
  docFile.value = f
}

// ── Form ──
const form = ref(emptyForm())

function emptyForm() {
  return {
    name: '', country_id: null, taux: 0, currency: 'FCFA',
    logo: '', description: '', is_active: true,
  }
}

// ── Computed ──
const isEdit = computed(() => !!editId.value)

const filtered = computed(() => {
  let list = paymentMethods.value
  if (filterCountry.value) list = list.filter(p => p.country_id == filterCountry.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q))
  }
  return list
})

// ── Fetch ──
async function fetchAll() {
  loading.value = true
  error.value   = null
  try {
    const [pmRes, cRes] = await Promise.all([
      api.get('/admin/payment-methods'),
      api.get('/admin/countries'),
    ])
    paymentMethods.value = Array.isArray(pmRes.data) ? pmRes.data : (pmRes.data.data ?? [])
    countries.value      = Array.isArray(cRes.data)  ? cRes.data  : (cRes.data.data  ?? [])
  } catch {
    error.value = 'Impossible de charger les données.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchAll)

// ── Modal ──
function openModal(pm = null) {
  formError.value   = null
  logoFile.value    = null
  logoPreview.value = null
  if (pm) {
    editId.value = pm.id
    form.value = {
      name:        pm.name        || '',
      country_id:  pm.country_id  ?? null,
      taux:        pm.taux        ?? 0,
      currency:    pm.currency    || 'FCFA',
      logo:        pm.logo        || '',
      description: pm.description || '',
      is_active:   !!pm.is_active,
    }
  } else {
    editId.value = null
    form.value   = emptyForm()
  }
  showModal.value = true
}

function closeModal() {
  showModal.value   = false
  editId.value      = null
  form.value        = emptyForm()
  formError.value   = null
  logoFile.value    = null
  logoPreview.value = null
}

// ── Save ──
async function save() {
  formError.value = null
  if (!form.value.name.trim()) {
    formError.value = 'Le nom est obligatoire.'; return
  }

  saving.value = true
  try {
    const fd = new FormData()
    fd.append('name',        form.value.name)
    fd.append('country_id',  form.value.country_id ?? '')
    fd.append('taux',        form.value.taux ?? 0)
    fd.append('currency',    form.value.currency || 'FCFA')
    fd.append('description', form.value.description || '')
    fd.append('is_active',   form.value.is_active ? 1 : 0)
    if (logoFile.value) fd.append('logo', logoFile.value)

    const url = isEdit.value
      ? `/admin/payment-methods/${editId.value}`
      : '/admin/payment-methods'

    const { data } = await api.post(url, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (isEdit.value) {
      const idx = paymentMethods.value.findIndex(p => p.id === editId.value)
      if (idx !== -1) paymentMethods.value[idx] = data
    } else {
      paymentMethods.value.unshift(data)
    }

    closeModal()
  } catch (e) {
    if (e.response?.status === 422) {
      formError.value = Object.values(e.response.data.errors).flat().join(' — ')
    } else {
      formError.value = 'Une erreur est survenue.'
    }
  } finally {
    saving.value = false
  }
}

// ── Toggle actif ──
async function toggleActive(pm) {
  try {
    const { data } = await api.patch(`/admin/payment-methods/${pm.id}`, {
      is_active: pm.is_active ? 0 : 1,
    })
    const idx = paymentMethods.value.findIndex(p => p.id === pm.id)
    if (idx !== -1) paymentMethods.value[idx] = data
  } catch (e) { console.error(e) }
}

// ── Suppression ──
function confirmDelete(pm) { toDelete.value = pm }

async function deletepm() {
  if (!toDelete.value) return
  deleting.value = true
  try {
    await api.delete(`/admin/payment-methods/${toDelete.value.id}`)
    paymentMethods.value = paymentMethods.value.filter(p => p.id !== toDelete.value.id)
    toDelete.value = null
  } catch { alert('Erreur lors de la suppression.') }
  finally { deleting.value = false }
}
</script>

<style scoped>
.th { padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px }
.badge-gray { background:var(--surface2);color:var(--text4) }
.skel { background:var(--surface2);animation:pulse .9s ease-in-out infinite alternate }
@keyframes pulse { from{opacity:.5} to{opacity:1} }
.modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:100 }
.modal-box { background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px 28px;width:100%;max-width:500px;box-shadow:0 20px 60px rgba(0,0,0,.2);max-height:90vh;overflow-y:auto }
.form-group { margin-bottom:14px }
.form-label { display:block;font-size:12px;font-weight:600;color:var(--text3);margin-bottom:6px }
.req { color:#ef4444 }
</style>