"use client";

import { useState, useMemo } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import type { PointData } from "@nivo/radar";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Lightbulb,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardPanel,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
} from "@/components/ui/alert-dialog";
import { Collapsible, CollapsiblePanel } from "@/components/ui/collapsible";
import type { DemographicsInput } from "@/lib/validations/demographics";
import {
  regroupValuesInDomain,
  computeStetauscopeData,
  computeAIREData,
  getStetauscopeDotColor,
} from "../data/scoring";
import { InterpretationStetauscopeModal } from "./modals/interpretation-stetauscope-modal";
import { InterpretationAIREModal } from "./modals/interpretation-aire-modal";
import { RecommandationsModal } from "./modals/recommandations-modal";

interface StepResultsProps {
  surveyId: string;
  demographics: DemographicsInput | null;
  responses: Record<string, unknown> | null;
  onPrevious: () => void;
}

export function StepResults({
  surveyId,
  demographics,
  responses,
  onPrevious,
}: StepResultsProps) {
  const [displayResults, setDisplayResults] = useState(false);

  // Modals
  const [showStetauscopeModal, setShowStetauscopeModal] = useState(false);
  const [showAIREModal, setShowAIREModal] = useState(false);
  const [showRecommandationsModal, setShowRecommandationsModal] =
    useState(false);

  const typePratique = demographics?.typePratique ?? "salarie";

  // Calculer les scores
  const domainValues = useMemo(() => {
    if (!responses) return {};
    return regroupValuesInDomain(
      responses as Record<string, number>,
      typePratique,
    );
  }, [responses, typePratique]);

  const stetauscopeData = useMemo(
    () => computeStetauscopeData(domainValues),
    [domainValues],
  );

  const aireData = useMemo(() => {
    if (!responses) return [];
    return computeAIREData(responses);
  }, [responses]);

  // Vérification des recommandations et addiction
  const recomSport = useMemo(() => {
    if (!responses) return false;
    const r = responses as Record<string, number>;
    return r.D1_6 === 5;
  }, [responses]);

  const isAddiction = useMemo(() => {
    if (!responses) return false;
    const r = responses as Record<string, number>;
    return r.D2_5 >= 4 || r.D2_7 >= 4;
  }, [responses]);

  // Effacer les données du navigateur
  const handleClearData = () => {
    try {
      localStorage.removeItem(`surveyData_${surveyId}`);
      localStorage.removeItem(`surveyPage_${surveyId}`);
      localStorage.removeItem(`survey-progress-${surveyId}`);
    } catch {
      // Ignore
    }
    window.location.reload();
  };

  return (
    <>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Merci !</CardTitle>
          </CardHeader>
          <CardPanel>
            <div className="space-y-6">
              <div className="flex justify-center text-green-600">
                <CheckCircle className="size-16" />
              </div>
              <p className="text-center text-lg font-medium">
                Vos réponses ont été enregistrées avec succès.
              </p>

              {/* Boutons d'action */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={onPrevious}>
                  <ArrowLeft className="mr-2 size-4" />
                  Retour Questionnaire
                </Button>
                <Button
                  variant={displayResults ? "secondary" : "default"}
                  onClick={() => setDisplayResults((prev) => !prev)}
                >
                  {displayResults ? (
                    <ChevronUp className="mr-2 size-4" />
                  ) : (
                    <ChevronDown className="mr-2 size-4" />
                  )}
                  {displayResults
                    ? "Masquer les résultats"
                    : "Afficher les résultats"}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <Button variant="destructive">
                        <Trash2 className="mr-2 size-4" />
                        Effacer les résultats
                      </Button>
                    }
                  />
                  <AlertDialogPopup>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Effacer les résultats ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir effacer les résultats de ce
                        navigateur ? Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogClose render={<Button variant="outline" />}>
                        Annuler
                      </AlertDialogClose>
                      <AlertDialogClose
                        render={
                          <Button
                            variant="destructive"
                            onClick={handleClearData}
                          />
                        }
                      >
                        Effacer
                      </AlertDialogClose>
                    </AlertDialogFooter>
                  </AlertDialogPopup>
                </AlertDialog>
              </div>

              {/* Section résultats dépliable */}
              <Collapsible open={displayResults}>
                <CollapsiblePanel>
                  <ResultsCharts
                    stetauscopeData={stetauscopeData}
                    aireData={aireData}
                    isAddiction={isAddiction}
                    recomSport={recomSport}
                    onShowStetauscope={() => setShowStetauscopeModal(true)}
                    onShowAIRE={() => setShowAIREModal(true)}
                    onShowRecommandations={() =>
                      setShowRecommandationsModal(true)
                    }
                  />
                </CollapsiblePanel>
              </Collapsible>

              <p className="text-center text-sm italic text-muted-foreground">
                Pour rappel, aucun résultat individuel ne peut être transmis par
                MOTS à quiconque, seuls des résultats{" "}
                <strong>collectifs garantissant la confidentialité</strong>{" "}
                peuvent être partagés pour faire l&apos;objet d&apos;un
                traitement et/ou d&apos;une présentation statistique.
              </p>
            </div>
          </CardPanel>
        </Card>

        {/* Modals */}
        <InterpretationStetauscopeModal
          open={showStetauscopeModal}
          onOpenChange={setShowStetauscopeModal}
        />
        <InterpretationAIREModal
          open={showAIREModal}
          onOpenChange={setShowAIREModal}
        />
        <RecommandationsModal
          open={showRecommandationsModal}
          onOpenChange={setShowRecommandationsModal}
        />
    </>
  );
}

// ── Sous-composant : graphiques radar ────────────────────────────────────────

interface ResultsChartsProps {
  stetauscopeData: ReturnType<typeof computeStetauscopeData>;
  aireData: ReturnType<typeof computeAIREData>;
  isAddiction: boolean;
  recomSport: boolean;
  onShowStetauscope: () => void;
  onShowAIRE: () => void;
  onShowRecommandations: () => void;
}

function ResultsCharts({
  stetauscopeData,
  aireData,
  isAddiction,
  recomSport,
  onShowStetauscope,
  onShowAIRE,
  onShowRecommandations,
}: ResultsChartsProps) {
  return (
    <div className="mt-4 space-y-8 rounded-xl border p-4 sm:p-6">
      {/* ── Stet'Auscope ── */}
      <section>
        <h3 className="mb-1 text-lg font-bold text-primary">
          Questionnaire Stet&apos;Auscope
        </h3>
        <p className="mb-4 text-sm text-muted-foreground text-justify">
          Ce graphique présente les domaines en lien avec votre activité
          professionnelle. Un score faible de couleur verte{" "}
          <strong>— au centre de la cible —</strong> signifie un meilleur
          facteur de protection. Un score élevé de couleur rouge{" "}
          <strong>— vers l&apos;extérieur de la cible —</strong> représente un
          facteur de risque potentiel à considérer.
        </p>

        <div className="mx-auto h-125 w-full max-w-153.75">
          <ResponsiveRadar
            data={stetauscopeData}
            keys={["Score"]}
            indexBy="subject"
            maxValue={100}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={3}
            borderColor={{ from: "color" }}
            gridLevels={4}
            gridShape="circular"
            gridLabelOffset={10}
            dotSize={26}
            dotColor={({ index, value }: { index: string; value: number }) =>
              getStetauscopeDotColor(value, index, isAddiction)
            }
            enableDotLabel={true}
            dotLabelYOffset={5}
            dotLabel={({ value }: PointData) => String(value)}
            colors={["#777"]}
            fillOpacity={0}
            blendMode="multiply"
            animate={true}
            motionConfig="wobbly"
            isInteractive={true}
            theme={{
              grid: { line: { stroke: "#bbb" } },
              axis: { ticks: { text: { fontSize: 13 } } },
              dots: { text: { fontSize: 15, fill: "#fff" } },
            }}
          />
        </div>

        <div className="mt-3 flex flex-wrap justify-end gap-3">
          {recomSport && (
            <Button variant="outline" onClick={onShowRecommandations}>
              <Lightbulb className="mr-2 size-4" />
              Recommandations
            </Button>
          )}
          <Button variant="outline" onClick={onShowStetauscope}>
            <Info className="mr-2 size-4" />
            Interprétation
          </Button>
        </div>
      </section>

      {/* ── AIRE ── */}
      {aireData.length > 0 && (
        <section>
          <h3 className="mb-1 text-lg font-bold text-primary">
            Questionnaire AIRE
          </h3>
          <p className="mb-4 text-sm text-muted-foreground text-justify">
            Ce graphique présente le rapport entretenu à votre travail par
            l&apos;évaluation des 4 dimensions suivantes : les Attentes perçues,
            l&apos;Investissement, les Renforcements ou Récompenses et le
            Sentiment d&apos;Efficacité. L&apos;équilibre entre les variables
            (forme carrée) représente un rapport équilibré à son travail.
          </p>

          <div className="mx-auto h-100 w-full max-w-137.5">
            <ResponsiveRadar
              data={aireData}
              keys={["Score"]}
              indexBy="subject"
              maxValue={9}
              margin={{ top: 10, right: 120, bottom: 10, left: 120 }}
              curve="linearClosed"
              borderWidth={5}
              borderColor={{ from: "color" }}
              gridLevels={9}
              gridShape="linear"
              gridLabelOffset={25}
              dotSize={26}
              dotColor="#0d196d"
              enableDotLabel={true}
              dotLabelYOffset={5}
              dotLabel={({ value }: PointData) => String(value)}
              colors={["#888"]}
              fillOpacity={0}
              blendMode="multiply"
              animate={true}
              motionConfig="wobbly"
              isInteractive={true}
              theme={{
                grid: { line: { stroke: "#ccc" } },
                axis: { ticks: { text: { fontSize: 14 } } },
                dots: { text: { fontSize: 15, fill: "#fff" } },
              }}
            />
          </div>

          <div className="mt-2 flex justify-end">
            <Button variant="outline" onClick={onShowAIRE}>
              <Info className="mr-2 size-4" />
              Interprétation
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
