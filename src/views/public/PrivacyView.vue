<template>
  <main class="privacy-page">

    <!-- HEADER -->
    <section class="privacy-header">
      <div class="container">
        <div class="header-intro">
          <h1>Politique de Confidentialité</h1>
          <h2 class="subtitle">Carrière Pro Plus</h2>
        </div>
        <p class="update-date">Dernière mise à jour : Avril 2026</p>
      </div>
    </section>

    <!-- TABS NAVIGATION -->
    <section class="privacy-tabs-section">
      <div class="container">
        <div class="tabs-nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-btn"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- TABS CONTENT -->
    <section class="privacy-content">
      <div class="container">

        <!-- TAB 1 : COLLECTE DE DONNÉES -->
        <div v-show="activeTab === 'collecte'" class="tab-content">
          <h2>1. Collecte de Données Personnelles</h2>

          <div class="content-block">
            <h3>Informations que nous collectons</h3>
            <p>Carrière Pro Plus collecte les données personnelles suivantes :</p>
            
            <div class="data-grid">
              <div class="data-item">
                <div class="data-icon">👤</div>
                <div class="data-info">
                  <h4>Identité</h4>
                  <p>Nom, prénom, adresse email, numéro de téléphone, photo de profil</p>
                </div>
              </div>

              <div class="data-item">
                <div class="data-icon">📄</div>
                <div class="data-info">
                  <h4>CV et Expérience Professionnelle</h4>
                  <p>CV complet, historique d'emploi, compétences, certifications, années d'expérience</p>
                </div>
              </div>

              <div class="data-item">
                <div class="data-icon">🎓</div>
                <div class="data-info">
                  <h4>Formation et Éducation</h4>
                  <p>Diplômes, établissements fréquentés, domaines d'étude, année d'obtention</p>
                </div>
              </div>

              <div class="data-item">
                <div class="data-icon">💼</div>
                <div class="data-info">
                  <h4>Préférences Professionnelles</h4>
                  <p>Secteurs d'intérêt, types de contrats (CDI, CDD, stage), localisation souhaitée</p>
                </div>
              </div>

              <div class="data-item">
                <div class="data-icon">📍</div>
                <div class="data-info">
                  <h4>Localisation</h4>
                  <p>Adresse, ville, pays, coordonnées GPS (avec consentement)</p>
                </div>
              </div>

              <div class="data-item">
                <div class="data-icon">💳</div>
                <div class="data-info">
                  <h4>Données de Paiement</h4>
                  <p>Informations de facturation, historique des transactions, plan d'abonnement</p>
                </div>
              </div>

              <div class="data-item">
                <div class="data-icon">📊</div>
                <div class="data-info">
                  <h4>Données de Comportement</h4>
                  <p>Historique de consultation, offres consultées, applications envoyées, interactions</p>
                </div>
              </div>

              <div class="data-item">
                <div class="data-icon">🔐</div>
                <div class="data-info">
                  <h4>Données Techniques</h4>
                  <p>Adresse IP, type de navigateur, pages visitées, heure d'accès, cookies</p>
                </div>
              </div>
            </div>
          </div>

          <div class="content-block">
            <h3>Méthodes de collecte</h3>
            <ul class="bullet-list">
              <li>Formulaires d'inscription et de profil</li>
              <li>Téléchargement de CV et documents</li>
              <li>Navigation sur la plateforme (tracking)</li>
              <li>Cookies et technologies similaires</li>
              <li>Partenariats avec des entreprises</li>
              <li>Feedback et enquêtes utilisateur</li>
            </ul>
          </div>
        </div>

        <!-- TAB 2 : UTILISATION DES DONNÉES -->
        <div v-show="activeTab === 'utilisation'" class="tab-content">
          <h2>2. Utilisation des Données</h2>

          <div class="content-block">
            <h3>Nos données sont utilisées pour :</h3>
            
            <div class="use-case-grid">
              <div class="use-case">
                <h4>✓ Service et Plateforme</h4>
                <p>Créer et gérer votre compte, générer votre CV, afficher les offres d'emploi adaptées</p>
              </div>

              <div class="use-case">
                <h4>✓ Accompagnement Professionnel</h4>
                <p>Fournir coaching carrière, préparation d'entretiens, conseils de positionnement</p>
              </div>

              <div class="use-case">
                <h4>✓ Communication</h4>
                <p>Vous contacter sur l'évolution des candidatures, offres pertinentes, mises à jour</p>
              </div>

              <div class="use-case">
                <h4>✓ Amélioration du Service</h4>
                <p>Analyser l'utilisation pour améliorer la plateforme et expérience utilisateur</p>
              </div>

              <div class="use-case">
                <h4>✓ Recommandations</h4>
                <p>Proposer des offres d'emploi correspondant à votre profil et préférences</p>
              </div>

              <div class="use-case">
                <h4>✓ Sécurité</h4>
                <p>Prévenir la fraude, protéger contre les abus, respecter les lois applicables</p>
              </div>
            </div>
          </div>

          <div class="content-block">
            <h3>Partage avec les entreprises partenaires</h3>
            <p>
              Votre CV et profil peuvent être partagés avec nos entreprises partenaires dans le cadre de matching d'offres d'emploi, 
              uniquement avec votre consentement explicite. Les partenaires s'engagent à respecter cette politique.
            </p>
          </div>

          <div class="content-block">
            <h3>Données que nous NE partageons JAMAIS :</h3>
            <ul class="bullet-list">
              <li>Données bancaires brutes (seulement avec processeur de paiement sécurisé)</li>
              <li>Numéro de sécurité sociale ou documents d'identité originaux</li>
              <li>Données sensibles sans consentement explicite</li>
              <li>Données à des tiers commerciaux non autorisés</li>
            </ul>
          </div>
        </div>

        <!-- TAB 3 : SÉCURITÉ -->
        <div v-show="activeTab === 'securite'" class="tab-content">
          <h2>3. Sécurité et Protection des Données</h2>

          <div class="content-block">
            <h3>Mesures de sécurité</h3>
            <ul class="bullet-list">
              <li><strong>Chiffrement SSL/TLS :</strong> Toutes les données en transit sont chiffrées</li>
              <li><strong>Stockage sécurisé :</strong> Bases de données protégées et sauvegardées régulièrement</li>
              <li><strong>Accès limité :</strong> Seul le personnel autorisé a accès aux données sensibles</li>
              <li><strong>Authentification multi-facteurs :</strong> Options de sécurité supplémentaires disponibles</li>
              <li><strong>Audit de sécurité :</strong> Tests réguliers de vulnérabilité</li>
              <li><strong>Conformité :</strong> Respect des standards RGPD et données personnelles</li>
            </ul>
          </div>

          <div class="content-block">
            <h3>Vos responsabilités</h3>
            <ul class="bullet-list">
              <li>Gardez votre mot de passe confidentiel</li>
              <li>Ne partagez pas votre compte avec d'autres personnes</li>
              <li>Signalez tout accès non autorisé immédiatement</li>
              <li>Mettez à jour vos informations régulièrement</li>
            </ul>
          </div>

          <div class="alert">
            <strong>⚠️ En cas de violation de données :</strong> Nous vous notifierons dans les 72 heures et prendrons toutes les mesures nécessaires.
          </div>
        </div>

        <!-- TAB 4 : VOS DROITS -->
        <div v-show="activeTab === 'droits'" class="tab-content">
          <h2>4. Vos Droits et Contrôle des Données</h2>

          <div class="content-block">
            <h3>Droits RGPD</h3>
            <p>En vertu du RGPD et des lois de protection des données, vous avez le droit de :</p>
            
            <div class="rights-grid">
              <div class="right-item">
                <h4>📋 Accès</h4>
                <p>Demander une copie de toutes vos données personnelles</p>
              </div>

              <div class="right-item">
                <h4>✏️ Rectification</h4>
                <p>Corriger ou mettre à jour vos informations inexactes</p>
              </div>

              <div class="right-item">
                <h4>🗑️ Suppression</h4>
                <p>Demander l'effacement de vos données (droit à l'oubli)</p>
              </div>

              <div class="right-item">
                <h4>⛔ Opposition</h4>
                <p>Vous opposer à certains traitements de vos données</p>
              </div>

              <div class="right-item">
                <h4>📤 Portabilité</h4>
                <p>Exporter vos données dans un format lisible</p>
              </div>

              <div class="right-item">
                <h4>⏸️ Limitation</h4>
                <p>Limiter le traitement de vos données</p>
              </div>
            </div>
          </div>

          <div class="content-block">
            <h3>Comment exercer vos droits</h3>
            <p>
              Pour exercer l'un de ces droits, veuillez nous contacter à : 
              <strong>contact@carriereproplus.net</strong>
            </p>
            <p>Nous traiterons votre demande dans les 30 jours ouvrables.</p>
          </div>

          <div class="content-block">
            <h3>Contrôle des Cookies</h3>
            <p>
              Vous pouvez refuser ou supprimer les cookies à tout moment via les paramètres de votre navigateur. 
              Cela peut limiter certaines fonctionnalités de la plateforme.
            </p>
          </div>
        </div>

        <!-- TAB 5 : RÉTENTION DES DONNÉES -->
        <div v-show="activeTab === 'retention'" class="tab-content">
          <h2>5. Conservation des Données</h2>

          <div class="content-block">
            <h3>Durée de conservation</h3>
            <p>Nous conservons vos données personnelles aussi longtemps que nécessaire pour :</p>
            
            <div class="retention-grid">
              <div class="retention-item">
                <h4>Compte Actif</h4>
                <p><strong>Durée :</strong> Tant que votre compte est actif</p>
                <p>Vos données sont conservées pour vous fournir nos services</p>
              </div>

              <div class="retention-item">
                <h4>Après Suppression</h4>
                <p><strong>Durée :</strong> 90 jours maximum</p>
                <p>Délai pour sauvegardes et récupération en cas d'erreur</p>
              </div>

              <div class="retention-item">
                <h4>Données Légales</h4>
                <p><strong>Durée :</strong> 5-7 ans selon la loi</p>
                <p>Transactions, factures, conformité réglementaire</p>
              </div>

              <div class="retention-item">
                <h4>Données Marketing</h4>
                <p><strong>Durée :</strong> Jusqu'à désinscription</p>
                <p>Emails newsletters et offres promotionnelles</p>
              </div>
            </div>
          </div>

          <div class="content-block">
            <h3>Suppression des données</h3>
            <p>
              À tout moment, vous pouvez demander la suppression complète de votre compte et données associées. 
              Après confirmation, les données seront supprimées définitivement dans les 30 jours.
            </p>
          </div>
        </div>

        <!-- TAB 6 : CONTACT & PLAINTES -->
        <div v-show="activeTab === 'contact'" class="tab-content">
          <h2>6. Contact et Réclamations</h2>

          <div class="content-block">
            <h3>Contacter notre Responsable de Données</h3>
            <div class="contact-box">
              <p><strong>Email :</strong> contact@carriereproplus.net</p>
              <p><strong>Adresse :</strong> Abidjan, Côte d'Ivoire</p>
              <p><strong>Délai de réponse :</strong> 48-72 heures</p>
            </div>
          </div>

          <div class="content-block">
            <h3>Déposer une réclamation</h3>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez :
            </p>
            <ul class="bullet-list">
              <li>Nous contacter directement pour résoudre le problème</li>
              <li>Déposer plainte auprès de l'autorité de protection des données compétente</li>
              <li>Engager des poursuites judiciaires</li>
            </ul>
          </div>

          <div class="content-block">
            <h3>Modifications de cette politique</h3>
            <p>
              Nous pouvons mettre à jour cette politique à tout moment. Les modifications seront notifiées 
              par email et affichées sur cette page avec la date de mise à jour.
            </p>
          </div>
        </div>

      </div>
    </section>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('collecte')

const tabs = [
  { id: 'collecte', label: 'Collecte de Données' },
  { id: 'utilisation', label: 'Utilisation' },
  { id: 'securite', label: 'Sécurité' },
  { id: 'droits', label: 'Vos Droits' },
  { id: 'retention', label: 'Rétention' },
  { id: 'contact', label: 'Contact' },
]
</script>

<style scoped>
:root {
  --navy: #1c2b4a;
  --gold: #d4a634;
  --navy-bg: #edf0f5;
}

.privacy-page {
  background: #fff;
  color: var(--navy);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
}

/* HEADER */
.privacy-header {
  padding: 80px 0 60px;
  text-align: center;
  background: linear-gradient(135deg, var(--navy-bg) 0%, #fff 100%);
  border-bottom: 1px solid #e5e5e5;
}

.privacy-header h1 {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -2px;
  margin-bottom: 8px;
  color: var(--navy);
}

.subtitle {
  font-size: 20px;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 16px;
}

.update-date {
  font-size: 14px;
  color: #999;
}

/* TABS NAVIGATION */
.privacy-tabs-section {
  padding: 40px 0;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}

.tabs-nav {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabs-nav::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  flex-shrink: 0;
  padding: 10px 16px;
  border: 1px solid #e5e5e5;
  background: #f9f9f9;
  color: var(--navy);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  white-space: nowrap;
}

.tab-btn:hover {
  border-color: var(--gold);
  background: #fff;
}

.tab-btn.active {
  background: var(--navy);
  color: #fff;
  border-color: var(--navy);
}

/* CONTENT */
.privacy-content {
  padding: 60px 0;
}

.tab-content {
  animation: fadeIn .2s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.tab-content h2 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 40px;
  color: var(--navy);
}

.content-block {
  margin-bottom: 48px;
}

.content-block h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--navy);
}

.content-block p {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 12px;
}

.content-block ul {
  margin-bottom: 12px;
}

/* GRIDS */
.data-grid,
.use-case-grid,
.rights-grid,
.retention-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 24px 0;
}

.data-item,
.use-case,
.right-item,
.retention-item {
  padding: 20px;
  background: var(--navy-bg);
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  transition: all .2s;
}

.data-item:hover,
.use-case:hover,
.right-item:hover,
.retention-item:hover {
  border-color: var(--gold);
  box-shadow: 0 8px 24px rgba(28, 43, 74, .08);
}

.data-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.data-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.data-info h4,
.use-case h4,
.right-item h4,
.retention-item h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 6px;
}

.data-info p,
.use-case p,
.right-item p,
.retention-item p {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.use-case,
.right-item,
.retention-item {
  padding: 24px;
}

/* BULLET LIST */
.bullet-list {
  margin: 20px 0;
  padding-left: 24px;
  list-style: none;
}

.bullet-list li {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 10px;
  position: relative;
  padding-left: 12px;
}

.bullet-list li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--gold);
  font-weight: bold;
}

/* ALERT */
.alert {
  padding: 20px;
  background: rgba(212, 166, 52, .1);
  border-left: 4px solid var(--gold);
  border-radius: 8px;
  font-size: 14px;
  color: var(--navy);
  margin: 24px 0;
}

/* CONTACT BOX */
.contact-box {
  padding: 24px;
  background: var(--navy-bg);
  border-radius: 12px;
  border: 1px solid #e5e5e5;
}

.contact-box p {
  margin-bottom: 10px;
}

.contact-box strong {
  color: var(--navy);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .privacy-header {
    padding: 60px 0 40px;
  }

  .privacy-header h1 {
    font-size: 32px;
  }

  .tab-content h2 {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .data-grid,
  .use-case-grid,
  .rights-grid,
  .retention-grid {
    grid-template-columns: 1fr;
  }

  .data-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .data-icon {
    font-size: 40px;
  }

  .tabs-nav {
    gap: 6px;
  }

  .tab-btn {
    padding: 8px 12px;
    font-size: 12px;
  }

  .privacy-content {
    padding: 40px 0;
  }

  .content-block {
    margin-bottom: 36px;
  }
}
</style>