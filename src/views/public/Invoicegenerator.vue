<template>
  <div class="invoice-app">

    <!-- ══════════ TOPBAR ══════════ -->
    <div class="ig-topbar">
      <div class="ig-topbar-left">
        <div class="ig-logo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        <div>
          <div class="ig-title">Générateur de Factures</div>
          <div class="ig-sub">KGS Informatique · Édition Pro</div>
        </div>
      </div>
      <div class="ig-topbar-right">
        <!-- Sélecteur de modèle -->
        <div class="ig-tpl-toggle">
          <button
            v-for="t in templates"
            :key="t.id"
            class="ig-tpl-btn"
            :class="{ active: selectedTpl === t.id }"
            @click="selectedTpl = t.id"
            :style="selectedTpl === t.id ? { background: t.color, color: '#fff' } : {}"
          >
            <span class="ig-tpl-icon">{{ t.icon }}</span>
            {{ t.name }}
          </button>
        </div>
        <button class="ig-btn-print" @click="printInvoice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Imprimer / PDF
        </button>
      </div>
    </div>

    <!-- ══════════ WORKSPACE ══════════ -->
    <div class="ig-workspace">

      <!-- ── PANNEAU FORMULAIRE ── -->
      <div class="ig-form-panel">
        <div class="ig-form-scroll">

          <!-- Couleur accent -->
          <div class="ig-section">
            <div class="ig-section-title">🎨 Couleur principale</div>
            <div class="ig-color-row">
              <button
                v-for="c in colorPresets"
                :key="c.value"
                class="ig-color-swatch"
                :style="{ background: c.value, boxShadow: accentColor === c.value ? `0 0 0 3px ${c.value}55` : 'none', border: accentColor === c.value ? `2px solid ${c.value}` : '2px solid transparent' }"
                @click="accentColor = c.value"
                :title="c.name"
              >
                <span v-if="accentColor === c.value" style="color:#fff;font-size:11px;font-weight:800">✓</span>
              </button>
              <input type="color" v-model="accentColor" class="ig-color-picker" title="Couleur personnalisée" />
            </div>
          </div>

          <!-- Infos entreprise -->
          <div class="ig-section">
            <div class="ig-section-title">🏢 Votre entreprise</div>
            <div class="ig-row2">
              <div class="ig-field">
                <label>Nom entreprise *</label>
                <input v-model="invoice.company.name" class="ig-inp" placeholder="KGS Informatique" />
              </div>
              <div class="ig-field">
                <label>Slogan / Activité</label>
                <input v-model="invoice.company.tagline" class="ig-inp" placeholder="Solutions numériques" />
              </div>
            </div>
            <div class="ig-row2">
              <div class="ig-field">
                <label>Téléphone</label>
                <input v-model="invoice.company.phone" class="ig-inp" placeholder="+225 07 00 00 00" />
              </div>
              <div class="ig-field">
                <label>Email</label>
                <input v-model="invoice.company.email" class="ig-inp" placeholder="contact@kgs.ci" />
              </div>
            </div>
            <div class="ig-row2">
              <div class="ig-field">
                <label>Adresse</label>
                <input v-model="invoice.company.address" class="ig-inp" placeholder="Abidjan, Plateau" />
              </div>
              <div class="ig-field">
                <label>Site web</label>
                <input v-model="invoice.company.website" class="ig-inp" placeholder="www.kgs.ci" />
              </div>
            </div>
            <div class="ig-row2">
              <div class="ig-field">
                <label>RC / RCCM</label>
                <input v-model="invoice.company.rccm" class="ig-inp" placeholder="CI-ABJ-2023-XXX" />
              </div>
              <div class="ig-field">
                <label>NIF / TVA</label>
                <input v-model="invoice.company.nif" class="ig-inp" placeholder="0000000000" />
              </div>
            </div>
            <!-- Logo upload -->
            <div class="ig-field">
              <label>Logo (optionnel)</label>
              <div class="ig-logo-upload">
                <div class="ig-logo-preview" v-if="invoice.company.logo">
                  <img :src="invoice.company.logo" class="ig-logo-img" @error="invoice.company.logo=''" />
                  <button class="ig-logo-remove" @click="invoice.company.logo=''">✕</button>
                </div>
                <label v-else class="ig-logo-btn" for="logo-upload">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Ajouter un logo
                </label>
                <input id="logo-upload" type="file" accept="image/*" class="ig-file-input" @change="onLogoUpload" />
              </div>
            </div>
          </div>

          <!-- Infos client -->
          <div class="ig-section">
            <div class="ig-section-title">👤 Client / Destinataire</div>
            <div class="ig-row2">
              <div class="ig-field">
                <label>Nom / Entreprise *</label>
                <input v-model="invoice.client.name" class="ig-inp" placeholder="SOGECI SA" />
              </div>
              <div class="ig-field">
                <label>Contact</label>
                <input v-model="invoice.client.contact" class="ig-inp" placeholder="M. Kouassi" />
              </div>
            </div>
            <div class="ig-row2">
              <div class="ig-field">
                <label>Téléphone</label>
                <input v-model="invoice.client.phone" class="ig-inp" placeholder="+225 05 00 00 00" />
              </div>
              <div class="ig-field">
                <label>Email</label>
                <input v-model="invoice.client.email" class="ig-inp" placeholder="client@email.ci" />
              </div>
            </div>
            <div class="ig-field">
              <label>Adresse</label>
              <input v-model="invoice.client.address" class="ig-inp" placeholder="Abidjan, Cocody" />
            </div>
          </div>

          <!-- Infos facture -->
          <div class="ig-section">
            <div class="ig-section-title">📄 Détails de la facture</div>
            <div class="ig-row3">
              <div class="ig-field">
                <label>N° Facture *</label>
                <input v-model="invoice.meta.number" class="ig-inp" placeholder="FAC-2024-001" />
              </div>
              <div class="ig-field">
                <label>Date d'émission</label>
                <input v-model="invoice.meta.date" type="date" class="ig-inp" />
              </div>
              <div class="ig-field">
                <label>Date d'échéance</label>
                <input v-model="invoice.meta.dueDate" type="date" class="ig-inp" />
              </div>
            </div>
            <div class="ig-row2">
              <div class="ig-field">
                <label>Objet / Référence</label>
                <input v-model="invoice.meta.subject" class="ig-inp" placeholder="Développement application mobile" />
              </div>
              <div class="ig-field">
                <label>Statut</label>
                <select v-model="invoice.meta.status" class="ig-inp">
                  <option value="draft">Brouillon</option>
                  <option value="sent">Envoyée</option>
                  <option value="paid">Payée</option>
                  <option value="overdue">En retard</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Lignes articles -->
          <div class="ig-section">
            <div class="ig-section-title">
              <span>📦 Articles / Prestations</span>
              <button class="ig-btn-add-line" @click="addLine">+ Ajouter une ligne</button>
            </div>
            <div class="ig-lines-header">
              <span style="flex:2.5">Description</span>
              <span style="flex:0.7;text-align:center">Qté</span>
              <span style="flex:1;text-align:right">P.U. (FCFA)</span>
              <span style="flex:0.8;text-align:center">TVA %</span>
              <span style="flex:1;text-align:right">Total HT</span>
              <span style="width:24px"></span>
            </div>
            <div
              v-for="(line, i) in invoice.lines"
              :key="i"
              class="ig-line-row"
            >
              <input v-model="line.description" class="ig-inp ig-inp-desc" placeholder="Développement frontend..." style="flex:2.5" />
              <input v-model.number="line.qty" type="number" min="0" class="ig-inp ig-inp-num" style="flex:0.7;text-align:center" />
              <input v-model.number="line.unitPrice" type="number" min="0" class="ig-inp ig-inp-num" style="flex:1;text-align:right" />
              <input v-model.number="line.tva" type="number" min="0" max="100" class="ig-inp ig-inp-num" style="flex:0.8;text-align:center" />
              <div class="ig-line-total" :style="{ color: accentColor }" style="flex:1">
                {{ formatAmount(line.qty * line.unitPrice) }}
              </div>
              <button class="ig-line-del" @click="invoice.lines.splice(i,1)" title="Supprimer">✕</button>
            </div>
            <div v-if="!invoice.lines.length" class="ig-lines-empty">
              Aucune ligne — cliquez sur <strong>+ Ajouter une ligne</strong>
            </div>
          </div>

          <!-- Remise & Notes -->
          <div class="ig-section">
            <div class="ig-section-title">💬 Options supplémentaires</div>
            <div class="ig-row2">
              <div class="ig-field">
                <label>Remise globale (%)</label>
                <input v-model.number="invoice.discount" type="number" min="0" max="100" class="ig-inp" placeholder="0" />
              </div>
              <div class="ig-field">
                <label>Devise</label>
                <select v-model="invoice.currency" class="ig-inp">
                  <option value="FCFA">FCFA</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
            <div class="ig-field">
              <label>Conditions de paiement</label>
              <input v-model="invoice.paymentTerms" class="ig-inp" placeholder="Virement bancaire — Compte : CI XXX XXXX XXXX" />
            </div>
            <div class="ig-field">
              <label>Notes / Mentions légales</label>
              <textarea v-model="invoice.notes" class="ig-inp ig-ta" rows="3" placeholder="Merci pour votre confiance. En cas de question, contactez-nous..."></textarea>
            </div>
          </div>

        </div>
      </div>

      <!-- ── APERÇU FACTURE ── -->
      <div class="ig-preview-panel">
        <div class="ig-preview-bar">
          <div style="display:flex;align-items:center;gap:7px">
            <span class="ig-live-dot"></span>
            <span class="ig-live-label">Aperçu en direct</span>
          </div>
          <div style="display:flex;align-items:center;gap:5px">
            <button class="ig-zoom-btn" @click="zoom = Math.max(0.4, zoom - 0.1)">−</button>
            <span class="ig-zoom-val">{{ Math.round(zoom * 100) }}%</span>
            <button class="ig-zoom-btn" @click="zoom = Math.min(1.5, zoom + 0.1)">+</button>
            <button class="ig-zoom-btn" style="width:auto;padding:0 8px;font-size:10px" @click="fitZoom">Ajuster</button>
          </div>
        </div>
        <div class="ig-preview-stage" ref="previewStage">
          <div :style="{ transform: `scale(${zoom})`, transformOrigin: 'top center', display: 'inline-block' }">
            <!-- Rendu de la facture selon le modèle -->
            <invoice-template
              :invoice="invoiceComputed"
              :selected-tpl="selectedTpl"
              :accent-color="accentColor"
            />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import InvoiceTemplate from './InvoiceTemplate.vue'

export default {
  name: 'InvoiceGenerator',
  components: { InvoiceTemplate },

  data() {
    const today = new Date().toISOString().split('T')[0]
    const due = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    return {
      selectedTpl: 'moderne',
      accentColor: '#1a73e8',
      zoom: 0.72,
      templates: [
        { id: 'moderne',  name: 'Moderne',  icon: '⬡', color: '#1a73e8' },
        { id: 'classique', name: 'Classique', icon: '◆', color: '#1e3a5f' },
      ],
      colorPresets: [
        { name: 'Bleu',     value: '#1a73e8' },
        { name: 'Navy',     value: '#1e3a5f' },
        { name: 'Indigo',   value: '#4f46e5' },
        { name: 'Violet',   value: '#7c3aed' },
        { name: 'Vert',     value: '#059669' },
        { name: 'Teal',     value: '#0f766e' },
        { name: 'Orange',   value: '#ea580c' },
        { name: 'Rouge',    value: '#dc2626' },
        { name: 'Noir',     value: '#111827' },
      ],
      invoice: {
        company: {
          name: 'KGS Informatique',
          tagline: 'Solutions numériques innovantes',
          phone: '+225 07 00 00 00',
          email: 'contact@kgs.ci',
          address: 'Plateau, Abidjan · Côte d\'Ivoire',
          website: 'www.kgs.ci',
          rccm: 'CI-ABJ-2024-XXX',
          nif: '0000000000',
          logo: '',
        },
        client: {
          name: 'SOGECI SA',
          contact: 'M. Kouassi Jean',
          phone: '+225 05 11 22 33',
          email: 'j.kouassi@sogeci.ci',
          address: 'Cocody Riviera, Abidjan',
        },
        meta: {
          number: 'FAC-2024-001',
          date: today,
          dueDate: due,
          subject: 'Développement application mobile MOYO',
          status: 'sent',
        },
        lines: [
          { description: 'Conception UI/UX & maquettes', qty: 1, unitPrice: 450000, tva: 18 },
          { description: 'Développement frontend React Native', qty: 1, unitPrice: 1200000, tva: 18 },
          { description: 'Intégration API Laravel & backend', qty: 1, unitPrice: 800000, tva: 18 },
          { description: 'Tests, déploiement & formation', qty: 1, unitPrice: 250000, tva: 18 },
        ],
        discount: 0,
        currency: 'FCFA',
        paymentTerms: 'Virement bancaire — SGBCI · Compte : CI 007 000 00000 00000 0000000',
        notes: 'Merci pour votre confiance. Toute facture non réglée dans les délais entraînera des pénalités de 1,5% par mois.',
      },
    }
  },

  computed: {
    invoiceComputed() {
      const lines = this.invoice.lines.map(l => ({
        ...l,
        totalHT: l.qty * l.unitPrice,
        totalTVA: l.qty * l.unitPrice * (l.tva / 100),
        totalTTC: l.qty * l.unitPrice * (1 + l.tva / 100),
      }))
      const totalHT = lines.reduce((s, l) => s + l.totalHT, 0)
      const discountAmt = totalHT * (this.invoice.discount / 100)
      const totalHTApres = totalHT - discountAmt
      const totalTVA = lines.reduce((s, l) => s + l.totalTVA, 0) * (1 - this.invoice.discount / 100)
      const totalTTC = totalHTApres + totalTVA
      return {
        ...this.invoice,
        lines,
        totals: {
          totalHT,
          discount: this.invoice.discount,
          discountAmt,
          totalHTApres,
          totalTVA,
          totalTTC,
        },
      }
    },
  },

  mounted() {
    this.$nextTick(() => this.fitZoom())
  },

  methods: {
    fitZoom() {
      const stage = this.$refs.previewStage
      if (!stage) return
      this.zoom = Math.min(Math.max((stage.clientWidth - 48) / 794, 0.3), 1.2)
    },
    addLine() {
      this.invoice.lines.push({ description: '', qty: 1, unitPrice: 0, tva: 18 })
    },
    formatAmount(n) {
      if (!n && n !== 0) return '—'
      return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' ' + this.invoice.currency
    },
    onLogoUpload(e) {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = ev => { this.invoice.company.logo = ev.target.result }
      reader.readAsDataURL(file)
      e.target.value = ''
    },
    printInvoice() {
      window.print()
    },
  },
}
</script>

<style scoped>
/* ══════════ BASE ══════════ */
.invoice-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: #f4f5f7;
  font-family: 'DM Sans', 'Segoe UI', Arial, sans-serif;
  font-size: 13px;
  color: #1a1a1a;
}

/* ══════════ TOPBAR ══════════ */
.ig-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 58px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
  gap: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
}
.ig-topbar-left { display: flex; align-items: center; gap: 10px; }
.ig-logo {
  width: 34px; height: 34px;
  background: linear-gradient(135deg, #1a73e8, #0d47a1);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
}
.ig-title { font-size: 14px; font-weight: 800; color: #111; line-height: 1.2; }
.ig-sub { font-size: 10px; color: #aaa; }
.ig-topbar-right { display: flex; align-items: center; gap: 10px; }

.ig-tpl-toggle {
  display: flex;
  gap: 3px;
  background: #f3f4f6;
  padding: 3px;
  border-radius: 10px;
}
.ig-tpl-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 12px;
  border-radius: 7px;
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 700;
  color: #888;
  cursor: pointer;
  font-family: inherit;
  transition: all .15s;
}
.ig-tpl-btn:hover { background: #fff; color: #333; }
.ig-tpl-btn.active { box-shadow: 0 1px 6px rgba(0,0,0,.12); color: #fff !important; }
.ig-tpl-icon { font-size: 13px; }

.ig-btn-print {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  background: #111827;
  color: #fff;
  border: none;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: opacity .15s;
}
.ig-btn-print:hover { opacity: .85; }

/* ══════════ WORKSPACE ══════════ */
.ig-workspace {
  display: grid;
  grid-template-columns: 400px 1fr;
  flex: 1;
  overflow: hidden;
}

/* ── FORM PANEL ── */
.ig-form-panel {
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.ig-form-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ig-form-scroll::-webkit-scrollbar { width: 4px; }
.ig-form-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }

.ig-section {
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 8px;
}
.ig-section-title {
  font-size: 11.5px;
  font-weight: 800;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: .6px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ig-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 7px; }
.ig-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 7px; }
.ig-field { display: flex; flex-direction: column; gap: 3px; margin-bottom: 7px; }
.ig-field label { font-size: 10.5px; font-weight: 600; color: #6b7280; }
.ig-inp {
  padding: 6px 9px;
  border: 1.5px solid #e5e7eb;
  border-radius: 7px;
  font-size: 12.5px;
  font-family: inherit;
  background: #fff;
  color: #111;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color .15s;
}
.ig-inp:focus { border-color: #1a73e8; }
.ig-inp-num { padding: 6px 6px; }
.ig-ta { min-height: 64px; resize: vertical; }

/* Couleurs */
.ig-color-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.ig-color-swatch {
  width: 26px; height: 26px;
  border-radius: 50%;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform .12s;
  padding: 0;
}
.ig-color-swatch:hover { transform: scale(1.15); }
.ig-color-picker {
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
}

/* Logo upload */
.ig-logo-upload { display: flex; align-items: center; gap: 8px; }
.ig-logo-preview { position: relative; display: flex; align-items: center; gap: 8px; }
.ig-logo-img { height: 48px; max-width: 120px; object-fit: contain; border-radius: 4px; border: 1px solid #e5e7eb; }
.ig-logo-remove {
  background: #fee2e2; border: none; color: #dc2626;
  border-radius: 50%; width: 18px; height: 18px;
  cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center;
}
.ig-logo-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  border: 1.5px dashed #d1d5db;
  border-radius: 7px;
  font-size: 12px; font-weight: 600; color: #6b7280;
  cursor: pointer; font-family: inherit; transition: all .15s;
}
.ig-logo-btn:hover { border-color: #1a73e8; color: #1a73e8; }
.ig-file-input { display: none; }

/* Lignes articles */
.ig-lines-header {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 6px;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 10px; font-weight: 700; color: #9ca3af;
  text-transform: uppercase; letter-spacing: .5px;
  margin-bottom: 5px;
}
.ig-line-row {
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 5px;
}
.ig-inp-desc { min-width: 0; }
.ig-line-total {
  text-align: right;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  min-width: 0;
}
.ig-line-del {
  background: none; border: none; cursor: pointer;
  color: #d1d5db; font-size: 10px;
  width: 20px; height: 20px;
  border-radius: 4px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: all .12s;
}
.ig-line-del:hover { background: #fee2e2; color: #dc2626; }
.ig-lines-empty {
  text-align: center; font-size: 12px; color: #aaa;
  padding: 14px;
}
.ig-btn-add-line {
  padding: 4px 9px;
  border-radius: 5px;
  border: 1.5px dashed #d1d5db;
  background: transparent;
  font-size: 11px; font-weight: 700; color: #6b7280;
  cursor: pointer; font-family: inherit;
  transition: all .15s;
}
.ig-btn-add-line:hover { border-color: #1a73e8; color: #1a73e8; }

/* ── PREVIEW ── */
.ig-preview-panel {
  display: flex; flex-direction: column;
  background: #e8eaed;
  overflow: hidden;
}
.ig-preview-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 12px;
  background: #fff;
  border-bottom: 1px solid #eaecef;
  flex-shrink: 0;
}
.ig-live-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:.3 } }
.ig-live-label { font-size: 11px; font-weight: 600; color: #888; }
.ig-zoom-btn {
  height: 22px; border-radius: 5px; border: 1px solid #e5e7eb;
  background: #fff; cursor: pointer; font-size: 13px; font-weight: 700;
  color: #555; padding: 0 7px; display: flex; align-items: center;
}
.ig-zoom-btn:hover { background: #f5f5f5; }
.ig-zoom-val { font-size: 11px; font-weight: 700; color: #555; min-width: 34px; text-align: center; }
.ig-preview-stage {
  flex: 1; overflow: auto; padding: 24px;
  display: flex; justify-content: center; align-items: flex-start;
}

@media (max-width: 900px) {
  .ig-workspace { grid-template-columns: 1fr; grid-template-rows: 50vh 1fr; overflow: auto; }
  .invoice-app { height: auto; }
  .ig-tpl-btn { font-size: 10px; padding: 4px 8px; }
}

@media print {
  .ig-topbar, .ig-form-panel, .ig-preview-bar { display: none !important; }
  .ig-workspace { display: block !important; }
  .ig-preview-panel { background: #fff !important; }
  .ig-preview-stage { padding: 0 !important; transform: none !important; }
  .ig-preview-stage > div { transform: scale(1) !important; }
}
</style>