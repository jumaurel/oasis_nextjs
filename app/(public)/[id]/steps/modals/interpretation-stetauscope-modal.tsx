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

interface InterpretationStetauscopeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InterpretationStetauscopeModal({
  open,
  onOpenChange,
}: InterpretationStetauscopeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="max-w-2xl" showCloseButton={false}>
        <DialogHeader className="flex-row items-center gap-3 border-b pb-4">
          <Info className="size-6 text-primary" />
          <DialogTitle className="text-lg">
            Interprétation des résultats Stet&apos;Auscope
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
                Comprendre le graphe radar
              </h3>
              <p className="text-justify">
                Un score a été automatiquement calculé dans chacune des 16
                dimensions en lien avec votre activité. Ces scores vous sont
                présentés sous la forme d&apos;un graphique de type radar :
              </p>
              <ul className="ml-4 my-2 space-y-1 list-disc list-inside">
                <li>
                  Plus le score par dimension est faible{" "}
                  <strong>
                    (et donc proche de 0, au centre de la cible), plus il est
                    favorable
                  </strong>{" "}
                  dans la dimension concernée.
                </li>
                <li>
                  Inversement, lorsque ce score est élevé,{" "}
                  <strong>
                    vers l&apos;extérieur de la cible, il est symptomatique
                    d&apos;un déséquilibre médico-professionnel
                  </strong>{" "}
                  actuel et pourrait être à risque d&apos;induire à court /
                  moyen terme un effet en termes de santé globale.
                </li>
              </ul>
              <p>
                Une étiquette reprend le score de chacune des dimensions sur une
                échelle visuelle colorée :
              </p>
              <div className="my-3 flex justify-center">
                <Image
                  src="/stet_cible.png"
                  width={200}
                  height={40}
                  alt="Échelle de couleurs Stet'Auscope"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-bold text-primary">
                Intérêt de cette modélisation
              </h3>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>
                  Vous permettre une visualisation très rapide et globale des
                  résultats de l&apos;évaluation que vous faites, à date :
                  repérage des scores protecteurs et des scores défavorables
                  pour chacune des dimensions.
                </li>
                <li>
                  Vous servir de guide pour essayer d&apos;agir sur des facteurs
                  de prévention complémentaire dans une ou plusieurs dimensions
                  tout en conservant les facteurs de protection identifiés.
                </li>
              </ul>
            </div>

            <p className="text-justify">
              Cette proposition n&apos;est pas une solution en elle-même, mais
              elle peut vous aider à prendre conscience du poids que
              représentent pour vous personnellement et comme professionnel de
              santé, certaines dimensions qui agissent potentiellement comme
              facteurs de risque de déséquilibre voire d&apos;épuisement
              professionnel.
            </p>

            <p className="text-justify">
              Au-delà de cet outil réflexif, notre priorité est de pouvoir vous
              accompagner si vous le jugez utile. Vous pouvez nous appeler au{" "}
              <strong>06 08 282 589</strong>.
              <br />
              Nous accompagnons dans la plus stricte confidentialité et
              indépendance, médecins et professionnels de santé avec Ordre et/ou
              URPS. Depuis 2010, c&apos;est plus de 2400 praticiens qui ont
              bénéficié de notre modèle de pair-aidance.
            </p>
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
