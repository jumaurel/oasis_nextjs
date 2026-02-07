"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardPanel,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  demographicsSchema,
  type DemographicsInput,
} from "@/lib/validations/demographics";

interface StepDemographicsProps {
  initialData: DemographicsInput | null;
  onNext: (data: { demographics: DemographicsInput }) => void;
  onPrevious: () => void;
}

export function StepDemographics({
  initialData,
  onNext,
  onPrevious,
}: StepDemographicsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemographicsInput>({
    resolver: zodResolver(demographicsSchema),
    defaultValues: initialData ?? {
      age: undefined,
      genre: "",
      region: "",
      specialite: "",
      typePratique: "",
    },
  });

  const selectClassName =
    "flex h-9 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow focus-visible:border-ring focus-visible:ring-[3px] disabled:opacity-64 sm:h-8 sm:text-sm";

  const onSubmit = (data: DemographicsInput) => {
    onNext({ demographics: data });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Données démographiques</CardTitle>
        <p className="text-sm text-muted-foreground">
          Ces informations permettent d&apos;une part de vous proposer un
          questionnaire adapté à votre modalité de pratique et d&apos;autre part
          de recueillir des données statistiques anonymes des résultats.
        </p>
      </CardHeader>
      <CardPanel>
        <form
          id="demographics-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                placeholder="Votre âge"
                {...register("age", { valueAsNumber: true })}
              />
              {errors.age && (
                <p className="text-xs text-destructive">{errors.age.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="genre">Genre</Label>
              <select
                id="genre"
                className={selectClassName}
                {...register("genre")}
              >
                <option value="">Sélectionner</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autre">Autre</option>
                <option value="non-specifie">Ne souhaite pas préciser</option>
              </select>
              {errors.genre && (
                <p className="text-xs text-destructive">
                  {errors.genre.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="typePratique">Type de pratique</Label>
              <select
                id="typePratique"
                className={selectClassName}
                {...register("typePratique")}
              >
                <option value="">Sélectionner</option>
                <option value="liberal">Libéral</option>
                <option value="salarie">Salarié(e)</option>
              </select>
              {errors.typePratique && (
                <p className="text-xs text-destructive">
                  {errors.typePratique.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="region">Région</Label>
              <select
                id="region"
                className={selectClassName}
                {...register("region")}
              >
                <option value="">Sélectionnez votre région</option>
                <option value="Auvergne-Rhône-Alpes">
                  Auvergne-Rhône-Alpes
                </option>
                <option value="Bourgogne-Franche-Comté">
                  Bourgogne-Franche-Comté
                </option>
                <option value="Bretagne">Bretagne</option>
                <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                <option value="Corse">Corse</option>
                <option value="Grand Est">Grand Est</option>
                <option value="Hauts-de-France">Hauts-de-France</option>
                <option value="Île-de-France">Île-de-France</option>
                <option value="Normandie">Normandie</option>
                <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                <option value="Occitanie">Occitanie</option>
                <option value="Pays de la Loire">Pays de la Loire</option>
                <option value="Provence-Alpes-Côte d'Azur">
                  Provence-Alpes-Côte d&apos;Azur
                </option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Martinique">Martinique</option>
                <option value="Guyane">Guyane</option>
                <option value="La Réunion">La Réunion</option>
                <option value="Mayotte">Mayotte</option>
              </select>
              {errors.region && (
                <p className="text-xs text-destructive">
                  {errors.region.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="specialite">Métier / Spécialité</Label>
              <select
                id="specialite"
                className={selectClassName}
                {...register("specialite")}
              >
                <option value="">Sélectionnez votre métier / spécialité</option>
                <option value="Médecin" disabled className="font-bold">
                  ↳ Médecin
                </option>
                <option value="Médecin_Anatomo-pathologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Anatomo-pathologie
                </option>
                <option value="Médecin_Anesthésiste-réanimation">
                  &nbsp;&nbsp;&nbsp;&nbsp;Anesthésiste-réanimation
                </option>
                <option value="Médecin_Cardiologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Cardiologie
                </option>
                <option value="Médecin_Chirurgie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Chirurgie
                </option>
                <option value="Médecin_Dermatologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Dermatologie
                </option>
                <option value="Médecin_Endocrinologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Endocrinologie
                </option>
                <option value="Médecin_Gériatrie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Gériatrie
                </option>
                <option value="Médecin_Gynécologue-obstétricien">
                  &nbsp;&nbsp;&nbsp;&nbsp;Gynécologue-obstétricien
                </option>
                <option value="Médecin_Hématologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Hématologie
                </option>
                <option value="Médecin_Hépato-gastro-entérologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Hépato-gastro-entérologie
                </option>
                <option value="Médecin_Infectiologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Infectiologie
                </option>
                <option value="Médecin_Urgences">
                  &nbsp;&nbsp;&nbsp;&nbsp;Urgences
                </option>
                <option value="Médecin_Reproduction-et-gynécologie-médicale">
                  &nbsp;&nbsp;&nbsp;&nbsp;Reproduction et gynécologie médicale
                </option>
                <option value="Médecin_Médecine-et-santé-au-travail">
                  &nbsp;&nbsp;&nbsp;&nbsp;Médecine et santé au travail
                </option>
                <option value="Médecin_Médecine-générale">
                  &nbsp;&nbsp;&nbsp;&nbsp;Médecine générale
                </option>
                <option value="Médecin_Médecine-interne">
                  &nbsp;&nbsp;&nbsp;&nbsp;Médecine interne
                </option>
                <option value="Médecin_Médecine-légale-et-expertise-médicale">
                  &nbsp;&nbsp;&nbsp;&nbsp;Médecine légale et expertise médicale
                </option>
                <option value="Médecin_Médecine-physique-et-réadaptation">
                  &nbsp;&nbsp;&nbsp;&nbsp;Médecine physique et réadaptation
                </option>
                <option value="Médecin_Neurologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Neurologie
                </option>
                <option value="Médecin_Néphrologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Néphrologie
                </option>
                <option value="Médecin_Oncologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Oncologie
                </option>
                <option value="Médecin_Médecine-Pneumologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Pneumologie
                </option>
                <option value="Médecin_Pédiatrie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Pédiatrie
                </option>
                <option value="Médecin_Psychiatrie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Psychiatrie
                </option>
                <option value="Médecin_Radiologie">
                  &nbsp;&nbsp;&nbsp;&nbsp;Radiologie
                </option>
                <option value="Médecin_Santé-publique">
                  &nbsp;&nbsp;&nbsp;&nbsp;Santé publique
                </option>
                <option value="Médecin_Non-renseigné">
                  &nbsp;&nbsp;&nbsp;&nbsp;Non renseigné
                </option>
                <option value="IDE" disabled className="font-bold">
                  ↳ IDE
                </option>
                <option value="IDE_IDE">&nbsp;&nbsp;&nbsp;&nbsp;IDE</option>
                <option value="IDE_IADE">&nbsp;&nbsp;&nbsp;&nbsp;IADE</option>
                <option value="IDE_IBODE">&nbsp;&nbsp;&nbsp;&nbsp;IBODE</option>
                <option value="IDE_IDE-anesthésiste">
                  &nbsp;&nbsp;&nbsp;&nbsp;IDE anesthésiste
                </option>
                <option value="IDE_Puéricultrice">
                  &nbsp;&nbsp;&nbsp;&nbsp;Puéricultrice
                </option>
                <option value="IDE_Cadre-de-santé">
                  &nbsp;&nbsp;&nbsp;&nbsp;Cadre de santé
                </option>
                <option value="Chirurgien-Dentiste" className="font-bold">
                  Chirurgien-Dentiste
                </option>
                <option value="MKDE" className="font-bold">
                  MKDE
                </option>
                <option value="Orthophoniste" className="font-bold">
                  Orthophoniste
                </option>
                <option value="Orthoptiste" className="font-bold">
                  Orthoptiste
                </option>
                <option value="Pédicure-Podologue" className="font-bold">
                  Pédicure-Podologue
                </option>
                <option value="Biologiste-Médical" className="font-bold">
                  Biologiste Médical
                </option>
                <option value="Pharmacien" className="font-bold">
                  Pharmacien
                </option>
                <option value="Sage-femme-Maïeuticien" className="font-bold">
                  Sage-femme / Maïeuticien
                </option>
                <option value="Autre" className="font-bold">
                  Autre professionnel de santé
                </option>
              </select>
              {errors.specialite && (
                <p className="text-xs text-destructive">
                  {errors.specialite.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </CardPanel>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
        <Button type="submit" form="demographics-form">
          Continuer
        </Button>
      </CardFooter>
    </Card>
  );
}
