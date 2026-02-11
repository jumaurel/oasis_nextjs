import type { NextConfig } from "next";

/**
 * Redirections des anciens liens d'enquêtes (ancien projet) vers les nouveaux.
 * Pour ajouter une redirection, ajouter une entrée { source, destination }.
 */
const legacyRedirects = [
  {
    // Enquête envoyée avec l'ancien lien
    source: "/YrnMPz_P85/pAjOr23Nhy",
    destination: "/cmlhtnhy0000pi9uki6jggnoa",
  },
  // Ajouter d'autres redirections ici si nécessaire, par exemple :
  // {
  //   source: "/AncienID1/AncienID2",
  //   destination: "/nouveauSurveyId",
  // },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],
  async redirects() {
    return legacyRedirects.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true, // HTTP 308 — redirection permanente
    }));
  },
};

export default nextConfig;
