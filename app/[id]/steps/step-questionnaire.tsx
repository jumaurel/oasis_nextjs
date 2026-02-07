"use client";

import { useState, useCallback, useMemo } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import "survey-core/i18n/french";
import { Button } from "@/components/ui/button";
import { Card, CardPanel, CardFooter } from "@/components/ui/card";
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
import { Q_liberal } from "../surveysJSON/Q_liberal";
import { Q_salarie } from "../surveysJSON/Q_salarie";
import { themeJson } from "../surveysJSON/theme";

interface StepQuestionnaireProps {
  surveyId: string;
  surveyType: string;
  typePratique: string;
  demographics: {
    age: number;
    genre: string;
    region: string;
    specialite: string;
    typePratique: string;
  } | null;
  initialResponses: Record<string, unknown> | null;
  isSubmitted: boolean;
  onNext: (data: { responses: Record<string, unknown> }) => void;
  onPrevious: () => void;
}

export function StepQuestionnaire({
  surveyId,
  typePratique,
  demographics,
  initialResponses,
  isSubmitted,
  onNext,
  onPrevious,
}: StepQuestionnaireProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const survey = useMemo(() => {
    // Charger le bon questionnaire selon le type de pratique
    const surveyJson = typePratique === "liberal" ? Q_liberal : Q_salarie;
    const model = new Model(surveyJson);

    model.locale = "fr";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model.applyTheme(themeJson as any);

    // Masquer la navigation interne de SurveyJS — on gère la complétion nous-mêmes
    model.showNavigationButtons = "none";

    // Restaurer les réponses précédentes
    if (initialResponses) {
      model.data = initialResponses;
    }

    // Si déjà soumis, figer en lecture seule
    if (isSubmitted) {
      model.mode = "display";
    }

    // Restaurer la page en cours depuis localStorage
    try {
      const savedPage = localStorage.getItem(`surveyPage_${surveyId}`);
      if (savedPage !== null) {
        model.currentPageNo = parseInt(savedPage, 10);
      }
    } catch {
      // Ignore
    }

    // Barre de progression en pourcentage
    model.addLayoutElement({
      id: "progressbar-percentage",
      component: "sv-progressbar-percentage",
      container: "contentTop",
      data: model,
    });

    // Sauvegarder les réponses et la page à chaque changement
    model.onValueChanged.add(() => {
      try {
        localStorage.setItem(
          `surveyData_${surveyId}`,
          JSON.stringify(model.data),
        );
        localStorage.setItem(
          `surveyPage_${surveyId}`,
          model.currentPageNo.toString(),
        );
        localStorage.setItem(
          `surveyPlainData_${surveyId}`,
          JSON.stringify(model.getPlainData()),
        );
      } catch {
        // Ignore
      }
    });

    // Sauvegarder aussi quand on change de page (navigation interne SurveyJS)
    model.onCurrentPageChanged.add(() => {
      try {
        localStorage.setItem(
          `surveyPage_${surveyId}`,
          model.currentPageNo.toString(),
        );
      } catch {
        // Ignore
      }
    });

    return model;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId, typePratique, isSubmitted]);

  const handleConfirmComplete = useCallback(async () => {
    // Si déjà soumis, passer directement sans re-sauvegarder
    if (isSubmitted) {
      onNext({ responses: survey.data });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    setIsSaving(true);
    try {
      // Sauvegarder les données finales en localStorage
      localStorage.setItem(
        `surveyData_${surveyId}`,
        JSON.stringify(survey.data),
      );
      localStorage.setItem(
        `surveyPlainData_${surveyId}`,
        JSON.stringify(survey.getPlainData()),
      );

      // Enregistrer en base de données
      if (demographics) {
        await fetch(`/api/surveys/${surveyId}/responses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            age: demographics.age,
            genre: demographics.genre,
            region: demographics.region,
            specialite: demographics.specialite,
            typePratique: demographics.typePratique,
            reponses: survey.data,
          }),
        });
      }
    } catch {
      // On continue même si l'enregistrement échoue
    } finally {
      setIsSaving(false);
      setShowConfirm(false);
    }

    onNext({ responses: survey.data });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [survey, surveyId, demographics, onNext, isSubmitted]);

  const handleComplete = useCallback(() => {
    // Si déjà soumis, passer directement aux résultats
    if (isSubmitted) {
      onNext({ responses: survey.data });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    // Si le questionnaire n'est pas sur la dernière page, avancer d'une page
    if (!survey.isLastPage) {
      survey.nextPage();
      return;
    }
    // Sur la dernière page, vérifier la validation avant d'afficher la confirmation
    if (survey.validate()) {
      setShowConfirm(true);
    }
  }, [survey, isSubmitted, onNext]);

  // Pré-remplir toutes les questions avec la première réponse (dev uniquement)
  const handlePrefill = useCallback(() => {
    const data: Record<string, unknown> = {};
    for (const question of survey.getAllQuestions()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const q = question as any;
      if (q.choices && q.choices.length > 0) {
        data[q.name] = q.choices[0].value ?? q.choices[0];
      }
    }
    survey.data = { ...survey.data, ...data };
    survey.render();
  }, [survey]);

  return (
    <>
      <Card>
        <CardPanel>
          <Survey model={survey} />
        </CardPanel>
        <CardFooter className="justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (survey.currentPageNo > 0) {
                survey.prevPage();
              } else {
                onPrevious();
              }
            }}
          >
            Précédent
          </Button>
          <div className="flex gap-2">
            {process.env.NODE_ENV === "development" && (
              <Button variant="outline" onClick={handlePrefill}>
                Pré-remplir (dev)
              </Button>
            )}
            <Button onClick={handleComplete}>
              {isSubmitted
                ? "Voir les résultats"
                : survey.isLastPage
                  ? "Terminer"
                  : "Suivant"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogTrigger className="hidden" />
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la soumission</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de valider définitivement vos réponses. Une
              fois soumises, vous ne pourrez plus les modifier. Souhaitez-vous
              continuer ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose
              render={
                <Button variant="outline" disabled={isSaving}>
                  Revenir au questionnaire
                </Button>
              }
            />
            <Button onClick={handleConfirmComplete} disabled={isSaving}>
              {isSaving ? "Enregistrement…" : "Valider mes réponses"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </>
  );
}
