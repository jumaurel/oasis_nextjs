export const Q_salarie = {
  "locale": "fr",
  "title": {
    "default": "Questionnaire MOTS",
    "fr": "Questionnaire en pratique salariée"
  },
  "logoPosition": "right",
  "pages": [
    {
      "name": "P_Masante",
      "title": "Comment je prends soin de ma santé",
      "elements": [
        {
          "type": "html",
          "name": "question1",
          "html": {
            "fr": "Ce questionnaire, développé par MOTS, est un outil permettant  au praticien  une analyse de sa propre situation, dans une dimension de santé globale :<br/>\n- Professionnelle : comment j’exerce mon activité ?<br/>\n- Personnelle : comment je me soigne et je prends soin de ma propre santé,\ncomme soignant ?<br/>\n- Médico-professionnelle : comment j’organise mon équilibre pro/perso et quels\nimpacts favorables et/ou défavorables en termes de santé globale ?\n<br/><br/>\nPour chaque question, répondez de la manière la plus spontanée possible en choisissant l'item qui correspond le mieux à votre ressenti actuel."
          }
        },
        {
          "type": "radiogroup",
          "name": "D1_1",
          "title": {
            "default": "J'ai désigné un médecin traitant autre que moi-même ou qu’un proche (famille, collègue, ami…) que je consulte autant que de besoin (préventif, curatif)",
            "fr": "J'ai désigné un médecin traitant autre que moi-même (si je suis médecin) ou qu’un proche (famille, collègue, ami…) que je consulte autant que de besoin (préventif, curatif)"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui, j'ai un médecin traitant autre",
                "fr": "Oui c'est le cas"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Non je n'ai pas de pas de médecin traitant autre",
                "fr": "Non, mon médecin traitant désigné est un proche (famille, collègue, ami..)"
              }
            },
            {
              "value": "-1",
              "text": {
                "fr": "Non, je suis mon propre médecin traitant"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non, je n'ai aucun médecin traitant déclaré ou que je consulte"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D1_2",
          "visibleIf": "{D1_1} = -1",
          "title": {
            "default": "Etant mon propre médecin traitant, j’organise avec sérieux et de façon adaptée le suivi de ma santé (préventif, curatif, médical et paramédical) auprès des professionnels compétents",
            "fr": "Si je suis mon propre médecin traitant, j’organise avec sérieux et de façon adaptée le suivi régulier de ma santé (notamment pour les pathologies dont je peux être atteint) auprès des professionnels compétents"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": "3",
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": "Non pas du tout"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D1_3",
          "title": {
            "default": "Mon calendrier vaccinal est à jour ",
            "fr": "Quand j'en ressens la compétence, et uniquement dans ce cas, je pratique l’autodiagnostic et / ou l’auto-traitement et je ne laisse pas évoluer mes affections"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": {
                "default": "Oui",
                "fr": "Oui et uniquement dans ce cas"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Non",
                "fr": "Oui et bien plus souvent que je ne le devrais"
              }
            },
            {
              "value": "0",
              "text": {
                "default": "Je ne sais pas",
                "fr": "Je m'en remets toujours à un médecin tiers"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D1_4",
          "title": "Mon calendrier vaccinal est à jour ",
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui"
            },
            {
              "value": "5",
              "text": "Non"
            },
            {
              "value": 3,
              "text": "Je ne sais pas"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D1_5",
          "title": {
            "default": "J'applique ou fais appliquer pour moi-même les recommandations de dépistage (cancer du sein, cancer du colon … ) et de consultation de spécialistes en cas de symptômes inhabituels",
            "fr": "En cas de facteur de risque (personnel ou familial) ou en fonction des recommandations, je réalise les dépistages préconisés (cancer du sein, du col, cancer du colon, épreuve d'effort … ) et je consulte un spécialiste en fonction des résultats"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": 3,
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": "Non pas du tout"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D1_6",
          "title": {
            "default": "Je pratique une activité physique au-moins 1 à 2 fois/semaine",
            "fr": "Globalement, je pratique 30mn d'activité physique modérée (ou 15mn à intensité élevée) au moins 5 jours/sem (ou > 150mn d'activité physique cumulée à intensité modérée sur la semaine)  - selon la recommandation OMS"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui"
            },
            {
              "value": "5",
              "text": "Non"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D1_7",
          "title": {
            "default": "Je prends le temps de faire des pauses pour déjeuner",
            "fr": "Globalement, je prends le temps de faire des pauses pour déjeuner et j'ai en général une alimentation  équilibrée"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Non",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page2",
      "title": "Etat de santé",
      "elements": [
        {
          "type": "radiogroup",
          "name": "D2_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je suis porteur d’une pathologie qui nécessite un suivi par un médecin spécialiste et me fais suivre régulièrement"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": "Oui et mon équilibre médico-professionnel est satisfaisant"
            },
            {
              "value": "3",
              "text": "Oui et mon équilibre médico-professionnel est impacté"
            },
            {
              "value": "5",
              "text": {
                "default": "Non je n'ai pas de pathologie chronique",
                "fr": "Non je ne me fais pas suivre"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Je n'ai pas de pathologie particulière"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D2_2",
          "title": {
            "default": "Je considère que j'ai un sommeil de qualité et/ou suffisant",
            "fr": "Globalement lorsque je travaille, je considère que j'ai un sommeil de qualité et/ou suffisant"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": 3,
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": "Non pas du tout"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D2_3",
          "title": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": 3,
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": "Non pas du tout"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D2_4",
          "title": "Je considère que je suis en bonne santé au plan psychique",
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": 3,
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": "Non pas du tout"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D2_5",
          "title": {
            "default": "Je consomme régulièrement de l’alcool au-delà de 10 unités alcool/semaine",
            "fr": "Je consomme de l'alcool dans les limites des recos OMS (moins de 10 unités / semaine)"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Oui",
                "fr": "Oui et je reste en deçà"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Non",
                "fr": "Non je dépasse régulièrement les recommandations d'usage et/ou j'ai le sentiment de consommer trop régulièrement de l'alcool"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "J'ai une dépendance à l'alcool"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Je ne consomme pas d'alcool"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D2_6",
          "title": {
            "default": "Je consomme régulièrement de l’alcool au-delà de 10 unités alcool/semaine",
            "fr": "En dehors de prescriptions médicamenteuses d'un médecin tiers pour une pathologie en cours, je ressens le besoin de m'auto-administrer régulièrement des médicaments psychotropes ou autres substances pharmacologiques à effet psychotrope"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui",
                "fr": "Oui quasi-quotidiennement ou presque"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Non",
                "fr": "Oui occasionnellement mais plus d'une fois par mois"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "Oui occasionnellement mais moins d'une fois par mois"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non jamais"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D2_7",
          "title": {
            "default": "Je consomme régulièrement des psychotropes ou autres substances (effet pharmacologique)",
            "fr": "Je consomme régulièrement des drogues illicites ou des médicaments de manière illicite"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": "Oui"
            },
            {
              "value": "0",
              "text": "Non"
            }
          ]
        }
      ]
    },
    {
      "name": "page3",
      "title": {
        "default": "Etat de santé",
        "fr": "Avenir et projections professionnelles"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D3_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "A cause de mon état de santé, j’envisage d'ici 3 ans une reconversion professionnelle dans une autre spécialité, un autre métier (soin et hors soin) ? "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "3",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui toujours dans mon métier actuel mais avec une autre spécialité ou autre mode d'activité"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui, hors de mon métier actuel mais en restant soignant"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Oui, mais hors domaine du soin"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D3_2",
          "title": {
            "default": "Je considère que j'ai un sommeil de qualité et/ou suffisant",
            "fr": "J’ai plusieurs modes d’exercice (libéral / salarié) ou différentes fonctions (expertise, enseignement, coordination, tutorat, activité de recherche, animation au sein d'une CPTS ou MSP, gestes techniques spécifiques.…) "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui tout à fait",
                "fr": "Oui et c'est positif"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Plutôt oui",
                "fr": "Oui c'est intéressant mais c'est beaucoup d'activités"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Oui et c'est trop"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Non pas de diversification ou si oui, cela à un effet neutre pour moi"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D3_3",
          "title": {
            "default": "Je fume",
            "fr": " Je m’ouvre à d’autres aspects transverses à mon activité clinique : qualité des soins, gestion des risques, éducation thérapeutique, etc."
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui",
                "fr": "Oui, et c'est positif"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Non",
                "fr": "Oui je voudrais mais je ne peux pas"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Oui et c'est trop"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Non pas de diversification ou si oui, cela à un effet neutre pour moi"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D3_4",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "Mon état de santé actuel me permet d'envisager la poursuite de mon activité professionnelle dans les conditions actuelles pour les 3 ans à venir"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": "4",
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": "Non pas du tout"
            }
          ]
        }
      ]
    },
    {
      "name": "page4",
      "title": {
        "default": "Etat de santé",
        "fr": "Se préserver"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D4_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je trouve que je garde suffisamment de temps pour moi"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D4_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Les membres de ma famille trouvent que le travail me laisse assez de disponibilité pour moi ou pour eux "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D4_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J’ai des centres d’intérêts en dehors de mon travail"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D4_4",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "Au cours des 3 dernières années, j'estime avoir pu prendre suffisamment de vacances"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": "4",
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": "Non pas du tout"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D4_5",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "Je suis bien informé.e des risques pour ma santé (physique et psychique) inhérents à mon activité professionnelle"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": 3,
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D4_6",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "Je considère bénéficier d'un suivi adapté de ma santé en lien avec les risques de mon travail "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": 3,
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D4_7",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "Je considère que les mesures de prévention (santé physique et psychologique) que je mets en œuvre (ou qui sont mises en œuvre par mon établissement) vis-à-vis des risques de mon métier sont suffisantes"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": "Oui tout à fait"
            },
            {
              "value": "1",
              "text": "Plutôt oui"
            },
            {
              "value": 3,
              "text": "Plutôt non"
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D4_8",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "J'ai souscrit / je bénéficie d'une assurance de prévoyance (maladie, invalidité, décès) "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui tout à fait",
                "fr": "Oui"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Plutôt oui",
                "fr": "Non"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Plutôt non",
                "fr": "Je ne sais pas"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page5",
      "title": {
        "default": "Etat de santé",
        "fr": "Charge et pression temporelle"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D5_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": " Je travaille plus de 10 heures par jour ou davantage et/ou sans 2 jours consécutifs de repos"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui très régulièrement"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui assez souvent"
              }
            },
            {
              "value": "2",
              "text": {
                "fr": "Oui mais peu souvent"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D5_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": " Je peux facilement déprogrammer des RDV et/ou soins si besoin "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui ou non concerné"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui mais c'est difficile"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non je ne peux pas"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D5_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je peux facilement m'organiser pour avoir la disponibilité nécessaire pour gérer des urgences ou des imprévus dans la journée "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D5_4",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "Je suis interrompu durant les consultations / les soins  (téléphone, patient, collègue, cadre de santé,…) "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui tout à fait",
                "fr": "Oui souvent"
              }
            },
            {
              "value": 2,
              "text": {
                "default": "Plutôt oui",
                "fr": "Oui occasionnellement"
              }
            },
            {
              "value": "0",
              "text": {
                "default": "Plutôt non",
                "fr": "Non jamais ou non concerné"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D5_5",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "Je suis  en retard par rapport à mon  planning et cela m'est une cause de tension psychique"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui tout à fait",
                "fr": "Oui souvent"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Plutôt oui",
                "fr": "Oui occasionnellement"
              }
            },
            {
              "value": "0",
              "text": {
                "default": "Plutôt non",
                "fr": "Non jamais"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D5_6",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": " Globalement j’ai le sentiment d’avoir suffisamment de temps auprès de chaque patient"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui tout à fait",
                "fr": "Oui et c'est positif"
              }
            },
            {
              "value": 2,
              "text": {
                "default": "Plutôt oui",
                "fr": "Oui mais pas aussi souvent que je le souhaiterais"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Plutôt non",
                "fr": "Non mais cela ne me perturbe pas trop"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non et cela me dérange"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D5_7",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "Je me sens envahi par les demandes administratives des patients (arrêts-maladie non justifiés, renouvellement d'ordonnances, rédaction de certificats, bons de transports….)"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui tout à fait",
                "fr": "Oui et cela devient insupportable"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Plutôt oui",
                "fr": "Oui et c'est pénible"
              }
            },
            {
              "value": "2",
              "text": {
                "default": "Plutôt non",
                "fr": "Occasionnellement"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non jamais"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page7",
      "title": {
        "default": "Etat de santé",
        "fr": "Equilibre émotionnel"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D6_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je me sens trop souvent et facilement envahi par des émotions qui me dérangent"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D6_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "En cas de difficultés professionnelles (surcharge de travail, erreur, …) je sais que je peux compter sur le soutien de mon entourage professionnel et/ou personnel"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D6_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je peux réaliser un débriefing émotionnel avec un(e) professionnel(le) lors de choc émotionnel professionnel qui le justifie"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Non"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Je ne sais pas"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D6_4",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je participe à un groupe de parole (groupe de pairs), supervision, régulation, groupe Balint…"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui souvent"
              }
            },
            {
              "value": 2,
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui occasionnellement"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non jamais"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D6_5",
          "title": {
            "default": "J'estime que ma condition physique est adaptée à mon exercice professionnel ",
            "fr": "J’ai bénéficié il y a moins de 5 ans d'une formation à la prévention de l'épuisement professionnel et/ou à la prévention du stress "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui tout à fait",
                "fr": "Oui"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Plutôt oui",
                "fr": "Non"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page8",
      "title": {
        "default": "Etat de santé",
        "fr": "Gestion des appels"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D7_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je communique généralement mon numéro de téléphone portable personnel à mes patients  "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "2",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui et cela me convient"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui mais cela me pose des problèmes"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non jamais"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D7_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": " Je communique généralement par email directement avec mes patients"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui et cela me convient"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui mais ça a tendance à me prendre du temps"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Oui et cela ne peut plus durer"
              }
            },
            {
              "value": "-1",
              "text": {
                "fr": "Non ou très occasionnellement"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page9",
      "title": {
        "default": "Etat de santé",
        "fr": "Activité clinique"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D8_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": " Je pratique plusieurs fois par semaine des consultations téléphoniques / téléconsultations"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui et c'est une aide OU non mais ça me convient"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui est c'est un problème de plus OU non et ça me manque"
              }
            },
            {
              "value": "-1",
              "text": {
                "fr": "Je suis indifférent à cette modalité d'organisation"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D8_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je participe  à un tour de garde ou d'astreinte"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui et je l'assume bien"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui mais je trouve cela fatiguant"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Oui mais je trouve cela contraignant"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non, car non concerné dans mon activité ou si concerné cela n'est pas obligatoire"
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "Non j'en suis dispensé médicalement"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D8_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "En général, le planning mis à ma disposition pour des soins / des RDV / des interventions que je pratique me convient "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "Plutôt Non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D8_4",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Les différents types d'activités dans le service sont répartis équitablement (Consultations urgentes / non urgentes / types de soins / visites et contre-visites dans le service / Tour de gardes ou d'astreintes…)"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui  tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D8_5",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J'arrive à intégrer les urgences ou le \"non programmé\" dans ma pratique"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui très régulièrement"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui mais pas suffisamment"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "Non et je devrais le faire"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            },
            {
              "value": "-1",
              "text": {
                "fr": "Non concerné"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page10",
      "title": {
        "default": "Etat de santé",
        "fr": "Activité administrative"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D9_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je maîtrise suffisamment bien mon logiciel informatique professionnel"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D9_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je suis vigilant.e dans la tenue des dossiers patients pour prévenir des problèmes médico-légaux potentiels en cas de litige"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D9_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je passe beaucoup trop de temps à la réalisation de tâches administratives de mon cabinet et/ou connexes "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui"
              }
            },
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Non "
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page11",
      "title": {
        "default": "Etat de santé",
        "fr": "Formation professionnelle"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D10_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": " Je garde du temps pour ma formation professionnelle"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui régulièrement"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui mais pas chaque année"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non jamais"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D10_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J'aime développer de nouvelles compétences pour enrichir ma pratique, et j'arrive à le faire"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui souvent"
              }
            },
            {
              "value": "2",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui occasionnellement"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas assez"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "Je n'aime pas développer de nouvelles compétences"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D10_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je m’informe régulièrement sur les recommandations professionnelles (Sociétés Savantes, recos professionnelles ou de la HAS…) "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui mais pas assez"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page12",
      "title": {
        "default": "Etat de santé",
        "fr": "Gestion des conflits internes"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D11_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Le risque médico-légal constitue un frein à la sérénité de mon exercice professionnel"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D11_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J’ai déjà fait l’objet d’une plainte (ordinale ou autre), d'un patient ou de sa famille à mon encontre "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui"
              }
            },
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Non"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D11_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J’ai été menacé verbalement ou physiquement par un patient (ou son entourage) au cours des 3 dernières années écoulées"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui"
              }
            },
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Non"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D11_4",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J’ai déjà déclaré une agression verbale ou physique et / ou déposé une plainte pour une agression dans le cadre de mon activité professionnelle"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Non mais j'aurais dû"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non, je n'ai pas été agressé"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D11_5",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J’ai bénéficié d'une formation en gestion de la violence / comment désamorcer une situation de conflit"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Non mais je devrais"
              }
            },
            {
              "value": "2",
              "text": {
                "fr": "Non, ce n'est pas nécessaire"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page1",
      "title": {
        "default": "Etat de santé",
        "fr": "Tensions professionnelles"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D12_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je n'ai pas de difficulté particulière avec l'ensemble de l'équipe au sein de laquelle je travaille et je perçois mes collègues comme bienveillants. Êtes-vous d'accord avec cette affirmation..."
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait d'accord"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt d'accord"
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "Plutôt pas d'accord"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout d'accord"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D12_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J'ai des tensions au travail avec un ou plusieurs de mes proches et cela parasite profondément mon travail. Êtes-vous d'accord avec cette affirmation..."
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait d'accord"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt d'accord"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Plutôt pas d'accord"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non pas du tout d'accord"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D12_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J'ai des relations peu soutenantes voire conflictuelles avec mon administration ou ma hiérarchie. Êtes-vous d'accord avec cette affirmation..."
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait d'accord"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt d'accord"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Plutôt pas d'accord"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non pas du tout d'accord"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page13",
      "title": {
        "default": "Etat de santé",
        "fr": "Coopération"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D13_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J’ai des temps d’échanges réguliers et de convivialité dans la journée / dans la semaine avec mes collègues ou mon entourage professionnel proche et je trouve cela agréable"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D13_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J’ai facilement accès à un collègue, d’autres professionnels de santé lorsque je suis en difficulté ou que j'ai besoin de me réguler avec un pair"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D13_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je délègue facilement certains soins, surveillances ou prises en charge"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui et ça me convient"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui et ça me pose problème OU Non et ça me pose problème"
              }
            },
            {
              "value": "-1",
              "text": {
                "fr": "Non et c'est neutre ou je ne suis pas concerné"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D13_4",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J'ai des échanges professionnels avec mes pairs exerçant en ambulatoire en ville"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui et ça me convient"
              }
            },
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Oui et çà me pose problème OU Non et ça me pose problème"
              }
            },
            {
              "value": "-1",
              "text": {
                "fr": "Non et c'est neutre ou je ne suis pas concerné"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D13_5",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je peux m'absenter facilement quand c'est nécessaire (vacances, formation)"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page14",
      "title": {
        "default": "Etat de santé",
        "fr": "Conflits de valeur"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D14_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je travaille d’une façon qui heurte ma conscience professionnelle"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D14_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je peux orienter facilement les patients qui heurtent ma conscience professionnelle ou avec lesquels je me sens en difficulté  vers un autre collègue"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D14_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je sais dire « non » aux demandes que je considère abusives"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D14_4",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je dispose de moyens suffisants pour effectuer un travail de qualité"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page15",
      "title": {
        "default": "Etat de santé",
        "fr": "Soutien social"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D15_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je me sens reconnu par mes patients"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D15_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je me sens reconnu par mes pairs"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D15_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je me sens reconnu par ma hiérarchie"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D15_4",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Je me sens moins reconnu ou moins bien traité que d'autres qui font le même travail que moi. Êtes-vous d'accord avec cette affirmation... "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait d'accord"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt d'accord"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Plutôt pas d'accord"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non pas du tout d'accord"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D15_5",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "J'ai un sentiment d'injustice par rapport à d'autres professionnels proches (consœurs, confrères, autres…) "
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait d'accord"
              }
            },
            {
              "value": "3",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt d'accord"
              }
            },
            {
              "value": "1",
              "text": {
                "fr": "Plutôt pas d'accord"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Non pas du tout d'accord"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page16",
      "title": {
        "default": "Etat de santé",
        "fr": "Qualité de vie"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "D16_1",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Le degré de décalage entre ma vie personnelle souhaitée et ma vie personnelle vécue est…"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Très important"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Important"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Pas ou peu important"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D16_2",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Le degré de décalage entre ma vie professionnelle souhaitée et ma vie professionnelle vécue est…"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "5",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Très important"
              }
            },
            {
              "value": "4",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Important"
              }
            },
            {
              "value": "0",
              "text": {
                "fr": "Pas ou peu important"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "D16_3",
          "title": {
            "default": "Je suis porteur d’une pathologie chronique qui nécessite un suivi par un médecin spécialiste",
            "fr": "Globalement, je suis satisfait de mon équilibre vie privée/vie professionnelle"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "0",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est satisfaisant",
                "fr": "Oui tout à fait"
              }
            },
            {
              "value": "1",
              "text": {
                "default": "Oui et mon équilibre médico-professionnel est impacté",
                "fr": "Plutôt oui"
              }
            },
            {
              "value": 3,
              "text": {
                "fr": "Plutôt non"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "Non pas du tout"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page6",
      "title": {
        "fr": "Questionnaire AIRE"
      },
      "elements": [
        {
          "type": "html",
          "name": "question3",
          "html": {
            "fr": "<div style=\"color:#00AAA0; font-weight:bold; border:solid 3px #00AAA0; border-radius: 10px; padding:15px\">Vous arrivez presque au terme de cette auto-évaluation.<br/>\nSuivez bien les consignes suivantes car pour chacune de ces 4 dernières questions, vous allez devoir choisir une seule réponse parmi 9 propositions.<br/>\nVous pourrez ensuite accéder aux graphiques et aux résultats issus de votre travail réflexif.</div>"
          }
        },
        {
          "type": "html",
          "name": "question2",
          "html": {
            "fr": "Le questionnaire AIRE est un inventaire qui a pour but d’évaluer le rapport que vous entretenez avec une de vos activités habituelles (travail, activité associative, ou même activité familiale). Nous vous proposons de le remplir en vous centrant ici sur votre activité professionnelle, telle que vous la percevez actuellement.<br/><br/>\n\nNous partons du postulat que le rapport au travail peut se résumer à la perception de 4 dimensions principales : Attentes – Investissement – Renforcement – Efficacité (nous détaillerons ces dimensions lors du retour du questionnaire). Chaque dimension est évaluée à l’aide d’une série de 5 propositions numérotées de 1 à 9 (1-3-5-7-9) : ces propositions représentent un continuum, de la vision la plus modérée à la plus élevée.\n<br/><br/>\nPour chaque dimension, veuillez choisir ci-après la proposition correspondant à la perception la plus en accord avec votre ressenti actuel. Si vous vous situez entre deux propositions, indiquez le chiffre se situant entre les deux (par exemple, notez 4 si votre état correspond à une situation se trouvant entre la description 3 et la description 5)"
          }
        },
        {
          "type": "radiogroup",
          "name": "AIRE_Attentes",
          "title": {
            "fr": "Les attentes perçues"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": {
                "fr": "1 - J’ai le sentiment qu’on n’attend pas grand-chose de mon travail, qu’il n’a guère d’utilité."
              }
            },
            {
              "value": "2",
              "text": {
                "fr": "2 - entre 1 et 3"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "3 - J’ai l’impression qu’on attend des résultats de mon travail, mais qu’en cas d’erreur, d’échec ou d’absence, ce peut être gênant bien sûr, mais pas dramatique."
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "4 - entre 3 et 5"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "5 - Je sens que mon travail a de la valeur, et que plusieurs personnes (entourage, collègues, clients et divers bénéficiaires) comptent sur celui-ci, que ce soit en termes de résultats ou de gains."
              }
            },
            {
              "value": "6",
              "text": {
                "fr": "6 - entre 5 et 7"
              }
            },
            {
              "value": "7",
              "text": {
                "fr": "7 - Je trouve qu’il y a beaucoup de choses et de personnes qui attendent et dépendent de mon travail, et je n’ai pas le droit d’y manquer."
              }
            },
            {
              "value": "8",
              "text": {
                "fr": "8 - entre 7 et 9"
              }
            },
            {
              "value": "9",
              "text": {
                "fr": "9 - Il y a sans cesse des demandes dans mon travail, je trouve qu’on attend beaucoup, voire énormément de celui-ci, et donc de moi, je me perçois une très grande responsabilité."
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "AIRE_Investissement",
          "title": {
            "fr": "Mon investissement"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": {
                "fr": "1 - Je ne me sens guère investi dans mon travail, il m’est (ou m’est devenu) quasi totalement indifférent."
              }
            },
            {
              "value": "2",
              "text": {
                "fr": "2 - entre 1 et 3"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "3 - J’essaie de faire mon travail correctement, mais je n’y ai pas (ou plus) beaucoup d’intérêt."
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "4 - entre 3 et 5"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "5 - J’apprécie mon travail et il est important pour moi qu’il soit bien fait"
              }
            },
            {
              "value": "6",
              "text": {
                "fr": "6 - entre 5 et 7"
              }
            },
            {
              "value": "7",
              "text": {
                "fr": "7 - Je me sens très investi dans mon travail, il me tient à cœur, et c’est une de mes principales préoccupations"
              }
            },
            {
              "value": "8",
              "text": {
                "fr": "8 - entre 7 et 9"
              }
            },
            {
              "value": "9",
              "text": {
                "fr": "9 - Mon travail est vraiment très important à mes yeux, et il occupe une place majeure dans ma vie, c’est vraiment une de mes principales priorités"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "AIRE_Renforcements",
          "title": {
            "fr": "Les renforcements perçus"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": {
                "fr": "1 - Je ne retire pas grande satisfaction de mon travail, dans aucun domaine, pécuniaire, personnel, ou reconnaissance"
              }
            },
            {
              "value": "2",
              "text": {
                "fr": "2 - entre 1 et 3"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "3 - Je peux éprouver des satisfactions dans mon travail et j’en obtiens une certaine reconnaissance, y compris financière, mais cela reste limité."
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "4 - entre 3 et 5"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "5 - Je retire régulièrement des satisfactions de mon travail, en le trouvant agréable, en atteignant mes objectifs, en obtenant de bons retours, et aussi en percevant une rémunération adaptée."
              }
            },
            {
              "value": "6",
              "text": {
                "fr": "6 - entre 5 et 7"
              }
            },
            {
              "value": "7",
              "text": {
                "fr": "7 - Je reçois souvent, ou la plupart du temps, beaucoup de reconnaissances et de renforcements dans mon travail, et dans tous les domaines, y compris personnels. Je suis satisfait et content de ce que je fais, et j’y prends souvent du plaisir."
              }
            },
            {
              "value": "8",
              "text": {
                "fr": "8 - entre 7 et 9"
              }
            },
            {
              "value": "9",
              "text": {
                "fr": "9 - Je me sens vraiment très valorisé et reconnu sur tous les plans et dans tous les domaines, financiers, intérêt personnel, satisfaction, plaisir, reconnaissance des autres, à travers et par mon travail ; j’en retire vraiment énormément de gains"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "AIRE_Efficacité",
          "title": {
            "fr": "Mon sentiment d'efficacité"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": {
                "fr": "1 - J’effectue un travail pour lequel je ne me sens guère (ou plus guère) capable, ni compétent ou efficace"
              }
            },
            {
              "value": "2",
              "text": {
                "fr": "2 - entre 1 et 3"
              }
            },
            {
              "value": "3",
              "text": {
                "fr": "3 - J’arrive à effectuer mon travail, mais j'ai assez souvent le sentiment de ne pas (ou plus) y arriver, de n’être pas (ou plus) suffisamment compétent."
              }
            },
            {
              "value": "4",
              "text": {
                "fr": "4 - entre 3 et 5"
              }
            },
            {
              "value": "5",
              "text": {
                "fr": "5 - Je me sens globalement efficace dans mon travail, j’ai le sentiment d’arriver à influencer le cours des choses dans le sens que je souhaite"
              }
            },
            {
              "value": "6",
              "text": {
                "fr": "6 - entre 5 et 7"
              }
            },
            {
              "value": "7",
              "text": {
                "fr": "7 - J'ai le sentiment d’être et de rester efficace dans mon travail (c’est à dire productif et avec une bonne capacité d’action et de résultat) même lorsqu’il devient plus difficile"
              }
            },
            {
              "value": "8",
              "text": {
                "fr": "8 - entre 7 et 9"
              }
            },
            {
              "value": "9",
              "text": {
                "fr": "9 - Je me sens toujours compétent et à la hauteur dans mon travail, et j’arrive à atteindre les objectifs nécessaires, même lorsque les tâches deviennent vraiment lourdes, chargées ou très ardues."
              }
            }
          ]
        }
      ]
    }
  ],
  "showProgressBar": "auto",
  "progressBarType": "questions",
  "progressBarShowPageNumbers": true,
  "widthMode": "responsive"
}