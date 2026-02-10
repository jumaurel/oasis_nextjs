// ── HTML email template for OASIS results ────────────────────────────────────

export interface EmailData {
  fullname?: string;
  hasAttestation: boolean;
}

export function buildResultsEmailHtml(data: EmailData): string {
  const currentDate = new Date();
  const logoUrl = "https://oasis-nextjs.vercel.app/logo_OASIS.png";
  const { hasAttestation } = data;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Résultats OASIS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 640px; margin: 0 auto; padding: 24px 16px;">

    <!-- Header with logo -->
    <div style="background-color: #ffffff; border-radius: 12px 12px 0 0; padding: 24px; border-bottom: 1px solid #e2e8f0;">
      <img src="${logoUrl}" alt="MOTS OASIS" style="height: 60px; width: auto;" />
    </div>

    <!-- Main Card -->
    <div style="background-color: #ffffff; border-radius: 0 0 12px 12px; padding: 32px 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Bonjour,
      </p>

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Vous avez complété la totalité des 2 auto-questionnaires mis à votre disposition sur la plateforme MOTS OASIS.<br/>
        ${
          hasAttestation
            ? `Comme vous l'avez souhaité, nous vous adressons 2 documents en pièce jointe (au format PDF) :`
            : `Nous vous adressons ci-joint un document (au format PDF) reprenant vos réponses et les résultats synthétiques des 2 questionnaires, avec une notice explicative pour vous aider dans leur lecture et leur analyse.`
        }
      </p>

      ${
        hasAttestation
          ? `
      <ul style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px; padding-left: 20px;">
        <li style="margin-bottom: 8px;">un document (anonymisé) qui reprend vos réponses et les résultats synthétiques des 2 questionnaires, avec une notice explicative pour vous aider dans leur lecture et leur analyse,</li>
        <li>une attestation nominative de passation de votre auto-évaluation sur la santé du soignant.</li>
      </ul>
      `
          : ""
      }

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Au-delà de ces outils réflexifs, notre priorité est de pouvoir vous accompagner si vous le jugez utile. Nous accompagnons dans la plus stricte confidentialité et indépendance, médecins et professionnels de santé avec Ordre et/ou URPS. Depuis 2010, c'est plus de 2.400 praticiens qui ont bénéficié de notre modèle de pair-aidance.
      </p>

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Vous pouvez retrouver plus d'informations sur le site internet de l'Association MOTS : <a href="https://www.association-mots.org" style="color: #2563eb; text-decoration: underline;">www.association-mots.org</a>.<br/>
        Pour toute demande d'accompagnement par un médecin-effecteur de l'association, ne pas utiliser l'adresse mail de contact du site mais appelez le : <strong>06 08 282 589</strong>.
      </p>

      <br/>

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 8px;">
        Merci pour votre participation.
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0; font-weight: 600;">
        L'équipe médicale MOTS
      </p>
    </div>

    <!-- Footer -->
    <div style="padding: 20px 24px; text-align: center;">
      <p style="font-size: 11px; color: #9ca3af; line-height: 1.5; margin: 0 0 8px;">
        Cet email contient des données personnelles et de santé. Ne le communiquez en aucun cas à un tiers.
      </p>
      <p style="font-size: 11px; color: #d1d5db; margin: 0;">
        © ${currentDate.getFullYear()} Association MOTS
      </p>
    </div>

  </div>
</body>
</html>`;
}
