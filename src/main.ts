import './style.css'
import {
  appointments,
  bookDates,
  bookTimes,
  caretaker,
  defaultLinks,
  kinds,
  placeById,
  searchPlaces,
  t,
  ui,
  type Appointment,
  type CatalogPlace,
  type Kind,
  type Lang,
  type LinkedPlace,
  type Task,
} from './data'

type Booking = { dateId: string; date: { nl: string; en: string }; time: string }

type Screen =
  | { name: 'home' }
  | { name: 'appointments' }
  | { name: 'appointment'; appointment: Appointment }
  | { name: 'tasks'; place: CatalogPlace; link: LinkedPlace }
  | { name: 'date'; place: CatalogPlace; link: LinkedPlace; task: Task }
  | { name: 'time'; place: CatalogPlace; link: LinkedPlace; task: Task; dateId: string }
  | {
      name: 'confirm'
      place: CatalogPlace
      link: LinkedPlace
      task: Task
      booking?: Booking
    }
  | { name: 'done'; place: CatalogPlace; task: Task; booking?: Booking }
  | { name: 'caretaker'; place: CatalogPlace; task: Task }
  | { name: 'sensitive'; place: CatalogPlace; task: Task }
  | { name: 'gate' }
  | { name: 'setup' }
  | { name: 'kind' }
  | { name: 'pick'; kind: Kind; query?: string }
  | { name: 'number'; place: CatalogPlace }

const LANG_KEY = 'thuis-lang'
const LINKS_KEY = 'thuis-links-4'
const READY_KEY = 'thuis-ready'

function loadLang(): Lang {
  return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'nl'
}

function loadLinks(): LinkedPlace[] {
  const raw = localStorage.getItem(LINKS_KEY)
  if (!raw) return defaultLinks.map((item) => ({ ...item }))
  try {
    const parsed = JSON.parse(raw) as LinkedPlace[]
    return Array.isArray(parsed) ? parsed : defaultLinks.map((item) => ({ ...item }))
  } catch {
    return defaultLinks.map((item) => ({ ...item }))
  }
}

let lang: Lang = loadLang()
let links: LinkedPlace[] = loadLinks()
let screen: Screen = localStorage.getItem(READY_KEY) === '1' ? { name: 'home' } : { name: 'setup' }
let searchCaret: number | null = null
const app = document.querySelector<HTMLDivElement>('#app')!

function saveLinks() {
  localStorage.setItem(LINKS_KEY, JSON.stringify(links))
}

function setLang(next: Lang) {
  lang = next
  localStorage.setItem(LANG_KEY, next)
  document.documentElement.lang = next
  document.title = t(lang, ui.pageTitle)
  render()
}

function go(next: Screen) {
  screen = next
  render()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function myPlaces(): { place: CatalogPlace; link: LinkedPlace }[] {
  return links.flatMap((link) => {
    const place = placeById(link.catalogId)
    return place ? [{ place, link }] : []
  })
}

function languageToggle() {
  const nlActive = lang === 'nl'
  const enActive = lang === 'en'
  return `
    <div class="lang-group" role="group" aria-label="${t(lang, ui.langLabel)}">
      <span class="lang-label">${t(lang, ui.langLabel)}</span>
      <div class="lang-toggle">
        <button class="lang-btn ${nlActive ? 'is-active' : ''}" type="button" data-action="lang-nl" aria-pressed="${nlActive}">Nederlands</button>
        <button class="lang-btn ${enActive ? 'is-active' : ''}" type="button" data-action="lang-en" aria-pressed="${enActive}">English</button>
      </div>
    </div>
  `
}

function shell(content: string) {
  return `
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-sub">${t(lang, ui.brandSub)}</div>
        </div>
        <div class="top-actions">
          ${languageToggle()}
        </div>
      </header>
      ${
        screen.name === 'gate' ||
        screen.name === 'setup' ||
        screen.name === 'kind' ||
        screen.name === 'pick' ||
        screen.name === 'number' ||
        screen.name === 'sensitive'
          ? ''
          : `<button class="family-entry" type="button" data-action="gate">${t(lang, ui.helperLink)}</button>`
      }
      ${content}
    </div>
  `
}

function backButton(action: string) {
  return `<button class="back" type="button" data-action="${action}">← ${t(lang, ui.back)}</button>`
}

function choices(items: { id: string; title: string; meta?: string; action: string }[]) {
  return items
    .map(
      (item) => `
      <button class="choice" type="button" data-action="${item.action}" data-id="${item.id}">
        <span class="choice-title">${item.title}</span>
        ${item.meta ? `<span class="choice-meta">${item.meta}</span>` : ''}
      </button>`,
    )
    .join('')
}

function renderHome() {
  const mine = myPlaces()
  const list =
    mine.length === 0
      ? `<p class="call-lead">${t(lang, ui.emptyPlaces)}</p>`
      : `<div class="stack">${choices(
          mine.map(({ place }) => ({
            id: place.id,
            title: place.name,
            action: 'open-place',
          })),
        )}</div>`

  return shell(`
    <section class="screen">
      <h1>${t(lang, ui.homeTitle)}</h1>
      <p class="permission-note">${t(lang, ui.homeNote)}</p>
      ${list}
      <button class="choice primary" type="button" data-action="appointments">
        <span class="choice-title">${t(lang, ui.appointmentsChoice)}</span>
      </button>
    </section>
  `)
}

function renderAppointments() {
  const items =
    appointments.length === 0
      ? `<p class="call-lead">${t(lang, ui.emptyAppointments)}</p>`
      : `<div class="stack">${choices(
          appointments.map((a) => ({
            id: a.id,
            title: t(lang, a.title),
            meta: `${t(lang, a.date)} · ${a.time}`,
            action: 'appointment',
          })),
        )}</div>`

  return shell(`
    <section class="screen">
      ${backButton('home')}
      <h1>${t(lang, ui.appointmentsTitle)}</h1>
      ${items}
    </section>
  `)
}

function renderAppointment(a: Appointment) {
  return shell(`
    <section class="screen">
      ${backButton('appointments')}
      <h1>${t(lang, a.title)}</h1>
      <div class="meta-list">
        <div><span class="meta-label">${t(lang, ui.date)}</span> ${t(lang, a.date)}</div>
        <div><span class="meta-label">${t(lang, ui.time)}</span> ${a.time}</div>
        <div><span class="meta-label">${t(lang, ui.place)}</span> ${t(lang, a.place)}</div>
      </div>
      <p class="reminder">${t(lang, a.reminder)}</p>
    </section>
  `)
}

function renderTasks(place: CatalogPlace) {
  return shell(`
    <section class="screen">
      ${backButton('home')}
      <h1>${place.name}</h1>
      <div class="stack">${choices(
        place.tasks.map((task) => ({
          id: task.id,
          title: t(lang, task.label),
          action: 'open-task',
        })),
      )}</div>
    </section>
  `)
}

function renderDates(place: CatalogPlace) {
  return shell(`
    <section class="screen">
      ${backButton('tasks-back')}
      <h1>${t(lang, ui.dateTitle)}</h1>
      <p class="choice-meta">${place.name}</p>
      <div class="stack">${choices(
        bookDates.map((day) => ({
          id: day.id,
          title: t(lang, day.label),
          action: 'pick-date',
        })),
      )}</div>
    </section>
  `)
}

function renderTimes(place: CatalogPlace, dateId: string) {
  const day = bookDates.find((item) => item.id === dateId)
  return shell(`
    <section class="screen">
      ${backButton('date-back')}
      <h1>${t(lang, ui.timeTitle)}</h1>
      <p class="choice-meta">${day ? t(lang, day.label) : ''} · ${place.name}</p>
      <div class="stack">${choices(
        bookTimes.map((time) => ({
          id: time,
          title: time,
          action: 'pick-time',
        })),
      )}</div>
    </section>
  `)
}

function renderConfirm(place: CatalogPlace, task: Task, booking?: Booking) {
  const when = `
    <div class="meta-list">
      ${booking ? `<div><span class="meta-label">${t(lang, ui.date)}</span> ${t(lang, booking.date)}</div>` : ''}
      ${booking ? `<div><span class="meta-label">${t(lang, ui.time)}</span> ${booking.time}</div>` : ''}
      <div><span class="meta-label">${t(lang, ui.place)}</span> ${place.name}</div>
    </div>`

  return shell(`
    <section class="screen">
      ${backButton(booking ? 'time-back' : 'tasks-back')}
      <h1>${t(lang, task.label)}</h1>
      <p class="permission-note">${t(lang, booking ? ui.acceptAppointment : ui.acceptTask)}</p>
      ${booking ? `<p class="call-lead">${t(lang, ui.slotConfirm)}</p>` : ''}
      ${when}
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="start">${t(lang, booking ? ui.startBook : ui.startHelp)}</button>
        <button class="btn btn-stop" type="button" data-action="home">${t(lang, ui.stopCancel)}</button>
      </div>
    </section>
  `)
}

function renderDone(place: CatalogPlace, task: Task, booking?: Booking) {
  const result = (task.result ?? []).map((line) => `<li>${t(lang, line)}</li>`).join('')
  const when = booking
    ? `<div class="meta-list">
        <div><span class="meta-label">${t(lang, ui.date)}</span> ${t(lang, booking.date)}</div>
        <div><span class="meta-label">${t(lang, ui.time)}</span> ${booking.time}</div>
        <div><span class="meta-label">${t(lang, ui.place)}</span> ${place.name}</div>
      </div>`
    : ''

  return shell(`
    <section class="screen screen-done">
      <div class="success-mark" aria-hidden="true">✓</div>
      <h1>${t(lang, booking ? ui.bookedTitle : ui.doneTitle)}</h1>
      ${when}
      ${result ? `<ul class="result-list">${result}</ul>` : ''}
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="${booking ? 'appointments' : 'home'}">
          ${t(lang, booking ? ui.viewAppointments : ui.back)}
        </button>
      </div>
    </section>
  `)
}

function renderSensitive(place: CatalogPlace, task: Task) {
  const phone = place.phone
    ? `<p class="meta-label">${t(lang, ui.sensitivePhone)}</p>
       <a class="phone-number" href="tel:${place.phone.replaceAll(' ', '')}">${place.phone}</a>`
    : `<p class="call-lead">${t(lang, ui.toCaretaker)}</p>`

  return shell(`
    <section class="screen">
      ${backButton('tasks-back')}
      <h1>${t(lang, task.label)}</h1>
      <p class="check-note">${t(lang, ui.sensitiveLead)}</p>
      ${phone}
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="home">${t(lang, ui.gateBack)}</button>
      </div>
    </section>
  `)
}

function renderCaretaker(place: CatalogPlace, task: Task) {
  return shell(`
    <section class="screen">
      ${backButton('tasks-back')}
      <h1>${t(lang, ui.caretakerSent)}</h1>
      <p class="call-lead">${t(lang, ui.toCaretaker)}</p>
      <p class="choice-meta">${place.name} · ${t(lang, task.label)}</p>
      <p class="choice-meta">${t(lang, caretaker)}</p>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="home">${t(lang, ui.back)}</button>
      </div>
    </section>
  `)
}

function renderGate() {
  return shell(`
    <section class="screen">
      <h1>${t(lang, ui.gateTitle)}</h1>
      <p class="permission-note">${t(lang, ui.gateLead)}</p>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="home">${t(lang, ui.gateBack)}</button>
        <button class="btn btn-quiet" type="button" data-action="setup">${t(lang, ui.gateYes)}</button>
      </div>
    </section>
  `)
}

function renderSetup() {
  const mine = myPlaces()
  const list = mine
    .map(
      ({ place }) => `
      <div class="linked-row">
        <div>
          <span class="choice-title">${place.name}</span>
          <span class="choice-meta">${placeMeta(place)}</span>
        </div>
        <button class="back" type="button" data-action="remove" data-id="${place.id}">${t(lang, ui.remove)}</button>
      </div>`,
    )
    .join('')

  return shell(`
    <section class="screen">
      ${backButton('home')}
      <h1>${t(lang, ui.setupTitle)}</h1>
      <p class="permission-note">${t(lang, ui.setupPermission)}</p>
      <p class="call-lead">${t(lang, ui.setupLead)}</p>
      <div class="stack">${list}</div>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="kind">${t(lang, ui.addPlace)}</button>
        <button class="btn btn-secondary" type="button" data-action="finish-setup">${t(lang, ui.finishSetup)}</button>
      </div>
    </section>
  `)
}

function renderKind() {
  return shell(`
    <section class="screen">
      ${backButton('setup')}
      <h1>${t(lang, ui.kindTitle)}</h1>
      <div class="stack">${choices(
        kinds.map((kind) => ({
          id: kind.id,
          title: t(lang, kind.label),
          action: 'pick-kind',
        })),
      )}</div>
    </section>
  `)
}

function placeMeta(place: CatalogPlace): string {
  return `${place.address}, ${place.city}`
}

function renderPick(kind: Kind, query = '') {
  const taken = links.map((link) => link.catalogId)
  const options = searchPlaces(kind, query, taken)
  const list =
    options.length === 0
      ? `<p class="call-lead">${t(lang, ui.noPlaceMatch)}</p>`
      : `<div class="stack">${choices(
          options.map((place) => ({
            id: place.id,
            title: place.name,
            meta: placeMeta(place),
            action: 'pick-place',
          })),
        )}</div>`

  return shell(`
    <section class="screen">
      ${backButton('kind')}
      <h1>${t(lang, ui.whichTitle)}</h1>
      <label class="field">
        <span class="meta-label">${t(lang, ui.searchPlace)}</span>
        <input
          id="place-search"
          class="big-input"
          type="search"
          autocomplete="off"
          value="${escapeAttr(query)}"
          placeholder="${t(lang, ui.searchPlace)}"
        />
      </label>
      ${list}
    </section>
  `)
}

function escapeAttr(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function renderNumber(place: CatalogPlace) {
  return shell(`
    <section class="screen">
      ${backButton('pick-back')}
      <h1>${place.name}</h1>
      <p class="call-lead">${placeMeta(place)}</p>
      <p class="call-lead">${t(lang, ui.numberTitle)}</p>
      <p class="phone-number">${suggestNumber(place.id)}</p>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="save-place">${t(lang, ui.numberSkip)}</button>
      </div>
    </section>
  `)
}

function suggestNumber(id: string): string {
  const known = defaultLinks.find((item) => item.catalogId === id)
  return known?.patientNumber ?? '20448'
}

function render() {
  document.documentElement.lang = lang
  document.title = t(lang, ui.pageTitle)

  switch (screen.name) {
    case 'home':
      app.innerHTML = renderHome()
      break
    case 'appointments':
      app.innerHTML = renderAppointments()
      break
    case 'appointment':
      app.innerHTML = renderAppointment(screen.appointment)
      break
    case 'tasks':
      app.innerHTML = renderTasks(screen.place)
      break
    case 'date':
      app.innerHTML = renderDates(screen.place)
      break
    case 'time':
      app.innerHTML = renderTimes(screen.place, screen.dateId)
      break
    case 'confirm':
      app.innerHTML = renderConfirm(screen.place, screen.task, screen.booking)
      break
    case 'done':
      app.innerHTML = renderDone(screen.place, screen.task, screen.booking)
      break
    case 'caretaker':
      app.innerHTML = renderCaretaker(screen.place, screen.task)
      break
    case 'sensitive':
      app.innerHTML = renderSensitive(screen.place, screen.task)
      break
    case 'gate':
      app.innerHTML = renderGate()
      break
    case 'setup':
      app.innerHTML = renderSetup()
      break
    case 'kind':
      app.innerHTML = renderKind()
      break
    case 'pick':
      app.innerHTML = renderPick(screen.kind, screen.query ?? '')
      break
    case 'number':
      app.innerHTML = renderNumber(screen.place)
      break
  }
  bind()
}

function bind() {
  const search = app.querySelector<HTMLInputElement>('#place-search')
  if (search && screen.name === 'pick') {
    const kind = screen.kind
    search.focus()
    const pos = searchCaret ?? search.value.length
    search.setSelectionRange(pos, pos)
    searchCaret = null
    search.addEventListener('input', () => {
      searchCaret = search.selectionStart
      screen = { name: 'pick', kind, query: search.value }
      render()
    })
  }

  app.querySelectorAll<HTMLElement>('[data-action]').forEach((el) => {
    el.addEventListener('click', () => {
      const action = el.dataset.action
      const id = el.dataset.id

      if (action === 'lang-nl') return setLang('nl')
      if (action === 'lang-en') return setLang('en')
      if (action === 'home') {
        localStorage.setItem(READY_KEY, '1')
        return go({ name: 'home' })
      }
      if (action === 'gate') return go({ name: 'gate' })
      if (action === 'appointments') return go({ name: 'appointments' })
      if (action === 'setup') return go({ name: 'setup' })
      if (action === 'finish-setup') {
        localStorage.setItem(READY_KEY, '1')
        return go({ name: 'home' })
      }
      if (action === 'kind') return go({ name: 'kind' })

      if (action === 'appointment' && id) {
        const appointment = appointments.find((item) => item.id === id)
        if (appointment) go({ name: 'appointment', appointment })
        return
      }

      if (action === 'open-place' && id) {
        const found = myPlaces().find((item) => item.place.id === id)
        if (found) go({ name: 'tasks', place: found.place, link: found.link })
        return
      }

      if (action === 'open-task' && id && screen.name === 'tasks') {
        const task = screen.place.tasks.find((item) => item.id === id)
        if (!task) return
        if (task.outcome === 'caretaker') {
          return go({ name: 'caretaker', place: screen.place, task })
        }
        if (task.outcome === 'sensitive') {
          return go({ name: 'sensitive', place: screen.place, task })
        }
        if (task.outcome === 'book') {
          return go({ name: 'date', place: screen.place, link: screen.link, task })
        }
        return go({ name: 'confirm', place: screen.place, link: screen.link, task })
      }

      if (
        action === 'tasks-back' &&
        (screen.name === 'tasks' ||
          screen.name === 'date' ||
          screen.name === 'time' ||
          screen.name === 'confirm' ||
          screen.name === 'caretaker' ||
          screen.name === 'sensitive')
      ) {
        const placeId = screen.place.id
        const found = myPlaces().find((item) => item.place.id === placeId)
        if (found) return go({ name: 'tasks', place: found.place, link: found.link })
        return
      }

      if (action === 'pick-date' && id && screen.name === 'date') {
        return go({
          name: 'time',
          place: screen.place,
          link: screen.link,
          task: screen.task,
          dateId: id,
        })
      }

      if (action === 'date-back' && screen.name === 'time') {
        return go({ name: 'date', place: screen.place, link: screen.link, task: screen.task })
      }

      if (action === 'pick-time' && id && screen.name === 'time') {
        const dateId = screen.dateId
        const day = bookDates.find((item) => item.id === dateId)
        if (!day) return
        return go({
          name: 'confirm',
          place: screen.place,
          link: screen.link,
          task: screen.task,
          booking: { dateId: screen.dateId, date: day.label, time: id },
        })
      }

      if (action === 'time-back' && screen.name === 'confirm' && screen.booking) {
        return go({
          name: 'time',
          place: screen.place,
          link: screen.link,
          task: screen.task,
          dateId: screen.booking.dateId,
        })
      }

      if (action === 'start' && screen.name === 'confirm') {
        if (screen.booking) {
          appointments.unshift({
            id: `booked-${Date.now()}`,
            title: screen.task.label,
            place: { nl: screen.place.name, en: screen.place.name },
            date: screen.booking.date,
            time: screen.booking.time,
            reminder: {
              nl: 'De dag ervoor om 18:00 krijgt u een herinnering',
              en: 'The day before at 18:00 you get a reminder',
            },
          })
        }
        return go({
          name: 'done',
          place: screen.place,
          task: screen.task,
          booking: screen.booking,
        })
      }

      if (action === 'remove' && id) {
        links = links.filter((link) => link.catalogId !== id)
        saveLinks()
        return go({ name: 'setup' })
      }

      if (action === 'pick-kind' && id) {
        return go({ name: 'pick', kind: id as Kind })
      }

      if (action === 'pick-place' && id && screen.name === 'pick') {
        const place = placeById(id)
        if (place) go({ name: 'number', place })
        return
      }

      if (action === 'pick-back' && screen.name === 'number') {
        return go({ name: 'pick', kind: screen.place.kind, query: '' })
      }

      if (action === 'save-place' && screen.name === 'number') {
        const placeId = screen.place.id
        if (!links.some((link) => link.catalogId === placeId)) {
          links = [...links, { catalogId: placeId, patientNumber: suggestNumber(placeId) }]
          saveLinks()
        }
        return go({ name: 'setup' })
      }
    })
  })
}

render()
