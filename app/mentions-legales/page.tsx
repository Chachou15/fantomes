import PageLegale from "../PageLegale";
import { infos } from "../infos";

export const metadata = { title: "Mentions légales — Fantômes" };

export default function MentionsLegales() {
  return (
    <PageLegale
      titre="Mentions légales"
      miseAJour={infos.miseAJour}
      sections={[
        {
          titre: "Éditeur du site",
          paragraphes: [
            `Le site ${infos.site} est édité par ${infos.prenom} ${infos.nom}, ${infos.statut}.`,
            `Adresse : ${infos.adresse}`,
            `SIRET : ${infos.siret}`,
            `Contact : ${infos.email}`,
            `Directrice de la publication : ${infos.prenom} ${infos.nom}.`,
            infos.tva,
          ],
        },
        {
          titre: "Hébergeur",
          paragraphes: [
            "Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (vercel.com).",
          ],
        },
        {
          titre: "Paiement",
          paragraphes: [
            "Les paiements sont traités par Stripe Payments Europe, Limited, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irlande. L'éditeur n'a jamais accès au numéro de carte bancaire.",
          ],
        },
        {
          titre: "Propriété intellectuelle",
          paragraphes: [
            "Les textes, la mise en page, le nom Fantômes et l'outil d'analyse sont la propriété de l'éditeur. Toute reproduction sans autorisation écrite est interdite.",
          ],
        },
        {
          titre: "Données personnelles",
          paragraphes: [
            "Le traitement des données personnelles est décrit dans la politique de confidentialité du site.",
          ],
        },
        {
          titre: "Médiation de la consommation",
          paragraphes: [
            "En cas de litige non résolu avec l'éditeur, le client consommateur peut recourir gratuitement à un médiateur de la consommation.",
            `Médiateur : ${infos.mediateur}`,
          ],
        },
      ]}
    />
  );
}
