<template>
  <div id="invoice-render" class="inv-paper">

    <!-- ═══════════════════════════════════════════════════════════
         MODÈLE 1 : MODERNE — header coloré diagonal + design épuré
    ═══════════════════════════════════════════════════════════ -->
    <div v-if="selectedTpl === 'moderne'" class="inv-mod">

      <!-- Header diagonal -->
      <div class="im-header" :style="{ background: accentColor }">
        <div class="im-header-clip"></div>

        <div class="im-header-content">
          <!-- Logo + Entreprise -->
          <div class="im-company-block">
            <img v-if="invoice.company.logo" :src="invoice.company.logo" class="im-logo" @error="e => e.target.style.display='none'" />
            <div v-else class="im-logo-initials">{{ initials(invoice.company.name) }}</div>
            <div class="im-company-info">
              <div class="im-company-name">{{ invoice.company.name }}</div>
              <div class="im-company-tagline">{{ invoice.company.tagline }}</div>
            </div>
          </div>
          <!-- Titre facture -->
          <div class="im-title-block">
            <div class="im-invoice-word">FACTURE</div>
            <div class="im-invoice-number">{{ invoice.meta.number }}</div>
            <div
              class="im-status-badge"
              :class="'status-' + invoice.meta.status"
            >{{ statusLabel(invoice.meta.status) }}</div>
          </div>
        </div>
      </div>

      <!-- Bande dates -->
      <div class="im-dates-strip">
        <div class="im-date-item">
          <div class="im-date-lbl">Date d'émission</div>
          <div class="im-date-val" :style="{ color: accentColor }">{{ formatDate(invoice.meta.date) }}</div>
        </div>
        <div class="im-date-sep"></div>
        <div class="im-date-item">
          <div class="im-date-lbl">Date d'échéance</div>
          <div class="im-date-val" :style="{ color: accentColor }">{{ formatDate(invoice.meta.dueDate) }}</div>
        </div>
        <div class="im-date-sep"></div>
        <div class="im-date-item">
          <div class="im-date-lbl">Objet</div>
          <div class="im-date-val" style="font-weight:500;font-size:12px">{{ invoice.meta.subject || '—' }}</div>
        </div>
      </div>

      <!-- Corps : Émetteur + Client -->
      <div class="im-parties">
        <div class="im-party im-party-from">
          <div class="im-party-label" :style="{ color: accentColor }">DE</div>
          <div class="im-party-name">{{ invoice.company.name }}</div>
          <div class="im-party-line" v-if="invoice.company.address">{{ invoice.company.address }}</div>
          <div class="im-party-line" v-if="invoice.company.phone">{{ invoice.company.phone }}</div>
          <div class="im-party-line" v-if="invoice.company.email">{{ invoice.company.email }}</div>
          <div class="im-party-line" v-if="invoice.company.website">{{ invoice.company.website }}</div>
          <div class="im-party-ids" v-if="invoice.company.rccm || invoice.company.nif">
            <span v-if="invoice.company.rccm">RCCM : {{ invoice.company.rccm }}</span>
            <span v-if="invoice.company.nif">NIF : {{ invoice.company.nif }}</span>
          </div>
        </div>
        <div class="im-party-arrow" :style="{ color: accentColor + '55' }">→</div>
        <div class="im-party im-party-to">
          <div class="im-party-label" :style="{ color: accentColor }">POUR</div>
          <div class="im-party-name">{{ invoice.client.name }}</div>
          <div class="im-party-line" v-if="invoice.client.contact">{{ invoice.client.contact }}</div>
          <div class="im-party-line" v-if="invoice.client.address">{{ invoice.client.address }}</div>
          <div class="im-party-line" v-if="invoice.client.phone">{{ invoice.client.phone }}</div>
          <div class="im-party-line" v-if="invoice.client.email">{{ invoice.client.email }}</div>
        </div>
      </div>

      <!-- Tableau articles -->
      <div class="im-table-wrap">
        <table class="im-table">
          <thead>
            <tr :style="{ background: accentColor }">
              <th class="im-th im-th-desc">Description</th>
              <th class="im-th im-th-center">Qté</th>
              <th class="im-th im-th-right">P.U. HT</th>
              <th class="im-th im-th-center">TVA</th>
              <th class="im-th im-th-right">Total HT</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(line, i) in invoice.lines"
              :key="i"
              class="im-tr"
              :class="{ 'im-tr-alt': i % 2 === 1 }"
            >
              <td class="im-td im-td-desc">{{ line.description }}</td>
              <td class="im-td im-td-center">{{ line.qty }}</td>
              <td class="im-td im-td-right">{{ formatAmt(line.unitPrice) }}</td>
              <td class="im-td im-td-center">{{ line.tva }}%</td>
              <td class="im-td im-td-right im-td-total" :style="{ color: accentColor }">{{ formatAmt(line.totalHT) }}</td>
            </tr>
            <tr v-if="!invoice.lines.length">
              <td colspan="5" class="im-td" style="text-align:center;color:#aaa;padding:24px">Aucune ligne ajoutée</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totaux -->
      <div class="im-totals-wrap">
        <div class="im-totals-empty"></div>
        <div class="im-totals-box">
          <div class="im-total-row">
            <span>Sous-total HT</span>
            <span>{{ formatAmt(invoice.totals.totalHT) }}</span>
          </div>
          <div class="im-total-row" v-if="invoice.totals.discount > 0">
            <span>Remise ({{ invoice.totals.discount }}%)</span>
            <span class="im-discount">− {{ formatAmt(invoice.totals.discountAmt) }}</span>
          </div>
          <div class="im-total-row" v-if="invoice.totals.discount > 0">
            <span>Total HT après remise</span>
            <span>{{ formatAmt(invoice.totals.totalHTApres) }}</span>
          </div>
          <div class="im-total-row">
            <span>TVA</span>
            <span>{{ formatAmt(invoice.totals.totalTVA) }}</span>
          </div>
          <div class="im-total-row im-grand-total" :style="{ background: accentColor }">
            <span>TOTAL TTC</span>
            <span>{{ formatAmt(invoice.totals.totalTTC) }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="im-footer">
        <div class="im-footer-left">
          <div v-if="invoice.paymentTerms" class="im-payment">
            <div class="im-payment-title" :style="{ color: accentColor }">MODALITÉS DE PAIEMENT</div>
            <div class="im-payment-text">{{ invoice.paymentTerms }}</div>
          </div>
          <div v-if="invoice.notes" class="im-notes">
            <div class="im-notes-title">NOTES</div>
            <div class="im-notes-text">{{ invoice.notes }}</div>
          </div>
        </div>
        <div class="im-footer-right">
          <div class="im-footer-brand" :style="{ color: accentColor + '66' }">{{ invoice.company.name }}</div>
          <div class="im-footer-line" :style="{ background: accentColor }"></div>
        </div>
      </div>

      <!-- Décoration bas de page -->
      <div class="im-bottom-strip" :style="{ background: accentColor }"></div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════
         MODÈLE 2 : CLASSIQUE — sobre, élégant, professionnel
    ═══════════════════════════════════════════════════════════ -->
    <div v-if="selectedTpl === 'classique'" class="inv-classic">

      <!-- En-tête double ligne -->
      <div class="ic-topbar" :style="{ borderTopColor: accentColor }">
        <div class="ic-topbar-left">
          <img v-if="invoice.company.logo" :src="invoice.company.logo" class="ic-logo" @error="e => e.target.style.display='none'" />
          <div v-else class="ic-logo-box" :style="{ background: accentColor }">{{ initials(invoice.company.name) }}</div>
          <div class="ic-company-block">
            <div class="ic-company-name">{{ invoice.company.name }}</div>
            <div class="ic-company-sub">{{ invoice.company.tagline }}</div>
          </div>
        </div>
        <div class="ic-topbar-right">
          <div class="ic-inv-word" :style="{ color: accentColor }">FACTURE</div>
          <div class="ic-inv-num">{{ invoice.meta.number }}</div>
          <div class="ic-inv-status" :class="'status-' + invoice.meta.status">{{ statusLabel(invoice.meta.status) }}</div>
        </div>
      </div>

      <div class="ic-rule" :style="{ background: accentColor }"></div>

      <!-- Parties + dates -->
      <div class="ic-meta-row">
        <!-- Émetteur -->
        <div class="ic-meta-block">
          <div class="ic-meta-head" :style="{ color: accentColor }">Émetteur</div>
          <div class="ic-meta-name">{{ invoice.company.name }}</div>
          <div class="ic-meta-line">{{ invoice.company.address }}</div>
          <div class="ic-meta-line">{{ invoice.company.phone }}</div>
          <div class="ic-meta-line">{{ invoice.company.email }}</div>
          <div class="ic-meta-line" v-if="invoice.company.rccm">RCCM : {{ invoice.company.rccm }}</div>
          <div class="ic-meta-line" v-if="invoice.company.nif">NIF : {{ invoice.company.nif }}</div>
        </div>

        <!-- Séparateur vertical -->
        <div class="ic-vline" :style="{ background: accentColor + '33' }"></div>

        <!-- Client -->
        <div class="ic-meta-block">
          <div class="ic-meta-head" :style="{ color: accentColor }">Facturé à</div>
          <div class="ic-meta-name">{{ invoice.client.name }}</div>
          <div class="ic-meta-line" v-if="invoice.client.contact">{{ invoice.client.contact }}</div>
          <div class="ic-meta-line" v-if="invoice.client.address">{{ invoice.client.address }}</div>
          <div class="ic-meta-line" v-if="invoice.client.phone">{{ invoice.client.phone }}</div>
          <div class="ic-meta-line" v-if="invoice.client.email">{{ invoice.client.email }}</div>
        </div>

        <!-- Séparateur -->
        <div class="ic-vline" :style="{ background: accentColor + '33' }"></div>

        <!-- Dates -->
        <div class="ic-meta-block ic-dates-block">
          <div class="ic-date-row">
            <div class="ic-date-lbl">Date d'émission</div>
            <div class="ic-date-val">{{ formatDate(invoice.meta.date) }}</div>
          </div>
          <div class="ic-date-row">
            <div class="ic-date-lbl">Échéance</div>
            <div class="ic-date-val" :style="{ color: accentColor }">{{ formatDate(invoice.meta.dueDate) }}</div>
          </div>
          <div class="ic-date-row" v-if="invoice.meta.subject">
            <div class="ic-date-lbl">Objet</div>
            <div class="ic-date-val" style="font-weight:500">{{ invoice.meta.subject }}</div>
          </div>
        </div>
      </div>

      <!-- Tableau lignes -->
      <div class="ic-table-wrap">
        <table class="ic-table">
          <thead>
            <tr>
              <th class="ic-th" :style="{ background: accentColor + '15', color: accentColor, borderBottomColor: accentColor }" style="text-align:left;flex:3">Description</th>
              <th class="ic-th" :style="{ background: accentColor + '15', color: accentColor, borderBottomColor: accentColor }" style="text-align:center">Qté</th>
              <th class="ic-th" :style="{ background: accentColor + '15', color: accentColor, borderBottomColor: accentColor }" style="text-align:right">P.U. HT</th>
              <th class="ic-th" :style="{ background: accentColor + '15', color: accentColor, borderBottomColor: accentColor }" style="text-align:center">TVA</th>
              <th class="ic-th" :style="{ background: accentColor + '15', color: accentColor, borderBottomColor: accentColor }" style="text-align:right">Total HT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, i) in invoice.lines" :key="i" class="ic-tr" :class="{ 'ic-tr-alt': i % 2 === 1 }">
              <td class="ic-td ic-td-desc">{{ line.description }}</td>
              <td class="ic-td ic-td-center">{{ line.qty }}</td>
              <td class="ic-td ic-td-right">{{ formatAmt(line.unitPrice) }}</td>
              <td class="ic-td ic-td-center">{{ line.tva }}%</td>
              <td class="ic-td ic-td-right" :style="{ fontWeight: 700 }">{{ formatAmt(line.totalHT) }}</td>
            </tr>
            <tr v-if="!invoice.lines.length">
              <td colspan="5" class="ic-td" style="text-align:center;color:#aaa;padding:24px">Aucune ligne ajoutée</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totaux -->
      <div class="ic-totals-section">
        <div class="ic-totals-spacer"></div>
        <div class="ic-totals-box" :style="{ borderColor: accentColor + '33' }">
          <div class="ic-tot-row">
            <span class="ic-tot-lbl">Total HT</span>
            <span class="ic-tot-val">{{ formatAmt(invoice.totals.totalHT) }}</span>
          </div>
          <div class="ic-tot-row" v-if="invoice.totals.discount > 0">
            <span class="ic-tot-lbl">Remise ({{ invoice.totals.discount }}%)</span>
            <span class="ic-tot-val ic-discount">− {{ formatAmt(invoice.totals.discountAmt) }}</span>
          </div>
          <div class="ic-tot-row" v-if="invoice.totals.discount > 0">
            <span class="ic-tot-lbl">Net HT</span>
            <span class="ic-tot-val">{{ formatAmt(invoice.totals.totalHTApres) }}</span>
          </div>
          <div class="ic-tot-row">
            <span class="ic-tot-lbl">TVA</span>
            <span class="ic-tot-val">{{ formatAmt(invoice.totals.totalTVA) }}</span>
          </div>
          <div class="ic-tot-row ic-tot-grand" :style="{ borderTopColor: accentColor, color: accentColor }">
            <span>NET À PAYER</span>
            <span>{{ formatAmt(invoice.totals.totalTTC) }}</span>
          </div>
        </div>
      </div>

      <!-- Paiement + Notes + Signature -->
      <div class="ic-bottom-row">
        <div class="ic-bottom-left">
          <div v-if="invoice.paymentTerms" class="ic-payment-box" :style="{ borderLeftColor: accentColor }">
            <div class="ic-box-title" :style="{ color: accentColor }">MODALITÉS DE PAIEMENT</div>
            <div class="ic-box-text">{{ invoice.paymentTerms }}</div>
          </div>
          <div v-if="invoice.notes" class="ic-notes-box">
            <div class="ic-box-title" style="color:#6b7280">NOTES & MENTIONS</div>
            <div class="ic-box-text" style="color:#6b7280">{{ invoice.notes }}</div>
          </div>
        </div>
        <div class="ic-signature-box" :style="{ borderColor: accentColor + '44' }">
          <div class="ic-sig-label">Cachet & Signature</div>
          <div class="ic-sig-area"></div>
          <div class="ic-sig-name">{{ invoice.company.name }}</div>
        </div>
      </div>

      <!-- Pied de page -->
      <div class="ic-footer">
        <div class="ic-footer-line" :style="{ background: accentColor }"></div>
        <div class="ic-footer-text">
          <span>{{ invoice.company.name }}</span>
          <span v-if="invoice.company.address">· {{ invoice.company.address }}</span>
          <span v-if="invoice.company.phone">· {{ invoice.company.phone }}</span>
          <span v-if="invoice.company.email">· {{ invoice.company.email }}</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'InvoiceTemplate',
  props: {
    invoice: {
      type: Object,
      required: false,
      default: () => ({
        company: { name: '', tagline: '', phone: '', email: '', address: '', website: '', rccm: '', nif: '', logo: '' },
        client: { name: '', contact: '', phone: '', email: '', address: '' },
        meta: { number: '', date: '', dueDate: '', subject: '', status: 'draft' },
        lines: [],
        totals: { totalHT: 0, discount: 0, discountAmt: 0, totalHTApres: 0, totalTVA: 0, totalTTC: 0 },
        paymentTerms: '',
        notes: '',
        currency: 'FCFA',
      }),
    },
    selectedTpl: { type: String, default: 'moderne' },
    accentColor:  { type: String, default: '#1a73e8' },
  },
  methods: {
    initials(name) {
      if (!name) return '?'
      return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
    },
    formatDate(d) {
      if (!d) return '—'
      try {
        return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
      } catch { return d }
    },
    formatAmt(n) {
      if (!n && n !== 0) return '—'
      const currency = this.invoice.currency || 'FCFA'
      return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' ' + currency
    },
    statusLabel(s) {
      return { draft: 'Brouillon', sent: 'Envoyée', paid: 'Payée', overdue: 'En retard' }[s] || s
    },
  },
}
</script>

<style scoped>
/* ════════ PAPER ════════ */
.inv-paper {
  width: 794px;
  min-height: 1123px;
  background: #fff;
  box-shadow: 0 8px 40px rgba(0,0,0,.18);
  font-family: 'DM Sans', 'Segoe UI', Arial, sans-serif;
  font-size: 13px;
  color: #1a1a1a;
  overflow: hidden;
}

/* ════ STATUS BADGES ════ */
.status-draft  { background: #f3f4f6; color: #6b7280; }
.status-sent   { background: #dbeafe; color: #1d4ed8; }
.status-paid   { background: #d1fae5; color: #065f46; }
.status-overdue{ background: #fee2e2; color: #dc2626; }

/* ══════════════════════════════════════════════════════
   MODÈLE MODERNE
══════════════════════════════════════════════════════ */
.inv-mod {
  display: flex;
  flex-direction: column;
  min-height: 1123px;
}

/* En-tête coloré */
.im-header {
  position: relative;
  padding: 34px 40px 56px;
  overflow: hidden;
}
.im-header-clip {
  position: absolute;
  bottom: -2px; left: 0; right: 0;
  height: 40px;
  background: #fff;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
  z-index: 1;
}
.im-header-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.im-company-block {
  display: flex;
  align-items: center;
  gap: 14px;
}
.im-logo {
  height: 56px;
  max-width: 140px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255,255,255,.15);
  padding: 4px;
}
.im-logo-initials {
  width: 56px; height: 56px;
  border-radius: 12px;
  background: rgba(255,255,255,.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 900; color: #fff;
  border: 2px solid rgba(255,255,255,.3);
  flex-shrink: 0;
}
.im-company-name {
  font-size: 20px; font-weight: 900;
  color: #fff; line-height: 1.2; letter-spacing: -.3px;
}
.im-company-tagline {
  font-size: 12px;
  color: rgba(255,255,255,.7);
  margin-top: 3px;
}
.im-title-block { text-align: right; }
.im-invoice-word {
  font-size: 42px; font-weight: 900;
  color: rgba(255,255,255,.25);
  letter-spacing: 6px;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 4px;
}
.im-invoice-number {
  font-size: 18px; font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
}
.im-status-badge {
  display: inline-block;
  margin-top: 8px;
  padding: 3px 12px;
  border-radius: 99px;
  font-size: 11px; font-weight: 700;
  letter-spacing: .5px;
}

/* Bande dates */
.im-dates-strip {
  display: flex;
  align-items: center;
  padding: 16px 40px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  gap: 0;
}
.im-date-item {
  flex: 1;
  padding: 0 16px;
}
.im-date-lbl {
  font-size: 9.5px; font-weight: 700;
  color: #9ca3af; text-transform: uppercase;
  letter-spacing: 1px; margin-bottom: 3px;
}
.im-date-val { font-size: 13.5px; font-weight: 700; }
.im-date-sep {
  width: 1px; height: 36px;
  background: #e5e7eb;
  flex-shrink: 0;
}

/* Parties */
.im-parties {
  display: flex;
  align-items: flex-start;
  padding: 28px 40px;
  gap: 20px;
}
.im-party { flex: 1; }
.im-party-label {
  font-size: 9px; font-weight: 900;
  text-transform: uppercase; letter-spacing: 2px;
  margin-bottom: 8px;
}
.im-party-name {
  font-size: 15px; font-weight: 800;
  color: #111; margin-bottom: 5px;
}
.im-party-line {
  font-size: 12px; color: #6b7280;
  line-height: 1.7;
}
.im-party-ids {
  display: flex; gap: 12px;
  flex-wrap: wrap;
  margin-top: 6px;
  font-size: 10.5px; color: #9ca3af;
}
.im-party-arrow {
  font-size: 36px;
  padding-top: 20px;
  flex-shrink: 0;
}

/* Tableau */
.im-table-wrap {
  padding: 0 40px 16px;
}
.im-table {
  width: 100%;
  border-collapse: collapse;
}
.im-th {
  padding: 10px 14px;
  font-size: 10px; font-weight: 800;
  letter-spacing: 1px; text-transform: uppercase;
  color: #fff;
}
.im-th-desc { text-align: left; border-radius: 6px 0 0 6px; }
.im-th-center { text-align: center; }
.im-th-right { text-align: right; }
.im-th:last-child { border-radius: 0 6px 6px 0; }
.im-tr { transition: background .1s; }
.im-tr-alt td { background: #f9fafb; }
.im-td {
  padding: 11px 14px;
  font-size: 12.5px;
  border-bottom: 1px solid #f0f0f0;
}
.im-td-desc { color: #111; font-weight: 500; }
.im-td-center { text-align: center; color: #6b7280; }
.im-td-right { text-align: right; color: #6b7280; }
.im-td-total { font-weight: 700; }

/* Totaux */
.im-totals-wrap {
  display: flex;
  padding: 4px 40px 24px;
  gap: 0;
}
.im-totals-empty { flex: 1; }
.im-totals-box {
  width: 320px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,.08);
}
.im-total-row {
  display: flex;
  justify-content: space-between;
  padding: 9px 16px;
  font-size: 12.5px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}
.im-discount { color: #dc2626; }
.im-grand-total {
  display: flex;
  justify-content: space-between;
  padding: 13px 16px;
  font-size: 14px; font-weight: 900;
  color: #fff !important;
  border-bottom: none;
}

/* Footer */
.im-footer {
  display: flex;
  padding: 20px 40px;
  gap: 24px;
  flex: 1;
  align-items: flex-end;
  border-top: 1px solid #f0f0f0;
  margin-top: 8px;
}
.im-footer-left { flex: 1; }
.im-payment { margin-bottom: 14px; }
.im-payment-title {
  font-size: 9.5px; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1.2px;
  margin-bottom: 5px;
}
.im-payment-text { font-size: 12px; color: #4b5563; line-height: 1.7; }
.im-notes-title {
  font-size: 9.5px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: #9ca3af; margin-bottom: 4px;
}
.im-notes-text { font-size: 11.5px; color: #9ca3af; line-height: 1.6; }
.im-footer-right { text-align: right; }
.im-footer-brand { font-size: 22px; font-weight: 900; letter-spacing: -1px; }
.im-footer-line { height: 3px; border-radius: 99px; width: 60px; margin-left: auto; margin-top: 6px; }
.im-bottom-strip { height: 8px; }

/* ══════════════════════════════════════════════════════
   MODÈLE CLASSIQUE
══════════════════════════════════════════════════════ */
.inv-classic {
  display: flex;
  flex-direction: column;
  min-height: 1123px;
  padding: 44px 48px 32px;
}

/* Topbar */
.ic-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-top: 5px solid;
  padding-top: 18px;
}
.ic-topbar-left { display: flex; align-items: center; gap: 14px; }
.ic-logo {
  height: 52px; max-width: 130px;
  object-fit: contain;
}
.ic-logo-box {
  width: 52px; height: 52px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 900; color: #fff;
  flex-shrink: 0;
}
.ic-company-name {
  font-size: 18px; font-weight: 900;
  color: #111; line-height: 1.2;
}
.ic-company-sub {
  font-size: 12px; color: #9ca3af;
  margin-top: 2px;
}
.ic-topbar-right { text-align: right; }
.ic-inv-word {
  font-size: 36px; font-weight: 900;
  letter-spacing: 4px;
  line-height: 1; margin-bottom: 4px;
}
.ic-inv-num {
  font-size: 16px; font-weight: 700;
  color: #374151; letter-spacing: 1px;
}
.ic-inv-status {
  display: inline-block;
  margin-top: 6px;
  padding: 3px 12px;
  border-radius: 99px;
  font-size: 11px; font-weight: 700;
}
.ic-rule { height: 2px; margin-bottom: 28px; }

/* Méta row */
.ic-meta-row {
  display: flex;
  gap: 0;
  margin-bottom: 32px;
}
.ic-meta-block { flex: 1; padding: 0 20px 0 0; }
.ic-meta-block:first-child { padding-left: 0; }
.ic-dates-block { flex: 0.8; }
.ic-vline { width: 1px; margin: 0 12px; flex-shrink: 0; }
.ic-meta-head {
  font-size: 9.5px; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1.5px;
  margin-bottom: 8px;
}
.ic-meta-name {
  font-size: 14px; font-weight: 800;
  color: #111; margin-bottom: 5px;
}
.ic-meta-line { font-size: 12px; color: #6b7280; line-height: 1.7; }
.ic-date-row { margin-bottom: 10px; }
.ic-date-lbl {
  font-size: 10px; font-weight: 700;
  color: #9ca3af; text-transform: uppercase;
  letter-spacing: .8px; margin-bottom: 2px;
}
.ic-date-val { font-size: 13px; font-weight: 700; color: #111; }

/* Tableau */
.ic-table-wrap { margin-bottom: 6px; }
.ic-table { width: 100%; border-collapse: collapse; }
.ic-th {
  padding: 10px 14px;
  font-size: 10px; font-weight: 800;
  letter-spacing: 1px; text-transform: uppercase;
  border-bottom: 2px solid;
}
.ic-tr-alt td { background: #f9fafb; }
.ic-td {
  padding: 11px 14px;
  font-size: 12.5px;
  border-bottom: 1px solid #f3f4f6;
}
.ic-td-desc { color: #111; font-weight: 500; }
.ic-td-center { text-align: center; color: #6b7280; }
.ic-td-right { text-align: right; }

/* Totaux classique */
.ic-totals-section {
  display: flex;
  padding: 8px 0 24px;
}
.ic-totals-spacer { flex: 1; }
.ic-totals-box {
  width: 280px;
  border: 1.5px solid;
  border-radius: 8px;
  overflow: hidden;
}
.ic-tot-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 14px;
  font-size: 12.5px;
  border-bottom: 1px solid #f3f4f6;
}
.ic-tot-lbl { color: #6b7280; }
.ic-tot-val { font-weight: 600; color: #111; }
.ic-discount { color: #dc2626; }
.ic-tot-grand {
  display: flex;
  justify-content: space-between;
  padding: 12px 14px;
  font-size: 14px; font-weight: 900;
  border-top: 2.5px solid;
  border-bottom: none;
  background: #fff;
}

/* Bas de page */
.ic-bottom-row {
  display: flex;
  gap: 24px;
  margin-top: auto;
  padding-top: 20px;
}
.ic-bottom-left { flex: 1; }
.ic-payment-box {
  padding: 12px 14px;
  background: #f9fafb;
  border-left: 3px solid;
  border-radius: 0 6px 6px 0;
  margin-bottom: 12px;
}
.ic-notes-box {
  padding: 10px 14px;
  background: #f9fafb;
  border-radius: 6px;
}
.ic-box-title {
  font-size: 9px; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1.2px;
  margin-bottom: 5px;
}
.ic-box-text { font-size: 12px; color: #4b5563; line-height: 1.65; }
.ic-signature-box {
  width: 180px;
  border: 1.5px solid;
  border-radius: 8px;
  padding: 14px;
  display: flex; flex-direction: column;
  align-items: center; gap: 8px;
  flex-shrink: 0;
}
.ic-sig-label {
  font-size: 9.5px; font-weight: 700;
  color: #9ca3af; text-transform: uppercase;
  letter-spacing: 1px;
}
.ic-sig-area {
  flex: 1;
  min-height: 60px;
  width: 100%;
  border-radius: 4px;
  background: #f9fafb;
}
.ic-sig-name { font-size: 11.5px; color: #9ca3af; font-style: italic; }

/* Footer classique */
.ic-footer {
  margin-top: 24px;
}
.ic-footer-line { height: 2px; border-radius: 99px; margin-bottom: 10px; }
.ic-footer-text {
  font-size: 10.5px; color: #9ca3af;
  text-align: center; line-height: 1.7;
  display: flex; flex-wrap: wrap; justify-content: center; gap: 0 4px;
}
</style>