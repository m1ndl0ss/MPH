import './style.css'
import {
  appointments,
  domains,
  t,
  ui,
  type Appointment,
  type Domain,
  type Lang,
  type Organisation,
  type Task,
} from './data'

type Screen =
  | { name: 'home' }
  | { name: 'appointments' }
  | { name: 'appointment'; appointment: Appointment }
  | { name: 'domains' }
  | { name: 'organisations'; domain: Domain }
  | { name: 'tasks'; domain: Domain; organisation: Organisation }
  | {
      name: 'confirm'
      domain: Domain
      organisation: Organisation
      task: Task
    }
  | {
      name: 'done'
      organisation: Organisation
      task: Task
    }
  | {
      name: 'call'
      domain: Domain
      organisation: Organisation
      task: Task
    }

const LANG_KEY = 'thuis-lang'

function loadLang(): Lang {
  const stored = localStorage.getItem(LANG_KEY)
  return stored === 'en' ? 'en' : 'nl'
}

let lang: Lang = loadLang()
let screen: Screen = { name: 'home' }
const app = document.querySelector<HTMLDivElement>('#app')!

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

function languageToggle() {
  const nlActive = lang === 'nl'
  const enActive = lang === 'en'
  return `
    <div class="lang-group" role="group" aria-label="${t(lang, ui.langLabel)}">
      <span class="lang-label">${t(lang, ui.langLabel)}</span>
      <div class="lang-toggle">
        <button
          class="lang-btn ${nlActive ? 'is-active' : ''}"
          type="button"
          data-action="lang-nl"
          aria-pressed="${nlActive}"
        >Nederlands</button>
        <button
          class="lang-btn ${enActive ? 'is-active' : ''}"
          type="button"
          data-action="lang-en"
          aria-pressed="${enActive}"
        >English</button>
      </div>
    </div>
  `
}

function shell(content: string) {
  return `
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-name">Thuis</div>
          <div class="brand-sub">${t(lang, ui.brandSub)}</div>
        </div>
        ${languageToggle()}
      </header>
      ${content}
    </div>
  `
}

function backButton(onClickAttr: string) {
  return `<button class="back" type="button" data-action="${onClickAttr}">← ${t(lang, ui.back)}</button>`
}

function renderHome() {
  return shell(`
    <section class="screen">
      <h1>${t(lang, ui.homeTitle)}</h1>
      <div class="stack">
        <button class="choice primary" type="button" data-action="appointments">
          <span class="choice-title">${t(lang, ui.appointmentsChoice)}</span>
        </button>
        <button class="choice secondary" type="button" data-action="domains">
          <span class="choice-title">${t(lang, ui.helpChoice)}</span>
        </button>
      </div>
    </section>
  `)
}

function renderAppointments() {
  const items = appointments
    .map(
      (a) => `
      <button class="choice" type="button" data-action="appointment" data-id="${a.id}">
        <span class="choice-title">${t(lang, a.title)}</span>
        <span class="choice-meta">${t(lang, a.date)} · ${a.time}</span>
      </button>
    `,
    )
    .join('')

  return shell(`
    <section class="screen">
      ${backButton('home')}
      <h1>${t(lang, ui.appointmentsTitle)}</h1>
      <div class="stack">${items}</div>
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

function renderDomains() {
  const items = domains
    .map(
      (d) => `
      <button class="choice" type="button" data-action="organisations" data-id="${d.id}">
        <span class="choice-title">${t(lang, d.label)}</span>
      </button>
    `,
    )
    .join('')

  return shell(`
    <section class="screen">
      ${backButton('home')}
      <h1>${t(lang, ui.domainsTitle)}</h1>
      <div class="stack">${items}</div>
    </section>
  `)
}

function renderOrganisations(domain: Domain) {
  const items = domain.organisations
    .map(
      (o) => `
      <button class="choice" type="button" data-action="tasks" data-id="${o.id}">
        <span class="choice-title">${t(lang, o.label)}</span>
      </button>
    `,
    )
    .join('')

  return shell(`
    <section class="screen">
      ${backButton('domains')}
      <h1>${t(lang, ui.placesTitle)}</h1>
      <div class="stack">${items}</div>
    </section>
  `)
}

function renderTasks(_domain: Domain, organisation: Organisation) {
  const items = organisation.tasks
    .map(
      (task) => `
      <button class="choice" type="button" data-action="confirm" data-id="${task.id}">
        <span class="choice-title">${t(lang, task.label)}</span>
      </button>
    `,
    )
    .join('')

  return shell(`
    <section class="screen">
      ${backButton('organisations-back')}
      <h1>${t(lang, ui.tasksTitle)}</h1>
      <div class="stack">${items}</div>
    </section>
  `)
}

function renderConfirm(
  _domain: Domain,
  _organisation: Organisation,
  task: Task,
) {
  const steps = task.steps
    .map(
      (s, i) => `
      <li>
        <span class="step-num">${i + 1}</span>
        <span>${t(lang, s)}</span>
      </li>
    `,
    )
    .join('')

  return shell(`
    <section class="screen">
      ${backButton('tasks-back')}
      <h1>${t(lang, task.label)}</h1>
      <ol class="steps">${steps}</ol>
      <p class="digid-note">${t(lang, ui.digidNote)}</p>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="start-help">
          ${t(lang, ui.startHelp)}
        </button>
        <button class="btn btn-stop" type="button" data-action="domains">
          ${t(lang, ui.stopCancel)}
        </button>
      </div>
    </section>
  `)
}

function renderDone(_organisation: Organisation, _task: Task) {
  return shell(`
    <section class="screen screen-done">
      <div class="success-mark" aria-hidden="true">✓</div>
      <h1>${t(lang, ui.doneTitle)}</h1>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="home">
          ${t(lang, ui.doneHome)}
        </button>
      </div>
    </section>
  `)
}

function renderCall(organisation: Organisation, _task: Task) {
  return shell(`
    <section class="screen screen-call">
      ${backButton('tasks-back')}
      <h1>${t(lang, organisation.label)}</h1>
      <p class="call-lead">${t(lang, ui.callLead)}</p>
      <p class="phone-number">${organisation.phone}</p>
      <div class="actions">
        <a class="btn btn-primary btn-call" href="tel:${organisation.phoneTel}">
          ${t(lang, ui.callButton)} ${organisation.phone}
        </a>
        <button class="btn btn-secondary" type="button" data-action="home">
          ${t(lang, ui.doneHome)}
        </button>
      </div>
    </section>
  `)
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
    case 'domains':
      app.innerHTML = renderDomains()
      break
    case 'organisations':
      app.innerHTML = renderOrganisations(screen.domain)
      break
    case 'tasks':
      app.innerHTML = renderTasks(screen.domain, screen.organisation)
      break
    case 'confirm':
      app.innerHTML = renderConfirm(
        screen.domain,
        screen.organisation,
        screen.task,
      )
      break
    case 'done':
      app.innerHTML = renderDone(screen.organisation, screen.task)
      break
    case 'call':
      app.innerHTML = renderCall(screen.organisation, screen.task)
      break
  }
  bind()
}

function bind() {
  app.querySelectorAll<HTMLElement>('[data-action]').forEach((el) => {
    el.addEventListener('click', () => {
      const action = el.dataset.action
      const id = el.dataset.id

      if (action === 'lang-nl') return setLang('nl')
      if (action === 'lang-en') return setLang('en')

      if (action === 'home') return go({ name: 'home' })
      if (action === 'appointments') return go({ name: 'appointments' })
      if (action === 'domains') return go({ name: 'domains' })

      if (action === 'appointment' && id) {
        const appointment = appointments.find((a) => a.id === id)
        if (appointment) go({ name: 'appointment', appointment })
        return
      }

      if (action === 'organisations' && id) {
        const domain = domains.find((d) => d.id === id)
        if (domain) go({ name: 'organisations', domain })
        return
      }

      if (action === 'organisations-back' && screen.name === 'tasks') {
        return go({ name: 'organisations', domain: screen.domain })
      }

      if (action === 'tasks' && id && screen.name === 'organisations') {
        const organisation = screen.domain.organisations.find((o) => o.id === id)
        if (organisation) {
          go({
            name: 'tasks',
            domain: screen.domain,
            organisation,
          })
        }
        return
      }

      if (action === 'tasks-back' && (screen.name === 'confirm' || screen.name === 'call')) {
        return go({
          name: 'tasks',
          domain: screen.domain,
          organisation: screen.organisation,
        })
      }

      if (action === 'confirm' && id && screen.name === 'tasks') {
        const task = screen.organisation.tasks.find((item) => item.id === id)
        if (!task) return
        if (task.outcome === 'call') {
          return go({
            name: 'call',
            domain: screen.domain,
            organisation: screen.organisation,
            task,
          })
        }
        return go({
          name: 'confirm',
          domain: screen.domain,
          organisation: screen.organisation,
          task,
        })
      }

      if (action === 'start-help' && screen.name === 'confirm') {
        return go({
          name: 'done',
          organisation: screen.organisation,
          task: screen.task,
        })
      }
    })
  })
}

render()
