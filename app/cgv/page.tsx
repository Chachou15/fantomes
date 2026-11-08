import PageLegale from "../PageLegale";
import { infos } from "../infos";

export const metadata = {
  title: "Conditions générales de vente — Fantômes",
};

export default function Cgv() {
  return (
    <PageLegale
      titre="Conditions générales de vente"
      miseAJour={infos.miseAJour}
      sections={[
        {
          titre: "1. Vendeur",
          paragraphes: [
            `Les présentes conditions s'appliquent aux ventes réalisées sur ${infos.site} par ${infos.prenom} ${infos.nom}, ${infos.statut}, SIRET ${infos.siret}, ${infos.adresse}. Contact : ${infos.email}.`,
          ],
        },
        {
          titre: "2. Service vendu",
          paragraphes: [
            "Fantômes est un outil en ligne : le client dépose ou colle le relevé de son compte bancaire au format CSV, et l'outil repère les prélèvements qui reviennent chaque mois, les classe par coût annuel et prépare un modèle de lettre de résiliation pour chacun.",
            "L'analyse est réalisée dans le navigateur du client. Le relevé n'est pas envoyé aux serveurs du site.",
          ],
        },
        {
          titre: "3. Prix",
          paragraphes: [
            `Le prix est de 19 euros, en paiement unique, sans abonnement ni renouvellement automatique. ${infos.tva}`,
          ],
        },
        {
          titre: "4. Commande et paiement",
          paragraphes: [
            "La commande est passée en ligne et payée par carte bancaire via le service sécurisé Stripe. La vente est conclue lorsque le paiement est confirmé.",
          ],
        },
        {
          titre: "5. Accès au service",
          paragraphes: [
            "L'accès à l'outil est ouvert immédiatement après le paiement. Il est valable pendant 30 jours à compter du paiement, sur l'appareil et le navigateur utilisés pour payer.",
          ],
        },
        {
          titre: "6. Remboursement sous 14 jours",
          paragraphes: [
            `Le client peut demander le remboursement de sa commande pendant 14 jours à compter du paiement, sans avoir à se justifier, en écrivant à ${infos.email}. Le remboursement est effectué sous 5 jours ouvrés, par le même moyen de paiement.`,
            "Cet engagement s'ajoute aux droits que le client tient de la loi.",
          ],
        },
        {
          titre: "7. Limites du service",
          paragraphes: [
            "L'outil est une aide automatisée : il peut manquer certains prélèvements ou en signaler à tort. Le client vérifie les résultats avant d'agir.",
            "Les lettres sont des modèles à compléter et à relire. Elles ne constituent ni un conseil juridique ni un conseil financier. Les conditions de résiliation (préavis, durée minimale, frais) dépendent de chaque contrat et relèvent du client et de son fournisseur.",
          ],
        },
        {
          titre: "8. Données personnelles",
          paragraphes: [
            "Les données personnelles sont traitées comme indiqué dans la politique de confidentialité du site.",
          ],
        },
        {
          titre: "9. Garanties légales",
          paragraphes: [
            "Les présentes conditions ne limitent pas les garanties légales dont bénéficie le client consommateur.",
          ],
        },
        {
          titre: "10. Médiation et litiges",
          paragraphes: [
            "En cas de difficulté, le client peut d'abord écrire à l'adresse de contact. S'il n'obtient pas satisfaction, il peut recourir gratuitement à un médiateur de la consommation.",
            `Médiateur : ${infos.mediateur}`,
            "Les présentes conditions sont soumises au droit français. Le client consommateur peut saisir la juridiction compétente selon les règles légales.",
          ],
        },
      ]}
    />
  );
}
