<template>
  <div class="pricing-emploi-page">

    <!-- HEADER -->
    <section class="pricing-header">
      <div class="container">
        <div class="section-tag">Nos plans</div>
        <h1>Trouvez l'emploi de vos rêves</h1>
        <p class="header-desc">
          Choisissez le plan qui correspond à vos besoins et accédez à nos meilleures offres d'emploi.
        </p>
      </div>
    </section>

    <!-- PRICING GRID -->
    <section class="pricing-section">
      <div class="container">
        <div class="pricing-grid">

          <!-- PLAN 1 : ESSENTIEL -->
          <div class="pricing-card essentiel">
            <div class="plan-badge">Démarrage</div>

            <h3 class="plan-name">Essentiel</h3>
            <p class="plan-desc">Accédez aux meilleures offres d'emploi.</p>

            <div class="plan-price">
              <span class="price-amount">1 000</span>
              <span class="price-currency">FCFA</span>
              <span class="price-period">par mois</span>
            </div>

            <button class="btn-enroll" @click="subscribe('essentiel')">
              Choisir ce plan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <div class="plan-divider" />

            <div class="plan-features">
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Offres d'emploi structurées</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Accompagnement basique</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Offres de stage (si besoin)</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Conseils positionnement pro</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Formation carrière</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Support par email</span>
              </div>
            </div>
          </div>

          <!-- PLAN 2 : PROFESSIONNEL (HIGHLIGHT) -->
          <div class="pricing-card professionnel highlight">
            <div class="plan-badge highlight-badge">Populaire</div>

            <h3 class="plan-name">Professionnel</h3>
            <p class="plan-desc">Accompagnement complet pour ta carrière.</p>

            <div class="plan-price">
              <span class="price-amount">10 000</span>
              <span class="price-currency">FCFA</span>
              <span class="price-period">par mois</span>
            </div>

            <button class="btn-enroll highlight-btn" @click="subscribe('professionnel')">
              Choisir ce plan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <div class="plan-divider" />

            <div class="plan-features">
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Tout du plan Essentiel +</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Accompagnement professionnel</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Optimisation avancée CV</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Préparation d'entretien (2/mois)</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Générateur de CV premium</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Support prioritaire 24h/24</span>
              </div>
            </div>
          </div>

          <!-- PLAN 3 : VIP -->
          <div class="pricing-card vip">
            <div class="plan-badge vip-badge">Élite</div>

            <h3 class="plan-name">VIP</h3>
            <p class="plan-desc">Service premium avec coaching intensif.</p>

            <div class="plan-price">
              <span class="price-amount">50 000</span>
              <span class="price-currency">FCFA</span>
              <span class="price-period">par mois</span>
            </div>

            <button class="btn-enroll vip-btn" @click="subscribe('vip')">
              Choisir ce plan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <div class="plan-divider" />

            <div class="plan-features">
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Tout du plan Professionnel +</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Coaching carrière VIP illimité</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Préparation d'entretien avancée</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Suivi personnalisé parcours</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Accès prioritaire aux offres</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Négociation salariale</span>
              </div>
              <div class="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Réponse 1h (24h/24 7j/7)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- COMPARAISON TABLE -->
    <section class="comparison-section">
      <div class="container">
        <h2>Comparaison détaillée</h2>

        <div class="comparison-table">
          <div class="table-header">
            <div class="table-feature">Features</div>
            <div class="table-plan">Essentiel</div>
            <div class="table-plan">Professionnel</div>
            <div class="table-plan">VIP</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Offres d'emploi structurées</div>
            <div class="table-cell">✓</div>
            <div class="table-cell">✓✓</div>
            <div class="table-cell">✓✓✓</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Accompagnement</div>
            <div class="table-cell">Basique</div>
            <div class="table-cell">Professionnel</div>
            <div class="table-cell">VIP complet</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Offres de stage</div>
            <div class="table-cell">✓ (si besoin)</div>
            <div class="table-cell">✓ (si besoin)</div>
            <div class="table-cell">✓ Prioritaire</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Conseils positionnement pro</div>
            <div class="table-cell">✓</div>
            <div class="table-cell">✓✓</div>
            <div class="table-cell">✓✓✓</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Formation carrière</div>
            <div class="table-cell">Basique</div>
            <div class="table-cell">Avancée</div>
            <div class="table-cell">Premium +</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Optimisation CV</div>
            <div class="table-cell">-</div>
            <div class="table-cell">Avancée</div>
            <div class="table-cell">Premium</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Générateur CV</div>
            <div class="table-cell">-</div>
            <div class="table-cell">Premium</div>
            <div class="table-cell">Premium+</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Préparation d'entretien</div>
            <div class="table-cell">-</div>
            <div class="table-cell">2/mois</div>
            <div class="table-cell">Illimitée</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Coaching carrière</div>
            <div class="table-cell">-</div>
            <div class="table-cell">-</div>
            <div class="table-cell">VIP illimité</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Suivi personnalisé parcours</div>
            <div class="table-cell">-</div>
            <div class="table-cell">-</div>
            <div class="table-cell">✓</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Négociation salariale</div>
            <div class="table-cell">-</div>
            <div class="table-cell">-</div>
            <div class="table-cell">✓</div>
          </div>

          <div class="table-row">
            <div class="table-feature">Support</div>
            <div class="table-cell">Email</div>
            <div class="table-cell">24h/24</div>
            <div class="table-cell">1h (24h/24)</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section">
      <div class="container">
        <h2>Questions fréquentes</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h4>Comment changer de plan ?</h4>
            <p>Vous pouvez changer de plan à tout moment. Le changement sera effectif immédiatement et les frais seront ajustés proportionnellement.</p>
          </div>
          <div class="faq-item">
            <h4>Y a-t-il un engagement minimum ?</h4>
            <p>Non, tous les plans sont sans engagement. Vous pouvez vous désabonner à tout moment sans pénalité.</p>
          </div>
          <div class="faq-item">
            <h4>Quand reçois-je mon CV généré ?</h4>
            <p>Votre CV est généré en quelques minutes. Vous pouvez le télécharger et l'utiliser immédiatement pour vos candidatures.</p>
          </div>
          <div class="faq-item">
            <h4>Comment fonctionne l'accompagnement ?</h4>
            <p>Un consultant RH vous contacte dans les 24h pour mettre en place un suivi personnalisé selon votre secteur d'activité.</p>
          </div>
          <div class="faq-item">
            <h4>Puis-je accéder à d'autres offres ?</h4>
            <p>Oui, vous avez accès à toutes les offres selon votre plan. Le plan VIP offre un accès prioritaire aux meilleures offres.</p>
          </div>
          <div class="faq-item">
            <h4>Le stage est-il rémunéré ?</h4>
            <p>Cela dépend de l'entreprise partenaire. Nous proposons des stages rémunérés et non rémunérés selon votre besoin.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta-final">
      <div class="container">
        <h2>Commencez votre recherche d'emploi aujourd'hui</h2>
        <p>Accédez aux meilleures offres d'emploi et trouvez le poste qui correspond à vos ambitions.</p>
        <button class="btn-cta" @click="scrollToPlans">
          Voir les plans
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>

  </div>
</template>

<script setup>
function subscribe(plan) {
  alert(`Plan ${plan.toUpperCase()} sélectionné ! Redirection vers paiement...`)
  // À remplacer par la logique réelle de paiement/inscription
}

function scrollToPlans() {
  document.querySelector('.pricing-grid').scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.pricing-emploi-page {
  background: #fff;
}

/* HEADER */
.pricing-header {
  padding: 80px 0 60px;
  text-align: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #fff 100%);
  border-bottom: 1px solid #ebebeb;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #0a0a0a;
  background: rgba(0, 0, 0, .04);
  padding: 4px 14px;
  border-radius: 99px;
  margin-bottom: 14px;
}

.pricing-header h1 {
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 800;
  letter-spacing: -2px;
  margin-bottom: 16px;
  color: #0a0a0a;
}

.header-desc {
  font-size: 16px;
  color: #777;
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.6;
}

/* PRICING GRID */
.pricing-section {
  padding: 80px 0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.pricing-card {
  position: relative;
  background: #fff;
  border: 1px solid #ebebeb;
  border-radius: 16px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  transition: all .25s;
}

.pricing-card:hover {
  border-color: #ddd;
  box-shadow: 0 12px 40px rgba(0, 0, 0, .08);
  transform: translateY(-4px);
}

.pricing-card.highlight {
  border-color: #0a0a0a;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .12);
  transform: scale(1.04);
}

.plan-badge {
  display: inline-flex;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .8px;
  text-transform: uppercase;
  color: #666;
  background: rgba(0, 0, 0, .04);
  padding: 3px 10px;
  border-radius: 99px;
  width: fit-content;
  margin-bottom: 16px;
}

.plan-badge.highlight-badge {
  background: rgba(10, 10, 10, .08);
  color: #0a0a0a;
  font-weight: 800;
}

.plan-badge.vip-badge {
  background: linear-gradient(135deg, rgba(10, 10, 10, .1) 0%, rgba(10, 10, 10, .06) 100%);
  color: #0a0a0a;
}

.plan-name {
  font-size: 24px;
  font-weight: 800;
  color: #0a0a0a;
  margin-bottom: 8px;
}

.plan-desc {
  font-size: 14px;
  color: #999;
  margin-bottom: 24px;
}

.plan-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 32px;
}

.price-amount {
  font-size: 42px;
  font-weight: 800;
  color: #0a0a0a;
}

.price-currency {
  font-size: 12px;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
}

.price-period {
  font-size: 13px;
  color: #bbb;
  margin-left: auto;
}

.btn-enroll {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #0a0a0a;
  color: #fff;
  border: none;
  padding: 13px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;
  margin-bottom: 24px;
}

.btn-enroll:hover {
  background: #222;
  transform: translateY(-2px);
}

.btn-enroll.highlight-btn {
  background: #0a0a0a;
}

.btn-enroll.highlight-btn:hover {
  background: #1a1a1a;
}

.btn-enroll.vip-btn {
  background: linear-gradient(135deg, #0a0a0a 0%, #222 100%);
}

.btn-enroll.vip-btn:hover {
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
}

.plan-divider {
  height: 1px;
  background: #ebebeb;
  margin: 20px 0;
}

.plan-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  color: #666;
  line-height: 1.5;
}

.feature svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: #0a0a0a;
  opacity: .7;
}

/* COMPARISON TABLE */
.comparison-section {
  padding: 80px 0;
  background: #f5f5f5;
}

.comparison-section h2 {
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 48px;
  color: #0a0a0a;
}

.comparison-table {
  background: #fff;
  border: 1px solid #ebebeb;
  border-radius: 16px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 0;
  background: #f5f5f5;
  border-bottom: 1px solid #ebebeb;
}

.table-header .table-feature,
.table-header .table-plan {
  padding: 16px;
  font-size: 13px;
  font-weight: 700;
  color: #0a0a0a;
  text-align: center;
}

.table-header .table-feature {
  text-align: left;
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 0;
  border-bottom: 1px solid #ebebeb;
}

.table-row:last-child {
  border-bottom: none;
}

.table-feature,
.table-cell {
  padding: 16px;
  font-size: 14px;
  text-align: center;
  color: #666;
}

.table-feature {
  text-align: left;
  font-weight: 600;
  color: #0a0a0a;
}

/* FAQ */
.faq-section {
  padding: 80px 0;
  background: #fff;
}

.faq-section h2 {
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 48px;
  color: #0a0a0a;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.faq-item h4 {
  font-size: 15px;
  font-weight: 700;
  color: #0a0a0a;
  margin-bottom: 8px;
}

.faq-item p {
  font-size: 13.5px;
  color: #777;
  line-height: 1.6;
}

/* CTA FINAL */
.cta-final {
  padding: 100px 0;
  background: #0a0a0a;
  color: #fff;
  text-align: center;
}

.cta-final h2 {
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -2px;
  margin-bottom: 12px;
}

.cta-final p {
  font-size: 17px;
  color: rgba(255, 255, 255, .65);
  max-width: 500px;
  margin: 0 auto 32px;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #0a0a0a;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;
}

.btn-cta:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pricing-card.highlight {
    grid-column: 1 / -1;
    transform: scale(1);
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr repeat(3, 0.8fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .pricing-header {
    padding: 60px 0 40px;
  }

  .pricing-section {
    padding: 60px 0;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .pricing-card.highlight {
    grid-column: auto;
    transform: scale(1);
  }

  .comparison-section {
    padding: 60px 0;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr 0.7fr 0.7fr 0.7fr;
  }

  .table-feature,
  .table-cell {
    padding: 12px 8px;
    font-size: 12px;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }

  .faq-section h2 {
    font-size: 28px;
    margin-bottom: 36px;
  }

  .cta-final h2 {
    font-size: 32px;
  }
}
</style>