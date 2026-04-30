<template>
  <div class="shell" :class="{ 'menu-open': mobileOpen }">
    <!-- ══════════════════════ HEADER ══════════════════════ -->
    <header class="nav">
      <div class="container nav-inner">
        <RouterLink to="/" class="nav-logo">
          <div class="logo-mark">CPP</div>
          <span class="logo-text">Factures</span>
        </RouterLink>
        <nav class="nav-links">
          <!-- <RouterLink to="/cv-builder" active-class="active">Créer mon CV</RouterLink>
          <RouterLink to="/formations" active-class="active">Formations</RouterLink>
          <RouterLink to="/emploi" active-class="active">Offres d'emploi</RouterLink>
          <RouterLink to="/pricing" active-class="active">Pricing</RouterLink>
          <RouterLink to="/product" active-class="active">Ressources</RouterLink> -->
        </nav>

        <div class="nav-right">
          <button class="btn btn-icon btn-ghost" @click="theme.toggle()">
            <span v-html="theme.isDark ? ICONS.sun : ICONS.moon" />
          </button>

          <template v-if="auth.isLoggedIn">
            <template v-if="isDashboard">
              <div class="umenu" v-click-outside="() => uopen = false">
                <button class="utrigger" @click="uopen = !uopen">
                  <div class="uavatar">{{ auth.user?.initials || 'KS' }}</div>
                  <div class="uinfo">
                    <span class="uname">{{ auth.user?.name || 'Mon compte' }}</span>
                    <span class="urole">{{ auth.user?.role || 'Admin' }}</span>
                  </div>
                  <svg class="chevron" :class="{ open: uopen }" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <Transition name="drop">
                  <div v-if="uopen" class="udropdown">
                    <div class="ud-head">
                      <div class="ud-name">{{ auth.user?.name || 'Mon compte' }}</div>
                      <div class="ud-email">{{ auth.user?.email || '' }}</div>
                    </div>
                    <div class="ud-body">

                      <RouterLink to="/dashboard/parametres" class="ud-item" @click="uopen = false">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <circle cx="12" cy="12" r="3" />
                          <path
                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Paramètres
                      </RouterLink>
                    </div>
                    <div class="ud-foot">
                      <button class="ud-item logout" @click="doLogout">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </template>
            <template v-else>
              <RouterLink to="/dashboard" class="btn btn-secondary btn-sm">Dashboard</RouterLink>
            </template>
          </template>

          <template v-else>
            <RouterLink to="/login" class="btn btn-ghost btn-sm">Connexion</RouterLink>
            <RouterLink to="/register" class="btn btn-primary btn-sm">Rejoindre</RouterLink>
          </template>

          <button v-if="!isDashboard" class="burger" @click="mobileOpen = !mobileOpen">
            <span v-html="mobileOpen ? ICONS.x : ICONS.menu" />
          </button>
        </div>
      </div>

      <!-- Menu mobile public -->
      <div v-if="!isDashboard" class="mobile-menu" :class="{ open: mobileOpen }">
        <!-- <nav class="mobile-links">
          <RouterLink to="/cv-builder" @click="mobileOpen = false" active-class="active">Créer mon CV</RouterLink>
          <RouterLink to="/formations" @click="mobileOpen = false" active-class="active">Formations</RouterLink>
          <RouterLink to="/emploi" @click="mobileOpen = false" active-class="active">Offres d'emploi</RouterLink>
          <RouterLink to="/pricing" @click="mobileOpen = false" active-class="active">Pricing</RouterLink>
          <RouterLink to="/product" @click="mobileOpen = false" active-class="active">Ressources</RouterLink>
          <div class="mobile-auth">
            <template v-if="auth.isLoggedIn">
              <RouterLink to="/dashboard" class="btn btn-secondary">Dashboard</RouterLink>
            </template>
            <template v-else>
              <RouterLink to="/login" class="btn btn-secondary">Connexion</RouterLink>
              <RouterLink to="/register" class="btn btn-primary">Rejoindre</RouterLink>
            </template>
          </div>
        </nav> -->
      </div>
    </header>

    <!-- ══════════════════════ DASHBOARD LAYOUT ══════════════════════ -->
    <template v-if="isDashboard">
      <div class="dash-layout">

        <!-- SIDEBAR -->
        <aside class="sidebar">
          <div class="sb-logo">
            <RouterLink to="/" class="sb-logo-link">
              <div class="logo-mark sm">CPP</div>
              <!-- <div>
                <div class="sb-logo-text">Carrière Pro Plus</div>
                <div class="sb-logo-sub">CPP</div>
              </div> -->
            </RouterLink>
          </div>

          <nav class="sb-nav">
            <span class="sb-section">Principal</span>
            <RouterLink to="/dashboard" class="sb-item" :class="{ active: route.name === 'dash-home' }">
              <span v-html="ICONS.dashboard" />Vue d'ensemble
            </RouterLink>
            <RouterLink to="/dashboard/enrollments" class="sb-item" active-class="active">
              <span v-html="ICONS.formation" />Mes Cours
            </RouterLink>
            <RouterLink to="/dashboard/parametres" class="sb-item" active-class="active">
              <span v-html="ICONS.settings" />Paramètres
            </RouterLink>

            <template v-if="isAdmin">
              <RouterLink to="/dashboard/articles" class="sb-item" active-class="active"><span
                  v-html="ICONS.article" />Articles</RouterLink>
              <RouterLink to="/dashboard/ventes" class="sb-item" active-class="active"><span v-html="ICONS.ventes" />Mes
                ventes</RouterLink>
              <RouterLink to="/dashboard/ressources" class="sb-item" active-class="active"><span
                  v-html="ICONS.book" />Produits</RouterLink>
              <RouterLink to="/dashboard/formations" class="sb-item" active-class="active"><span
                  v-html="ICONS.formation" />Formations</RouterLink>

              <span class="sb-section" style="margin-top:8px">Administration</span>
              <RouterLink to="/dashboard/membres" class="sb-item" active-class="active"><span
                  v-html="ICONS.users" />Membres</RouterLink>
              <RouterLink to="/dashboard/tags" class="sb-item" active-class="active"><span v-html="ICONS.tags" />Tags
              </RouterLink>
              <RouterLink to="/dashboard/countries" class="sb-item" active-class="active"><span
                  v-html="ICONS.pays" />Gestion des pays</RouterLink>
              <RouterLink to="/dashboard/payment-methods" class="sb-item" active-class="active"><span
                  v-html="ICONS.payment" />Modes de paiement</RouterLink>
            </template>
          </nav>

          <div class="sb-user">
            <div class="avatar avatar-md" style="background:var(--accent);color:var(--accent-fg)">{{ auth.user?.initials
              || 'KS'
              }}</div>
            <div class="sb-user-info">
              <div class="sb-uname">{{ auth.user?.name || 'Digi' }}</div>
              <div class="sb-urole">{{ auth.user?.role || 'Admin' }}</div>
            </div>
            <button class="sb-logout" @click="doLogout" title="Déconnexion" v-html="ICONS.logout" />
          </div>
        </aside>

        <!-- CONTENU DASHBOARD -->
        <main class="dash-main">
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </main>

      </div>

      <!-- Bottom nav mobile dashboard -->
      <nav class="bottom-nav">
        <div class="bn-scroll">
          <RouterLink to="/dashboard" class="bn-item" :class="{ active: route.name === 'dash-home' }"><span
              v-html="ICONS.dashboard" /><span>Accueil</span></RouterLink>
          <RouterLink to="/dashboard/enrollments" class="bn-item" active-class="active"><span
              v-html="ICONS.formation" /><span>Mes Cours</span></RouterLink>
          <RouterLink to="/dashboard/parametres" class="bn-item" active-class="active"><span
              v-html="ICONS.settings" /><span>Paramètres</span></RouterLink>
          <template v-if="isAdmin">
            <RouterLink to="/dashboard/articles" class="bn-item" active-class="active"><span
                v-html="ICONS.article" /><span>Articles</span></RouterLink>
            <RouterLink to="/dashboard/ventes" class="bn-item" active-class="active"><span
                v-html="ICONS.ventes" /><span>Ventes</span></RouterLink>
            <RouterLink to="/dashboard/ressources" class="bn-item" active-class="active"><span
                v-html="ICONS.book" /><span>Produits</span></RouterLink>
            <RouterLink to="/dashboard/formations" class="bn-item" active-class="active"><span
                v-html="ICONS.formation" /><span>Formations</span></RouterLink>
            <RouterLink to="/dashboard/membres" class="bn-item" active-class="active"><span
                v-html="ICONS.users" /><span>Membres</span></RouterLink>
            <RouterLink to="/dashboard/tags" class="bn-item" active-class="active"><span
                v-html="ICONS.tags" /><span>Tags</span></RouterLink>
            <RouterLink to="/dashboard/countries" class="bn-item" active-class="active"><span
                v-html="ICONS.pays" /><span>Pays</span></RouterLink>
            <RouterLink to="/dashboard/payment-methods" class="bn-item" active-class="active"><span
                v-html="ICONS.payment" /><span>Paiements</span></RouterLink>
          </template>
        </div>
      </nav>
    </template>

    <!-- ══════════════════════ PUBLIC LAYOUT ══════════════════════ -->
    <template v-else>
      <main class="pub-main">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>

      <!-- FOOTER RICHE — Multi-sections + App Stores -->
      <footer class="pub-footer">
        <div class="container footer-content">

          <!-- FOOTER GRID — 4 colonnes -->
          <div class="footer-grid">

            <!-- Col 1 : Branding + socials -->
            <div class="footer-col">
              <div class="footer-logo">
                <div class="logo-mark">CPP</div>
                <div>
                  <div class="logo-text">KGS INFORMATIQUE CI </div>
                  <div class="logo-sub">Côte d'Ivoire</div>
                </div>
              </div>
              <p class="footer-desc">
                  conception de cv carte de visite professionelle impprimanable 
              </p>
              <div class="footer-socials">
                <div class="footer-socials">
                  <!-- LinkedIn -->
                  <a href="https://www.linkedin.com/company/carriere-pro-plus/posts/?feedView=all" class="social-link"
                    title="LinkedIn" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.2 8h4.56v14H.2V8zM8.16 8h4.37v1.92h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.48 3.05 5.48 7.02V22h-4.56v-6.91c0-1.65-.03-3.78-2.3-3.78-2.3 0-2.65 1.8-2.65 3.66V22H8.16V8z" />
                    </svg>
                  </a>

                  <!-- WhatsApp -->
                  <a href="https://whatsapp.com/channel/0029Vb6IlA69xVJXz4JSAt0E" class="social-link" title="WhatsApp"
                    target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.4 0 .06 5.34.06 12c0 2.12.55 4.2 1.6 6.04L0 24l6.15-1.61A11.94 11.94 0 0 0 12.06 24c6.66 0 12-5.34 12-12 0-3.2-1.25-6.22-3.54-8.52zM12.06 21.8c-1.8 0-3.56-.48-5.1-1.4l-.36-.21-3.65.96.97-3.56-.24-.37A9.76 9.76 0 0 1 2.3 12c0-5.4 4.36-9.76 9.76-9.76 2.6 0 5.05 1.01 6.88 2.84A9.7 9.7 0 0 1 21.8 12c0 5.4-4.36 9.8-9.74 9.8zm5.43-7.35c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.34.22-.63.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.6.14-.14.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.5.07-.76.37-.26.3-1 1-1 2.45 0 1.45 1.03 2.85 1.18 3.05.15.2 2.03 3.1 4.93 4.35.7.3 1.25.48 1.68.62.7.22 1.33.19 1.83.12.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35z" />
                    </svg>
                  </a>
                </div>

              </div>
            </div>

            <!-- Col 2 : Produits -->
            <div class="footer-col">
              <h4 class="footer-title">Produits</h4>
             
            </div>

            <!-- Col 3 : Pour les entreprises -->
            <div class="footer-col">
              <h4 class="footer-title">Entreprises</h4>
            
            </div>

            <!-- Col 4 : Légal + À propos -->
            <div class="footer-col">
              <h4 class="footer-title">À propos</h4>
              
            </div>

          </div>

          <!-- APPS STORES SECTION -->
          <div class="footer-apps">
            
            <div class="apps-links">

              <!-- App Store -->
              <a href="#" class="app-link app-apple" target="_blank" rel="noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M16.37 1.43c0 1.14-.47 2.2-1.21 2.97-.77.8-2.03 1.42-3.13 1.33-.14-1.1.4-2.26 1.16-3.02.83-.82 2.19-1.41 3.18-1.28zM21.36 17.2c-.58 1.35-.85 1.95-1.6 3.1-1.04 1.6-2.5 3.6-4.33 3.62-1.62.02-2.04-1.06-4.25-1.05-2.2.01-2.67 1.07-4.29 1.05-1.83-.02-3.21-1.83-4.25-3.43C.61 17.94-.6 13.1 1.7 9.7c1.15-1.68 3.2-2.74 5.08-2.74 1.88 0 3.06 1.06 4.61 1.06 1.51 0 2.43-1.06 4.6-1.06 1.67 0 3.44.9 4.59 2.44-4.03 2.2-3.37 7.96.78 9.8z" />
                </svg>
                <div>
                  <span class="app-label">App Store</span>
                  <span class="app-cta">Télécharger</span>
                </div>
              </a>

              <!-- Google Play -->
              <a href="#" class="app-link app-android" target="_blank" rel="noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M3 2l13.5 10L3 22V2zm14.5 9.2L20.5 9c.8.5.8 1.7 0 2.2l-3 2.2-2.1-2.2 2.1-2zM14.8 13.5L5.5 20l8.2-6.5 1.1 1zM13.7 10.5L5.5 4l9.3 6.5-1.1 1z" />
                </svg>
                <div>
                  <span class="app-label">Google Play</span>
                  <span class="app-cta">Installer</span>
                </div>
              </a>

            </div>
          </div>

          <!-- FOOTER BOTTOM — Copyright + credits -->
          <div class="footer-bottom">
            
            <div class="footer-right">
              <span>Développé par <strong>KGS Informatique</strong></span>
            </div>
          </div>

        </div>
      </footer>
    </template>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { ICONS } from '@/composables/icons'

const theme = useThemeStore()
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const mobileOpen = ref(false)
const uopen = ref(false)

const isDashboard = computed(() => route.path.startsWith('/dashboard'))
const isAdmin = computed(() => auth.user?.role === 'admin')

function doLogout() { auth.logout(); router.push('/login') }

const vClickOutside = {
  mounted(el, binding) {
    el._out = (e) => { if (!el.contains(e.target)) binding.value(e) }
    document.addEventListener('click', el._out)
  },
  unmounted(el) { document.removeEventListener('click', el._out) },
}
</script>

<style scoped>
/* ═══════════════════════════════════════
   SHELL — colonne pleine hauteur
═══════════════════════════════════════ */
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ═══════════════════════════════════════
   HEADER
═══════════════════════════════════════ */
.nav {
  flex-shrink: 0;
  height: var(--nav-h);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  z-index: 200;
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-mark {
  width: 34px;
  height: 34px;
  background: var(--text);
  color: var(--bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.logo-mark.sm {
  width: 30px;
  height: 30px;
  font-size: 10px;
  border-radius: 7px;
}

.logo-text {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  font-family: var(--font-alt);
}

.nav-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-links a {
  padding: 6px 13px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text3);
  border-radius: var(--radius-sm);
  transition: all .12s;
  white-space: nowrap;
  text-decoration: none;
}

.nav-links a:hover {
  color: var(--text);
  background: var(--surface2);
}

.nav-links a.active {
  color: var(--text);
  font-weight: 600;
}

.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.burger {
  display: none;
  background: none;
  border: none;
  color: var(--text2);
  cursor: pointer;
  padding: 4px;
  align-items: center;
  justify-content: center;
}

/* Menu mobile */
.mobile-menu {
  overflow: hidden;
  max-height: 0;
  transition: max-height .28s ease;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.mobile-menu.open {
  max-height: 600px;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  padding: 16px 24px 20px;
  gap: 2px;
}

.mobile-links a {
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 500;
  color: var(--text2);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: all .12s;
}

.mobile-links a:hover {
  background: var(--surface2);
  color: var(--text);
}

.mobile-auth {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

/* User menu dropdown */
.umenu {
  position: relative;
}

.utrigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px 5px 5px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  transition: all .15s;
}

.utrigger:hover {
  background: var(--surface2);
  border-color: var(--border2);
}

.uavatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--accent-fg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.uinfo {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.uname {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
}

.urole {
  font-size: 10.5px;
  color: var(--text4);
  line-height: 1.2;
  text-transform: capitalize;
}

.chevron {
  color: var(--text4);
  transition: transform .2s;
  flex-shrink: 0;
}

.chevron.open {
  transform: rotate(180deg);
}

.udropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 210px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .1);
  overflow: hidden;
  z-index: 300;
}

.ud-head {
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
}

.ud-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2px;
}

.ud-email {
  font-size: 11.5px;
  color: var(--text4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ud-body {
  padding: 6px;
}

.ud-foot {
  padding: 6px;
  border-top: 1px solid var(--border);
}

.ud-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text2);
  text-decoration: none;
  transition: all .1s;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.ud-item:hover {
  background: var(--surface2);
  color: var(--text);
}

.ud-item.logout {
  color: var(--text3);
}

.ud-item.logout:hover {
  background: rgba(220, 38, 38, .08);
  color: #ef4444;
}

.ud-item svg {
  opacity: .6;
  flex-shrink: 0;
}

.ud-item:hover svg {
  opacity: 1;
}

/* ═══════════════════════════════════════
   DASHBOARD LAYOUT — sidebar + contenu
═══════════════════════════════════════ */
.dash-layout {
  display: flex;
  flex-direction: row;
  height: calc(100vh - var(--nav-h));
  overflow: hidden;
}

/* SIDEBAR */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sb-logo {
  padding: 16px 14px 12px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.sb-logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.sb-logo-text {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}

.sb-logo-sub {
  font-size: 10px;
  color: var(--text4);
}

.sb-nav {
  padding: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.sb-section {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .6px;
  text-transform: uppercase;
  color: var(--text5);
  padding: 12px 8px 4px;
}

.sb-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text3);
  text-decoration: none;
  transition: background .1s, color .1s;
}

.sb-item:hover {
  background: var(--surface2);
  color: var(--text);
}

.sb-item.active {
  background: var(--surface2);
  color: var(--text);
  font-weight: 600;
}

.sb-item span:first-child {
  display: flex;
  flex-shrink: 0;
  opacity: .55;
}

.sb-item.active span:first-child,
.sb-item:hover span:first-child {
  opacity: 1;
}

.sb-user {
  border-top: 1px solid var(--border);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
}

.sb-user-info {
  flex: 1;
  min-width: 0;
}

.sb-uname {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sb-urole {
  font-size: 11px;
  color: var(--text4);
  text-transform: capitalize;
}

.sb-logout {
  background: none;
  border: none;
  color: var(--text4);
  cursor: pointer;
  padding: 4px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: background .1s, color .1s;
}

.sb-logout:hover {
  background: var(--surface2);
  color: var(--red, #dc2626);
}

/* CONTENU DASHBOARD */
.dash-main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 28px 32px 60px;
  scrollbar-width: thin;
}

/* ═══════════════════════════════════════
   PUBLIC LAYOUT
═══════════════════════════════════════ */
.pub-main {
  flex: 1;
}

/* ═══════════════════════════════════════
   FOOTER RICHE
═══════════════════════════════════════ */
.pub-footer {
  background: var(--text);
  color: rgba(255, 255, 255, .6);
  padding: 60px 0 20px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* Grid 4 colonnes */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-logo .logo-mark {
  background: rgba(255, 255, 255, .12);
  color: #fff;
  width: 40px;
  height: 40px;
  font-size: 11px;
  border-radius: 8px;
}

.footer-logo .logo-text {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.footer-logo .logo-sub {
  color: rgba(255, 255, 255, .35);
  font-size: 11px;
}

.footer-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, .5);
}

.footer-socials {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.social-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .08);
  border: 1px solid rgba(255, 255, 255, .12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, .6);
  text-decoration: none;
  transition: all .2s;
}

.social-link:hover {
  background: rgba(255, 255, 255, .15);
  color: #fff;
  border-color: rgba(255, 255, 255, .2);
}

.footer-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: .6px;
  margin-bottom: 4px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-links a {
  font-size: 13px;
  color: rgba(255, 255, 255, .55);
  text-decoration: none;
  transition: color .15s;
}

.footer-links a:hover {
  color: rgba(255, 255, 255, .85);
}

/* Apps stores section */
.footer-apps {
  border-top: 1px solid rgba(255, 255, 255, .08);
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.apps-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.apps-desc {
  font-size: 13.5px;
  color: rgba(255, 255, 255, .5);
  line-height: 1.5;
  max-width: 400px;
}

.apps-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.app-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  background: rgba(255, 255, 255, .04);
  text-decoration: none;
  transition: all .2s;
  flex: 0 1 200px;
}

.app-link:hover {
  background: rgba(255, 255, 255, .08);
  border-color: rgba(255, 255, 255, .2);
}

.app-link svg {
  flex-shrink: 0;
  opacity: .7;
}

.app-link:hover svg {
  opacity: 1;
}

.app-link>div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-label {
  font-size: 11px;
  color: rgba(255, 255, 255, .5);
  text-transform: uppercase;
  letter-spacing: .5px;
  font-weight: 600;
}

.app-cta {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
}

/* Footer bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, .08);
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12.5px;
  color: rgba(255, 255, 255, .4);
}

.separator {
  opacity: .3;
}

.footer-right {
  white-space: nowrap;
}

.footer-right strong {
  color: rgba(255, 255, 255, .6);
}

/* ═══════════════════════════════════════
   TRANSITIONS
═══════════════════════════════════════ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drop-enter-active,
.drop-leave-active {
  transition: opacity .15s, transform .15s;
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ═══════════════════════════════════════
   BOTTOM NAV — mobile dashboard
═══════════════════════════════════════ */
.bottom-nav {
  display: none;
}

/* ═══════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════ */
@media (max-width: 1200px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 960px) {
  .nav-links {
    display: none;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .apps-links {
    flex-direction: column;
  }

  .app-link {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .shell {
    height: auto;
    overflow: visible;
  }

  .burger {
    display: flex;
  }

  /* Sidebar cachée sur mobile */
  .sidebar {
    display: none;
  }

  /* Layout dashboard en colonne */
  .dash-layout {
    flex-direction: column;
    overflow: visible;
  }

  .dash-main {
    padding: 16px 16px 80px;
    overflow: visible;
  }

  /* Cacher les infos texte user trigger */
  .uinfo,
  .chevron {
    display: none;
  }

  .utrigger {
    padding: 4px;
    border-radius: 50%;
  }

  /* Bottom nav */
  .bottom-nav {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .bn-scroll {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    padding: 0 4px;
  }

  .bn-scroll::-webkit-scrollbar {
    display: none;
  }

  .bn-item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 10px 14px;
    color: var(--text4);
    font-size: 10px;
    font-weight: 500;
    text-decoration: none;
    transition: color .12s;
    white-space: nowrap;
  }

  .bn-item span:first-child {
    display: flex;
  }

  .bn-item span:first-child svg {
    width: 20px;
    height: 20px;
    opacity: .5;
  }

  .bn-item.active {
    color: var(--text);
  }

  .bn-item.active span:first-child svg {
    opacity: 1;
  }

  .pub-footer {
    padding: 40px 0 16px;
  }

  .footer-content {
    gap: 32px;
  }
}

@media (max-width: 640px) {
  .footer-col {
    gap: 12px;
  }

  .footer-title {
    font-size: 12px;
  }

  .footer-desc {
    font-size: 12.5px;
  }

  .footer-socials {
    gap: 8px;
  }

  .social-link {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .nav-right .btn:not(.btn-icon):not(.burger) {
    display: none;
  }
}
</style>