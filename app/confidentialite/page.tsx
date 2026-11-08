import PageLegale from "../PageLegale";
import { infos } from "../infos";

export const metadata = {
  title: "Politique de confidentialité — Fantômes",
};

export default function Confidentialite() {
  return (
    <PageLegale
      titre="Politique de confidentialité"
      miseAJour={infos.miseAJour}
      sections={[
        {
          titre: "1. Qui est responsable de tes données",
          paragraphes: [
            `${infos.prenom} ${infos.nom}, ${infos.statut}. Contact : ${infos.email}.`,
          ],
        },
        {
          titre: "2. Ton relevé bancaire",
          paragraphes: [
            "Le relevé que tu déposes ou colles dans l'outil est analysé uniquement dans ton navigateur. Il n'est ni envoyé, ni enregistré, ni consulté par l'éditeur.",
          ],
        },
        {
          titre: "3. Les données traitées",
          paragraphes: [
            "Paiement : il est géré par Stripe Payments Europe, Limited. L'éditeur ne voit ni ne conserve ton numéro de carte. Il reçoit de Stripe ton nom, ton adresse e-mail, le montant, la date et l'état du paiement.",
            "Cookie technique : un cookie nommé fantomes_acces, valable 30 jours, conserve l'identifiant de ton paiement pour ouvrir l'accès à l'outil. Il est strictement nécessaire au service et ne sert ni à la publicité ni au suivi.",
            "Données de connexion : l'hébergeur Vercel peut enregistrer des informations techniques (adresse IP, navigateur) pour faire fonctionner et sécuriser le site.",
            "Le site n'utilise ni cookie publicitaire ni outil de mesure d'audience.",
          ],
        },
        {
          titre: "4. Pourquoi et sur quelle base",
          paragraphes: [
            "Exécuter ta commande et te donner accès à l'outil (contrat). Respecter les obligations comptables et fiscales (obligation légale). Assurer la sécurité du site (intérêt légitime).",
          ],
        },
        {
          titre: "5. Durée de conservation",
          paragraphes: [
            "Les données de paiement et de facturation sont conservées 10 ans, comme l'exige la loi comptable. Les messages que tu envoies à l'adresse de contact sont conservés le temps de traiter ta demande.",
          ],
        },
        {
          titre: "6. Qui reçoit tes données",
          paragraphes: [
            "Stripe (paiement) et Vercel (hébergement). Tes données ne sont pas vendues.",
            "Ces prestataires peuvent traiter des données hors de l'Union européenne, avec les garanties prévues par le règlement européen sur la protection des données.",
          ],
        },
        {
          titre: "7. Tes droits",
          paragraphes: [
            `Tu peux demander l'accès à tes données, leur rectification, leur effacement, la limitation ou l'opposition à leur traitement, ainsi que leur portabilité, en écrivant à ${infos.email}.`,
            "Tu peux aussi déposer une réclamation auprès de la CNIL (cnil.fr).",
          ],
        },
      ]}
    />
  );
}
