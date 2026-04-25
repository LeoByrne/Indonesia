(() => {
  const DATA = typeof stsExerciseData !== "undefined" ? stsExerciseData : null;
  const app = document.getElementById("app");
  if (!DATA || !app) return;

  const STORAGE_KEY = "sts-detection-os-v3";
  const VIEW_IDS = ["dashboard", "workspace"];
  const CLASSIFICATION_OPTIONS = Array.isArray(DATA.classificationOptions) && DATA.classificationOptions.length
    ? DATA.classificationOptions
    : [
      "Likely legitimate STS",
      "False positive / not really STS",
      "Unclear / needs more scrutiny",
      "Likely illegitimate / concerning"
    ];
  const ASSESSMENT_NOTE_MAX_LENGTH = 120;

  const MAP_TILE_URL = "https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
  const MAP_TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO';
  const MAP_PANES = Object.freeze({
    zones: "zonesPane",
    trackShadow: "trackShadowPane",
    tracks: "tracksPane",
    events: "eventsPane",
    annotations: "annotationsPane",
    encounter: "encounterPane"
  });

  const LOW_VALUE_ANNOTATION_PATTERNS = [
    /traffic lane/i,
    /transit lane/i,
    /waiting area/i,
    /open-water corridor/i,
    /outer limits/i,
    /loading area/i,
    /operating area/i
  ];
  const PARTICIPANT_NOTE_FILTERS = [
    /\bkeep\b/i,
    /\bteaching point\b/i,
    /\banswer-giving\b/i,
    /\bstay thin\b/i,
    /\bthin and let\b/i,
    /\bidentity-laundering anchor\b/i,
    /\buse formernames\b/i,
    /\bvisible via formernames\b/i,
    /\bforegrounded\b/i
  ];
  const DEFAULT_GROUPS = [
    {
      id: "G1",
      label: "Group 1",
      title: "Baseline and escalation",
      blurb: "Start with a clear legitimate benchmark, one crowded false-positive, and two progressively tougher oil cases."
    },
    {
      id: "G2",
      label: "Group 2",
      title: "False positives and ambiguity",
      blurb: "Work through coal logistics, anchorage clutter, and the harder middle ground where the file is uncomfortable but incomplete."
    },
    {
      id: "G3",
      label: "Group 3",
      title: "Service water vs sanctions risk",
      blurb: "Compare benign service contacts against the stronger corridor and DPRK-linked escalation cases."
    }
  ];

  const GROUPS = buildGroups();

  let activeMap = null;
  let mediaLightboxNode = null;
  let state = loadState();

  app.addEventListener("click", handleClick);
  app.addEventListener("change", handleChange);
  app.addEventListener("error", handleMediaError, true);
  window.addEventListener("keydown", handleKeydown);
  render();

  function handleKeydown(event) {
    if (event.key === "Escape" && mediaLightboxNode) {
      event.preventDefault();
      closeMediaLightbox();
      return;
    }

    if (event.shiftKey && event.key.toLowerCase() === "f" && !isTypingTarget(event.target)) {
      event.preventDefault();
      state.facilitatorMode = !state.facilitatorMode;
      saveAndRender();
      return;
    }

    if (event.key === "Enter" && event.target instanceof HTMLInputElement && event.target.matches(".assessment-input")) {
      event.preventDefault();
      event.target.blur();
    }
  }

  function handleMediaError(event) {
    const target = event.target;
    if (!(target instanceof HTMLImageElement) || !target.matches(".case-media__image, .fact-card__image")) {
      return;
    }

    const container = target.closest(".case-media, .fact-card--document");
    if (container) container.remove();
  }

  function handleClick(event) {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;

    const action = trigger.dataset.action;
    const caseId = trigger.dataset.caseId || state.selectedCaseId;

    if (action === "go-view") {
      const view = safeString(trigger.dataset.view);
      if (!VIEW_IDS.includes(view)) return;
      if (view === "workspace" && !getSelectedCase()) return;
      state.view = view;
      saveAndRender();
      return;
    }

    if (action === "select-group") {
      const groupId = safeString(trigger.dataset.groupId);
      if (getGroup(groupId)) {
        state.pendingGroupId = groupId;
        saveAndRender();
      }
      return;
    }

    if (action === "confirm-group") {
      if (state.pendingGroupId && getGroup(state.pendingGroupId)) {
        state.selectedGroupId = state.pendingGroupId;
        state.pendingGroupId = null;
        state.introDismissed = true;
        state.view = "dashboard";
        syncSelectedCaseToGroup();
        saveAndRender();
      }
      return;
    }

    if (action === "change-group") {
      state.pendingGroupId = state.selectedGroupId;
      state.introDismissed = false;
      saveAndRender();
      return;
    }

    if (action === "open-case") {
      if (getCaseInGroup(caseId, state.selectedGroupId)) {
        state.selectedCaseId = caseId;
        state.view = "workspace";
        saveAndRender();
      }
      return;
    }

    if (action === "back-dashboard") {
      state.view = "dashboard";
      saveAndRender();
      return;
    }

    if (action === "go-prev-case" || action === "go-next-case") {
      const offset = action === "go-prev-case" ? -1 : 1;
      const nextCase = getSiblingCase(state.selectedCaseId, offset);
      if (nextCase) {
        state.selectedCaseId = nextCase.id;
        state.view = "workspace";
        saveAndRender();
      }
      return;
    }


    if (action === "open-media") {
      const caseItem = getCaseInGroup(caseId, state.selectedGroupId) || getCase(caseId);
      const image = caseItem && caseItem.image && safeString(caseItem.image.src) ? caseItem.image : null;
      if (image) openMediaLightbox(image);
      return;
    }

    if (action === "open-document") {
      const caseItem = getCaseInGroup(caseId, state.selectedGroupId) || getCase(caseId);
      const doc = caseItem && caseItem.billOfLading && typeof caseItem.billOfLading === "object" ? caseItem.billOfLading : null;
      if (doc) {
        openMediaLightbox({
          src: safeString(doc.fullSrc) || safeString(doc.previewSrc),
          alt: safeString(doc.alt),
          caption: safeString(doc.caption)
        });
      }
      return;
    }

    if (action === "close-lightbox") {
      closeMediaLightbox();
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;

    const field = safeString(target.dataset.assessmentField);
    const caseId = safeString(target.dataset.caseId);
    if (!field || !caseId || !getCase(caseId)) return;

    updateAssessment(caseId, field, target.value);
    saveAndRender();
  }



  function render() {
    destroyMap();
    syncSelectedCaseToGroup();

    const selectedGroup = getSelectedGroup();
    const selectedCase = getSelectedCase();
    const showIntro = !state.introDismissed || !state.selectedGroupId;

    document.title = selectedGroup ? `${DATA.title} - ${selectedGroup.label}` : DATA.title;

    app.innerHTML = `
      ${showIntro ? renderIntroOverlay() : ""}
      <div class="shell">
        ${renderShellbar(selectedGroup, selectedCase)}
        <div class="shell__main">
          <header class="content-header">
            <div class="content-header__copy">
              <p class="section-kicker">Exercise 2</p>
              <h2>${state.view === "workspace" && selectedCase ? escapeHtml(selectedCase.title) : "Case Queue"}</h2>
              <p>${state.view === "workspace" && selectedCase
                ? "Review the AIS encounter map, encounter facts, cargo document, and vessel evidence before recording your participant assessment."
                : "Open each assigned encounter and record your assessment without exposing hidden facilitator conclusions."}</p>
            </div>
            <div class="content-header__actions">
              ${state.facilitatorMode ? `<span class="mode-pill">Facilitator mode</span>` : ""}
            </div>
          </header>
          <main class="main-view">
            ${state.view === "workspace" && selectedCase ? renderWorkspace(selectedCase) : renderDashboard(selectedGroup)}
          </main>
        </div>
      </div>
    `;

    if (state.view === "workspace" && selectedCase) {
      mountEncounterMap(selectedCase);
    }
  }

  function renderShellbar(selectedGroup, selectedCase) {
    return `
      <aside class="shell__sidebar analyst-sidebar">
        <div class="analyst-sidebar__brand">
          <span class="analyst-sidebar__mark" aria-hidden="true">&#9875;</span>
          <div>
            <h1>Registry Review OS</h1>
            <p>Maritime analyst training</p>
          </div>
        </div>
        <div class="analyst-sidebar__nav">
          <span class="sidebar-section-label">Exercise 1</span>
          <a class="sidebar-nav-link" href="../">Registry Inbox</a>
          <a class="sidebar-nav-link" href="../">Vessel Review</a>
        </div>
        <div class="analyst-sidebar__exercise-nav">
          <span class="sidebar-section-label">Exercises</span>
          <a class="sidebar-nav-link" href="../">Exercise 1</a>
          <a class="sidebar-nav-link is-active" href="./" aria-current="page">Exercise 2</a>
        </div>
        <div class="analyst-sidebar__exercise-nav">
          <span class="sidebar-section-label">Current view</span>
          <button class="sidebar-nav-button ${state.view === "dashboard" ? "is-active" : ""}" type="button" data-action="go-view" data-view="dashboard">Case Queue</button>
          <button class="sidebar-nav-button ${state.view === "workspace" ? "is-active" : ""}" type="button" data-action="go-view" data-view="workspace" ${selectedCase ? "" : "disabled"}>Analyst Workspace</button>
        </div>
        <div class="analyst-sidebar__footer">
          ${renderSidebarStatusCard(selectedGroup, selectedCase)}
        </div>
      </aside>
    `;
  }

  function renderSidebarStatusCard(selectedGroup, selectedCase) {
    if (!selectedGroup) {
      return `
        <div class="sidebar-status-card">
          <span class="group-badge__eyebrow">Group status</span>
          <strong>Select a participant group</strong>
          <p>Choose Group 1, Group 2, or Group 3 to open the assigned case queue.</p>
        </div>
      `;
    }

    const caseCount = getSelectedGroupCases().length;
    const assessedCount = countAssessedCases(getSelectedGroupCases());
    return `
      <div class="sidebar-status-card">
        <span class="group-badge__eyebrow">Current group</span>
        <strong>${escapeHtml(selectedGroup.label)}</strong>
        <p>${escapeHtml(selectedGroup.title || "Assigned encounter set")}</p>
        <p>${assessedCount} of ${caseCount} case${caseCount === 1 ? "" : "s"} assessed${selectedCase ? ` / Active case: ${escapeHtml(selectedCase.id)}` : ""}</p>
        <button class="sidebar-status-card__action" type="button" data-action="change-group">Change group</button>
      </div>
    `;
  }

  function renderGroupBadge(selectedGroup) {
    return `
      <span class="group-badge">
        <span class="group-badge__eyebrow">Group</span>
        <strong>${escapeHtml(selectedGroup.label)}</strong>
        <button class="group-badge__change" type="button" data-action="change-group">Change Group</button>
      </span>
    `;
  }

  function renderExerciseSwitcher(activeExercise) {
    const items = [
      activeExercise === "exercise1"
        ? `<span class="exercise-switcher__link is-active" aria-current="page">Exercise 1</span>`
        : `<a class="exercise-switcher__link" href="../">Exercise 1</a>`,
      activeExercise === "exercise2"
        ? `<span class="exercise-switcher__link is-active" aria-current="page">Exercise 2</span>`
        : `<a class="exercise-switcher__link" href="./">Exercise 2</a>`
    ];

    return `
      <div class="exercise-switcher" aria-label="Exercise switcher">
        ${items.join("")}
      </div>
    `;
  }

  function renderIntroOverlay() {
    const pendingId = state.pendingGroupId || state.selectedGroupId || "";

    return `
      <div class="intro-overlay" role="dialog" aria-modal="true" aria-labelledby="briefing-title">
        <div class="intro-overlay__panel">
          <div class="intro-overlay__aside">
            <div>
              <span class="analyst-sidebar__mark" aria-hidden="true">&#9875;</span>
            </div>
            <div>
              <p class="section-kicker">Registry Review OS</p>
              <h2 id="briefing-title">Exercise 2 - identify the most likely contact</h2>
              <p>Work through the assigned encounters one at a time and make a defensible participant call from the map, facts, bill of lading, and vessel evidence.</p>
            </div>
          </div>
          <div class="intro-overlay__main">
            <div class="intro-overlay__header">
              <p class="section-kicker">Exercise 2</p>
              <h3>STS Identification Exercise</h3>
              <p>Open each assigned case, review the encounter evidence, and record your participant assessment without revealing facilitator-only conclusions.</p>
            </div>
            <div class="intro-steps">
              <article class="intro-step">
                <span class="intro-step__number">1</span>
                <div>
                  <strong>Open each assigned case</strong>
                  <p>Work through your assigned encounters one at a time.</p>
                </div>
              </article>
              <article class="intro-step">
                <span class="intro-step__number">2</span>
                <div>
                  <strong>Review the evidence</strong>
                  <p>Use the AIS map, timing, ship types, bill of lading and vessel cards.</p>
                </div>
              </article>
              <article class="intro-step">
                <span class="intro-step__number">3</span>
                <div>
                  <strong>Make your call</strong>
                  <p>Decide what the contact most likely represents and be ready to explain why.</p>
                </div>
              </article>
            </div>
            <div class="group-picker">
              <p class="group-picker__label">Select your group to begin</p>
              <div class="group-picker__options">
                ${GROUPS.map((group) => `
                  <button
                    class="group-option${pendingId === group.id ? " is-selected" : ""}"
                    type="button"
                    data-action="select-group"
                    data-group-id="${escapeHtml(group.id)}"
                    aria-pressed="${pendingId === group.id ? "true" : "false"}"
                  >${escapeHtml(group.label)}</button>
                `).join("")}
              </div>
            </div>
            <div class="intro-overlay__actions">
              <button
                class="solid-button"
                type="button"
                data-action="confirm-group"
                ${pendingId ? "" : "disabled"}
              >Start Exercise</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderDashboard(selectedGroup) {
    if (!selectedGroup) {
      return `<section class="panel dashboard-empty"><h2>Select a group to begin.</h2></section>`;
    }

    const groupCases = getSelectedGroupCases();
    const assessedCount = countAssessedCases(groupCases);

    return `
      <section class="panel dashboard-panel">
        <div class="panel__header">
          <div>
            <p class="section-kicker">Exercise 2 - Case Queue</p>
            <h2>Case Queue</h2>
            <p class="subtle-line">Open each assigned encounter and record your assessment.</p>
          </div>
        </div>
        <div class="dashboard-stats">
          ${renderStatCard("Assigned cases", String(groupCases.length))}
          ${renderStatCard("Assessed", String(assessedCount))}
          ${renderStatCard("Current group", selectedGroup.label)}
        </div>
        <div class="case-queue">
          ${groupCases.map((caseItem) => renderCaseCard(caseItem)).join("")}
        </div>
      </section>
    `;
  }

  function renderStatCard(label, value) {
    return `
      <article class="stat-card">
        <span class="stat-card__label">${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </article>
    `;
  }

  function renderCaseFact(label, value) {
    return `
      <div class="case-fact">
        <span class="stat-card__label">${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `;
  }

  function renderCaseCard(caseItem) {
    const assessment = getAssessment(caseItem.id);
    const timing = sanitizeEvidenceValue(caseItem && caseItem.aisEvidence && caseItem.aisEvidence.timing);
    const contactWindow = sanitizeEvidenceValue(caseItem && caseItem.aisEvidence && caseItem.aisEvidence.contactWindow);
    const shipTypes = buildParticipantFacts(caseItem)
      .find((fact) => fact.label === "Ship types");
    const documentTitle = getDocumentTitle(caseItem);
    const isAssessed = hasAssessment(caseItem.id);

    return `
      <article class="case-card">
        <div class="case-card__primary">
          <div class="case-card__title">
            <span class="case-id">${escapeHtml(caseItem.id)}</span>
            <h3>${escapeHtml(caseItem.title)}</h3>
          </div>
          <span class="case-tag">${escapeHtml(sanitizeEvidenceValue(caseItem.area) || "Assigned area")}</span>
        </div>
        <div class="case-card__facts">
          ${renderCaseFact("Window", contactWindow || "Not set")}
          ${renderCaseFact("Timing", timing || "Not set")}
          ${renderCaseFact("Ship types", shipTypes ? shipTypes.value : "Not set")}
          ${renderCaseFact("Document", documentTitle)}
        </div>
        <div class="case-card__secondary">
          <p class="case-card__vessels">${escapeHtml(getCaseVesselPair(caseItem))}</p>
          <div class="case-card__status">
            ${isAssessed
              ? renderClassificationToken(assessment.classification || "Assessment saved", assessment.classification ? undefined : "pending")
              : `<span class="case-progress">Pending assessment</span>`}
          </div>
          <button class="solid-button" type="button" data-action="open-case" data-case-id="${escapeHtml(caseItem.id)}">Open Case</button>
        </div>
      </article>
    `;
  }

  function renderWorkspace(caseItem) {
    const groupCases = getSelectedGroupCases();
    const currentIndex = groupCases.findIndex((item) => item.id === caseItem.id);
    const previousCase = currentIndex > 0 ? groupCases[currentIndex - 1] : null;
    const nextCase = currentIndex >= 0 && currentIndex < groupCases.length - 1 ? groupCases[currentIndex + 1] : null;
    const assessment = getAssessment(caseItem.id);


    return `
      <section class="workspace-topbar panel">
        <div class="workspace-topbar__top">
          <button class="ghost-button" type="button" data-action="back-dashboard">Return to ${escapeHtml(getGroupLabel(state.selectedGroupId))}</button>
          <div class="workspace-pager">
            <button class="ghost-button" type="button" data-action="go-prev-case" data-case-id="${escapeHtml(caseItem.id)}" ${previousCase ? "" : "disabled"}>Previous case</button>
            <span class="workspace-pager__count">${currentIndex + 1} of ${groupCases.length}</span>
            <button class="ghost-button" type="button" data-action="go-next-case" data-case-id="${escapeHtml(caseItem.id)}" ${nextCase ? "" : "disabled"}>Next case</button>
          </div>
        </div>
        <div class="workspace-topbar__copy">
          <p class="section-kicker">${escapeHtml(getGroupLabel(state.selectedGroupId))}</p>
          <h3>${escapeHtml(caseItem.id)}: ${escapeHtml(caseItem.title)}</h3>
          <p class="workspace-topbar__meta">${escapeHtml(caseItem.area)}</p>
          <p class="workspace-topbar__meta">${escapeHtml(getCaseVesselPair(caseItem))}</p>
        </div>
      </section>
      <div class="workspace-grid">
        <div class="workspace-grid__main">
          ${renderMapPanel(caseItem)}
          ${renderCaseMedia(caseItem)}
        </div>
        <aside class="workspace-grid__side">
          ${renderFactsPanel(caseItem)}
          ${renderDocumentFactCard(caseItem)}
          ${renderAssessmentPanel(caseItem, assessment)}
        </aside>
        ${renderLookupPanel(caseItem)}
        ${state.facilitatorMode ? renderFacilitatorPanel(caseItem) : ""}
      </div>
    `;
  }

  function renderCaseMedia(caseItem) {
    const image = caseItem && caseItem.image && typeof caseItem.image === "object" && safeString(caseItem.image.src)
      ? caseItem.image
      : null;
    const summary = sanitizeEvidenceValue(caseItem && caseItem.participantSummary);
    if (!image && !summary) return "";
    const captionParts = image
      ? [sanitizeEvidenceValue(image.caption), sanitizeEvidenceValue(image.credit)].filter(Boolean)
      : [];

    return `
      <section class="panel case-brief-panel">
        <div class="panel__header panel__header--tight">
          <div>
            <p class="section-kicker">Case brief</p>
            <h3>Participant summary</h3>
          </div>
        </div>
        <div class="case-brief-panel__body">
          ${summary ? `<p class="subtle-line">${escapeHtml(summary)}</p>` : ""}
          ${image ? `
            <figure class="case-media">
              <button class="case-media__button" type="button" data-action="open-media" data-case-id="${escapeHtml(caseItem.id)}" aria-label="Enlarge case image">
                <img class="case-media__image" src="${escapeHtml(image.src)}" alt="${escapeHtml(safeString(image.alt) || `${caseItem.title} image`)}" loading="lazy">
              </button>
              ${captionParts.length ? `<figcaption class="case-media__caption">${captionParts.map((item) => escapeHtml(item)).join(" / ")}</figcaption>` : ""}
            </figure>
          ` : ""}
        </div>
      </section>
    `;
  }

  function renderMapPanel(caseItem) {
    const displayMap = buildDisplayMapData(caseItem);
    const legendKeys = renderMapKey(displayMap);

    return `
      <section class="panel map-panel">
        <div class="panel__header panel__header--tight map-panel__header">
          <div>
            <p class="section-kicker">AIS map</p>
            <h2>${escapeHtml(caseItem.area)}</h2>
            <p class="subtle-line">${escapeHtml(getCaseVesselPair(caseItem))}</p>
          </div>
        </div>
        <div class="ais-map-shell">
          <div id="encounter-map" class="encounter-map" aria-label="Encounter map for ${escapeHtml(caseItem.title)}"></div>
          <div class="encounter-map__status" data-map-status hidden></div>
          <div class="encounter-map__legend">
            ${displayMap.vessels.map((vesselTrack) => renderLegendItem(vesselTrack)).join("")}
            ${legendKeys}
          </div>
        </div>
      </section>
    `;
  }

  function renderLegendItem(vesselTrack) {
    return `
      <span class="map-legend__item map-legend__item--vessel-${escapeHtml(vesselTrack.tone)}">
        <span class="map-legend__swatch"></span>
        <span class="map-legend__copy">
          <strong>${escapeHtml(vesselTrack.label)}</strong>
        </span>
      </span>
    `;
  }

  function renderMapKey(displayMap) {
    const segmentTypes = new Set();
    (displayMap.vessels || []).forEach((vesselTrack) => {
      (vesselTrack.trackSegments || []).forEach((segment) => segmentTypes.add(segment.type));
    });

    const items = [];
    if (segmentTypes.has("gap")) items.push(renderMapKeyItem("AIS gap", "gap"));
    if (segmentTypes.has("spoof")) items.push(renderMapKeyItem("False position jump", "spoof"));
    return items.join("");
  }

  function renderMapKeyItem(label, swatchType) {
    return `
      <span class="map-legend__item map-legend__item--key map-legend__item--key-${escapeHtml(swatchType)}">
        <span class="map-legend__swatch map-legend__swatch--${escapeHtml(swatchType)}"></span>
        <span class="map-legend__copy"><strong>${escapeHtml(label)}</strong></span>
      </span>
    `;
  }

  function renderMapReadout(vesselTrack) {
    return `
      <article class="track-readout track-readout--${escapeHtml(vesselTrack.tone)}">
        <div class="track-readout__swatch"></div>
        <div class="track-readout__copy">
          <span class="section-kicker">${escapeHtml(vesselTrack.role || "Vessel movement")}</span>
          <strong>${escapeHtml(vesselTrack.label)}</strong>
          <p>${escapeHtml(summarizeTrackPattern(vesselTrack))}</p>
        </div>
      </article>
    `;
  }

  function renderFactsPanel(caseItem) {
    const visibleFacts = buildParticipantFacts(caseItem);

    return `
      <section class="panel facts-panel">
        <div class="panel__header panel__header--tight">
          <div>
            <p class="section-kicker">Facts</p>
            <h2>Encounter facts</h2>
          </div>
        </div>
        <div class="facts-grid">
          ${visibleFacts.map((fact) => `
            <article class="fact-card">
              <span class="fact-card__label">${escapeHtml(getFactCardLabel(fact.label))}</span>
              <strong>${escapeHtml(fact.value)}</strong>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function buildParticipantFacts(caseItem) {
    const aisEvidence = caseItem && caseItem.aisEvidence && typeof caseItem.aisEvidence === "object" ? caseItem.aisEvidence : {};
    const vesselTypes = [
      sanitizeEvidenceValue(caseItem && caseItem.vessels && caseItem.vessels.a && caseItem.vessels.a.type),
      sanitizeEvidenceValue(caseItem && caseItem.vessels && caseItem.vessels.b && caseItem.vessels.b.type)
    ].filter(Boolean);
    const timingValue = sanitizeEvidenceValue(aisEvidence.timing);
    const windowValue = sanitizeEvidenceValue(aisEvidence.contactWindow);

    return [
      { label: "Timing", value: timingValue },
      { label: "Window", value: windowValue },
      { label: "Ship types", value: vesselTypes.join(" / ") },
      { label: "Document", value: getDocumentTitle(caseItem) }
    ].filter((fact) => fact.value);
  }

  function renderDocumentFactCard(caseItem) {
    const documentItem = caseItem && caseItem.billOfLading && typeof caseItem.billOfLading === "object"
      ? caseItem.billOfLading
      : null;
    const previewSrc = documentItem ? safeString(documentItem.previewSrc) : "";

    if (!documentItem || !previewSrc) return "";

    return `
      <section class="panel document-panel">
        <div class="panel__header panel__header--tight">
          <div>
            <p class="section-kicker">Document</p>
            <h2>Bill of lading</h2>
          </div>
        </div>
        <button
          class="fact-card__button"
          type="button"
          data-action="open-document"
          data-case-id="${escapeHtml(caseItem.id)}"
          aria-label="Open Bill of Lading for ${escapeHtml(caseItem.id)}"
        >
          <div class="fact-card__thumb">
            <img
              class="fact-card__image"
              src="${escapeHtml(previewSrc)}"
              alt="${escapeHtml(safeString(documentItem.alt) || `Bill of Lading for ${caseItem.id}`)}"
              loading="lazy"
            >
          </div>
          <span class="fact-card__document-title">${escapeHtml(getDocumentTitle(caseItem))}</span>
          <span class="fact-card__document-link">Open cargo document</span>
        </button>
      </section>
    `;
  }

  function renderAssessmentPanel(caseItem, assessment) {
    return `
      <section class="panel assessment-panel">
        <div class="panel__header panel__header--tight">
          <div>
            <p class="section-kicker">Participant assessment</p>
            <h2>Classification & note</h2>
          </div>
        </div>
        <div class="assessment-controls">
          <label class="assessment-field">
            <span class="field-block__label">Classification</span>
            <select class="assessment-select" data-case-id="${escapeHtml(caseItem.id)}" data-assessment-field="classification">
              ${renderAssessmentOptions(CLASSIFICATION_OPTIONS, assessment.classification, "Select classification")}
            </select>
          </label>
          <label class="assessment-field assessment-field--note">
            <span class="field-block__label">Short note</span>
            <input
              class="assessment-input"
              type="text"
              maxlength="${ASSESSMENT_NOTE_MAX_LENGTH}"
              placeholder="One line only"
              value="${escapeHtml(assessment.note)}"
              data-case-id="${escapeHtml(caseItem.id)}"
              data-assessment-field="note"
            >
          </label>
        </div>
      </section>
    `;
  }

  function renderAssessmentOptions(options, selectedValue, placeholder) {
    return [
      `<option value="">${escapeHtml(placeholder)}</option>`,
      ...options.map((option) => `<option value="${escapeHtml(option)}" ${selectedValue === option ? "selected" : ""}>${escapeHtml(option)}</option>`)
    ].join("");
  }

  function getDocumentTitle(caseItem) {
    const title = safeString(caseItem && caseItem.billOfLading && caseItem.billOfLading.title).trim();
    return title || "Bill of Lading";
  }

  function renderLookupPanel(caseItem) {
    return `
      <section class="panel lookup-panel">
        <div class="panel__header lookup-panel__header">
          <div>
            <p class="section-kicker">Vessel evidence</p>
            <h2>Identity, companies, and history</h2>
            <p class="subtle-line">Compare both vessel files before deciding what the contact most likely represents.</p>
          </div>
        </div>
        <div class="lookup-grid">
          ${renderLookupCard(caseItem.vessels.a)}
          ${renderLookupCard(caseItem.vessels.b)}
        </div>
      </section>
    `;
  }

  function renderLookupCard(vessel) {
    const identityRows = getIdentityRows(vessel);
    const companyRows = getCompanyRows(vessel);
    const historyRows = getHistoryRows(vessel);
    const sections = [
      `
        <section class="lookup-block">
          <h4>Identity</h4>
          <div class="lookup-pill-grid">
            ${identityRows.map((row) => renderLookupPill(row.label, row.value)).join("")}
          </div>
        </section>
      `
    ];

    if (companyRows.length) {
      sections.push(`
        <section class="lookup-block">
          <h4>Companies / services</h4>
          <div class="lookup-note-list">
            ${companyRows.map((row) => renderLookupRow(row)).join("")}
          </div>
        </section>
      `);
    }

    if (historyRows.length) {
      sections.push(`
        <section class="lookup-block">
          <h4>History</h4>
          <div class="lookup-note-list">
            ${historyRows.map((row) => renderLookupRow(row)).join("")}
          </div>
        </section>
      `);
    }

    return `
      <article class="lookup-card">
        <div class="lookup-card__header">
          <span class="section-kicker">${escapeHtml(sanitizeEvidenceValue(vessel.role) || "Vessel profile")}</span>
          <h3>${escapeHtml(sanitizeEvidenceValue(vessel.name) || "Unidentified vessel")}</h3>
          <p class="subtle-line">${escapeHtml([sanitizeEvidenceValue(vessel.type), sanitizeEvidenceValue(vessel.flag)].filter(Boolean).join(" / "))}</p>
        </div>
        ${sections.join("")}
      </article>
    `;
  }

  function renderLookupPill(label, value) {
    return `
      <div class="lookup-pill">
        <span class="field-block__label">${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `;
  }

  function renderLookupRow(row) {
    return `
      <div class="lookup-note">
        <span class="field-block__label">${escapeHtml(row.label)}</span>
        <p>${escapeHtml(row.value)}</p>
      </div>
    `;
  }

  function getIdentityRows(vessel) {
    const rows = [
      { label: "IMO", value: sanitizeEvidenceValue(vessel && vessel.imo) },
      { label: "Type", value: sanitizeEvidenceValue(vessel && vessel.type) },
      { label: "Flag", value: sanitizeEvidenceValue(vessel && vessel.flag) }
    ];
    const built = sanitizeEvidenceValue(vessel && vessel.built);
    if (built) rows.push({ label: "Built", value: built });
    return rows.filter((row) => row.value);
  }

  function getFactCardLabel(label) {
    const value = safeString(label).trim().toLowerCase();
    if (value === "area") return "Area";
    if (value === "timing") return "Timing";
    if (value === "window") return "Window";
    if (value === "document") return "Document";
    if (value === "cargo") return "Cargo";
    if (value === "ships") return "Ships";
    if (value === "ship types") return "Ship types";
    if (value === "setting") return "Where";
    if (value === "contact") return "Interaction";
    if (value === "vessel profile") return "Vessels";
    return safeString(label).trim() || "Detail";
  }

  function getCompanyRows(vessel) {
    const rows = [
      { label: "Owner", value: sanitizeEvidenceValue(vessel && vessel.owner) },
      { label: "Manager", value: sanitizeEvidenceValue(vessel && vessel.manager) },
      { label: "Operator", value: sanitizeEvidenceValue(vessel && vessel.operator) },
      { label: "Insurer / P&I", value: sanitizeEvidenceValue(vessel && vessel.insurer) }
    ];
    return rows.filter((row) => row.value);
  }

  function getHistoryRows(vessel) {
    const rows = [];
    const formerNames = safeString(vessel && vessel.formerNames).trim();
    if (formerNames && !/^no recent alias noted$/i.test(formerNames)) rows.push({ label: "Former names", value: formerNames });
    const history = sanitizeParticipantHistory(vessel && vessel.history);
    if (history) rows.push({ label: "History", value: history });
    return rows;
  }

  function sanitizeParticipantHistory(value) {
    const text = sanitizeEvidenceValue(value);
    if (!text) return "";
    const parts = text.split(/(?<=[.;?!])\s+/);
    const filtered = parts.filter((part) => part && !PARTICIPANT_NOTE_FILTERS.some((pattern) => pattern.test(part)));
    return filtered.join(" ").trim();
  }

  function renderFacilitatorPanel(caseItem) {
    const facilitator = caseItem.facilitator || {};
    return `
      <section class="panel facilitator-panel">
        <div class="panel__header panel__header--tight">
          <div>
            <p class="section-kicker">Facilitator mode</p>
            <h2>Hidden answer material</h2>
          </div>
          <span class="shortcut-pill">Shift + F</span>
        </div>
        <div class="facilitator-stack">
          <div class="facilitator-block">
            <span class="field-block__label">Intended classification</span>
            ${renderClassificationToken(facilitator.intendedClassification || "Not set")}
          </div>
          <div class="facilitator-block">
            <span class="field-block__label">Rationale</span>
            <p>${escapeHtml(facilitator.rationale || "Not set")}</p>
          </div>
          <div class="facilitator-block">
            <span class="field-block__label">Hidden facts</span>
            <ul class="anchor-list">${renderListItems(facilitator.hiddenFacts)}</ul>
          </div>
          <div class="facilitator-block">
            <span class="field-block__label">Research anchor</span>
            <p>${escapeHtml(facilitator.researchAnchor || "Not set")}</p>
          </div>
          <div class="facilitator-block">
            <span class="field-block__label">Citations</span>
            <ul class="anchor-list">${renderCitationItems(facilitator.citations)}</ul>
          </div>
        </div>
      </section>
    `;
  }

  function renderClassificationToken(label, extraTone) {
    const tone = extraTone || getClassificationTone(label);
    return `<span class="classification-token classification-token--${escapeHtml(tone)}">${escapeHtml(label)}</span>`;
  }



  function buildGroups() {
    const sourceGroups = Array.isArray(DATA.groups) && DATA.groups.length ? DATA.groups : DEFAULT_GROUPS;
    return sourceGroups.map((group, index) => ({
      id: safeString(group && group.id) || `G${index + 1}`,
      label: safeString(group && group.label) || `Group ${index + 1}`,
      title: safeString(group && group.title) || "Assigned encounter set",
      blurb: safeString(group && group.blurb)
    }));
  }

  function buildDisplayMapData(caseItem) {
    const mapData = caseItem && caseItem.map && typeof caseItem.map === "object" ? caseItem.map : {};
    const encounterPoint = normalizeEncounterPoint(mapData.encounter);
    const vessels = (mapData.vessels || []).map((vesselTrack) => {
      const vesselInfo = vesselTrack && vesselTrack.key && caseItem && caseItem.vessels ? caseItem.vessels[vesselTrack.key] : null;
      const trackSegments = buildEncounterTrackSegments(vesselTrack && vesselTrack.trackSegments);
      return {
        key: safeString(vesselTrack && vesselTrack.key),
        tone: safeString(vesselTrack && vesselTrack.tone) === "b" ? "b" : "a",
        role: sanitizeEvidenceValue(vesselInfo && vesselInfo.role),
        label: sanitizeEvidenceValue(vesselInfo && vesselInfo.name) || sanitizeEvidenceValue(vesselTrack && vesselTrack.label) || "Vessel",
        mapTag: buildMapTag(sanitizeEvidenceValue(vesselInfo && vesselInfo.name) || sanitizeEvidenceValue(vesselTrack && vesselTrack.label) || "Vessel"),
        currentPosition: getLastTrackPoint(trackSegments) || encounterPoint,
        trackSegments
      };
    });

    return {
      viewport: mapData.viewport || {},
      encounter: mapData.encounter || null,
      zones: Array.isArray(mapData.zones) ? mapData.zones : [],
      events: Array.isArray(mapData.events) ? mapData.events : [],
      annotations: Array.isArray(mapData.annotations) ? mapData.annotations : [],
      vessels
    };
  }

  function buildEncounterTrackSegments(trackSegments) {
    return finalizeTrackSegments((trackSegments || []).map(normalizeTrackSegment).filter((segment) => segment.coordinates.length >= 2));
  }

  function normalizeTrackSegment(segment) {
    const rawType = safeString(segment && segment.type).toLowerCase();
    const nextType = rawType === "normal"
      ? "transit"
      : rawType === "anchor"
        ? "loiter"
        : rawType;
    return {
      type: ["transit", "loiter", "gap", "spoof"].includes(nextType) ? nextType : "transit",
      coordinates: normalizeCoordinates(segment && segment.coordinates)
    };
  }



  function finalizeTrackSegments(segments) {
    return segments
      .map((segment) => ({ type: segment.type, coordinates: dedupeCoordinates(segment.coordinates) }))
      .filter((segment) => segment.coordinates.length >= 2);
  }



  function normalizeCoordinates(points) {
    return (points || []).map((point) => normalizePoint(point)).filter(Boolean);
  }

  function normalizePoint(point) {
    if (!Array.isArray(point) || point.length < 2) return null;
    const lat = Number(point[0]);
    const lng = Number(point[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return [lat, lng];
  }

  function normalizeEncounterPoint(encounter) {
    if (!encounter || typeof encounter.lat !== "number" || typeof encounter.lng !== "number") return null;
    return [encounter.lat, encounter.lng];
  }

  function dedupeCoordinates(coordinates) {
    const next = [];
    coordinates.forEach((point) => {
      if (!next.length || !pointsMatch(next[next.length - 1], point)) next.push(point);
    });
    return next;
  }

  function pointsMatch(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    return Math.abs(a[0] - b[0]) < 0.0001 && Math.abs(a[1] - b[1]) < 0.0001;
  }

  function getLastTrackPoint(trackSegments) {
    const lastSegment = trackSegments[trackSegments.length - 1];
    if (!lastSegment || !lastSegment.coordinates.length) return null;
    return lastSegment.coordinates[lastSegment.coordinates.length - 1];
  }

  function buildMapTag(label) {
    const compact = safeString(label).trim();
    if (!compact) return "Vessel";
    if (compact.length <= 18) return compact;
    return `${compact.slice(0, 17)}...`;
  }

  function summarizeTrackPattern(vesselTrack) {
    const segmentTypes = (vesselTrack.trackSegments || []).map((segment) => segment.type);
    const summary = [];
    if (segmentTypes.includes("gap")) summary.push("AIS interruption sits near the contact window.");
    if (segmentTypes.includes("spoof")) summary.push("A short false-position jump appears after the local track breaks.");
    if (segmentTypes.includes("loiter")) summary.push("Track compresses into close-quarters manoeuvring around the encounter.");
    if (!summary.length) summary.push("Continuous local approach, contact, and separation are visible.");
    else summary.push("Local approach and departure remain visible on both sides of the contact.");
    return summary.join(" ");
  }

  function getBoardLine(caseItem) {
    const summaryLine = safeString(caseItem.participantSummary).replace(/\s+/g, " ").trim();
    if (summaryLine) return summaryLine;
    const firstFact = Array.isArray(caseItem.eventFacts) ? caseItem.eventFacts[0] : null;
    if (!firstFact || !safeString(firstFact.value).trim()) return "";
    return `${firstFact.label}: ${firstFact.value}`;
  }

  function getCaseVesselPair(caseItem) {
    const vesselNames = ["a", "b"]
      .map((key) => sanitizeEvidenceValue(caseItem && caseItem.vessels && caseItem.vessels[key] && caseItem.vessels[key].name))
      .filter(Boolean);
    return vesselNames.length ? vesselNames.join(" / ") : "Vessel details";
  }

  function openMediaLightbox(image) {
    closeMediaLightbox();
    const captionParts = [sanitizeEvidenceValue(image.caption), sanitizeEvidenceValue(image.credit)].filter(Boolean);

    const lightbox = document.createElement("div");
    lightbox.className = "media-lightbox";
    lightbox.dataset.action = "close-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image viewer");
    lightbox.innerHTML = `
      <div class="media-lightbox__panel">
        <button class="media-lightbox__close" type="button" data-action="close-lightbox" aria-label="Close image viewer">&times;</button>
        <img class="media-lightbox__image" src="${escapeHtml(image.src)}" alt="${escapeHtml(safeString(image.alt) || "Enlarged case image")}">
        ${captionParts.length ? `<p class="media-lightbox__caption">${captionParts.map((item) => escapeHtml(item)).join(" / ")}</p>` : ""}
      </div>
    `;

    app.appendChild(lightbox);
    mediaLightboxNode = lightbox;
  }

  function closeMediaLightbox() {
    if (!mediaLightboxNode) return;
    mediaLightboxNode.remove();
    mediaLightboxNode = null;
  }

  function mountEncounterMap(caseItem) {
    const mapNode = document.getElementById("encounter-map");
    if (!mapNode) return;
    if (!window.L) {
      revealMapStatus("Map unavailable.");
      mapNode.hidden = true;
      return;
    }

    const mapData = buildDisplayMapData(caseItem);
    hideMapStatus();
    mapNode.hidden = false;

    try {
      const fallbackViewport = getViewportFallback(mapData);
      activeMap = window.L.map(mapNode, { zoomControl: true, attributionControl: true, zoomSnap: 0.25 }).setView(fallbackViewport.center, fallbackViewport.zoom);
      ensureMapPanes(activeMap);

      const tileLayer = window.L.tileLayer(MAP_TILE_URL, { maxZoom: 19, attribution: MAP_TILE_ATTRIBUTION });
      let tileLoadSucceeded = false;
      let tileErrorTimer = null;

      tileLayer.on("tileload", () => {
        tileLoadSucceeded = true;
        if (tileErrorTimer) {
          window.clearTimeout(tileErrorTimer);
          tileErrorTimer = null;
        }
        hideMapStatus();
      });

      tileLayer.on("tileerror", () => {
        if (tileLoadSucceeded || tileErrorTimer) return;
        tileErrorTimer = window.setTimeout(() => {
          const hasLoadedTiles = Array.from(mapNode.querySelectorAll(".leaflet-tile")).some((image) => image.complete && image.naturalWidth > 0);
          if (!hasLoadedTiles) revealMapStatus("Map tiles unavailable.");
        }, 1500);
      });

      tileLayer.addTo(activeMap);
      (mapData.zones || []).forEach(mountZone);
      (mapData.vessels || []).forEach(mountTrack);

      (mapData.annotations || []).forEach(mountAnnotation);

      window.setTimeout(() => {
        if (activeMap) {
          activeMap.invalidateSize();
          applyEncounterViewport(mapData, mapNode);
        }
      }, 0);
    } catch (error) {
      destroyMap();
      revealMapStatus("Map unavailable.");
      mapNode.hidden = true;
    }
  }

  function mountZone(zone) {
    if (!activeMap || !zone) return;
    if (zone.shape === "circle" && Array.isArray(zone.center)) {
      window.L.circle(zone.center, { ...getZoneStyle(zone.kind), radius: zone.radius || 12000 }).addTo(activeMap).bindPopup(renderPopup(zone.label || "Area marker", formatZoneKind(zone.kind)));
      return;
    }
    if (zone.shape === "polygon" && Array.isArray(zone.coordinates)) {
      window.L.polygon(zone.coordinates, getZoneStyle(zone.kind)).addTo(activeMap).bindPopup(renderPopup(zone.label || "Area marker", formatZoneKind(zone.kind)));
    }
  }

  function mountTrack(vesselTrack) {
    if (!activeMap || !vesselTrack || !Array.isArray(vesselTrack.trackSegments)) return;

    vesselTrack.trackSegments.forEach((segment) => {
      const coordinates = (segment.coordinates || []).map(([lat, lng]) => [lat, lng]);
      if (coordinates.length < 2) return;
      mountTrackSegment(vesselTrack, segment, coordinates);
    });

    if (Array.isArray(vesselTrack.currentPosition)) {
      mountCurrentPosition(vesselTrack);
    }
  }

  function mountTrackSegment(vesselTrack, segment, coordinates) {
    if (!activeMap || !window.L) return;

    if (segment.type === "gap") {
      mountGapSegment(vesselTrack, coordinates);
      return;
    }

    const focusStyle = getTrackFocusStyle(segment.type);
    if (focusStyle) window.L.polyline(coordinates, focusStyle).addTo(activeMap);
    window.L.polyline(coordinates, getTrackShadowStyle(segment.type)).addTo(activeMap);
    window.L.polyline(coordinates, getTrackStyle(vesselTrack.tone, segment.type)).addTo(activeMap);
    mountTrackPings(vesselTrack, segment, coordinates);
  }

  function mountGapSegment(vesselTrack, coordinates) {
    if (!activeMap || !window.L || coordinates.length < 2) return;
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];
    const midpoint = getPolylinePointAtFraction(coordinates, 0.5);

    window.L.polyline(coordinates, getGapConnectorStyle()).addTo(activeMap);
    window.L.circleMarker(start, getGapEndpointStyle(vesselTrack.tone)).addTo(activeMap);
    window.L.circleMarker(end, getGapEndpointStyle(vesselTrack.tone)).addTo(activeMap);

    if (midpoint) {
      window.L.marker(midpoint.point, {
        pane: MAP_PANES.events,
        interactive: false,
        keyboard: false,
        icon: window.L.divIcon({
          className: "map-gap-pill-icon",
          html: `<span class="map-gap-pill">AIS gap</span>`,
          iconSize: [56, 22],
          iconAnchor: [28, 11]
        })
      }).addTo(activeMap);
    }
  }

  function mountTrackPings(vesselTrack, segment, coordinates) {
    if (!activeMap || !window.L || coordinates.length < 2) return;
    const sampleCount = getTrackSampleCount(segment.type, coordinates);
    for (let index = 0; index < sampleCount; index += 1) {
      const placement = getPolylinePointAtFraction(coordinates, (index + 1) / (sampleCount + 1));
      if (!placement) continue;
      window.L.circleMarker(placement.point, getTrackPingStyle(vesselTrack.tone, segment.type, index, sampleCount)).addTo(activeMap);
    }
  }

  function mountCurrentPosition(vesselTrack) {
    if (!activeMap || !window.L || !Array.isArray(vesselTrack.currentPosition)) return;
    window.L.circleMarker(vesselTrack.currentPosition, getCurrentPositionHaloStyle(vesselTrack.tone)).addTo(activeMap);
    window.L.circleMarker(vesselTrack.currentPosition, getVesselMarkerStyle(vesselTrack.tone))
      .addTo(activeMap)
      .bindPopup(renderPopup(vesselTrack.label || "Vessel", vesselTrack.role || "Encounter track"));
  }

  function getTrackSampleCount(type, coordinates) {
    const pathLength = getCoordinatePathLength(coordinates);
    if (type === "loiter") return Math.max(6, Math.min(10, Math.round(pathLength / 0.012)));
    if (type === "spoof") return 3;
    return Math.max(3, Math.min(7, Math.round(pathLength / 0.024)));
  }



  function mountAnnotation(annotation) {
    if (!activeMap || !annotation || typeof annotation.lat !== "number" || typeof annotation.lng !== "number") return;
    const label = sanitizeAnnotationLabel(annotation.label);
    if (!label) return;
    window.L.circleMarker([annotation.lat, annotation.lng], getAnnotationStyle(annotation.tone))
      .addTo(activeMap)
      .bindTooltip(label, { permanent: false, sticky: true, direction: "top", className: "map-label" })
      .bindPopup(renderPopup(label, "Map note"));
  }

  function sanitizeAnnotationLabel(rawLabel) {
    const label = safeString(rawLabel).trim();
    if (!label) return "";
    if (LOW_VALUE_ANNOTATION_PATTERNS.some((pattern) => pattern.test(label))) return "";
    return label;
  }

  function getViewportFallback(mapData) {
    const center = mapData && mapData.encounter && typeof mapData.encounter.lat === "number" && typeof mapData.encounter.lng === "number"
      ? [mapData.encounter.lat, mapData.encounter.lng]
      : mapData && mapData.viewport && Array.isArray(mapData.viewport.center)
        ? mapData.viewport.center
        : [0, 0];
    const zoom = mapData && mapData.viewport && typeof mapData.viewport.zoom === "number" ? mapData.viewport.zoom : 10.5;
    return { center, zoom };
  }

  function ensureMapPanes(mapInstance) {
    if (!mapInstance || !window.L) return;
    const paneOrder = [
      [MAP_PANES.zones, 380],
      [MAP_PANES.trackShadow, 395],
      [MAP_PANES.tracks, 405],
      [MAP_PANES.events, 425],
      [MAP_PANES.annotations, 435],
      [MAP_PANES.encounter, 445]
    ];

    paneOrder.forEach(([name, zIndex]) => {
      if (!mapInstance.getPane(name)) mapInstance.createPane(name);
      const pane = mapInstance.getPane(name);
      if (pane) pane.style.zIndex = `${zIndex}`;
    });
  }

  function applyEncounterViewport(mapData, mapNode) {
    if (!activeMap || !window.L) return;
    const focusPoints = collectEncounterFocusPoints(mapData);
    if (focusPoints.length >= 2) {
      const bounds = window.L.latLngBounds(focusPoints);
      if (bounds.isValid()) {
        const xPadding = Math.max(36, Math.round((mapNode && mapNode.clientWidth ? mapNode.clientWidth : 420) * 0.1));
        const yPadding = Math.max(32, Math.round((mapNode && mapNode.clientHeight ? mapNode.clientHeight : 520) * 0.12));
        activeMap.fitBounds(bounds, { padding: [yPadding, xPadding], maxZoom: 12.8, animate: false });
        return;
      }
    }
    const fallbackViewport = getViewportFallback(mapData);
    activeMap.setView(fallbackViewport.center, fallbackViewport.zoom, { animate: false });
  }

  function collectEncounterFocusPoints(mapData) {
    const points = [];
    if (!mapData || typeof mapData !== "object") return points;
    addCoordinate(points, mapData.encounter && mapData.encounter.lat, mapData.encounter && mapData.encounter.lng);
    (mapData.events || []).forEach((eventItem) => addCoordinate(points, eventItem && eventItem.lat, eventItem && eventItem.lng));
    addTrackSegmentCoordinates(points, mapData.vessels);
    return points;
  }

  function addTrackSegmentCoordinates(target, vessels) {
    (vessels || []).forEach((vesselTrack) => {
      if (!vesselTrack) return;
      addCoordinatePair(target, vesselTrack.currentPosition);
      (vesselTrack.trackSegments || []).forEach((segment) => {
        (segment && segment.coordinates || []).forEach((point) => addCoordinatePair(target, point));
      });
    });
  }

  function addCoordinatePair(target, point) {
    if (!Array.isArray(point) || point.length < 2) return;
    addCoordinate(target, point[0], point[1]);
  }

  function addCoordinate(target, lat, lng) {
    if (typeof lat !== "number" || typeof lng !== "number") return;
    target.push([lat, lng]);
  }

  function revealMapStatus(message) {
    const statusNode = document.querySelector("[data-map-status]");
    if (!statusNode) return;
    statusNode.hidden = false;
    statusNode.textContent = message;
  }

  function hideMapStatus() {
    const statusNode = document.querySelector("[data-map-status]");
    if (!statusNode) return;
    statusNode.hidden = true;
    statusNode.textContent = "";
  }

  function renderPopup(title, subtitle) {
    return `<div class="map-popup"><strong>${escapeHtml(title)}</strong><div>${escapeHtml(subtitle)}</div></div>`;
  }

  function getTrackShadowStyle(type) {
    const styles = {
      transit: { weight: 5.4, opacity: 0.24 },
      loiter: { weight: 6.8, opacity: 0.26 },
      spoof: { weight: 6.2, opacity: 0.22, dashArray: "8 7" }
    };
    return {
      pane: MAP_PANES.trackShadow,
      color: "#07141f",
      lineCap: "round",
      lineJoin: "round",
      interactive: false,
      ...(styles[type] || styles.transit)
    };
  }

  function getTrackStyle(tone, type) {
    const color = tone === "b" ? "#ffb45d" : "#44e6d1";
    const styles = {
      transit: { color, weight: 2.9, opacity: 0.84 },
      loiter: { color, weight: 3.6, opacity: 0.94 },
      spoof: { color: "#ff7d98", weight: 3.4, opacity: 0.96, dashArray: "8 7" }
    };
    return { pane: MAP_PANES.tracks, lineCap: "round", lineJoin: "round", ...(styles[type] || styles.transit) };
  }

  function getTrackFocusStyle(type) {
    if (type === "loiter") {
      return { pane: MAP_PANES.events, color: "#f8fbfd", weight: 5.8, opacity: 0.12, lineCap: "round", lineJoin: "round", interactive: false };
    }
    if (type === "spoof") {
      return { pane: MAP_PANES.events, color: "#ffd6df", weight: 5.4, opacity: 0.14, lineCap: "round", lineJoin: "round", interactive: false };
    }
    return null;
  }

  function getVesselMarkerStyle(tone) {
    return { pane: MAP_PANES.tracks, radius: 5.8, fillColor: tone === "b" ? "#ffb45d" : "#44e6d1", fillOpacity: 1, color: "#07131d", weight: 2.2 };
  }

  function getCurrentPositionHaloStyle(tone) {
    return {
      pane: MAP_PANES.events,
      radius: 10.5,
      fillOpacity: 0,
      color: tone === "b" ? "#ffce91" : "#97f3e6",
      opacity: 0.55,
      weight: 1.8,
      interactive: false
    };
  }

  function getGapConnectorStyle() {
    return {
      pane: MAP_PANES.tracks,
      color: "#e4eef5",
      weight: 2.8,
      opacity: 0.92,
      dashArray: "8 10",
      lineCap: "round",
      lineJoin: "round",
      interactive: false
    };
  }

  function getGapEndpointStyle(tone) {
    const color = tone === "b" ? "#ffb45d" : "#44e6d1";
    return {
      pane: MAP_PANES.events,
      radius: 4.8,
      fillColor: "#07131d",
      fillOpacity: 1,
      color,
      opacity: 1,
      weight: 2.1,
      interactive: false
    };
  }

  function getTrackPingStyle(tone, type, index, total) {
    const color = type === "spoof" ? "#ff7d98" : tone === "b" ? "#ffb45d" : "#44e6d1";
    const progress = total > 1 ? index / (total - 1) : 1;
    return {
      pane: MAP_PANES.events,
      radius: 1.9 + (progress * 1.5) + (type === "loiter" ? 0.4 : 0),
      fillColor: color,
      fillOpacity: 0.24 + (progress * 0.46),
      color: "#07131d",
      opacity: 0.38 + (progress * 0.34),
      weight: 1.1,
      interactive: false
    };
  }

  function getPolylinePointAtFraction(coordinates, fraction) {
    if (!Array.isArray(coordinates) || coordinates.length < 2) return null;
    const clamped = Math.max(0, Math.min(1, fraction));
    let total = 0;
    const lengths = [];

    for (let index = 1; index < coordinates.length; index += 1) {
      const length = getCoordinateDistance(coordinates[index - 1], coordinates[index]);
      lengths.push(length);
      total += length;
    }

    if (!total) {
      return {
        point: coordinates[0],
        angle: getBearingDegrees(coordinates[0], coordinates[coordinates.length - 1])
      };
    }

    const target = total * clamped;
    let walked = 0;
    for (let index = 1; index < coordinates.length; index += 1) {
      const length = lengths[index - 1];
      if (!length) continue;
      if (walked + length >= target) {
        const start = coordinates[index - 1];
        const end = coordinates[index];
        const t = (target - walked) / length;
        return {
          point: [
            start[0] + ((end[0] - start[0]) * t),
            start[1] + ((end[1] - start[1]) * t)
          ],
          angle: getBearingDegrees(start, end)
        };
      }
      walked += length;
    }

    return {
      point: coordinates[coordinates.length - 1],
      angle: getBearingDegrees(coordinates[coordinates.length - 2], coordinates[coordinates.length - 1])
    };
  }

  function getCoordinatePathLength(coordinates) {
    let total = 0;
    for (let index = 1; index < (coordinates || []).length; index += 1) {
      total += getCoordinateDistance(coordinates[index - 1], coordinates[index]);
    }
    return total;
  }

  function getCoordinateDistance(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return 0;
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
  }

  function getBearingDegrees(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return 0;
    return Math.atan2(b[1] - a[1], b[0] - a[0]) * (180 / Math.PI);
  }

  function getZoneStyle(kind) {
    const styles = {
      service: { color: "#6ed6ff", weight: 1.4, opacity: 0.5, fillColor: "#6ed6ff", fillOpacity: 0.05 },
      anchorage: { color: "#98e886", weight: 1.4, opacity: 0.5, fillColor: "#98e886", fillOpacity: 0.05 },
      hotspot: { color: "#f2c56e", weight: 1.4, opacity: 0.52, fillColor: "#f2c56e", fillOpacity: 0.05 },
      offshore: { color: "#f3a9b8", weight: 1.4, opacity: 0.48, fillColor: "#f3a9b8", fillOpacity: 0.05 }
    };
    return { pane: MAP_PANES.zones, ...(styles[kind] || styles.offshore) };
  }



  function getAnnotationStyle(tone) {
    return { pane: MAP_PANES.annotations, radius: 3.8, fillColor: tone === "warning" ? "#ffc247" : "#d8e7f0", fillOpacity: 0.92, color: "#0c1f2d", opacity: 0.92, weight: 1.4 };
  }

  function formatZoneKind(kind) {
    if (kind === "service") return "Service zone";
    if (kind === "anchorage") return "Anchorage area";
    if (kind === "hotspot") return "Sensitive operating area";
    return "Offshore area";
  }



  function destroyMap() {
    if (activeMap) {
      activeMap.remove();
      activeMap = null;
    }
  }

  function createDefaultState() {
    return {
      view: "dashboard",
      selectedGroupId: null,
      pendingGroupId: null,
      selectedCaseId: DATA.cases[0] ? DATA.cases[0].id : "",
      facilitatorMode: false,
      introDismissed: false,
      assessments: buildDefaultAssessments()
    };
  }

  function buildDefaultAssessments() {
    return (DATA.cases || []).reduce((accumulator, caseItem) => {
      accumulator[caseItem.id] = createEmptyAssessment();
      return accumulator;
    }, {});
  }

  function createEmptyAssessment() {
    return {
      classification: "",
      note: ""
    };
  }



  function loadState() {
    const fallback = createDefaultState();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      if (parsed.view && VIEW_IDS.includes(parsed.view)) fallback.view = parsed.view;
      if (typeof parsed.selectedGroupId === "string" && getGroup(parsed.selectedGroupId)) fallback.selectedGroupId = parsed.selectedGroupId;
      if (typeof parsed.pendingGroupId === "string" && getGroup(parsed.pendingGroupId)) fallback.pendingGroupId = parsed.pendingGroupId;
      if (typeof parsed.selectedCaseId === "string" && getCase(parsed.selectedCaseId)) fallback.selectedCaseId = parsed.selectedCaseId;
      if (typeof parsed.facilitatorMode === "boolean") fallback.facilitatorMode = parsed.facilitatorMode;
      if (typeof parsed.introDismissed === "boolean") fallback.introDismissed = parsed.introDismissed;
      if (parsed.assessments && typeof parsed.assessments === "object") {
        (DATA.cases || []).forEach((caseItem) => {
          fallback.assessments[caseItem.id] = sanitizeAssessment(parsed.assessments[caseItem.id]);
        });
      }

    } catch (error) {
      return fallback;
    }
    return fallback;
  }



  function persistState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {}
  }

  function saveAndRender() {
    persistState();
    render();
  }

  function sanitizeAssessment(assessment) {
    const safeAssessment = assessment && typeof assessment === "object" ? assessment : createEmptyAssessment();
    return {
      classification: CLASSIFICATION_OPTIONS.includes(safeAssessment.classification) ? safeAssessment.classification : "",
      note: sanitizeAssessmentNote(safeAssessment.note)
    };
  }

  function sanitizeAssessmentNote(value) {
    return safeString(value)
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, ASSESSMENT_NOTE_MAX_LENGTH);
  }

  function updateAssessment(caseId, field, rawValue) {
    const current = getAssessment(caseId);
    const next = { ...current };

    if (field === "classification") {
      next.classification = CLASSIFICATION_OPTIONS.includes(rawValue) ? rawValue : "";
    } else if (field === "note") {
      next.note = sanitizeAssessmentNote(rawValue);
    } else {
      return;
    }

    state.assessments[caseId] = next;
  }



  function syncSelectedCaseToGroup() {
    if (!state.selectedGroupId) return;
    const groupCases = getSelectedGroupCases();
    if (!groupCases.length) return;
    if (!groupCases.some((caseItem) => caseItem.id === state.selectedCaseId)) {
      state.selectedCaseId = groupCases[0].id;
    }
  }



  function getCase(caseId) {
    return DATA.cases.find((caseItem) => caseItem.id === caseId);
  }

  function getCaseInGroup(caseId, groupId) {
    return getGroupCases(groupId).find((caseItem) => caseItem.id === caseId);
  }

  function getSelectedCase() {
    return getCaseInGroup(state.selectedCaseId, state.selectedGroupId) || getSelectedGroupCases()[0] || getCase(state.selectedCaseId) || DATA.cases[0];
  }

  function getSelectedGroupCases() {
    return getGroupCases(state.selectedGroupId);
  }

  function getGroupCases(groupId) {
    if (!groupId) return [];
    return DATA.cases.filter((caseItem) => safeString(caseItem.groupId || "") === safeString(groupId));
  }

  function getGroup(groupId) {
    return GROUPS.find((group) => group.id === groupId);
  }

  function getSelectedGroup() {
    return getGroup(state.selectedGroupId) || null;
  }

  function getGroupLabel(groupId) {
    const group = getGroup(groupId);
    return group ? group.label : "Group";
  }

  function getSiblingCase(caseId, offset) {
    const groupCases = getSelectedGroupCases();
    const index = groupCases.findIndex((caseItem) => caseItem.id === caseId);
    if (index < 0) return null;
    return groupCases[index + offset] || null;
  }

  function getAssessment(caseId) {
    return sanitizeAssessment(state.assessments && state.assessments[caseId]);
  }

  function hasAssessment(caseId) {
    const assessment = getAssessment(caseId);
    return Boolean(assessment.classification || assessment.note);
  }

  function countAssessedCases(caseItems) {
    return (caseItems || []).filter((caseItem) => hasAssessment(caseItem.id)).length;
  }

  function sanitizeEvidenceValue(value) {
    const text = safeString(value).replace(/\s+/g, " ").trim();
    if (!text) return "";
    if (/^(unknown|not set|n\/a|na)$/i.test(text)) return "";
    return text;
  }

  function getClassificationTone(label) {
    if (label === "Likely legitimate STS") return "legitimate";
    if (label === "False positive / not really STS") return "false-positive";
    if (label === "Unclear / needs more scrutiny") return "unclear";
    if (label === "Likely illegitimate / concerning") return "concerning";
    return "pending";
  }

  function renderListItems(items) {
    return Array.isArray(items) && items.length ? items.map((item) => `<li>${escapeHtml(item)}</li>`).join("") : "<li>Not set</li>";
  }

  function renderCitationItems(citations) {
    if (!Array.isArray(citations) || !citations.length) return "<li>No citations added</li>";
    return citations.map((citation) => {
      if (citation && typeof citation === "object") {
        const label = safeString(citation.label) || "Citation";
        const url = safeString(citation.url);
        const note = safeString(citation.note);
        const head = url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>` : escapeHtml(label);
        return `<li>${note ? `${head} - ${escapeHtml(note)}` : head}</li>`;
      }
      return `<li>${escapeHtml(citation)}</li>`;
    }).join("");
  }

  function isTypingTarget(target) {
    return target instanceof HTMLElement && target.matches("input, textarea, select, [contenteditable='true']");
  }

  function safeString(value) {
    return typeof value === "string" ? value : "";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
