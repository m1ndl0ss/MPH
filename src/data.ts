export type Lang = 'nl' | 'en'

export type Localized = { nl: string; en: string }

export function t(lang: Lang, text: Localized): string {
  return text[lang]
}

const L = (nl: string, en: string): Localized => ({ nl, en })

export type Kind = 'gp' | 'dentist' | 'pharmacy' | 'hospital' | 'tax' | 'pension' | 'town'

export type Appointment = {
  id: string
  title: Localized
  place: Localized
  date: Localized
  time: string
  reminder: Localized
}

export type Task = {
  id: string
  label: Localized
  outcome: 'book' | 'done' | 'caretaker' | 'sensitive'
  result?: Localized[]
}

export type CatalogPlace = {
  id: string
  kind: Kind
  name: string
  address: string
  city: string
  /** Published switchboard. Shown when the app cannot do the task, or the task needs an extra check. */
  phone?: string
  tasks: Task[]
}

export type LinkedPlace = {
  catalogId: string
  patientNumber: string
}

export const bookDates: { id: string; label: Localized }[] = [
  { id: '2026-09-28', label: L('Maandag 28 september', 'Monday 28 September') },
  { id: '2026-09-29', label: L('Dinsdag 29 september', 'Tuesday 29 September') },
  { id: '2026-09-30', label: L('Woensdag 30 september', 'Wednesday 30 September') },
  { id: '2026-10-01', label: L('Donderdag 1 oktober', 'Thursday 1 October') },
  { id: '2026-10-02', label: L('Vrijdag 2 oktober', 'Friday 2 October') },
  { id: '2026-10-05', label: L('Maandag 5 oktober', 'Monday 5 October') },
]

export const bookTimes = ['08:30', '09:15', '10:45', '13:00', '14:30', '16:15']

const reminder: Localized = L(
  'De dag ervoor om 18:00 krijgt u een herinnering',
  'The day before at 18:00 you get a reminder',
)

export const appointments: Appointment[] = [
  {
    id: 'a1',
    title: L('Controle bij de oogarts', 'Eye doctor check'),
    place: L('Maastricht UMC+', 'Maastricht UMC+'),
    date: L('Dinsdag 30 september', 'Tuesday 30 September'),
    time: '10:15',
    reminder,
  },
  {
    id: 'a2',
    title: L('Gesprek met de huisarts', 'Talk with your GP'),
    place: L('Huisartsenpraktijk Smeets', 'Huisartsenpraktijk Smeets'),
    date: L('Vrijdag 3 oktober', 'Friday 3 October'),
    time: '14:30',
    reminder,
  },
]

const book = (id: string, label: Localized): Task => ({ id, label, outcome: 'book' })
const done = (id: string, label: Localized, result?: Localized[]): Task => ({
  id,
  label,
  outcome: 'done',
  result,
})
const ask = (id: string, label: Localized): Task => ({ id, label, outcome: 'caretaker' })
const sensitive = (id: string, label: Localized): Task => ({ id, label, outcome: 'sensitive' })

export function tasksFor(kind: Kind): Task[] {
  if (kind === 'gp') {
    return [
      book('book', L('Maak een afspraak', 'Make an appointment')),
      done('repeat', L('Vraag een herhaalrecept', 'Ask for a repeat prescription'), [
        L('Het recept gaat naar uw apotheek', 'The prescription goes to your pharmacy'),
        L('U kunt het morgen ophalen', 'You can pick it up tomorrow'),
      ]),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ]
  }
  if (kind === 'dentist') {
    return [
      book('book', L('Maak een afspraak', 'Make an appointment')),
      book('check', L('Afspraak voor de controle', 'Book a check-up')),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ]
  }
  if (kind === 'pharmacy') {
    return [
      done('ready', L('Zet mijn medicijnen klaar', 'Prepare my medicines'), [
        L('Uw medicijnen staan morgen klaar', 'Your medicines will be ready tomorrow'),
      ]),
      done('hours', L('Openingstijden', 'Opening hours'), [
        L('Maandag tot vrijdag 08:30 tot 17:30', 'Monday to Friday 08:30 to 17:30'),
      ]),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ]
  }
  if (kind === 'hospital') {
    return [
      book('book', L('Maak een afspraak', 'Make an appointment')),
      done('hours', L('Bezoektijden', 'Visiting hours'), [
        L('Doordeweeks 11:00 tot 20:00', 'Weekdays 11:00 to 20:00'),
      ]),
      sensitive('file', L('Bekijk mijn medisch dossier', 'See my medical file')),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ]
  }
  if (kind === 'tax') {
    return [
      done('look', L('Bekijk mijn gegevens', 'See my details'), [
        L('De gegevens van deze maand staan klaar', 'This month’s details are ready'),
      ]),
      sensitive('pay', L('Doe een betaling', 'Make a payment')),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ]
  }
  if (kind === 'pension') {
    return [
      done('pay', L('Bekijk mijn betaling', 'See my payment'), [
        L('De volgende betaaldatum staat klaar', 'The next payment date is ready'),
      ]),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ]
  }
  return [
    book('book', L('Maak een afspraak', 'Make an appointment')),
    done('status', L('Bekijk mijn aanvraag', 'See my request'), [
      L('Uw aanvraag is in behandeling', 'Your request is being handled'),
    ]),
    ask('other', L('Iets anders vragen', 'Ask something else')),
  ]
}

export const kinds: { id: Kind; label: Localized }[] = [
  { id: 'gp', label: L('Huisarts', 'GP') },
  { id: 'dentist', label: L('Tandarts', 'Dentist') },
  { id: 'pharmacy', label: L('Apotheek', 'Pharmacy') },
  { id: 'hospital', label: L('Ziekenhuis', 'Hospital') },
  { id: 'tax', label: L('Belasting en toeslagen', 'Tax and benefits') },
  { id: 'pension', label: L('Pensioen', 'Pension') },
  { id: 'town', label: L('Gemeente', 'Town hall') },
]

export const catalog: CatalogPlace[] = [
  {
    id: 'gp-wyck',
    kind: 'gp',
    name: 'Huisartsenpraktijk Smeets',
    address: 'Heerderweg 5',
    city: 'Maastricht',
    phone: '043 363 61 31',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-caberg',
    kind: 'gp',
    name: 'Medisch Centrum Caberg',
    address: 'Clavecymbelstraat 39',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-ceramique',
    kind: 'gp',
    name: 'Huisartsenpraktijk Ceramique',
    address: 'Avenue Ceramique 155',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-annadal',
    kind: 'gp',
    name: 'Huisartsenpraktijk Annadal',
    address: 'Becanusstraat 15',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-de-poort',
    kind: 'gp',
    name: 'Huisartsenpraktijk De Poort',
    address: 'Becanusstraat 15',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-heugem',
    kind: 'gp',
    name: 'Huisartsenpraktijk Heugem',
    address: 'De Beente 24',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-oost',
    kind: 'gp',
    name: 'Huisartsen Maastricht Oost',
    address: 'Marconistraat 1',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-scharn',
    kind: 'gp',
    name: 'Huisartsenpraktijk Scharn',
    address: 'Vijverdalseweg 4',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-sint-pieter',
    kind: 'gp',
    name: 'Huisartsenpraktijk Sint Pieter',
    address: 'Glacisweg 1',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-aan-de-maas',
    kind: 'gp',
    name: 'Huisartspraktijk aan de Maas',
    address: 'Schoolstraat 27b',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-maasmedics',
    kind: 'gp',
    name: 'Huisartsenpraktijk Maasmedics',
    address: 'Roserije 51',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-malberg',
    kind: 'gp',
    name: 'Huisartsenpraktijk Malberg',
    address: 'Malbergplein 15a',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'gp-van-kleef',
    kind: 'gp',
    name: 'Huisartsenpraktijk Dr. van Kleef',
    address: 'Victor de Stuersstraat 15',
    city: 'Maastricht',
    tasks: tasksFor('gp'),
  },
  {
    id: 'dentist-scharn',
    kind: 'dentist',
    name: 'Dental Clinics Maastricht Scharn',
    address: 'Scharnerweg 16',
    city: 'Maastricht',
    phone: '043 325 15 45',
    tasks: tasksFor('dentist'),
  },
  {
    id: 'dentist-centrum',
    kind: 'dentist',
    name: 'Dental Clinics Maastricht Centrum',
    address: 'Koningin Emmaplein 10',
    city: 'Maastricht',
    tasks: tasksFor('dentist'),
  },
  {
    id: 'dentist-heerderrein',
    kind: 'dentist',
    name: 'Dental Clinics Maastricht Heerderrein',
    address: 'Rijksweg 72-A3',
    city: 'Maastricht',
    tasks: tasksFor('dentist'),
  },
  {
    id: 'dentist-mondzorg',
    kind: 'dentist',
    name: 'Mondzorg Maastricht',
    address: 'Professor Pieter Willemsstraat 21',
    city: 'Maastricht',
    tasks: tasksFor('dentist'),
  },
  {
    id: 'dentist-bolwerk',
    kind: 'dentist',
    name: 'Bolwerk Tandartsen',
    address: 'Sint Servaasbolwerk 2',
    city: 'Maastricht',
    tasks: tasksFor('dentist'),
  },
  {
    id: 'dentist-tp',
    kind: 'dentist',
    name: 'TP Maastricht',
    address: 'Akersteenweg 22',
    city: 'Maastricht',
    tasks: tasksFor('dentist'),
  },
  {
    id: 'dentist-jekerdal',
    kind: 'dentist',
    name: 'Mondzorg Jekerdal',
    address: 'Cannerweg 134',
    city: 'Maastricht',
    tasks: tasksFor('dentist'),
  },
  {
    id: 'apo-wyck',
    kind: 'pharmacy',
    name: 'Service Apotheek Wijck-Ceramique',
    address: 'Avenue Ceramique 155',
    city: 'Maastricht',
    phone: '043 325 82 39',
    tasks: tasksFor('pharmacy'),
  },
  {
    id: 'apo-scharn',
    kind: 'pharmacy',
    name: 'Service Apotheek Scharn',
    address: 'Vijverdalseweg 4A01',
    city: 'Maastricht',
    tasks: tasksFor('pharmacy'),
  },
  {
    id: 'apo-america',
    kind: 'pharmacy',
    name: 'Service Apotheek America',
    address: 'Voltastraat 36',
    city: 'Maastricht',
    tasks: tasksFor('pharmacy'),
  },
  {
    id: 'apo-caberg',
    kind: 'pharmacy',
    name: 'Service Apotheek Caberg',
    address: 'Clavecymbelstraat 37',
    city: 'Maastricht',
    tasks: tasksFor('pharmacy'),
  },
  {
    id: 'apo-heer',
    kind: 'pharmacy',
    name: 'Service Apotheek Heer',
    address: 'Einsteinstraat 34-A-01',
    city: 'Maastricht',
    tasks: tasksFor('pharmacy'),
  },
  {
    id: 'apo-annadal',
    kind: 'pharmacy',
    name: 'Apotheek Annadal',
    address: 'Becanusstraat 15A04',
    city: 'Maastricht',
    tasks: tasksFor('pharmacy'),
  },
  {
    id: 'apo-romkens',
    kind: 'pharmacy',
    name: 'Apotheek Römkens',
    address: 'Potteriestraat 139',
    city: 'Maastricht',
    tasks: tasksFor('pharmacy'),
  },
  {
    id: 'apo-mumc',
    kind: 'pharmacy',
    name: 'Apotheek MUMC+',
    address: 'P. Debyelaan 25',
    city: 'Maastricht',
    tasks: tasksFor('pharmacy'),
  },
  {
    id: 'mumc',
    kind: 'hospital',
    name: 'Maastricht UMC+',
    address: 'P. Debyelaan 25',
    city: 'Maastricht',
    phone: '043 387 6543',
    tasks: [
      book('book', L('Maak een afspraak', 'Make an appointment')),
      done('see', L('Bekijk mijn afspraak', 'See my appointment'), [
        L('Oogarts, dinsdag 30 september, 10:15', 'Eye doctor, Tuesday 30 September, 10:15'),
      ]),
      done('hours', L('Bezoektijden', 'Visiting hours'), [
        L('Doordeweeks 11:00 tot 20:00', 'Weekdays 11:00 to 20:00'),
        L('Weekend 14:00 tot 20:00', 'Weekend 14:00 to 20:00'),
      ]),
      sensitive('file', L('Bekijk mijn medisch dossier', 'See my medical file')),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ],
  },
  {
    id: 'zuyderland',
    kind: 'hospital',
    name: 'Zuyderland Medisch Centrum Sittard-Geleen',
    address: 'Dr. H. van der Hoffplein 1',
    city: 'Sittard-Geleen',
    phone: '088 459 7777',
    tasks: tasksFor('hospital'),
  },
  {
    id: 'zuyderland-heerlen',
    kind: 'hospital',
    name: 'Zuyderland Medisch Centrum Heerlen',
    address: 'Henri Dunantstraat 5',
    city: 'Heerlen',
    phone: '088 459 7777',
    tasks: tasksFor('hospital'),
  },
  {
    id: 'toeslagen',
    kind: 'tax',
    name: 'Dienst Toeslagen',
    address: 'Graadt van Roggenweg 500',
    city: 'Utrecht',
    phone: '0800 0543',
    tasks: [
      done('huur', L('Bekijk mijn huurtoeslag', 'See my rent benefit'), [
        L('De toeslag van deze maand staat klaar', 'This month’s benefit is ready'),
      ]),
      done('zorg', L('Bekijk mijn zorgtoeslag', 'See my healthcare benefit'), [
        L('Zorgtoeslag staat aan', 'Healthcare benefit is on'),
      ]),
      sensitive('pay', L('Doe een betaling', 'Make a payment')),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ],
  },
  {
    id: 'belasting',
    kind: 'tax',
    name: 'Belastingdienst Maastricht',
    address: 'Terra Nigrastraat 10',
    city: 'Maastricht',
    phone: '0800 0543',
    tasks: tasksFor('tax'),
  },
  {
    id: 'svb',
    kind: 'pension',
    name: 'SVB, AOW',
    address: 'Avenue Céramique 50',
    city: 'Maastricht',
    phone: '088 949 40 00',
    tasks: [
      done('pay', L('Bekijk mijn AOW', 'See my AOW'), [
        L('Volgende betaling: 23 oktober', 'Next payment: 23 October'),
      ]),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ],
  },
  {
    id: 'gemeente-maastricht',
    kind: 'town',
    name: 'Gemeente Maastricht',
    address: 'Mosae Forum 10',
    city: 'Maastricht',
    phone: '14 043',
    tasks: [
      book('book', L('Maak een afspraak', 'Make an appointment')),
      done('wmo', L('Bekijk hulp in huis', 'See help at home'), [
        L('Uw aanvraag is in behandeling', 'Your request is being handled'),
      ]),
      ask('other', L('Iets anders vragen', 'Ask something else')),
    ],
  },
]

export const defaultLinks: LinkedPlace[] = [
  { catalogId: 'gp-wyck', patientNumber: '48219' },
  { catalogId: 'dentist-scharn', patientNumber: '1104' },
  { catalogId: 'apo-wyck', patientNumber: '48219' },
  { catalogId: 'mumc', patientNumber: '77301' },
  { catalogId: 'toeslagen', patientNumber: '2026-1844' },
  { catalogId: 'svb', patientNumber: '55021' },
  { catalogId: 'gemeente-maastricht', patientNumber: '14043' },
]

export function placeById(id: string): CatalogPlace | undefined {
  return catalog.find((item) => item.id === id)
}

export function searchPlaces(kind: Kind, query: string, excludeIds: string[] = []): CatalogPlace[] {
  const needle = query.trim().toLowerCase()
  return catalog.filter((place) => {
    if (place.kind !== kind) return false
    if (excludeIds.includes(place.id)) return false
    if (!needle) return true
    const haystack = `${place.name} ${place.address} ${place.city}`.toLowerCase()
    return haystack.includes(needle)
  })
}

export const ui = {
  langLabel: L('Taal', 'Language'),
  helperLink: L('Voor kind, kleinkind of verzorger', 'For a child, grandchild, or caretaker'),
  gateTitle: L('Dit is voor uw kind, kleinkind of verzorger', 'This is for your child, grandchild, or caretaker'),
  gateLead: L(
    'Een kind, kleinkind of verzorger logt één keer in met de DigiD van de oudere persoon. Daarna neemt de plek een afspraakverzoek aan, zonder nieuwe login. Ga terug als u de oudere persoon bent.',
    'A child, grandchild, or caretaker logs in once with the older person’s DigiD. After that, the place accepts an appointment request, with no new login. Go back if you are the older person.',
  ),
  gateYes: L('Ik ben kind, kleinkind of verzorger', 'I am a child, grandchild, or caretaker'),
  gateBack: L('Terug naar mijn plekken', 'Back to my places'),
  homeTitle: L('Uw plekken', 'Your places'),
  appointmentsChoice: L('Bekijk mijn afspraken', 'See my appointments'),
  back: L('Terug', 'Back'),
  appointmentsTitle: L('Mijn afspraken', 'My appointments'),
  emptyAppointments: L('U heeft nog geen afspraken.', 'You have no appointments yet.'),
  date: L('Datum', 'Date'),
  time: L('Tijd', 'Time'),
  place: L('Plaats', 'Place'),
  dateTitle: L('Welke dag?', 'Which day?'),
  timeTitle: L('Hoe laat?', 'What time?'),
  startHelp: L('Ja, doe dit', 'Yes, do this'),
  stopCancel: L('Stoppen', 'Stop'),
  slotConfirm: L(
    '{name} bevestigt het tijdstip. Dan staat de afspraak.',
    '{name} confirms the time. Then the appointment is booked.',
  ),
  doneTitle: L('Klaar. {name} heeft de taak aangenomen.', 'Done. {name} has accepted the task.'),
  bookedTitle: L(
    'Klaar. {name} heeft het tijdstip bevestigd.',
    'Done. {name} has confirmed the time.',
  ),
  sensitiveLead: L(
    'De DigiD-toestemming geldt niet voor deze taak. Bel {name}.',
    'The DigiD permission does not cover this task. Call {name}.',
  ),
  sensitivePhone: L('Telefoon van {name}', 'Phone number for {name}'),
  callTitle: L('Bel {name}', 'Call {name}'),
  cannotDo: L('De app kan deze taak niet doen.', 'The app cannot do this task.'),
  startBook: L('Ja, deze afspraak', 'Yes, this appointment'),
  viewAppointments: L('Bekijk mijn afspraken', 'See my appointments'),
  setupTitle: L('Eenmalig instellen', 'Set up once'),
  setupPermission: L(
    'Log één keer in met de DigiD van de oudere persoon. De DigiD-toestemming blijft daarna gelden. De gekozen plek neemt later een afspraak of een andere gewone taak aan, zonder nieuwe login.',
    'Log in once with the older person’s DigiD. The DigiD permission stays after that. The chosen place later accepts an appointment or another ordinary task, with no new login.',
  ),
  setupLead: L(
    'Kies alleen de plekken die de oudere persoon echt gebruikt.',
    'Choose only the places the older person actually uses.',
  ),
  addPlace: L('Plek toevoegen', 'Add a place'),
  kindTitle: L('Wat voor plek?', 'What kind of place?'),
  whichTitle: L('Welke?', 'Which one?'),
  searchPlace: L('Zoek op naam of straat', 'Search by name or street'),
  noPlaceMatch: L('Geen plek gevonden.', 'No place found.'),
  numberTitle: L('Nummer op de pas of de brief', 'Number on the card or the letter'),
  numberSkip: L('Het nummer klopt', 'The number is right'),
  finishSetup: L('Klaar met instellen', 'Finish setup'),
  remove: L('Haal weg', 'Remove'),
  emptyPlaces: L(
    'Er is nog niets ingesteld.',
    'Nothing has been set up yet.',
  ),
  pageTitle: L('Alleen uw eigen plekken', 'Only your own places'),
} as const satisfies Record<string, Localized>
