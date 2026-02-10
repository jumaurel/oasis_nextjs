"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardPanel, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogPanel,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";

interface StepConsentProps {
  initialConsent: boolean;
  onNext: (data: { consent: boolean }) => void;
  onPrevious?: () => void;
}

export function StepConsent({
  initialConsent,
  onNext,
  onPrevious,
}: StepConsentProps) {
  const [consent, setConsent] = useState(initialConsent);
  const [showEnSavoirPlus, setShowEnSavoirPlus] = useState(false);

  return (
    <>
      <EnSavoirPlusDialog
        open={showEnSavoirPlus}
        onOpenChange={setShowEnSavoirPlus}
      />

      <Card>
        <CardPanel>
          <div className="space-y-6">
            {/* Titre */}
            <div className="text-center">
              <h1 className="text-xl font-bold text-primary">
                Bienvenue sur la plateforme OASIS
              </h1>
              <p className="mt-2 italic text-muted-foreground">
                Outil d&apos;Autoévaluation pour la Santé Individuelle du
                Soignant
              </p>
            </div>

            {/* Section MOTS */}
            <div className="relative rounded-xl border-2 border-primary p-5 pt-7">
              <h4 className="absolute -top-3 left-5 bg-card px-3 text-base font-semibold text-primary">
                L&apos;association MOTS
              </h4>
              <div className="text-sm text-muted-foreground text-justify space-y-2">
                <p>
                  L&apos;association MOTS a été créée en 2010 sur la base
                  d&apos;un modèle d&apos;entraide confraternelle,
                  d&apos;accompagnement de pair à pair
                  (&laquo;&nbsp;pair-aidance&nbsp;&raquo;) par des médecins
                  spécifiquement formés pour des médecins puis plus largement
                  pour des professionnels de santé en épuisement professionnel
                  ou en difficultés. Un des objets de cet accompagnement est la
                  co-élaboration avec l&apos;aide du médecin-effecteur MOTS
                  d&apos;un parcours de santé globale du professionnel de santé
                  demandeur.
                </p>
                <p>
                  Dès l&apos;origine et dans cet objectif, nous avons construit
                  des outils réflexifs pour aider le praticien à analyser sa
                  propre situation dans cette dimension de santé globale. Nous
                  les avons enrichis au fil des années à partir de notre
                  expérience de terrain, au contact de nos collègues
                  accompagnés.
                </p>
              </div>
            </div>

            {/* Section Outils d'évaluation */}
            <div className="relative rounded-xl border-2 border-destructive p-5 pt-7">
              <h4 className="absolute -top-3 right-5 bg-card px-3 text-base font-semibold text-destructive">
                Les outils d&apos;évaluations
              </h4>
              <div className="text-sm text-muted-foreground text-justify space-y-3">
                <p>
                  L&apos;objectif est de vous permettre de faire un diagnostic
                  de votre situation et identifier des pistes de prévention
                  primaire ou secondaire. Pour cela, deux auto-questionnaires
                  indépendants l&apos;un de l&apos;autre, vous sont proposés
                  dans l&apos;application OASIS : AIRE et STET&apos;AUSCOPE.
                </p>
                <ul className="space-y-3 ml-1">
                  <li>
                    &bull; <strong>AIRE</strong> (Dr E. Granier, Psychiatre et
                    Conseiller Technique de l&apos;Association MOTS) : cet
                    inventaire a pour but d&apos;évaluer votre rapport à votre
                    travail actuel.{" "}
                    <strong>Durée de passation à prévoir : 3-5 minutes</strong>
                  </li>
                  <li>
                    &bull; <strong>STET&apos;AUSCOPE</strong> (Association MOTS)
                    : outil conçu pour vous permettre d&apos;identifier les
                    facteurs de protection et les facteurs de risques de votre
                    exercice professionnel, en termes d&apos;épuisement,
                    d&apos;évènements indésirables, d&apos;équilibre global. Il
                    est particulièrement complet, comporte entre 76 et 81 items
                    pour explorer 16 grandes dimensions. Nous vous préconisons
                    de le compléter en 2 ou 3 fois (à condition d&apos;utiliser
                    le même navigateur et même appareil) à votre rythme, pour
                    vous permettre de prendre le temps de réfléchir aux
                    objectifs de prévention, atteignables à court terme, que
                    vous pouvez vous fixer. STET&apos;AUSCOPE est adapté en
                    fonction de votre métier / spécialité et/ou statut salarié /
                    libéral.{" "}
                    <strong>
                      Durée de passation à prévoir : 15-20 minutes
                    </strong>
                  </li>
                </ul>
                <p>
                  Le développement de l&apos;application OASIS a bénéficié du
                  soutien financier du Fonds de dotation &laquo;&nbsp;Nos
                  Epaules Et Vos Ailes&nbsp;&raquo;
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Image
                  src="/logo-neeva-2022-296x296.jpg"
                  alt="Fondation Nos Epaules et Vos Ailes"
                  width={120}
                  height={120}
                  className="h-20 w-auto"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowEnSavoirPlus(true)}
                >
                  En savoir plus
                </Button>
              </div>
            </div>

            {/* Section Consentement */}
            <div className="relative rounded-xl border-2 border-primary p-5 pt-7">
              <h4 className="absolute -top-3 left-5 bg-card px-3 text-base font-semibold text-primary">
                C&apos;est à vous !
              </h4>
              <div className="text-sm text-muted-foreground text-justify space-y-3">
                <p>
                  <strong>
                    Votre participation est volontaire et soumise à votre
                    consentement. Les résultats sont individuels, totalement
                    anonymes, et strictement confidentiels
                  </strong>
                  . En fin de passation des 2 questionnaires, il vous sera
                  proposé pour votre usage personnel, une attestation nominative
                  de participation à cette auto-évaluation. Elle pourra vous
                  être éventuellement utile dans le cadre du Décret n° 2024-258
                  du 22 mars 2024 relatif à la certification périodique de
                  certains professionnels de santé - Art. R. 4022-10. Alinea 6.
                </p>
                <p>
                  C&apos;est maintenant le moment de mener ce travail de
                  réflexion sur votre vécu, votre pratique et
                  l&apos;organisation de votre activité de professionnel de
                  santé. Prenez tout votre temps. Vous pourrez au décours, si
                  vous en ressentez la nécessité, faire appel à MOTS pour être
                  accompagné gratuitement par l&apos;un.e de nos
                  médecins-effecteurs (pour les professionnels de santé avec
                  Ordre et/ou URPS), voir sur notre site{" "}
                  <a
                    className="font-semibold text-primary underline underline-offset-2"
                    href="https://www.association-mots.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.association-mots.org
                  </a>
                  .
                </p>
              </div>

              {/* Checkbox consentement */}
              <button
                type="button"
                className={`mt-5 flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors ${
                  consent
                    ? "border-accent-teal bg-accent-teal/5"
                    : "border-muted-foreground/30 hover:border-muted-foreground/50"
                }`}
                onClick={() => setConsent(!consent)}
              >
                <Checkbox
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                />
                <Label className="cursor-pointer text-sm font-semibold leading-snug">
                  En signe de mon consentement libre et éclairé, je confirme
                  avoir lu, compris et accepté les informations ci-dessus et
                  accepte de participer à cette évaluation de santé.
                </Label>
              </button>
            </div>
          </div>
        </CardPanel>
        <CardFooter className="justify-between">
          {onPrevious ? (
            <Button variant="outline" onClick={onPrevious}>
              Précédent
            </Button>
          ) : (
            <div />
          )}
          <Button onClick={() => onNext({ consent: true })} disabled={!consent}>
            Commencer
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

/* ─── Modal "En savoir plus" ─── */

function EnSavoirPlusDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>En savoir plus</DialogTitle>
        </DialogHeader>
        <DialogPanel>
          <div className="text-sm text-muted-foreground text-justify space-y-3">
            <h3 className="font-bold text-primary text-base">
              Pourquoi s&apos;engager dans une analyse de notre pratique
              professionnelle et de notre organisation de travail ?
            </h3>
            <p>
              Nous avons la chance comme professionnels de santé, de consacrer
              notre existence à une pratique, voire un art, qui allie richesse
              et variété, créativité et accomplissement de soi avec le sentiment
              fort de rendre un service unique à autrui. Notre investissement
              est à la hauteur de notre devoir envers les patients. Pour autant,
              cette santé qui est nécessaire à l&apos;énergie que nous déployons
              au service des autres, peut être remise en cause, brutalement ou
              insidieusement au cours de notre carrière, parce que nous
              vieillissons, parce qu&apos;un revers familial ou personnel nous
              frappe, parce que la charge technique, juridique et administrative
              de notre exercice ne cesse d&apos;augmenter et que nous devenons
              incapable d&apos;y faire face. Comme l&apos;ont montré maintenant
              un grand nombre d&apos;études et d&apos;enquêtes, la prévalence de
              l&apos;épuisement professionnel est très importante chez les
              professionnels de santé.
            </p>
            <p>
              La facilité conduirait à penser qu&apos;il s&apos;agit d&apos;une
              fatalité, que ça fait partie des risques du métier et que,
              finalement, ça touche des praticiens que leur fragilité
              intrinsèque aurait dû écarter d&apos;emblée. L&apos;observation
              des pathologies de surcharge psychologique dans l&apos;ensemble
              des professions à fortes responsabilités de décision montre au
              contraire que personne n&apos;est à l&apos;abri de
              &laquo;&nbsp;craquer&nbsp;&raquo; un jour ou l&apos;autre face à
              l&apos;accumulation de revers personnels ou professionnels, aussi
              solide soit-on.
            </p>
            <p>
              S&apos;il est des facteurs de risque vis à vis desquels nous
              sommes impuissants, l&apos;analyse démontre, à l&apos;échelle
              individuelle ou collective, que l&apos;organisation, les
              priorités, les limites que nous mettons dans notre exercice
              professionnel sont des éléments déterminants pour prévenir la
              survenue d&apos;un Burn Out. L&apos;exercice médical et du soin
              est complexe, spécifique à chaque praticien. L&apos;éventail des
              solutions que l&apos;on peut proposer doit donc permettre de
              répondre à toutes les situations, pourvu que l&apos;on ait procédé
              préalablement à une analyse approfondie de la situation.
            </p>

            <h3 className="font-bold text-primary text-base pt-3">
              Alors, pourquoi s&apos;engager dans une analyse de notre pratique
              professionnelle ?
            </h3>
            <p>
              Parce que nous avons d&apos;abord le devoir de préserver notre
              santé pour apporter des soins de qualité à nos patients. Le
              diagnostic de situation doit vous permettre de répondre à 5
              questions :
            </p>

            <div className="space-y-3">
              <div>
                <p className="font-bold text-primary ml-4">
                  &bull; Qui suis-je ?
                </p>
                <p>
                  Votre âge, votre métier et votre vie familiale, vos
                  pathologies éventuelles, vos traits psychologiques
                  interviennent sur vos comportements : comment vivez-vous votre
                  métier, comment acceptez-vous les conditions dans lesquelles
                  vous l&apos;exercez, comment percevez-vous votre état de santé
                  ?...
                </p>
              </div>
              <div>
                <p className="font-bold text-primary ml-4">
                  &bull; Qu&apos;est-ce que je fais ?
                </p>
                <p>
                  Vous questionnez votre organisation professionnelle, votre
                  mode d&apos;exercice et vos relations avec les patients mais
                  aussi votre vie extra professionnelle, le temps que vous
                  prenez pour vous, pour votre formation, pour vos échanges. La
                  dimension socioprofessionnelle aide à préciser vos capacités à
                  résoudre seul des problèmes.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary ml-4">
                  &bull; Quel est mon problème potentiel ou vécu ?
                </p>
                <p>
                  Il s&apos;agit de repérer les facteurs favorisant ou limitant
                  l&apos;épuisement professionnel et les risques psychosociaux.
                  Il est important d&apos;identifier tous les problèmes qui
                  influenceront votre démarche.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary ml-4">
                  &bull; Qu&apos;est-ce que je sais ?
                </p>
                <p>
                  Il est fondamental de savoir comment vous expliquez votre
                  problématique, à quoi vous l&apos;attribuez. Des conceptions
                  erronées, des lacunes, des croyances, des schémas de
                  fonctionnement peuvent être à l&apos;origine de comportements
                  inadaptés.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary ml-4">
                  &bull; Quel est mon projet ?
                </p>
                <p>
                  Il est important de repérer quels sont vos besoins immédiats,
                  et vos projets professionnels et de vie. Formulé par vous-même
                  ou proposé lors d&apos;un accompagnement par un
                  médecin-effecteur MOTS, avec les informations recueillies, le
                  projet sera élaboré. Il doit être considéré comme important et
                  valorisant, facile à mettre en œuvre, réalisable à court
                  terme. Ce projet constituera la source de votre motivation.
                </p>
              </div>
            </div>
          </div>
        </DialogPanel>
        <DialogFooter variant="bare">
          <DialogClose render={<Button variant="outline" />}>
            Fermer
          </DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
