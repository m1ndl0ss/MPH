(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t){return t[e]}var t=(e,t)=>({nl:e,en:t}),n=[{id:`2026-09-28`,label:t(`Maandag 28 september`,`Monday 28 September`)},{id:`2026-09-29`,label:t(`Dinsdag 29 september`,`Tuesday 29 September`)},{id:`2026-09-30`,label:t(`Woensdag 30 september`,`Wednesday 30 September`)},{id:`2026-10-01`,label:t(`Donderdag 1 oktober`,`Thursday 1 October`)},{id:`2026-10-02`,label:t(`Vrijdag 2 oktober`,`Friday 2 October`)},{id:`2026-10-05`,label:t(`Maandag 5 oktober`,`Monday 5 October`)}],r=[`08:30`,`09:15`,`10:45`,`13:00`,`14:30`,`16:15`],i=t(`De dag ervoor om 18:00 krijgt u een herinnering`,`The day before at 18:00 you get a reminder`),a=[{id:`a1`,title:t(`Controle bij de oogarts`,`Eye doctor check`),place:t(`Maastricht UMC+`,`Maastricht UMC+`),date:t(`Dinsdag 30 september`,`Tuesday 30 September`),time:`10:15`,reminder:i},{id:`a2`,title:t(`Gesprek met de huisarts`,`Talk with your GP`),place:t(`Huisartsenpraktijk Smeets`,`Huisartsenpraktijk Smeets`),date:t(`Vrijdag 3 oktober`,`Friday 3 October`),time:`14:30`,reminder:i}],o=(e,t)=>({id:e,label:t,outcome:`book`}),s=(e,t,n)=>({id:e,label:t,outcome:`done`,result:n}),c=(e,t)=>({id:e,label:t,outcome:`caretaker`}),l=(e,t)=>({id:e,label:t,outcome:`sensitive`});function u(e){return e===`gp`?[o(`book`,t(`Maak een afspraak`,`Make an appointment`)),s(`repeat`,t(`Vraag een herhaalrecept`,`Ask for a repeat prescription`),[t(`Het recept gaat naar uw apotheek`,`The prescription goes to your pharmacy`),t(`U kunt het morgen ophalen`,`You can pick it up tomorrow`)]),c(`other`,t(`Iets anders vragen`,`Ask something else`))]:e===`dentist`?[o(`book`,t(`Maak een afspraak`,`Make an appointment`)),o(`check`,t(`Afspraak voor de controle`,`Book a check-up`)),c(`other`,t(`Iets anders vragen`,`Ask something else`))]:e===`pharmacy`?[s(`ready`,t(`Zet mijn medicijnen klaar`,`Prepare my medicines`),[t(`Uw medicijnen staan morgen klaar`,`Your medicines will be ready tomorrow`)]),s(`hours`,t(`Openingstijden`,`Opening hours`),[t(`Maandag tot vrijdag 08:30 tot 17:30`,`Monday to Friday 08:30 to 17:30`)]),c(`other`,t(`Iets anders vragen`,`Ask something else`))]:e===`hospital`?[o(`book`,t(`Maak een afspraak`,`Make an appointment`)),s(`hours`,t(`Bezoektijden`,`Visiting hours`),[t(`Doordeweeks 11:00 tot 20:00`,`Weekdays 11:00 to 20:00`)]),l(`file`,t(`Bekijk mijn medisch dossier`,`See my medical file`)),c(`other`,t(`Iets anders vragen`,`Ask something else`))]:e===`tax`?[s(`look`,t(`Bekijk mijn gegevens`,`See my details`),[t(`De gegevens van deze maand staan klaar`,`This month’s details are ready`)]),l(`pay`,t(`Doe een betaling`,`Make a payment`)),c(`other`,t(`Iets anders vragen`,`Ask something else`))]:e===`pension`?[s(`pay`,t(`Bekijk mijn betaling`,`See my payment`),[t(`De volgende betaaldatum staat klaar`,`The next payment date is ready`)]),c(`other`,t(`Iets anders vragen`,`Ask something else`))]:[o(`book`,t(`Maak een afspraak`,`Make an appointment`)),s(`status`,t(`Bekijk mijn aanvraag`,`See my request`),[t(`Uw aanvraag is in behandeling`,`Your request is being handled`)]),c(`other`,t(`Iets anders vragen`,`Ask something else`))]}var d=[{id:`gp`,label:t(`Huisarts`,`GP`)},{id:`dentist`,label:t(`Tandarts`,`Dentist`)},{id:`pharmacy`,label:t(`Apotheek`,`Pharmacy`)},{id:`hospital`,label:t(`Ziekenhuis`,`Hospital`)},{id:`tax`,label:t(`Belasting en toeslagen`,`Tax and benefits`)},{id:`pension`,label:t(`Pensioen`,`Pension`)},{id:`town`,label:t(`Gemeente`,`Town hall`)}],f=[{id:`gp-wyck`,kind:`gp`,name:`Huisartsenpraktijk Smeets`,address:`Heerderweg 5`,city:`Maastricht`,phone:`043 363 61 31`,tasks:u(`gp`)},{id:`gp-caberg`,kind:`gp`,name:`Medisch Centrum Caberg`,address:`Clavecymbelstraat 39`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-ceramique`,kind:`gp`,name:`Huisartsenpraktijk Ceramique`,address:`Avenue Ceramique 155`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-annadal`,kind:`gp`,name:`Huisartsenpraktijk Annadal`,address:`Becanusstraat 15`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-de-poort`,kind:`gp`,name:`Huisartsenpraktijk De Poort`,address:`Becanusstraat 15`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-heugem`,kind:`gp`,name:`Huisartsenpraktijk Heugem`,address:`De Beente 24`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-oost`,kind:`gp`,name:`Huisartsen Maastricht Oost`,address:`Marconistraat 1`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-scharn`,kind:`gp`,name:`Huisartsenpraktijk Scharn`,address:`Vijverdalseweg 4`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-sint-pieter`,kind:`gp`,name:`Huisartsenpraktijk Sint Pieter`,address:`Glacisweg 1`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-aan-de-maas`,kind:`gp`,name:`Huisartspraktijk aan de Maas`,address:`Schoolstraat 27b`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-maasmedics`,kind:`gp`,name:`Huisartsenpraktijk Maasmedics`,address:`Roserije 51`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-malberg`,kind:`gp`,name:`Huisartsenpraktijk Malberg`,address:`Malbergplein 15a`,city:`Maastricht`,tasks:u(`gp`)},{id:`gp-van-kleef`,kind:`gp`,name:`Huisartsenpraktijk Dr. van Kleef`,address:`Victor de Stuersstraat 15`,city:`Maastricht`,tasks:u(`gp`)},{id:`dentist-scharn`,kind:`dentist`,name:`Dental Clinics Maastricht Scharn`,address:`Scharnerweg 16`,city:`Maastricht`,phone:`043 325 15 45`,tasks:u(`dentist`)},{id:`dentist-centrum`,kind:`dentist`,name:`Dental Clinics Maastricht Centrum`,address:`Koningin Emmaplein 10`,city:`Maastricht`,tasks:u(`dentist`)},{id:`dentist-heerderrein`,kind:`dentist`,name:`Dental Clinics Maastricht Heerderrein`,address:`Rijksweg 72-A3`,city:`Maastricht`,tasks:u(`dentist`)},{id:`dentist-mondzorg`,kind:`dentist`,name:`Mondzorg Maastricht`,address:`Professor Pieter Willemsstraat 21`,city:`Maastricht`,tasks:u(`dentist`)},{id:`dentist-bolwerk`,kind:`dentist`,name:`Bolwerk Tandartsen`,address:`Sint Servaasbolwerk 2`,city:`Maastricht`,tasks:u(`dentist`)},{id:`dentist-tp`,kind:`dentist`,name:`TP Maastricht`,address:`Akersteenweg 22`,city:`Maastricht`,tasks:u(`dentist`)},{id:`dentist-jekerdal`,kind:`dentist`,name:`Mondzorg Jekerdal`,address:`Cannerweg 134`,city:`Maastricht`,tasks:u(`dentist`)},{id:`apo-wyck`,kind:`pharmacy`,name:`Service Apotheek Wijck-Ceramique`,address:`Avenue Ceramique 155`,city:`Maastricht`,phone:`043 325 82 39`,tasks:u(`pharmacy`)},{id:`apo-scharn`,kind:`pharmacy`,name:`Service Apotheek Scharn`,address:`Vijverdalseweg 4A01`,city:`Maastricht`,tasks:u(`pharmacy`)},{id:`apo-america`,kind:`pharmacy`,name:`Service Apotheek America`,address:`Voltastraat 36`,city:`Maastricht`,tasks:u(`pharmacy`)},{id:`apo-caberg`,kind:`pharmacy`,name:`Service Apotheek Caberg`,address:`Clavecymbelstraat 37`,city:`Maastricht`,tasks:u(`pharmacy`)},{id:`apo-heer`,kind:`pharmacy`,name:`Service Apotheek Heer`,address:`Einsteinstraat 34-A-01`,city:`Maastricht`,tasks:u(`pharmacy`)},{id:`apo-annadal`,kind:`pharmacy`,name:`Apotheek Annadal`,address:`Becanusstraat 15A04`,city:`Maastricht`,tasks:u(`pharmacy`)},{id:`apo-romkens`,kind:`pharmacy`,name:`Apotheek Römkens`,address:`Potteriestraat 139`,city:`Maastricht`,tasks:u(`pharmacy`)},{id:`apo-mumc`,kind:`pharmacy`,name:`Apotheek MUMC+`,address:`P. Debyelaan 25`,city:`Maastricht`,tasks:u(`pharmacy`)},{id:`mumc`,kind:`hospital`,name:`Maastricht UMC+`,address:`P. Debyelaan 25`,city:`Maastricht`,phone:`043 387 6543`,tasks:[o(`book`,t(`Maak een afspraak`,`Make an appointment`)),s(`see`,t(`Bekijk mijn afspraak`,`See my appointment`),[t(`Oogarts, dinsdag 30 september, 10:15`,`Eye doctor, Tuesday 30 September, 10:15`)]),s(`hours`,t(`Bezoektijden`,`Visiting hours`),[t(`Doordeweeks 11:00 tot 20:00`,`Weekdays 11:00 to 20:00`),t(`Weekend 14:00 tot 20:00`,`Weekend 14:00 to 20:00`)]),l(`file`,t(`Bekijk mijn medisch dossier`,`See my medical file`)),c(`other`,t(`Iets anders vragen`,`Ask something else`))]},{id:`zuyderland`,kind:`hospital`,name:`Zuyderland Medisch Centrum Sittard-Geleen`,address:`Dr. H. van der Hoffplein 1`,city:`Sittard-Geleen`,phone:`088 459 7777`,tasks:u(`hospital`)},{id:`zuyderland-heerlen`,kind:`hospital`,name:`Zuyderland Medisch Centrum Heerlen`,address:`Henri Dunantstraat 5`,city:`Heerlen`,phone:`088 459 7777`,tasks:u(`hospital`)},{id:`toeslagen`,kind:`tax`,name:`Dienst Toeslagen`,address:`Graadt van Roggenweg 500`,city:`Utrecht`,phone:`0800 0543`,tasks:[s(`huur`,t(`Bekijk mijn huurtoeslag`,`See my rent benefit`),[t(`De toeslag van deze maand staat klaar`,`This month’s benefit is ready`)]),s(`zorg`,t(`Bekijk mijn zorgtoeslag`,`See my healthcare benefit`),[t(`Zorgtoeslag staat aan`,`Healthcare benefit is on`)]),l(`pay`,t(`Doe een betaling`,`Make a payment`)),c(`other`,t(`Iets anders vragen`,`Ask something else`))]},{id:`belasting`,kind:`tax`,name:`Belastingdienst Maastricht`,address:`Terra Nigrastraat 10`,city:`Maastricht`,phone:`0800 0543`,tasks:u(`tax`)},{id:`svb`,kind:`pension`,name:`SVB, AOW`,address:`Avenue Céramique 50`,city:`Maastricht`,phone:`088 949 40 00`,tasks:[s(`pay`,t(`Bekijk mijn AOW`,`See my AOW`),[t(`Volgende betaling: 23 oktober`,`Next payment: 23 October`)]),c(`other`,t(`Iets anders vragen`,`Ask something else`))]},{id:`gemeente-maastricht`,kind:`town`,name:`Gemeente Maastricht`,address:`Mosae Forum 10`,city:`Maastricht`,phone:`14 043`,tasks:[o(`book`,t(`Maak een afspraak`,`Make an appointment`)),s(`wmo`,t(`Bekijk hulp in huis`,`See help at home`),[t(`Uw aanvraag is in behandeling`,`Your request is being handled`)]),c(`other`,t(`Iets anders vragen`,`Ask something else`))]}],p=[{catalogId:`gp-wyck`,patientNumber:`48219`},{catalogId:`dentist-scharn`,patientNumber:`1104`},{catalogId:`apo-wyck`,patientNumber:`48219`},{catalogId:`mumc`,patientNumber:`77301`},{catalogId:`toeslagen`,patientNumber:`2026-1844`},{catalogId:`svb`,patientNumber:`55021`},{catalogId:`gemeente-maastricht`,patientNumber:`14043`}];function m(e){return f.find(t=>t.id===e)}function h(e,t,n=[]){let r=t.trim().toLowerCase();return f.filter(t=>t.kind!==e||n.includes(t.id)?!1:!r||`${t.name} ${t.address} ${t.city}`.toLowerCase().includes(r))}var g={langLabel:t(`Taal`,`Language`),helperLink:t(`Voor kind, kleinkind of verzorger`,`For a child, grandchild, or caretaker`),gateTitle:t(`Dit is voor uw kind, kleinkind of verzorger`,`This is for your child, grandchild, or caretaker`),gateLead:t(`Een kind, kleinkind of verzorger logt één keer in met de DigiD van de oudere persoon. Daarna neemt de plek een afspraakverzoek aan, zonder nieuwe login. Ga terug als u de oudere persoon bent.`,`A child, grandchild, or caretaker logs in once with the older person’s DigiD. After that, the place accepts an appointment request, with no new login. Go back if you are the older person.`),gateYes:t(`Ik ben kind, kleinkind of verzorger`,`I am a child, grandchild, or caretaker`),digidTitle:t(`Ingelogd met DigiD`,`Logged in with DigiD`),digidLead:t(`De oudere persoon is ingelogd met DigiD. De toestemming blijft gelden.`,`The older person is logged in with DigiD. The permission stays.`),digidNext:t(`Kies de plekken`,`Choose the places`),gateBack:t(`Terug naar mijn plekken`,`Back to my places`),homeTitle:t(`Uw plekken`,`Your places`),appointmentsChoice:t(`Bekijk mijn afspraken`,`See my appointments`),back:t(`Terug`,`Back`),appointmentsTitle:t(`Mijn afspraken`,`My appointments`),emptyAppointments:t(`U heeft nog geen afspraken.`,`You have no appointments yet.`),date:t(`Datum`,`Date`),time:t(`Tijd`,`Time`),place:t(`Plaats`,`Place`),dateTitle:t(`Welke dag?`,`Which day?`),timeTitle:t(`Hoe laat?`,`What time?`),startHelp:t(`Ja, doe dit`,`Yes, do this`),stopCancel:t(`Stoppen`,`Stop`),slotConfirm:t(`{name} bevestigt het tijdstip. Dan staat de afspraak.`,`{name} confirms the time. Then the appointment is booked.`),doneTitle:t(`Klaar. {name} heeft de taak aangenomen.`,`Done. {name} has accepted the task.`),bookedTitle:t(`Klaar. {name} heeft het tijdstip bevestigd.`,`Done. {name} has confirmed the time.`),sensitiveLead:t(`De DigiD-toestemming geldt niet voor deze taak. Bel {name}.`,`The DigiD permission does not cover this task. Call {name}.`),sensitivePhone:t(`Telefoon van {name}`,`Phone number for {name}`),callTitle:t(`Bel {name}`,`Call {name}`),cannotDo:t(`De app kan deze taak niet doen.`,`The app cannot do this task.`),startBook:t(`Ja, deze afspraak`,`Yes, this appointment`),viewAppointments:t(`Bekijk mijn afspraken`,`See my appointments`),setupTitle:t(`Eenmalig instellen`,`Set up once`),setupPermission:t(`Log één keer in met de DigiD van de oudere persoon. De DigiD-toestemming blijft daarna gelden. De gekozen plek neemt later een afspraak of een andere gewone taak aan, zonder nieuwe login.`,`Log in once with the older person’s DigiD. The DigiD permission stays after that. The chosen place later accepts an appointment or another ordinary task, with no new login.`),setupLead:t(`Kies alleen de plekken die de oudere persoon echt gebruikt.`,`Choose only the places the older person actually uses.`),addPlace:t(`Plek toevoegen`,`Add a place`),kindTitle:t(`Wat voor plek?`,`What kind of place?`),whichTitle:t(`Welke?`,`Which one?`),searchPlace:t(`Zoek op naam of straat`,`Search by name or street`),noPlaceMatch:t(`Geen plek gevonden.`,`No place found.`),numberTitle:t(`Nummer op de pas of de brief`,`Number on the card or the letter`),numberSkip:t(`Het nummer klopt`,`The number is right`),finishSetup:t(`Klaar met instellen`,`Finish setup`),remove:t(`Haal weg`,`Remove`),emptyPlaces:t(`Er is nog niets ingesteld.`,`Nothing has been set up yet.`),pageTitle:t(`Alleen uw eigen plekken`,`Only your own places`)},_=`thuis-lang`,v=`thuis-links-4`,y=`thuis-ready`;function b(){return localStorage.getItem(_)===`en`?`en`:`nl`}function x(){let e=localStorage.getItem(v);if(!e)return p.map(e=>({...e}));try{let t=JSON.parse(e);return Array.isArray(t)?t:p.map(e=>({...e}))}catch{return p.map(e=>({...e}))}}var S=b(),C=x(),w=localStorage.getItem(y)===`1`?{name:`home`}:{name:`setup`},T=null,E=document.querySelector(`#app`);function D(){localStorage.setItem(v,JSON.stringify(C))}function O(t){S=t,localStorage.setItem(_,t),document.documentElement.lang=t,document.title=e(S,g.pageTitle),$()}function k(e){w=e,$(),window.scrollTo({top:0,behavior:`smooth`})}function A(){return C.flatMap(e=>{let t=m(e.catalogId);return t?[{place:t,link:e}]:[]})}function j(){let t=S===`nl`,n=S===`en`;return`
    <div class="lang-group" role="group" aria-label="${e(S,g.langLabel)}">
      <span class="lang-label">${e(S,g.langLabel)}</span>
      <div class="lang-toggle">
        <button class="lang-btn ${t?`is-active`:``}" type="button" data-action="lang-nl" aria-pressed="${t}">Nederlands</button>
        <button class="lang-btn ${n?`is-active`:``}" type="button" data-action="lang-en" aria-pressed="${n}">English</button>
      </div>
    </div>
  `}function M(t){return`
    <div class="shell">
      <header class="topbar">
        ${w.name!==`gate`&&w.name!==`digid`&&w.name!==`setup`&&w.name!==`kind`&&w.name!==`pick`&&w.name!==`number`&&w.name!==`sensitive`?`<button class="family-entry" type="button" data-action="gate">${e(S,g.helperLink)}</button>`:``}
        <div class="top-actions">
          ${j()}
        </div>
      </header>
      ${t}
    </div>
  `}function N(t,n){return e(S,t).replaceAll(`{name}`,n)}function P(t){return`<button class="btn btn-back" type="button" data-action="${t}">← ${e(S,g.back)}</button>`}function F(e){return e.map(e=>`
      <button class="choice" type="button" data-action="${e.action}" data-id="${e.id}">
        <span class="choice-title">${e.title}</span>
        ${e.meta?`<span class="choice-meta">${e.meta}</span>`:``}
      </button>`).join(``)}function I(){let t=A(),n=t.length===0?`<p class="call-lead">${e(S,g.emptyPlaces)}</p>`:`<div class="stack">${F(t.map(({place:e})=>({id:e.id,title:e.name,action:`open-place`})))}</div>`;return M(`
    <section class="screen">
      <h1>${e(S,g.homeTitle)}</h1>
      ${n}
      <button class="choice primary" type="button" data-action="appointments">
        <span class="choice-title">${e(S,g.appointmentsChoice)}</span>
      </button>
    </section>
  `)}function L(){let t=a.length===0?`<p class="call-lead">${e(S,g.emptyAppointments)}</p>`:`<div class="stack">${F(a.map(t=>({id:t.id,title:e(S,t.title),meta:`${e(S,t.date)} · ${t.time}`,action:`appointment`})))}</div>`;return M(`
    <section class="screen">
      ${P(`home`)}
      <h1>${e(S,g.appointmentsTitle)}</h1>
      ${t}
    </section>
  `)}function R(t){return M(`
    <section class="screen">
      ${P(`appointments`)}
      <h1>${e(S,t.title)}</h1>
      <div class="meta-list">
        <div><span class="meta-label">${e(S,g.date)}</span> ${e(S,t.date)}</div>
        <div><span class="meta-label">${e(S,g.time)}</span> ${t.time}</div>
        <div><span class="meta-label">${e(S,g.place)}</span> ${e(S,t.place)}</div>
      </div>
      <p class="reminder">${e(S,t.reminder)}</p>
    </section>
  `)}function z(t){return M(`
    <section class="screen">
      ${P(`home`)}
      <h1>${t.name}</h1>
      <div class="stack">${F(t.tasks.filter(e=>e.outcome!==`caretaker`||!!t.phone).map(t=>({id:t.id,title:e(S,t.label),action:`open-task`})))}</div>
    </section>
  `)}function B(t){return M(`
    <section class="screen">
      ${P(`tasks-back`)}
      <h1>${e(S,g.dateTitle)}</h1>
      <p class="choice-meta">${t.name}</p>
      <div class="stack">${F(n.map(t=>({id:t.id,title:e(S,t.label),action:`pick-date`})))}</div>
    </section>
  `)}function V(t,i){let a=n.find(e=>e.id===i);return M(`
    <section class="screen">
      ${P(`date-back`)}
      <h1>${e(S,g.timeTitle)}</h1>
      <p class="choice-meta">${a?e(S,a.label):``} · ${t.name}</p>
      <div class="stack">${F(r.map(e=>({id:e,title:e,action:`pick-time`})))}</div>
    </section>
  `)}function H(t,n,r){let i=`
    <div class="meta-list">
      ${r?`<div><span class="meta-label">${e(S,g.date)}</span> ${e(S,r.date)}</div>`:``}
      ${r?`<div><span class="meta-label">${e(S,g.time)}</span> ${r.time}</div>`:``}
      <div><span class="meta-label">${e(S,g.place)}</span> ${t.name}</div>
    </div>`;return M(`
    <section class="screen">
      ${P(r?`time-back`:`tasks-back`)}
      <h1>${e(S,n.label)}</h1>
      ${r?`<p class="call-lead">${N(g.slotConfirm,t.name)}</p>`:``}
      ${i}
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="start">${e(S,r?g.startBook:g.startHelp)}</button>
        <button class="btn btn-stop" type="button" data-action="home">${e(S,g.stopCancel)}</button>
      </div>
    </section>
  `)}function U(t,n,r){if(n.id===`hours`){let r=(n.result??[]).map(t=>`<li>${e(S,t)}</li>`).join(``);return M(`
      <section class="screen">
        ${P(`tasks-back`)}
        <h1>${e(S,n.label)}</h1>
        <p class="choice-meta">${t.name}</p>
        ${r?`<ul class="result-list">${r}</ul>`:``}
      </section>
    `)}let i=(n.result??[]).map(t=>`<li>${e(S,t)}</li>`).join(``),a=r?`<div class="meta-list">
        <div><span class="meta-label">${e(S,g.date)}</span> ${e(S,r.date)}</div>
        <div><span class="meta-label">${e(S,g.time)}</span> ${r.time}</div>
        <div><span class="meta-label">${e(S,g.place)}</span> ${t.name}</div>
      </div>`:``;return M(`
    <section class="screen screen-done">
      <div class="success-mark" aria-hidden="true">✓</div>
      <h1>${N(r?g.bookedTitle:g.doneTitle,t.name)}</h1>
      ${a}
      ${i?`<ul class="result-list">${i}</ul>`:``}
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="${r?`appointments`:`home`}">
          ${e(S,r?g.viewAppointments:g.gateBack)}
        </button>
      </div>
    </section>
  `)}function W(e){return e.phone?`<p class="meta-label">${N(g.sensitivePhone,e.name)}</p>
       <a class="phone-number" href="tel:${e.phone.replaceAll(` `,``)}">${e.phone}</a>`:``}function G(t,n){return M(`
    <section class="screen">
      ${P(`tasks-back`)}
      <h1>${e(S,n.label)}</h1>
      <p class="check-note">${N(g.sensitiveLead,t.name)}</p>
      ${W(t)}
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="home">${e(S,g.gateBack)}</button>
      </div>
    </section>
  `)}function K(t){return M(`
    <section class="screen">
      <h1>${N(g.callTitle,t.name)}</h1>
      <p class="call-lead">${e(S,g.cannotDo)}</p>
      ${W(t)}
      <div class="actions">
        ${P(`tasks-back`)}
      </div>
    </section>
  `)}function q(){return M(`
    <section class="screen">
      <h1>${e(S,g.gateTitle)}</h1>
      <p class="permission-note">${e(S,g.gateLead)}</p>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="home">${e(S,g.gateBack)}</button>
        <button class="btn btn-quiet" type="button" data-action="digid">${e(S,g.gateYes)}</button>
      </div>
    </section>
  `)}function J(){return M(`
    <section class="screen screen-done">
      ${P(`gate`)}
      <div class="success-mark" aria-hidden="true">✓</div>
      <h1>${e(S,g.digidTitle)}</h1>
      <p class="permission-note">${e(S,g.digidLead)}</p>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="setup">${e(S,g.digidNext)}</button>
      </div>
    </section>
  `)}function Y(){let t=A().map(({place:t})=>`
      <div class="linked-row">
        <div>
          <span class="choice-title">${t.name}</span>
          <span class="choice-meta">${Z(t)}</span>
        </div>
        <button class="back" type="button" data-action="remove" data-id="${t.id}">${e(S,g.remove)}</button>
      </div>`).join(``);return M(`
    <section class="screen">
      ${P(`home`)}
      <h1>${e(S,g.setupTitle)}</h1>
      <p class="permission-note">${e(S,g.setupPermission)}</p>
      <p class="call-lead">${e(S,g.setupLead)}</p>
      <div class="stack">${t}</div>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="kind">${e(S,g.addPlace)}</button>
        <button class="btn btn-secondary" type="button" data-action="finish-setup">${e(S,g.finishSetup)}</button>
      </div>
    </section>
  `)}function X(){return M(`
    <section class="screen">
      ${P(`setup`)}
      <h1>${e(S,g.kindTitle)}</h1>
      <div class="stack">${F(d.map(t=>({id:t.id,title:e(S,t.label),action:`pick-kind`})))}</div>
    </section>
  `)}function Z(e){return`${e.address}, ${e.city}`}function ee(t,n=``){let r=h(t,n,C.map(e=>e.catalogId)),i=r.length===0?`<p class="call-lead">${e(S,g.noPlaceMatch)}</p>`:`<div class="stack">${F(r.map(e=>({id:e.id,title:e.name,meta:Z(e),action:`pick-place`})))}</div>`;return M(`
    <section class="screen">
      ${P(`kind`)}
      <h1>${e(S,g.whichTitle)}</h1>
      <label class="field">
        <span class="meta-label">${e(S,g.searchPlace)}</span>
        <input
          id="place-search"
          class="big-input"
          type="search"
          autocomplete="off"
          value="${te(n)}"
          placeholder="${e(S,g.searchPlace)}"
        />
      </label>
      ${i}
    </section>
  `)}function te(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`"`,`&quot;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function ne(t){return M(`
    <section class="screen">
      ${P(`pick-back`)}
      <h1>${t.name}</h1>
      <p class="call-lead">${Z(t)}</p>
      <p class="call-lead">${e(S,g.numberTitle)}</p>
      <p class="phone-number">${Q(t.id)}</p>
      <div class="actions">
        <button class="btn btn-primary" type="button" data-action="save-place">${e(S,g.numberSkip)}</button>
      </div>
    </section>
  `)}function Q(e){return p.find(t=>t.catalogId===e)?.patientNumber??`20448`}function $(){switch(document.documentElement.lang=S,document.title=e(S,g.pageTitle),w.name){case`home`:E.innerHTML=I();break;case`appointments`:E.innerHTML=L();break;case`appointment`:E.innerHTML=R(w.appointment);break;case`tasks`:E.innerHTML=z(w.place);break;case`date`:E.innerHTML=B(w.place);break;case`time`:E.innerHTML=V(w.place,w.dateId);break;case`confirm`:E.innerHTML=H(w.place,w.task,w.booking);break;case`done`:E.innerHTML=U(w.place,w.task,w.booking);break;case`caretaker`:E.innerHTML=K(w.place);break;case`sensitive`:E.innerHTML=G(w.place,w.task);break;case`gate`:E.innerHTML=q();break;case`digid`:E.innerHTML=J();break;case`setup`:E.innerHTML=Y();break;case`kind`:E.innerHTML=X();break;case`pick`:E.innerHTML=ee(w.kind,w.query??``);break;case`number`:E.innerHTML=ne(w.place)}re()}function re(){let e=E.querySelector(`#place-search`);if(e&&w.name===`pick`){let t=w.kind;e.focus();let n=T??e.value.length;e.setSelectionRange(n,n),T=null,e.addEventListener(`input`,()=>{T=e.selectionStart,w={name:`pick`,kind:t,query:e.value},$()})}E.querySelectorAll(`[data-action]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.action,r=e.dataset.id;if(t===`lang-nl`)return O(`nl`);if(t===`lang-en`)return O(`en`);if(t===`home`)return localStorage.setItem(y,`1`),k({name:`home`});if(t===`gate`)return k({name:`gate`});if(t===`digid`)return k({name:`digid`});if(t===`appointments`)return k({name:`appointments`});if(t===`setup`)return k({name:`setup`});if(t===`finish-setup`)return localStorage.setItem(y,`1`),k({name:`home`});if(t===`kind`)return k({name:`kind`});if(t===`appointment`&&r){let e=a.find(e=>e.id===r);e&&k({name:`appointment`,appointment:e});return}if(t===`open-place`&&r){let e=A().find(e=>e.place.id===r);e&&k({name:`tasks`,place:e.place,link:e.link});return}if(t===`open-task`&&r&&w.name===`tasks`){let e=w.place.tasks.find(e=>e.id===r);return e?e.outcome===`caretaker`?k({name:`caretaker`,place:w.place,task:e}):e.outcome===`sensitive`?k({name:`sensitive`,place:w.place,task:e}):e.outcome===`book`?k({name:`date`,place:w.place,link:w.link,task:e}):e.id===`hours`?k({name:`done`,place:w.place,task:e}):k({name:`confirm`,place:w.place,link:w.link,task:e}):void 0}if(t===`tasks-back`&&(w.name===`tasks`||w.name===`date`||w.name===`time`||w.name===`confirm`||w.name===`caretaker`||w.name===`sensitive`||w.name===`done`)){let e=w.place.id,t=A().find(t=>t.place.id===e);return t?k({name:`tasks`,place:t.place,link:t.link}):void 0}if(t===`pick-date`&&r&&w.name===`date`)return k({name:`time`,place:w.place,link:w.link,task:w.task,dateId:r});if(t===`date-back`&&w.name===`time`)return k({name:`date`,place:w.place,link:w.link,task:w.task});if(t===`pick-time`&&r&&w.name===`time`){let e=w.dateId,t=n.find(t=>t.id===e);return t?k({name:`confirm`,place:w.place,link:w.link,task:w.task,booking:{dateId:w.dateId,date:t.label,time:r}}):void 0}if(t===`time-back`&&w.name===`confirm`&&w.booking)return k({name:`time`,place:w.place,link:w.link,task:w.task,dateId:w.booking.dateId});if(t===`start`&&w.name===`confirm`)return w.booking&&a.unshift({id:`booked-${Date.now()}`,title:w.task.label,place:{nl:w.place.name,en:w.place.name},date:w.booking.date,time:w.booking.time,reminder:{nl:`De dag ervoor om 18:00 krijgt u een herinnering`,en:`The day before at 18:00 you get a reminder`}}),k({name:`done`,place:w.place,task:w.task,booking:w.booking});if(t===`remove`&&r)return C=C.filter(e=>e.catalogId!==r),D(),k({name:`setup`});if(t===`pick-kind`&&r)return k({name:`pick`,kind:r});if(t===`pick-place`&&r&&w.name===`pick`){let e=m(r);e&&k({name:`number`,place:e});return}if(t===`pick-back`&&w.name===`number`)return k({name:`pick`,kind:w.place.kind,query:``});if(t===`save-place`&&w.name===`number`){let e=w.place.id;return C.some(t=>t.catalogId===e)||(C=[...C,{catalogId:e,patientNumber:Q(e)}],D()),k({name:`setup`})}})})}$();