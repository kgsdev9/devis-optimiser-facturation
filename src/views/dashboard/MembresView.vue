<template>
  <div>
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:16px">
      <div>
        <div style="font-family:var(--font-alt);font-size:20px;font-weight:700;color:var(--text)">Membres</div>
        <div style="font-size:13px;color:var(--text3);margin-top:3px">
          {{ members.length }} membre{{ members.length !== 1 ? 's' : '' }} inscrits
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-secondary" @click="exportCSV">Exporter CSV</button>
        <button class="btn btn-primary" @click="openModal()">
          + Nouveau membre
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="card" style="overflow:hidden">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;gap:8px;background:var(--surface2)">
        <input
          v-model="search"
          class="form-input"
          style="max-width:280px;padding:7px 12px"
          placeholder="Rechercher un membre..."
        />
      </div>

      <!-- Loading skeleton -->
      <table v-if="loading" style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid var(--border)">
            <th style="padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Membre</th>
            <th style="padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Tag</th>
            <th style="padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Inscrit le</th>
            <th style="padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n" style="border-bottom:1px solid var(--border2)">
            <td style="padding:11px 16px">
              <div style="display:flex;align-items:center;gap:9px">
                <div class="skel" style="width:32px;height:32px;border-radius:50%"/>
                <div>
                  <div class="skel" style="width:130px;height:13px;border-radius:4px;margin-bottom:6px"/>
                  <div class="skel" style="width:160px;height:11px;border-radius:4px"/>
                </div>
              </div>
            </td>
            <td style="padding:11px 16px"><div class="skel" style="width:60px;height:22px;border-radius:20px"/></td>
            <td style="padding:11px 16px"><div class="skel" style="width:80px;height:13px;border-radius:4px"/></td>
            <td style="padding:11px 16px"><div class="skel" style="width:50px;height:22px;border-radius:20px"/></td>
            <td style="padding:11px 16px"><div class="skel" style="width:28px;height:28px;border-radius:6px"/></td>
          </tr>
        </tbody>
      </table>

      <!-- Error -->
      <div v-else-if="error" style="text-align:center;padding:40px">
        <div style="font-size:28px;margin-bottom:8px">⚠️</div>
        <div style="font-size:14px;color:var(--text3);margin-bottom:16px">{{ error }}</div>
        <button class="btn btn-secondary btn-sm" @click="fetchMembers">Réessayer</button>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredMembers.length === 0" style="text-align:center;padding:48px">
        <div style="font-size:32px;margin-bottom:10px">👤</div>
        <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px">Aucun membre trouvé</div>
        <div style="font-size:13px;color:var(--text3)">
          {{ search ? 'Essaie un autre terme de recherche.' : 'Commence par ajouter un membre.' }}
        </div>
      </div>

      <!-- Table -->
      <table v-else style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid var(--border)">
            <th style="padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Membre</th>
            <th style="padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Tag</th>
            <th style="padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Inscrit le</th>
            <th style="padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="m in filteredMembers" :key="m.id"
            style="border-bottom:1px solid var(--border2);transition:background .08s"
            @mouseover="e => e.currentTarget.style.background = 'var(--hover)'"
            @mouseleave="e => e.currentTarget.style.background = ''"
          >
            <!-- Membre -->
            <td style="padding:11px 16px">
              <div style="display:flex;align-items:center;gap:9px">
                <div class="avatar avatar-sm">
                  <img v-if="m.avatar" :src="m.avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>
                  <span v-else>{{ initials(m.name) }}</span>
                </div>
                <div>
                  <div style="font-size:13px;font-weight:500;color:var(--text)">{{ m.name }}</div>
                  <div style="font-size:11.5px;color:var(--text4)">{{ m.email }}</div>
                  <div v-if="m.phone" style="font-size:11px;color:var(--text5)">{{ m.phone }}</div>
                </div>
              </div>
            </td>

            <!-- Tag -->
            <td style="padding:11px 16px">
              <span v-if="m.tag" class="tag">{{ m.tag.name }}</span>
              <span v-else style="font-size:12px;color:var(--text5)">—</span>
            </td>

            <!-- Date -->
            <td style="padding:11px 16px;font-size:13px;color:var(--text3)">
              {{ formatDate(m.created_at) }}
            </td>

            <!-- Statut -->
            <td style="padding:11px 16px">
              <span class="badge badge-green" style="font-size:11px">Actif</span>
            </td>

            <!-- Actions -->
            <td style="padding:11px 16px">
              <div style="display:flex;gap:4px">
                <button
                  class="btn btn-icon btn-ghost btn-sm"
                  v-html="ICONS.edit"
                  @click="openModal(m)"
                />
                <button
                  class="btn btn-icon btn-ghost btn-sm"
                  v-html="ICONS.trash"
                  style="color:var(--text4)"
                  @click="confirmDelete(m)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ══════════════════════════════
         MODAL Créer / Modifier
         ══════════════════════════════ -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-box">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <div style="font-size:15px;font-weight:700;color:var(--text)">
            {{ isEdit ? 'Modifier le membre' : 'Nouveau membre' }}
          </div>
          <button class="btn btn-icon btn-ghost btn-sm" @click="closeModal">✕</button>
        </div>

        <div class="form-group">
          <label class="form-label">Nom <span class="req">*</span></label>
          <input v-model="form.name" class="form-input" placeholder="Nom complet"/>
        </div>

        <div class="form-group">
          <label class="form-label">Email <span class="req">*</span></label>
          <input v-model="form.email" class="form-input" type="email" placeholder="email@exemple.com"/>
        </div>

        <div class="form-group">
          <label class="form-label">
            {{ isEdit ? 'Nouveau mot de passe' : 'Mot de passe' }}
            <span v-if="!isEdit" class="req">*</span>
          </label>
          <input v-model="form.password" class="form-input" type="password" :placeholder="isEdit ? 'Laisser vide pour ne pas changer' : 'Mot de passe'"/>
        </div>

        <div class="form-group">
          <label class="form-label">Téléphone</label>
          <input v-model="form.phone" class="form-input" placeholder="+237 6XX XXX XXX"/>
        </div>

        <!-- Tags dynamiques -->
        <div class="form-group">
          <label class="form-label">
            Tag
            <span v-if="tagsLoading" style="font-size:10px;color:var(--text5);font-style:italic;font-weight:400;margin-left:6px">chargement…</span>
          </label>
          <div v-if="tagsLoading" class="tags-skeleton">
            <span v-for="n in 5" :key="n" class="tag tag-skeleton"/>
          </div>
          <div v-else class="suggested-tags">
            <span
              v-for="tag in allTags" :key="tag.id"
              class="tag"
              :class="{ 'tag-selected': form.tag_id === tag.id }"
              style="cursor:pointer"
              @click="form.tag_id = form.tag_id === tag.id ? null : tag.id"
            >
              {{ form.tag_id === tag.id ? '✓' : '+' }} {{ tag.name }}
            </span>
            <span v-if="allTags.length === 0" style="font-size:12px;color:var(--text5)">Aucun tag disponible</span>
          </div>
        </div>

        <!-- Avatar URL -->
        <div class="form-group">
          <label class="form-label">Avatar (URL)</label>
          <input v-model="form.avatar" class="form-input" placeholder="https://..."/>
        </div>

        <!-- Cover URL -->
        <div class="form-group">
          <label class="form-label">Image de couverture (URL)</label>
          <input v-model="form.cover" class="form-input" placeholder="https://..."/>
        </div>

        <div v-if="formError" style="font-size:12.5px;color:#ef4444;margin-bottom:12px;padding:8px 12px;background:#fef2f2;border-radius:6px;border:1px solid #fecaca">
          {{ formError }}
        </div>

        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px">
          <button class="btn btn-ghost btn-sm" @click="closeModal">Annuler</button>
          <button class="btn btn-primary btn-sm" :disabled="saving" @click="saveMember">
            {{ saving ? 'Enregistrement...' : (isEdit ? '💾 Mettre à jour' : '+ Créer') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal suppression -->
    <div v-if="toDelete" class="modal-overlay" @click.self="toDelete = null">
      <div class="modal-box" style="max-width:360px">
        <div style="font-size:24px;margin-bottom:10px;text-align:center">🗑️</div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;text-align:center">Supprimer le membre ?</div>
        <div style="font-size:13px;color:var(--text3);margin-bottom:20px;text-align:center">
          « {{ toDelete.name }} » sera supprimé définitivement.
        </div>
        <div style="display:flex;gap:8px;justify-content:center">
          <button class="btn btn-ghost btn-sm" @click="toDelete = null">Annuler</button>
          <button class="btn btn-danger btn-sm" :disabled="deleting" @click="deleteMember">
            {{ deleting ? 'Suppression...' : 'Supprimer' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import API from '@/services/api'
import { ICONS } from '@/composables/icons'

ICONS.moreH = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>`


// ── État ──
const members    = ref([])
const allTags    = ref([])
const loading    = ref(true)
const tagsLoading = ref(false)
const error      = ref(null)
const search     = ref('')
const showModal  = ref(false)
const saving     = ref(false)
const formError  = ref(null)
const toDelete   = ref(null)
const deleting   = ref(false)
const editId     = ref(null)

const form = ref(emptyForm())

function emptyForm() {
  return {
    name:     '',
    email:    '',
    password: '',
    phone:    '',
    avatar:   '',
    cover:    '',
    tag_id:   null,
  }
}

// ── Computed ──
const isEdit = computed(() => !!editId.value)

const filteredMembers = computed(() => {
  if (!search.value.trim()) return members.value
  const q = search.value.toLowerCase()
  return members.value.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.email.toLowerCase().includes(q)
  )
})

// ── Fetch membres ──
async function fetchMembers() {
  loading.value = true
  error.value   = null
  try {
    const { data } = await API.get('/admin/users')
    members.value = Array.isArray(data) ? data : (data.data ?? [])
  } catch (e) {
    error.value = 'Impossible de charger les membres.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

// ── Fetch tags ──
async function fetchTags() {
  tagsLoading.value = true
  try {
    const { data } = await API.get('/admin/tags')
    allTags.value = Array.isArray(data) ? data : (data.data ?? [])
  } catch (e) {
    console.error('fetchTags:', e)
  } finally {
    tagsLoading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchMembers(), fetchTags()])
})

// ── Modal ──
function openModal(member = null) {
  formError.value = null
  if (member) {
    editId.value = member.id
    form.value = {
      name:     member.name     || '',
      email:    member.email    || '',
      password: '',
      phone:    member.phone    || '',
      avatar:   member.avatar   || '',
      cover:    member.cover    || '',
      tag_id:   member.tag_id   ?? null,
    }
  } else {
    editId.value = null
    form.value = emptyForm()
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editId.value    = null
  form.value      = emptyForm()
  formError.value = null
}

// ── Save POST / PUT ──
async function saveMember() {
  formError.value = null

  if (!form.value.name.trim() || !form.value.email.trim()) {
    formError.value = 'Le nom et l\'email sont obligatoires.'
    return
  }
  if (!isEdit.value && !form.value.password.trim()) {
    formError.value = 'Le mot de passe est obligatoire pour un nouveau membre.'
    return
  }

  saving.value = true
  try {
    const payload = {
      name:   form.value.name,
      email:  form.value.email,
      phone:  form.value.phone  || null,
      avatar: form.value.avatar || null,
      cover:  form.value.cover  || null,
      tag_id: form.value.tag_id || null,
    }
    if (form.value.password.trim()) {
      payload.password = form.value.password
    }

    if (isEdit.value) {
      const { data } = await API.put(`/admin/users/${editId.value}`, payload)
      const idx = members.value.findIndex(m => m.id === editId.value)
      if (idx !== -1) members.value[idx] = data
    } else {
      const { data } = await API.post('/admin/users', payload)
      members.value.unshift(data)
    }

    closeModal()
  } catch (e) {
    console.error(e)
    if (e.response?.status === 422) {
      const errors = e.response.data.errors
      formError.value = Object.values(errors).flat().join(' — ')
    } else {
      formError.value = 'Une erreur est survenue.'
    }
  } finally {
    saving.value = false
  }
}

// ── Suppression ──
function confirmDelete(member) {
  toDelete.value = member
}

async function deleteMember() {
  if (!toDelete.value) return
  deleting.value = true
  try {
    await API.delete(`/admin/users/${toDelete.value.id}`)
    members.value = members.value.filter(m => m.id !== toDelete.value.id)
    toDelete.value = null
  } catch (e) {
    console.error(e)
    alert('Erreur lors de la suppression.')
  } finally {
    deleting.value = false
  }
}

// ── Helpers ──
function initials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function exportCSV() {
  const rows = [['Nom', 'Email', 'Téléphone', 'Tag', 'Inscrit le']]
  members.value.forEach(m => {
    rows.push([m.name, m.email, m.phone ?? '', m.tag?.name ?? '', formatDate(m.created_at)])
  })
  const csv     = rows.map(r => r.join(',')).join('\n')
  const blob    = new Blob([csv], { type: 'text/csv' })
  const url     = URL.createObjectURL(blob)
  const a       = document.createElement('a')
  a.href        = url
  a.download    = 'membres.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
/* ── Skeleton ── */
.skel {
  background: var(--surface2);
  animation: pulse .9s ease-in-out infinite alternate;
}
@keyframes pulse { from { opacity: .5 } to { opacity: 1 } }

/* ── Avatar ── */
.avatar-sm {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: var(--accent-fg);
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; overflow: hidden;
}

/* ── Tags ── */
.tag {
  display: inline-flex; align-items: center;
  padding: 2px 8px; border-radius: 20px;
  font-size: 11px; font-weight: 500; font-family: var(--font-mono);
  background: var(--surface2); color: var(--text3);
  border: 1px solid var(--border); white-space: nowrap;
}
.tag-selected {
  background: var(--accent) !important;
  color: var(--accent-fg) !important;
  border-color: var(--accent) !important;
}
.suggested-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.tags-skeleton  { display: flex; flex-wrap: wrap; gap: 5px; }
.tag-skeleton   { height: 26px; width: 58px; border-radius: 20px; background: var(--surface2); animation: pulse .9s ease-in-out infinite alternate; }

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.modal-box {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 24px 28px;
  width: 100%; max-width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,.2);
  max-height: 90vh; overflow-y: auto;
}

/* ── Form ── */
.form-group { margin-bottom: 14px; }
.form-label { display: block; font-size: 12px; font-weight: 600; color: var(--text3); margin-bottom: 6px; }
.req { color: #ef4444; }
</style>