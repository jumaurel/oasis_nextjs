"use client";

import { Lightbulb, X } from "lucide-react";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogPanel,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RecommandationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecommandationsModal({
  open,
  onOpenChange,
}: RecommandationsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="max-w-2xl" showCloseButton={false}>
        <DialogHeader className="flex-row items-center gap-3 border-b pb-4">
          <Lightbulb className="size-6 text-green-600" />
          <DialogTitle className="text-lg text-green-700">
            Recommandations
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
              <h3 className="mb-4 text-lg font-bold text-primary">
                Focus Activité physique et sédentarité
              </h3>
              <p className="mb-2">
                Selon l&apos;OMS, les adultes peuvent être considérés comme
                actifs en pratiquant de façon hebdomadaire :
              </p>
              <ol className="ml-4 space-y-1 list-decimal list-inside">
                <li>
                  <strong>Au moins 150 à 300mn</strong> d&apos;activité physique
                  aérobique d&apos;intensité modérée <strong>OU</strong>
                </li>
                <li>
                  <strong>Au moins 75 à 150mn</strong> d&apos;activité physique
                  aérobique d&apos;intensité soutenue <strong>OU</strong>
                </li>
                <li>
                  <strong>Une combinaison équivalente</strong> tout au long de
                  la semaine
                </li>
              </ol>
            </div>

            <div>
              <p className="mb-2 font-semibold">
                Cela afin d&apos;obtenir des bénéfices sur sa santé :
              </p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>Baisse de la mortalité toutes causes confondues</li>
                <li>
                  Baisse de la mortalité liée aux maladies cardiovasculaires, de
                  l&apos;hypertension artérielle incidente
                </li>
                <li>
                  Diminution des risques de certains cancers incidents (côlon,
                  sein)
                </li>
                <li>Diminution du diabète de type 2 incident</li>
                <li>
                  Amélioration de la santé mentale (symptômes d&apos;anxiété et
                  de dépression)
                </li>
                <li>Amélioration de la santé cognitive et du sommeil</li>
                <li>Amélioration des mesures de l&apos;adiposité</li>
              </ul>
            </div>

            <p className="text-justify">
              Il faut privilégier les activités avec sollicitations
              cardio-respiratoires. Associé à cela, il serait nécessaire
              d&apos;ajouter des activités physiques de type renforcement
              musculaire et de garder des activités physiques quotidiennes
              (transports actifs, jardinage, bricolage…)
            </p>

            <div>
              <p className="mb-2 font-bold">
                Être actif c&apos;est bien mais pas que… Attention à la
                sédentarité !
              </p>
              <p className="text-justify">
                On peut être considéré comme physiquement actif car on a une
                activité physique régulière, mais avoir trop de comportements
                sédentaires. La sédentarité (ou comportement sédentaire) est
                définie comme une situation d&apos;éveil caractérisée par une
                dépense énergétique inférieure ou égale à 1,5 MET. Elle
                correspond au temps passé assis ou allongé entre le lever et le
                coucher (HAS 2022).
              </p>
              <p className="mt-2 text-justify">
                Or, « le risque de mortalité augmente de façon plus marquée
                lorsque l&apos;on dépasse 7h par jour assis et il a été montré
                une augmentation de 85% de risques supplémentaires de mortalité
                cardiovasculaire, pour 7h ou plus passées devant un écran par
                jour » (ONAPS).
              </p>
              <p className="mt-2 text-justify">
                Quel que soit le contexte (travail, transport, domestique,
                loisirs), il est nécessaire de réduire le temps total quotidien
                passé en position assise en interrompant les périodes prolongées
                (+ d&apos;1h) selon les lignes directrices de l&apos;OMS sur
                l&apos;activité physique et la sédentarité.
              </p>
              <p className="mt-2 text-justify">
                Par exemple : se lever toutes les 90 à 120 min, activité
                physique de type marche de quelques minutes et/ou des mouvements
                de mobilisation musculaire ou étirements, debout ou assis.
              </p>
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
