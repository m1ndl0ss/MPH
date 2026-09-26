export type Lang = 'nl' | 'en'

export type Localized = { nl: string; en: string }

export function t(lang: Lang, text: Localized): string {
  return text[lang]
}

export type Appointment = {
  id: string
  title: Localized
  place: Localized
  date: Localized
  time: string
  reminder: Localized
}

export type Domain = {
  id: string
  label: Localized
  organisations: Organisation[]
}

export type Organisation = {
  id: string
  label: Localized
  /** Display form as published (with spaces). */
  phone: string
  /** Digits only for tel: links. */
  phoneTel: string
  tasks: Task[]
}

export type Task = {
  id: string
  label: Localized
  /** 'done' = we finish it; 'call' = go straight to the phone screen. */
  outcome: 'done' | 'call'
  steps: Localized[]
}

export const appointments: Appointment[] = [
  {
    id: 'a1',
    title: {
      nl: 'Controle bij de oogarts',
      en: 'Eye doctor check',
    },
    place: { nl: 'Amsterdam UMC', en: 'Amsterdam UMC' },
    date: { nl: 'Dinsdag 30 september', en: 'Tuesday 30 September' },
    time: '10:15',
    reminder: {
      nl: 'Morgen om 09:00 krijgt u een herinnering',
      en: 'Tomorrow at 09:00 you get a reminder',
    },
  },
  {
    id: 'a2',
    title: {
      nl: 'Gesprek met de huisarts',
      en: 'Talk with your GP',
    },
    place: {
      nl: 'Huisartsenpraktijk De Linden',
      en: 'Huisartsenpraktijk De Linden',
    },
    date: { nl: 'Vrijdag 3 oktober', en: 'Friday 3 October' },
    time: '14:30',
    reminder: {
      nl: 'Die ochtend om 08:00 krijgt u een herinnering',
      en: 'That morning at 08:00 you get a reminder',
    },
  },
  {
    id: 'a3',
    title: {
      nl: 'Afspraak bij de gemeente',
      en: 'Appointment at the town hall',
    },
    place: {
      nl: 'Gemeentehuis, loket Wmo',
      en: 'Town hall, Wmo desk',
    },
    date: { nl: 'Maandag 6 oktober', en: 'Monday 6 October' },
    time: '11:00',
    reminder: {
      nl: 'De dag ervoor om 18:00 krijgt u een herinnering',
      en: 'The day before at 18:00 you get a reminder',
    },
  },
]

const openHospital: Localized = {
  nl: 'Een medewerker opent het ziekenhuis voor u',
  en: 'A person opens the hospital for you',
}

const digidStays: Localized = {
  nl: 'Uw DigiD Machtigen blijft bij die persoon',
  en: 'Your DigiD Machtigen stays with that person',
}

const seeInThuis: Localized = {
  nl: 'U ziet de afspraak in Thuis',
  en: 'You see the appointment in Thuis',
}

const viewAppointmentSteps: Localized[] = [
  openHospital,
  digidStays,
  seeInThuis,
]

const costSteps = (place: string): Localized[] => [
  {
    nl: `Een medewerker opent ${place} voor u`,
    en: `A person opens ${place} for you`,
  },
  {
    nl: 'De kosten worden opgehaald',
    en: 'The costs are fetched',
  },
  {
    nl: 'U ziet een korte lijst',
    en: 'You see a short list',
  },
]

export const domains: Domain[] = [
  {
    id: 'ziekenhuis',
    label: { nl: 'Ziekenhuis', en: 'Hospital' },
    organisations: [
      {
        id: 'amsterdam-umc',
        label: { nl: 'Amsterdam UMC', en: 'Amsterdam UMC' },
        phone: '020 566 9111',
        phoneTel: '0205669111',
        tasks: [
          {
            id: 'ziekenhuis-afspraak',
            label: {
              nl: 'Afspraak bekijken',
              en: 'See the appointment',
            },
            outcome: 'done',
            steps: viewAppointmentSteps,
          },
          {
            id: 'ziekenhuis-bellen',
            label: {
              nl: 'Bel het ziekenhuis',
              en: 'Call the hospital',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
      {
        id: 'umc-utrecht',
        label: { nl: 'UMC Utrecht', en: 'UMC Utrecht' },
        phone: '088 75 555 55',
        phoneTel: '0887555555',
        tasks: [
          {
            id: 'utrecht-afspraak',
            label: {
              nl: 'Afspraak bekijken',
              en: 'See the appointment',
            },
            outcome: 'done',
            steps: viewAppointmentSteps,
          },
          {
            id: 'utrecht-bellen',
            label: {
              nl: 'Bel UMC Utrecht',
              en: 'Call UMC Utrecht',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
      {
        id: 'erasmus-mc',
        label: { nl: 'Erasmus MC', en: 'Erasmus MC' },
        phone: '010 704 0 704',
        phoneTel: '0107040704',
        tasks: [
          {
            id: 'erasmus-afspraak',
            label: {
              nl: 'Afspraak bekijken',
              en: 'See the appointment',
            },
            outcome: 'done',
            steps: viewAppointmentSteps,
          },
          {
            id: 'erasmus-bellen',
            label: {
              nl: 'Bel Erasmus MC',
              en: 'Call Erasmus MC',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
    ],
  },
  {
    id: 'huisarts',
    label: { nl: 'Huisarts', en: 'GP' },
    organisations: [
      {
        id: 'huisarts-linden',
        label: {
          nl: 'Huisartsenpraktijk De Linden',
          en: 'Huisartsenpraktijk De Linden',
        },
        // Published number of Huisartsenpraktijk De Linde (Soest)
        phone: '035 601 45 45',
        phoneTel: '0356014545',
        tasks: [
          {
            id: 'ha-recept',
            label: {
              nl: 'Herhaalrecept aanvragen',
              en: 'Ask for a repeat prescription',
            },
            outcome: 'done',
            steps: [
              {
                nl: 'Een medewerker vraagt het recept aan',
                en: 'A person asks for the prescription',
              },
              {
                nl: 'De apotheek krijgt bericht',
                en: 'The pharmacy gets a message',
              },
              {
                nl: 'U krijgt bericht als het klaar is',
                en: 'You get a message when it is ready',
              },
            ],
          },
          {
            id: 'ha-bellen',
            label: {
              nl: 'Bel de huisarts',
              en: 'Call the GP',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
      {
        id: 'apotheek',
        label: { nl: 'Apotheek Centrum', en: 'Apotheek Centrum' },
        // Erasmus MC Apotheek (public hospital pharmacy line)
        phone: '010 703 04 24',
        phoneTel: '0107030424',
        tasks: [
          {
            id: 'apo-ophalen',
            label: {
              nl: 'Medicijnen klaarzetten',
              en: 'Prepare medicines for pickup',
            },
            outcome: 'done',
            steps: [
              {
                nl: 'Een medewerker vraagt dit na bij de apotheek',
                en: 'A person checks this with the pharmacy',
              },
              {
                nl: 'U krijgt een duidelijk antwoord',
                en: 'You get a clear answer',
              },
              {
                nl: 'U weet wanneer u kunt ophalen',
                en: 'You know when you can pick them up',
              },
            ],
          },
          {
            id: 'apo-bellen',
            label: {
              nl: 'Bel de apotheek',
              en: 'Call the pharmacy',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
    ],
  },
  {
    id: 'toeslagen',
    label: {
      nl: 'Belasting en toeslagen',
      en: 'Tax and benefits',
    },
    organisations: [
      {
        id: 'dienst-toeslagen',
        label: { nl: 'Dienst Toeslagen', en: 'Dienst Toeslagen' },
        phone: '0800 - 0543',
        phoneTel: '08000543',
        tasks: [
          {
            id: 'huurtoeslag',
            label: { nl: 'Huurtoeslag bekijken', en: 'See rent benefit' },
            outcome: 'done',
            steps: [
              {
                nl: 'Een medewerker opent Dienst Toeslagen voor u',
                en: 'A person opens Dienst Toeslagen for you',
              },
              digidStays,
              {
                nl: 'U ziet een korte samenvatting',
                en: 'You see a short summary',
              },
            ],
          },
          {
            id: 'toeslagen-bellen',
            label: {
              nl: 'Bel Dienst Toeslagen',
              en: 'Call Dienst Toeslagen',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
      {
        id: 'belastingdienst',
        label: { nl: 'Belastingdienst', en: 'Belastingdienst' },
        phone: '0800 - 0543',
        phoneTel: '08000543',
        tasks: [
          {
            id: 'aangifte',
            label: {
              nl: 'Belastingaangifte voorbereiden',
              en: 'Prepare a tax return',
            },
            outcome: 'done',
            steps: [
              {
                nl: 'Een medewerker opent de Belastingdienst voor u',
                en: 'A person opens Belastingdienst for you',
              },
              {
                nl: 'De gegevens worden geordend',
                en: 'The details are put in order',
              },
              {
                nl: 'U beslist zelf of u verder gaat',
                en: 'You decide yourself whether to continue',
              },
            ],
          },
          {
            id: 'belasting-bellen',
            label: {
              nl: 'Bel de Belastingdienst',
              en: 'Call Belastingdienst',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
    ],
  },
  {
    id: 'verzekering',
    label: { nl: 'Zorgverzekering', en: 'Health insurance' },
    organisations: [
      {
        id: 'cz',
        label: { nl: 'CZ', en: 'CZ' },
        phone: '088 555 77 77',
        phoneTel: '0885557777',
        tasks: [
          {
            id: 'cz-kosten',
            label: { nl: 'Kosten bekijken', en: 'See costs' },
            outcome: 'done',
            steps: costSteps('CZ'),
          },
          {
            id: 'cz-bellen',
            label: { nl: 'Bel CZ', en: 'Call CZ' },
            outcome: 'call',
            steps: [],
          },
        ],
      },
      {
        id: 'vgz',
        label: { nl: 'VGZ', en: 'VGZ' },
        phone: '0900 - 84 90',
        phoneTel: '09008490',
        tasks: [
          {
            id: 'vgz-kosten',
            label: { nl: 'Kosten bekijken', en: 'See costs' },
            outcome: 'done',
            steps: costSteps('VGZ'),
          },
          {
            id: 'vgz-bellen',
            label: { nl: 'Bel VGZ', en: 'Call VGZ' },
            outcome: 'call',
            steps: [],
          },
        ],
      },
      {
        id: 'zilveren-kruis',
        label: { nl: 'Zilveren Kruis', en: 'Zilveren Kruis' },
        phone: '071 751 00 51',
        phoneTel: '0717510051',
        tasks: [
          {
            id: 'zk-kosten',
            label: { nl: 'Kosten bekijken', en: 'See costs' },
            outcome: 'done',
            steps: costSteps('Zilveren Kruis'),
          },
          {
            id: 'zk-bellen',
            label: {
              nl: 'Bel Zilveren Kruis',
              en: 'Call Zilveren Kruis',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
      {
        id: 'menzis',
        label: { nl: 'Menzis', en: 'Menzis' },
        phone: '088 222 40 40',
        phoneTel: '0882224040',
        tasks: [
          {
            id: 'menzis-kosten',
            label: { nl: 'Kosten bekijken', en: 'See costs' },
            outcome: 'done',
            steps: costSteps('Menzis'),
          },
          {
            id: 'menzis-bellen',
            label: { nl: 'Bel Menzis', en: 'Call Menzis' },
            outcome: 'call',
            steps: [],
          },
        ],
      },
    ],
  },
  {
    id: 'pensioen',
    label: { nl: 'Pensioen', en: 'Pension' },
    organisations: [
      {
        id: 'svb',
        label: { nl: 'SVB (AOW)', en: 'SVB (AOW)' },
        phone: '088 949 40 00',
        phoneTel: '0889494000',
        tasks: [
          {
            id: 'aow-bekijken',
            label: {
              nl: 'AOW-betaling bekijken',
              en: 'See AOW payment',
            },
            outcome: 'done',
            steps: [
              {
                nl: 'Een medewerker opent de SVB voor u',
                en: 'A person opens the SVB for you',
              },
              digidStays,
              {
                nl: 'U ziet de datum en het bedrag',
                en: 'You see the date and the amount',
              },
            ],
          },
          {
            id: 'svb-bellen',
            label: { nl: 'Bel de SVB', en: 'Call the SVB' },
            outcome: 'call',
            steps: [],
          },
        ],
      },
    ],
  },
  {
    id: 'gemeente',
    label: { nl: 'Gemeente', en: 'Town hall' },
    organisations: [
      {
        id: 'wmo',
        label: {
          nl: 'Gemeente — loket Wmo',
          en: 'Town hall — Wmo desk',
        },
        // Gemeente Amsterdam Wmo Helpdesk
        phone: '0800 0643',
        phoneTel: '08000643',
        tasks: [
          {
            id: 'wmo-status',
            label: {
              nl: 'Stand van aanvraag bekijken',
              en: 'See how far the request is',
            },
            outcome: 'done',
            steps: [
              {
                nl: 'Een medewerker zoekt de stand op',
                en: 'A person looks up the status',
              },
              {
                nl: 'U krijgt een korte uitleg',
                en: 'You get a short explanation',
              },
              {
                nl: 'U weet of er nog iets van u nodig is',
                en: 'You know if anything is still needed from you',
              },
            ],
          },
          {
            id: 'wmo-bellen',
            label: {
              nl: 'Bel het Wmo-loket',
              en: 'Call the Wmo desk',
            },
            outcome: 'call',
            steps: [],
          },
        ],
      },
    ],
  },
]

export const ui = {
  brandSub: {
    nl: 'Hulp bij digitale taken',
    en: 'Help with digital tasks',
  },
  langLabel: {
    nl: 'Taal',
    en: 'Language',
  },
  homeTitle: {
    nl: 'Wat wilt u?',
    en: 'What do you want?',
  },
  appointmentsChoice: {
    nl: 'Bekijk mijn afspraken',
    en: 'See my appointments',
  },
  helpChoice: {
    nl: 'Help me op een website',
    en: 'Help me on a website',
  },
  back: {
    nl: 'Terug',
    en: 'Back',
  },
  appointmentsTitle: {
    nl: 'Mijn afspraken',
    en: 'My appointments',
  },
  date: { nl: 'Datum', en: 'Date' },
  time: { nl: 'Tijd', en: 'Time' },
  place: { nl: 'Plaats', en: 'Place' },
  domainsTitle: {
    nl: 'Waar wilt u hulp?',
    en: 'Where do you need help?',
  },
  placesTitle: {
    nl: 'Welke plek?',
    en: 'Which place?',
  },
  tasksTitle: {
    nl: 'Wat wilt u?',
    en: 'What do you want?',
  },
  digidNote: {
    nl: 'Een persoon mag dit voor u doen met DigiD Machtigen. Het programma mag zelf niet inloggen.',
    en: 'A person may do this for you with DigiD Machtigen. The program cannot log in by itself.',
  },
  startHelp: {
    nl: 'Ja, start',
    en: 'Yes, start',
  },
  stopCancel: {
    nl: 'Stoppen / Annuleren',
    en: 'Stop / Cancel',
  },
  doneTitle: {
    nl: 'Klaar. Wij hebben dit voor u gedaan.',
    en: 'Done. We have done this for you.',
  },
  doneHome: {
    nl: 'Terug',
    en: 'Back',
  },
  callLead: {
    nl: 'Dit kunnen wij niet voor u doen. Bel dit nummer.',
    en: 'We cannot do this for you. Call this number.',
  },
  callButton: {
    nl: 'Bel',
    en: 'Call',
  },
  pageTitle: {
    nl: 'Thuis — Hulp bij digitale taken',
    en: 'Thuis — Help with digital tasks',
  },
} as const satisfies Record<string, Localized>
