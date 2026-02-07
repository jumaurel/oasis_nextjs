"use client";

import { useState, useCallback } from "react";
import { StepConsent } from "./steps/step-consent";
import { StepDemographics } from "./steps/step-demographics";
import { StepQuestionnaire } from "./steps/step-questionnaire";
import { StepResults } from "./steps/step-results";
import type { DemographicsInput } from "@/lib/validations/demographics";

interface SurveyData {
  id: string;
  name: string;
  surveyType: string;
  structureName: string;
}

interface SurveyProgress {
  currentStep: number;
  consent: boolean | null;
  demographics: DemographicsInput | null;
  responses: Record<string, unknown> | null;
  submittedToDb: boolean;
  completedAt: string | null;
}

const defaultProgress: SurveyProgress = {
  currentStep: 1,
  consent: null,
  demographics: null,
  responses: null,
  submittedToDb: false,
  completedAt: null,
};

function getStorageKey(surveyId: string) {
  return `survey-progress-${surveyId}`;
}

export function QuestionnaireClient({ survey }: { survey: SurveyData }) {
  const [progress, setProgress] = useState<SurveyProgress>(() => {
    if (typeof window === "undefined") return defaultProgress;
    try {
      const saved = localStorage.getItem(getStorageKey(survey.id));
      if (saved) {
        const parsed = JSON.parse(saved) as SurveyProgress;
        if (!parsed.completedAt) return parsed;
      }
    } catch {
      // Ignore les erreurs de parsing
    }
    return defaultProgress;
  });

  // Sauvegarder la progression dans localStorage à chaque changement
  const saveProgress = useCallback(
    (newProgress: SurveyProgress) => {
      setProgress(newProgress);
      try {
        localStorage.setItem(
          getStorageKey(survey.id),
          JSON.stringify(newProgress),
        );
      } catch {
        // Ignore les erreurs de localStorage
      }
    },
    [survey.id],
  );

  const goToStep = useCallback(
    (step: number) => {
      saveProgress({ ...progress, currentStep: step });
    },
    [progress, saveProgress],
  );

  const handleNext = useCallback(
    (data?: Partial<SurveyProgress>) => {
      const newProgress = {
        ...progress,
        ...data,
        currentStep: Math.min(progress.currentStep + 1, 4),
      };
      saveProgress(newProgress);
    },
    [progress, saveProgress],
  );

  const handlePrevious = useCallback(() => {
    goToStep(Math.max(progress.currentStep - 1, 1));
  }, [progress.currentStep, goToStep]);

  const handleSubmitted = useCallback(() => {
    const completed = { ...progress, completedAt: new Date().toISOString() };
    try {
      localStorage.removeItem(getStorageKey(survey.id));
    } catch {
      // Ignore
    }
    setProgress(completed);
  }, [progress, survey.id]);

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div>
          {progress.currentStep === 1 && (
            <StepConsent
              initialConsent={progress.consent ?? false}
              onNext={(data) => handleNext(data)}
            />
          )}
          {progress.currentStep === 2 && (
            <StepDemographics
              initialData={progress.demographics}
              onNext={(data) => handleNext(data)}
              onPrevious={handlePrevious}
            />
          )}
          {progress.currentStep === 3 && (
            <StepQuestionnaire
              surveyId={survey.id}
              surveyType={survey.surveyType}
              typePratique={progress.demographics?.typePratique ?? ""}
              demographics={progress.demographics}
              initialResponses={progress.responses}
              isSubmitted={progress.submittedToDb}
              onNext={(data) => handleNext({ ...data, submittedToDb: true })}
              onPrevious={handlePrevious}
            />
          )}
          {progress.currentStep === 4 && (
            <StepResults
              surveyId={survey.id}
              demographics={progress.demographics}
              responses={progress.responses}
              onPrevious={handlePrevious}
            />
          )}
        </div>
      </div>

      <footer className="border-t border-border bg-muted/40 px-4 py-6 mt-12">
        <p className="mx-auto max-w-3xl text-center text-xs text-muted-foreground leading-relaxed">
          © 2026 MOTS - Tous droits réservés - V1.0. Ce questionnaire est la
          propriété exclusive de MOTS et ne peut être utilisé, reproduit ou
          distribué sans l&apos;autorisation expresse de MOTS.
        </p>
      </footer>
    </div>
  );
}
