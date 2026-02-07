"use client";

import Image from "next/image";
import { Info, X } from "lucide-react";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogPanel,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InterpretationAIREModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InterpretationAIREModal({
  open,
  onOpenChange,
}: InterpretationAIREModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="max-w-2xl" showCloseButton={false}>
        <DialogHeader className="flex-row items-center gap-3 border-b pb-4">
          <Info className="size-6 text-primary" />
          <DialogTitle className="text-lg">
            Interprétation des résultats AIRE
          </DialogTitle>
          <DialogClose
            className="ml-auto text-destructive hover:text-destructive/80"
            render={<Button size="icon" variant="ghost" />}
          >
            <X />
          </DialogClose>
        </DialogHeader>
        <DialogPanel>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="mb-2 text-lg font-bold text-primary">
                Comprendre le modèle AIRE
              </h3>
              <p className="mb-4 text-justify">
                Nous postulons que le rapport que nous entretenons à une
                activité peut s&apos;évaluer à travers la perception que nous
                avons de 4 dimensions :
              </p>
              <ol className="ml-4 space-y-1 list-decimal list-inside">
                <li>
                  <strong>Les Attentes</strong> : c&apos;est ce que nous
                  ressentons que l&apos;on attend de nous ;
                </li>
                <li>
                  <strong>L&apos;Investissement</strong> : c&apos;est la part
                  affective, ce que nous avons envie de donner ; la motivation
                  que nous ressentons spontanément ;
                </li>
                <li>
                  <strong>Les Renforcements ou Récompenses</strong> : ce que
                  nous recevons de notre travail, ce qu&apos;il nous rapporte ;
                  à la fois en terme matériel (argent, confort) et en termes
                  plus personnels (intérêt, plaisir, satisfaction) ;
                </li>
                <li>
                  <strong>L&apos;Efficacité</strong> : le sentiment
                  d&apos;arriver à effectuer correctement, voire avec une
                  certaine performance les tâches que l&apos;on attend de nous
                  dans notre travail.
                </li>
              </ol>
            </div>

            <div>
              <p className="mb-2 text-justify">
                L&apos;ensemble forme l&apos;acronyme AIRE, d&apos;où le nom du
                modèle. Un rapport satisfaisant au travail se traduit par :
              </p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>un équilibre entre les 4 dimensions,</li>
                <li>
                  avec une intensité moyenne sur chacune de ces dimensions.
                </li>
              </ul>
              <p className="mt-2 mb-1">
                Une situation de souffrance au travail se traduit par :
              </p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>un déséquilibre entre les dimensions</li>
                <li>
                  et/ou une intensité trop forte ou trop faible sur l&apos;une
                  ou l&apos;autre de ces 4 dimensions.
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-2">
                Un rapport équilibré au travail se traduit par un carré
                globalement régulier et de superficie moyenne :
              </p>
              <div className="my-3 flex justify-center">
                <Image
                  src="/AIRE_neutre.png"
                  width={400}
                  height={300}
                  alt="AIRE équilibré"
                />
              </div>

              <p className="mb-2">
                Un surinvestissement peut se traduire par une figure régulière
                mais de superficie beaucoup plus étendue (à l&apos;inverse un
                sous-investissement se traduira par une figure globalement
                régulière mais très petite) :
              </p>
              <div className="my-3 flex justify-center">
                <Image
                  src="/AIRE_high.png"
                  width={400}
                  height={300}
                  alt="AIRE surinvestissement"
                />
              </div>

              <p className="mb-2">
                Le burn-out peut se manifester par une figure de forme très
                irrégulière, avec des Attentes très élevées, des Renforcements
                faibles, et un Investissement et/ou un sentiment
                d&apos;Efficacité plus ou moins conservés :
              </p>
              <div className="my-3 flex justify-center">
                <Image
                  src="/AIRE_burnout.png"
                  width={400}
                  height={300}
                  alt="AIRE burnout"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-bold text-primary">
                Intérêt de cette modélisation
              </h3>
              <p className="mb-2">
                D&apos;une part, elle aide très rapidement à repérer les
                déséquilibres dans les différentes dimensions ;
                <br />
                D&apos;autre part, elle peut être un guide pour essayer de
                corriger la sur ou la sous-évaluation que nous pouvons avoir
                d&apos;une dimension :
              </p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>
                  Ce que je perçois que l&apos;on attend de moi est-il impératif
                  ? N&apos;ai-je pas tendance à me créer des obligations ?
                  N&apos;ai-je pas la possibilité et le droit de différer mes
                  réponses ?
                </li>
                <li>
                  Ne me suis-je pas progressivement trop investi (ou désinvesti
                  de) dans mon travail ?
                </li>
                <li>
                  Ai-je pris en compte tous les Renforcements que je reçois de
                  mon travail ? Est-ce que je ne suis pas sur-sensibilisé aux
                  côtés désagréables ?
                </li>
                <li>
                  Ou à l&apos;inverse, n&apos;ai-je pas tendance à me rendre
                  prisonnier d&apos;avantages, de gratifications (bon revenu,
                  considération, remerciements, reconnaissance) qui
                  m&apos;obligent à garder une activité soutenue ? Ne
                  pourrais-je pas me passer d&apos;une partie, en me
                  désinvestissant un peu ?
                </li>
                <li>
                  Si je me sens en perte d&apos;efficacité, est-ce bien la
                  réalité ? Est-ce que les témoignages que je reçois vont dans
                  ce sens ou pas ?
                </li>
              </ul>
            </div>

            <p className="text-justify">
              Ce modèle ne prétend pas tout régler, loin s&apos;en faut, mais il
              est là pour nous aider à modéliser la vision que nous avons et le
              rapport que nous entretenons avec telle ou telle activité
              (clinique, associative, administrative, familiale…) ; puis
              réfléchir dessus et si possible, les faire évoluer pour un mieux
              être, une plus grande liberté, un meilleur équilibre de vie.
            </p>

            <div>
              <p className="mt-4 font-bold italic">Pour aller plus loin :</p>
              <ul className="ml-4 space-y-1 italic list-disc list-inside">
                <li>
                  Granier E, 2022-01, « Proposition d&apos;un modèle descriptif
                  et thérapeutique du rapport au travail : le modèle AIRE »,
                  Annales Médico-Psychologique ;
                </li>
                <li>
                  Maurel J, 2023 : « Une application expérimentale du modèle du
                  rapport au travail de Granier (2021) pour la modélisation du
                  burnout », Mémoire de recherche de Master 2, Université
                  Toulouse 2 Jean Jaurès
                </li>
              </ul>
            </div>
          </div>
        </DialogPanel>
        <div className="flex justify-end px-6 pb-4">
          <DialogClose render={<Button variant="outline" />}>
            <X className="mr-2 size-4" />
            Fermer
          </DialogClose>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
