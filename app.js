(() => {
  const DATA = typeof registryData !== "undefined" ? registryData : null;
  const app = document.getElementById("app");

  if (!DATA || !app) {
    return;
  }

  const STORAGE_KEY = "registry-review-os-v15";
  const VIEW_IDS = ["inbox", "review"];
  const GROUPS = Array.isArray(DATA.groups) && DATA.groups.length
    ? DATA.groups
    : [{ id: "G1", label: "Group 1", vessels: DATA.vessels.map((v) => v.id) }];

  const RISK_OPTIONS = Array.isArray(DATA.riskOptions) && DATA.riskOptions.length
    ? DATA.riskOptions
    : ["Green", "Amber", "Red"];
  const ACTION_OPTIONS = Array.isArray(DATA.actionOptions) && DATA.actionOptions.length
    ? DATA.actionOptions
    : ["Accept", "Hold", "Refer", "Refuse"];
  const MAP_TILE_URL = "https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
  const MAP_TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO';
  const NOTE_MAX_LENGTH = 84;

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

    if (event.key === "Enter" && event.target instanceof HTMLInputElement && event.target.matches(".decision-input")) {
      event.preventDefault();
      event.target.blur();
      return;
    }

    if (event.shiftKey && event.key.toLowerCase() === "f") {
      if (isTypingTarget(event.target)) {
        return;
      }

      event.preventDefault();
      state.facilitatorMode = !state.facilitatorMode;
      saveAndRender();
    }
  }

  function handleMediaError(event) {
    const target = event.target;
    if (!(target instanceof HTMLImageElement) || !target.matches(".vessel-media__image")) {
      return;
    }

    const fallbackQueue = safeString(target.dataset.fallbackSrc)
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

    if (fallbackQueue.length) {
      const [nextSrc, ...remaining] = fallbackQueue;
      target.dataset.fallbackSrc = remaining.join("|");
      target.src = nextSrc;
      return;
    }

    const media = target.closest(".vessel-media");
    if (media) {
      media.classList.add("is-fallback");
      const inspectButton = media.querySelector(".vessel-media__inspect");
      if (inspectButton) {
        inspectButton.remove();
      }
    }
    target.remove();
  }

  function handleClick(event) {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) {
      const media = event.target.closest(".vessel-media--inspectable");
      if (media && !event.target.closest(".media-lightbox")) {
        const source = resolveMediaSource(media);
        if (source) {
          openMediaLightbox(source.src, source.alt);
        }
      }
      return;
    }

    const action = trigger.dataset.action;
    const vesselId = trigger.dataset.vesselId || state.selectedVesselId;

    if (action === "open-media") {
      const media = trigger.closest(".vessel-media");
      const source = resolveMediaSource(media);
      if (source) {
        openMediaLightbox(source.src, source.alt);
      }
      return;
    }

    if (action === "close-lightbox") {
      closeMediaLightbox();
      return;
    }

    if (action === "go-view") {
      const view = trigger.dataset.view;
      if (VIEW_IDS.includes(view)) {
        state.view = view;
        saveAndRender();
      }
      return;
    }

    if (action === "open-review") {
      if (getVessel(vesselId)) {
        state.selectedVesselId = vesselId;
        state.view = "review";
        saveAndRender();
      }
      return;
    }

    if (action === "select-group") {
      state.pendingGroupId = trigger.dataset.groupId;
      saveAndRender();
      return;
    }

    if (action === "confirm-group") {
      if (state.pendingGroupId) {
        state.selectedGroupId = state.pendingGroupId;
        state.pendingGroupId = null;
        state.introDismissed = true;
        // Snap selected vessel to first in this group
        const groupVessels = getGroupVessels(state.selectedGroupId);
        if (groupVessels.length && !groupVessels.find((v) => v.id === state.selectedVesselId)) {
          state.selectedVesselId = groupVessels[0].id;
        }
        state.view = "inbox";
        saveAndRender();
      }
      return;
    }

    if (action === "change-group") {
      state.introDismissed = false;
      state.pendingGroupId = state.selectedGroupId;
      saveAndRender();
      return;
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
      return;
    }

    const field = target.dataset.decisionField;
    const vesselId = target.dataset.vesselId;
    if (!field || !vesselId || !getVessel(vesselId)) {
      return;
    }

    updateDecision(vesselId, field, target.value);
    saveAndRender();
  }

  function render() {
    destroyMap();

    const selectedVessel = getSelectedVessel();
    const selectedGroupLabel = getGroupLabel(state.selectedGroupId);

    document.title = DATA.title;

    app.innerHTML = `
      ${!state.introDismissed || !state.selectedGroupId ? renderIntroOverlay() : ""}
      <div class="shell">
        ${renderSidebar(selectedVessel)}
        <div class="shell__main">
          <header class="content-header">
            <div class="content-header__copy">
              <p class="section-kicker">Exercise 1</p>
              <h2>${state.view === "inbox" ? "Registry Inbox" : "Vessel Review"}</h2>
              <p>${state.view === "inbox"
                ? "Review your assigned vessel applications, compare the supporting evidence, and open each file for assessment."
                : `Assess ${escapeHtml(selectedVessel.name)} using the registry details, AIS movement, and your participant decision fields.`}</p>
            </div>
            <div class="content-header__actions">
              ${state.view === "review" && state.selectedGroupId ? renderGroupBadge(selectedGroupLabel) : ""}
              ${state.facilitatorMode ? `<span class="mode-pill">Facilitator mode</span>` : ""}
            </div>
          </header>
          <main class="main-view">
            ${state.view === "inbox" ? renderInbox() : renderReview(selectedVessel)}
          </main>
        </div>
      </div>
    `;

    if (state.view === "review") {
      mountAisMap(selectedVessel);
      window.setTimeout(() => {
        if (activeMap) {
          activeMap.invalidateSize();
        }
      }, 0);
    }
  }

  function renderSidebar(selectedVessel) {
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
          <span class="sidebar-section-label">Workspace</span>
          <button class="sidebar-nav-button ${state.view === "inbox" ? "is-active" : ""}" type="button" data-action="go-view" data-view="inbox">Registry Inbox</button>
          <button class="sidebar-nav-button ${state.view === "review" ? "is-active" : ""}" type="button" data-action="go-view" data-view="review" ${state.selectedGroupId ? "" : "disabled"}>Vessel Review</button>
        </div>
        <div class="analyst-sidebar__exercise-nav">
          <span class="sidebar-section-label">Exercises</span>
          <a class="sidebar-nav-link is-active" href="./" aria-current="page">Exercise 1</a>
          <a class="sidebar-nav-link" href="exercise2/">Exercise 2</a>
        </div>
        <div class="analyst-sidebar__footer">
          ${renderSidebarStatusCard(selectedVessel)}
        </div>
      </aside>
    `;
  }

  function renderSidebarStatusCard(selectedVessel) {
    if (!state.selectedGroupId) {
      return `
        <div class="sidebar-status-card">
          <span class="group-badge__eyebrow">Group status</span>
          <strong>Select a participant group</strong>
          <p>Choose Group 1, Group 2, or Group 3 to begin the workshop.</p>
        </div>
      `;
    }

    return `
      <div class="sidebar-status-card">
        <span class="group-badge__eyebrow">Current group</span>
        <strong>${escapeHtml(getGroupLabel(state.selectedGroupId))}</strong>
        <p>${state.view === "review" ? `Active file: ${escapeHtml(selectedVessel.name)}` : "Registry queue ready for review."}</p>
        <button class="sidebar-status-card__action" type="button" data-action="change-group">Change group</button>
      </div>
    `;
  }

  function renderExerciseSwitcher(activeExercise) {
    const items = [
      activeExercise === "exercise1"
        ? `<span class="exercise-switcher__link is-active" aria-current="page">Exercise 1</span>`
        : `<a class="exercise-switcher__link" href="./">Exercise 1</a>`,
      activeExercise === "exercise2"
        ? `<span class="exercise-switcher__link is-active" aria-current="page">Exercise 2</span>`
        : `<a class="exercise-switcher__link" href="exercise2/">Exercise 2</a>`
    ];

    return `
      <div class="exercise-switcher" aria-label="Exercise switcher">
        ${items.join("")}
      </div>
    `;
  }

  function renderInbox() {
    const groupVessels = getGroupVessels(state.selectedGroupId);
    const groupLabel = getGroupLabel(state.selectedGroupId);
    return `
      <section class="view-panel">
        <div class="view-panel__header">
          <div>
            <p class="section-kicker">Registry queue</p>
            <h3>Registry Inbox</h3>
            <p>${escapeHtml(DATA.subtitle || "Participant review queue.")}</p>
          </div>
          ${state.selectedGroupId ? renderGroupBadge(groupLabel) : ""}
        </div>
        <div class="registry-table">
          <div class="registry-table__head">
            <div class="registry-table__title">
              <span class="registry-table__count">${escapeHtml(String(groupVessels.length))} vessel application${groupVessels.length !== 1 ? "s" : ""}</span>
              <p>${escapeHtml(groupLabel)}</p>
            </div>
          </div>
          <div class="registry-table__labels" aria-hidden="true">
            <span>No.</span>
            <span>Image</span>
            <span>Vessel</span>
            <span>Trade / service</span>
            <span>Action</span>
          </div>
          <div class="inbox-list">
            ${groupVessels.map((vessel, index) => renderInboxCard(vessel, index)).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderInboxCard(vessel, index) {
    return `
      <article class="inbox-row">
        <div class="inbox-row__number">${escapeHtml(String(index + 1))}</div>
        <div class="inbox-row__media">
          ${renderVesselMedia(vessel, "thumbnail")}
        </div>
        <div class="inbox-row__body">
          <div class="inbox-row__title">
            <span class="vessel-id">${escapeHtml(formatVesselLabel(vessel.id))}</span>
            <h3>${escapeHtml(vessel.name)}</h3>
          </div>
          <p class="meta-line">
            ${escapeHtml(vessel.type)} <span aria-hidden="true">/</span>
            Built ${escapeHtml(vessel.built)} <span aria-hidden="true">/</span>
            IMO ${escapeHtml(vessel.imo)}
          </p>
        </div>
        <div class="inbox-row__trade">
          <p class="subtle-line">${escapeHtml(vessel.operatingArea)}</p>
        </div>
        <div class="inbox-row__actions">
          <button class="solid-button" type="button" data-action="open-review" data-vessel-id="${escapeHtml(vessel.id)}">Open Review</button>
        </div>
      </article>
    `;
  }



  function renderReview(vessel) {
    return `
      <section class="review-screen">
        ${renderSummaryStrip(vessel)}
        <div class="review-layout">
          <div class="review-layout__main">
            ${renderAisCard(vessel)}
            ${renderDetailsCard(vessel)}
          </div>
          <aside class="review-layout__side">
            ${renderDecisionCard(vessel)}
            ${state.facilitatorMode ? renderFacilitatorCard(vessel) : ""}
          </aside>
        </div>
      </section>
    `;
  }

  function renderSummaryStrip(vessel) {
    return `
      <section class="summary-strip">
        <div class="summary-strip__top">
          <button class="ghost-button ghost-button--quiet" type="button" data-action="go-view" data-view="inbox">Back to inbox</button>
          <span class="summary-chip">
            <span class="summary-chip__label">Review file</span>
            <strong>${escapeHtml(formatVesselLabel(vessel.id))}</strong>
          </span>
        </div>
        <div class="summary-strip__layout">
          <div class="summary-strip__media">
            ${renderVesselMedia(vessel, "summary")}
          </div>
          <div class="summary-strip__body">
            <div class="summary-strip__title">
              <span class="vessel-id">Vessel</span>
              <h3>${escapeHtml(vessel.name)}</h3>
            </div>
            <div class="summary-strip__meta">
              <span class="summary-chip"><span class="summary-chip__label">Type</span><strong>${escapeHtml(vessel.type)}</strong></span>
              <span class="summary-chip"><span class="summary-chip__label">Built</span><strong>${escapeHtml(vessel.built)}</strong></span>
              <span class="summary-chip"><span class="summary-chip__label">IMO</span><strong>${escapeHtml(vessel.imo)}</strong></span>
              <span class="summary-chip"><span class="summary-chip__label">Previous flag</span><strong>${escapeHtml(vessel.previousFlag)}</strong></span>
            </div>
            <p class="subtle-line">${escapeHtml(vessel.applicationNote)}</p>
          </div>
        </div>
      </section>
    `;
  }

  function renderAisCard(vessel) {
    const destination = getDestinationPort(vessel);

    return `
      <section class="console-card console-card--ais">
        <div class="console-card__header console-card__header--tight">
          <div>
            <p class="section-kicker">AIS Track</p>
            <h3>Regional movement</h3>
            <p class="console-subtle">${escapeHtml(vessel.aisMap.corridor)}</p>
          </div>
          <div class="ais-card__meta">
            <span>Destination</span>
            <strong>${escapeHtml(destination ? destination.label : "Unknown")}</strong>
          </div>
        </div>
        <div class="ais-map-shell" data-map-shell>
          <div id="ais-map" class="ais-map" aria-label="AIS map for ${escapeHtml(vessel.name)}"></div>
          <div class="ais-map__status" data-map-status hidden></div>
          <div class="ais-map__legend">
            ${renderLegendToken("normal", "Normal")}
            ${renderLegendToken("gap", "Gap")}
            ${renderLegendToken("loiter", "Loiter")}
            ${renderLegendToken("anchor", "Anchorage")}
          </div>
        </div>
      </section>
    `;
  }

  function renderDetailsCard(vessel) {
    const fields = [
      ["applicantOwner", "Applicant owner", vessel.applicantOwner],
      ["manager", "Manager", vessel.manager],
      ["operator", "Operator", vessel.operator],
      ["address", "Address", vessel.address],
      ["insurer", "Insurer", vessel.insurer],
      ["invoicePayee", "Invoice payee", vessel.invoicePayee],
      ["operatingArea", "Operating area", vessel.operatingArea],
      ["docsStatus", "Docs status", vessel.docsStatus]
    ];

    return `
      <section class="console-card">
        <div class="console-card__header console-card__header--tight">
          <div>
            <p class="section-kicker">Application Details</p>
            <h3>Registry data</h3>
          </div>
        </div>
        <div class="detail-list">
          ${fields.map(([, label, value]) => renderDetailRow(label, value)).join("")}
        </div>
      </section>
    `;
  }

  function renderDetailRow(label, value) {
    return `
      <div class="detail-row">
        <div>
          <span class="detail-row__label">${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      </div>
    `;
  }



  function renderDecisionCard(vessel) {
    return `
      <section class="console-card decision-card">
        <div class="console-card__header console-card__header--tight">
          <div>
            <p class="section-kicker">Your Assessment</p>
            <h3>Risk, action & note</h3>
          </div>
        </div>
        <p class="decision-card__helper">Record a concise participant assessment for group discussion.</p>
        ${renderDecisionFields(vessel)}
      </section>
    `;
  }

  function renderDecisionFields(vessel) {
    const decision = getDecision(vessel.id);

    return `
      <div class="decision-controls">
        <label class="decision-field">
          <span class="detail-row__label">Risk</span>
          <select class="decision-select" data-vessel-id="${escapeHtml(vessel.id)}" data-decision-field="risk">
            ${renderSelectOptions(RISK_OPTIONS, decision.risk, "Select")}
          </select>
        </label>
        <label class="decision-field">
          <span class="detail-row__label">Action</span>
          <select class="decision-select" data-vessel-id="${escapeHtml(vessel.id)}" data-decision-field="action">
            ${renderSelectOptions(ACTION_OPTIONS, decision.action, "Select")}
          </select>
        </label>
        <label class="decision-field decision-field--note">
          <span class="detail-row__label">Short note</span>
          <input
            class="decision-input"
            type="text"
            maxlength="${NOTE_MAX_LENGTH}"
            placeholder="One line only"
            value="${escapeHtml(decision.note)}"
            data-vessel-id="${escapeHtml(vessel.id)}"
            data-decision-field="note"
          >
        </label>
      </div>
    `;
  }

  function renderSelectOptions(options, selectedValue, placeholder) {
    return [
      `<option value="">${escapeHtml(placeholder)}</option>`,
      ...options.map((option) => `<option value="${escapeHtml(option)}" ${selectedValue === option ? "selected" : ""}>${escapeHtml(option)}</option>`)
    ].join("");
  }

  function renderIntroOverlay() {
    const pendingId = state.pendingGroupId || state.selectedGroupId || "";
    return `
      <div class="intro-overlay" role="dialog" aria-modal="true" aria-labelledby="intro-title">
        <div class="intro-overlay__panel">
          <div class="intro-overlay__aside">
            <div>
              <span class="analyst-sidebar__mark" aria-hidden="true">&#9875;</span>
            </div>
            <div>
              <p class="section-kicker">Registry Review OS</p>
              <h2 id="intro-title">Exercise 1 - Vessel flag-in applications</h2>
              <p>Review registry applications like an analyst queue: compare identity, ownership, routing, and visible evidence before making a registry decision.</p>
            </div>
          </div>
          <div class="intro-overlay__main">
            <div class="intro-overlay__header">
              <p class="section-kicker">Exercise 1</p>
              <h3>Registry Review OS</h3>
              <p>Use the assigned inbox to review each application, compare the available evidence, and capture a short participant decision.</p>
            </div>
            <div class="intro-steps">
              <article class="intro-step">
                <span class="intro-step__number">1</span>
                <div>
                  <strong>Review the application</strong>
                  <p>Check vessel identity, ownership, route history and supporting details.</p>
                </div>
              </article>
              <article class="intro-step">
                <span class="intro-step__number">2</span>
                <div>
                  <strong>Compare the evidence</strong>
                  <p>Use the map, application fields and visible vessel information.</p>
                </div>
              </article>
              <article class="intro-step">
                <span class="intro-step__number">3</span>
                <div>
                  <strong>Make a registry decision</strong>
                  <p>Select a risk level, action and short note for discussion.</p>
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

  function renderFacilitatorCard(vessel) {
    return `
      <section class="console-card facilitator-card">
        <div class="console-card__header console-card__header--tight">
          <div>
            <p class="section-kicker">Facilitator Mode</p>
            <h3>Intended answer</h3>
          </div>
          <span class="facilitator-shortcut">Shift + F</span>
        </div>
        <div class="facilitator-metrics">
          <div class="facilitator-metric">
            <span class="detail-row__label">Risk</span>
            ${renderDecisionToken("risk", vessel.facilitator.intendedRisk)}
          </div>
          <div class="facilitator-metric">
            <span class="detail-row__label">Action</span>
            ${renderDecisionToken("action", vessel.facilitator.intendedAction)}
          </div>
          <div class="facilitator-metric facilitator-metric--wide">
            <span class="detail-row__label">Finding</span>
            <strong>${escapeHtml(vessel.facilitator.intendedFinding)}</strong>
          </div>
        </div>
      </section>
    `;
  }

  function renderDecisionToken(kind, value) {
    const classes = [
      "decision-token",
      kind === "risk" ? `decision-token--${toKebabCase(value.split("/")[0].trim())}` : "decision-token--action"
    ].join(" ");

    return `<span class="${classes}">${escapeHtml(value)}</span>`;
  }

  function renderLegendToken(kind, label) {
    return `
      <span class="legend-token legend-token--${escapeHtml(kind)}">
        <span class="legend-token__swatch"></span>
        ${escapeHtml(label)}
      </span>
    `;
  }

  function renderVesselMedia(vessel, size) {
    const isInspectable = size === "summary" || size === "compact" || size === "thumbnail";
    const alt = `${vessel.name} vessel reference image`;
    const inspectLabel = `Enlarge image for ${vessel.name}`;
    const fullSrc = vessel.imageFullSrc || vessel.imageSrc;
    return `
      <div class="vessel-media vessel-media--${escapeHtml(size)}${isInspectable ? " vessel-media--inspectable" : ""}">
        <div class="vessel-media__fallback">
          <span>${escapeHtml(vessel.name)}</span>
        </div>
        ${isInspectable ? `
          <button
            class="vessel-media__inspect"
            type="button"
            data-action="open-media"
            aria-label="${escapeHtml(inspectLabel)}"
          >
            <span class="vessel-media__inspect-label">Inspect</span>
          </button>
        ` : ""}
        <img
          class="vessel-media__image"
          src="${escapeHtml(vessel.imageSrc)}"
          data-full-src="${escapeHtml(fullSrc)}"
          alt="${escapeHtml(alt)}"
          loading="${size === "summary" ? "eager" : "lazy"}"
          decoding="async"
        >
      </div>
    `;
  }

  function resolveMediaSource(mediaNode) {
    if (!(mediaNode instanceof HTMLElement)) {
      return null;
    }

    const image = mediaNode.querySelector(".vessel-media__image");
    if (!(image instanceof HTMLImageElement)) {
      return null;
    }

    const src = safeString(image.dataset.fullSrc || image.currentSrc || image.src).trim();
    if (!src) {
      return null;
    }

    return {
      src,
      alt: safeString(image.alt) || "Enlarged vessel image"
    };
  }

  function openMediaLightbox(src, alt) {
    closeMediaLightbox();

    const lightbox = document.createElement("div");
    lightbox.className = "media-lightbox";
    lightbox.dataset.action = "close-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image viewer");
    lightbox.innerHTML = `
      <div class="media-lightbox__panel">
        <button class="media-lightbox__close" type="button" data-action="close-lightbox" aria-label="Close image viewer">&times;</button>
        <img class="media-lightbox__image" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">
      </div>
    `;

    app.appendChild(lightbox);
    mediaLightboxNode = lightbox;
  }

  function closeMediaLightbox() {
    if (!mediaLightboxNode) {
      return;
    }

    mediaLightboxNode.remove();
    mediaLightboxNode = null;
  }

  function mountAisMap(vessel) {
    const mapNode = document.getElementById("ais-map");
    if (!mapNode) {
      return;
    }

    if (!window.L) {
      revealMapStatus("Map unavailable.");
      mapNode.hidden = true;
      return;
    }

    const destination = getDestinationPort(vessel);
    const mapData = vessel.aisMap;

    hideMapStatus();
    mapNode.hidden = false;

    try {
      activeMap = window.L.map(mapNode, {
        zoomControl: true,
        attributionControl: true,
        zoomSnap: 0.25
      }).setView(mapData.viewport.center, mapData.viewport.zoom);

      let tileLoadSucceeded = false;
      let tileErrorTimer = null;
      const tileLayer = window.L.tileLayer(MAP_TILE_URL, {
        maxZoom: 19,
        attribution: MAP_TILE_ATTRIBUTION
      });

      tileLayer.on("tileload", () => {
        tileLoadSucceeded = true;
        if (tileErrorTimer) {
          window.clearTimeout(tileErrorTimer);
          tileErrorTimer = null;
        }
        hideMapStatus();
      });

      tileLayer.on("tileerror", () => {
        if (tileLoadSucceeded || tileErrorTimer) {
          return;
        }

        tileErrorTimer = window.setTimeout(() => {
          const hasLoadedTiles = Array.from(mapNode.querySelectorAll(".leaflet-tile"))
            .some((image) => image.complete && image.naturalWidth > 0);

          if (!hasLoadedTiles) {
            revealMapStatus("Map tiles unavailable.");
          }
        }, 1500);
      });

      tileLayer.addTo(activeMap);

      mapData.routeSegments.forEach((segment) => {
        const coordinates = segment.coordinates.map(([lat, lng]) => [lat, lng]);

        window.L.polyline(coordinates, getRouteShadowStyle()).addTo(activeMap);
        window.L.polyline(coordinates, getRouteStyle(segment.type)).addTo(activeMap);
      });

      mapData.ports.forEach((port) => {
        const marker = window.L.circleMarker([port.lat, port.lng], getPortStyle(port.kind)).addTo(activeMap);

        if (port.kind === "destination") {
          marker
            .bindTooltip(port.label, {
              permanent: true,
              direction: "top",
              className: "map-label"
            })
            .openTooltip();
        } else {
          marker.bindPopup(renderPopup(port.label, formatPortKind(port.kind)));
        }
      });

      mapData.events.forEach((event) => {
        const coordinate = resolveEventCoordinate(event, mapData);
        if (!coordinate) {
          return;
        }

        const marker = window.L.circleMarker(coordinate, getEventStyle(event.type)).addTo(activeMap);
        marker.bindPopup(renderPopup(event.label, formatEventType(event.type)));
      });

      if (Array.isArray(mapData.currentPosition) && mapData.currentPosition.length === 2) {
        window.L.circleMarker(mapData.currentPosition, {
          radius: 7,
          fillColor: "#f8fbfd",
          fillOpacity: 1,
          color: "#07131d",
          weight: 3
        })
          .addTo(activeMap)
          .bindPopup(renderPopup("Latest AIS point", destination ? `${destination.label} approaches` : vessel.name));
      }

      window.setTimeout(() => {
        if (activeMap) {
          activeMap.invalidateSize();
          activeMap.setView(mapData.viewport.center, mapData.viewport.zoom, {
            animate: false
          });
        }
      }, 0);
    } catch (error) {
      destroyMap();
      revealMapStatus("Map unavailable.");
      mapNode.hidden = true;
    }
  }

  function resolveEventCoordinate(event, mapData) {
    if (event && event.routeRef) {
      return resolveRouteRefCoordinate(event.routeRef, mapData);
    }

    if (event && typeof event.lat === "number" && typeof event.lng === "number") {
      return [event.lat, event.lng];
    }

    return null;
  }

  function resolveRouteRefCoordinate(routeRef, mapData) {
    if (!routeRef || typeof routeRef !== "object") {
      return null;
    }

    const segment = mapData.routeSegments[routeRef.segmentIndex];
    if (!segment || !Array.isArray(segment.coordinates)) {
      return null;
    }

    const coordinate = segment.coordinates[routeRef.pointIndex];
    if (!Array.isArray(coordinate) || coordinate.length !== 2) {
      return null;
    }

    return [coordinate[0], coordinate[1]];
  }

  function renderPopup(title, subtitle) {
    return `
      <div class="map-popup">
        <strong>${escapeHtml(title)}</strong>
        <div>${escapeHtml(subtitle)}</div>
      </div>
    `;
  }

  function revealMapStatus(message) {
    const statusNode = document.querySelector("[data-map-status]");
    if (!statusNode) {
      return;
    }

    statusNode.hidden = false;
    statusNode.textContent = message;
  }

  function hideMapStatus() {
    const statusNode = document.querySelector("[data-map-status]");
    if (!statusNode) {
      return;
    }

    statusNode.hidden = true;
    statusNode.textContent = "";
  }

  function destroyMap() {
    if (!activeMap) {
      return;
    }

    activeMap.remove();
    activeMap = null;
  }

  function getRouteShadowStyle() {
    return {
      color: "#06121b",
      weight: 9,
      opacity: 0.9
    };
  }

  function getRouteStyle(type) {
    const styles = {
      normal: { color: "#2ff3d2", weight: 5, opacity: 0.98 },
      gap: { color: "#ffc247", weight: 5, opacity: 1, dashArray: "12 8" },
      loiter: { color: "#ff6e99", weight: 5, opacity: 1, dashArray: "4 8" },
      anchor: { color: "#9ff07f", weight: 5, opacity: 1, dashArray: "2 8" }
    };

    return styles[type] || styles.normal;
  }

  function getPortStyle(kind) {
    const styles = {
      origin: { radius: 5, fillColor: "#9ed8ff", color: "#06121b", weight: 2.5, fillOpacity: 1 },
      transit: { radius: 4, fillColor: "#d9e6ef", color: "#06121b", weight: 2, fillOpacity: 1 },
      destination: { radius: 7, fillColor: "#2ff3d2", color: "#06121b", weight: 2.5, fillOpacity: 1 }
    };

    return styles[kind] || styles.transit;
  }

  function getEventStyle(type) {
    const styles = {
      normal: { radius: 5, fillColor: "#2ff3d2", color: "#ffffff", weight: 2, fillOpacity: 1 },
      gap: { radius: 6, fillColor: "#ffc247", color: "#ffffff", weight: 2, fillOpacity: 1 },
      loiter: { radius: 6, fillColor: "#ff6e99", color: "#ffffff", weight: 2, fillOpacity: 1 },
      anchor: { radius: 6, fillColor: "#9ff07f", color: "#ffffff", weight: 2, fillOpacity: 1 }
    };

    return styles[type] || styles.normal;
  }

  function createDefaultState() {
    return {
      view: "inbox",
      selectedVesselId: DATA.vessels[0].id,
      selectedGroupId: null,
      pendingGroupId: null,
      facilitatorMode: false,
      introDismissed: false,
      decisions: buildDefaultDecisions()
    };
  }

  function buildDefaultDecisions() {
    return DATA.vessels.reduce((accumulator, vessel) => {
      accumulator[vessel.id] = createEmptyDecision();
      return accumulator;
    }, {});
  }

  function createEmptyDecision() {
    return {
      risk: "",
      action: "",
      note: ""
    };
  }

  function loadState() {
    const fallback = createDefaultState();

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return fallback;
      }

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return fallback;
      }

      if (VIEW_IDS.includes(parsed.view)) {
        fallback.view = parsed.view;
      }

      if (typeof parsed.selectedVesselId === "string" && getVessel(parsed.selectedVesselId)) {
        fallback.selectedVesselId = parsed.selectedVesselId;
      }

      if (typeof parsed.facilitatorMode === "boolean") {
        fallback.facilitatorMode = parsed.facilitatorMode;
      }

      if (typeof parsed.introDismissed === "boolean") {
        fallback.introDismissed = parsed.introDismissed;
      }

      if (typeof parsed.selectedGroupId === "string" && getGroup(parsed.selectedGroupId)) {
        fallback.selectedGroupId = parsed.selectedGroupId;
      }

      if (typeof parsed.pendingGroupId === "string") {
        fallback.pendingGroupId = parsed.pendingGroupId;
      }

      if (parsed.decisions && typeof parsed.decisions === "object") {
        DATA.vessels.forEach((vessel) => {
          fallback.decisions[vessel.id] = sanitizeDecision(parsed.decisions[vessel.id]);
        });
      }

    } catch (error) {
      return fallback;
    }

    return fallback;
  }

  function sanitizeDecision(decision) {
    const safeDecision = decision && typeof decision === "object" ? decision : createEmptyDecision();
    return {
      risk: RISK_OPTIONS.includes(safeDecision.risk) ? safeDecision.risk : "",
      action: ACTION_OPTIONS.includes(safeDecision.action) ? safeDecision.action : "",
      note: sanitizeDecisionNote(safeDecision.note)
    };
  }

  function sanitizeDecisionNote(value) {
    return safeString(value)
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, NOTE_MAX_LENGTH);
  }

  function persistState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // Ignore storage errors in local-file mode.
    }
  }

  function saveAndRender() {
    persistState();
    render();
  }

  function updateDecision(vesselId, field, rawValue) {
    const current = getDecision(vesselId);
    const next = { ...current };

    if (field === "risk") {
      next.risk = RISK_OPTIONS.includes(rawValue) ? rawValue : "";
    } else if (field === "action") {
      next.action = ACTION_OPTIONS.includes(rawValue) ? rawValue : "";
    } else if (field === "note") {
      next.note = sanitizeDecisionNote(rawValue);
    } else {
      return;
    }

    state.decisions[vesselId] = next;
  }



  function getDecision(vesselId) {
    return sanitizeDecision(state.decisions[vesselId]);
  }

  function getVessel(vesselId) {
    return DATA.vessels.find((vessel) => vessel.id === vesselId);
  }

  function getSelectedVessel() {
    const groupVessels = getGroupVessels(state.selectedGroupId);
    // Snap: if current selection is outside this group, use first in group
    const inGroup = groupVessels.find((v) => v.id === state.selectedVesselId);
    if (!inGroup && groupVessels.length) {
      state.selectedVesselId = groupVessels[0].id;
    }
    return getVessel(state.selectedVesselId) || groupVessels[0] || DATA.vessels[0];
  }

  function getGroup(groupId) {
    return GROUPS.find((g) => g.id === groupId) || null;
  }

  function getGroupVessels(groupId) {
    const group = getGroup(groupId);
    if (!group) return DATA.vessels;
    return group.vessels
      .map((id) => DATA.vessels.find((v) => v.id === id))
      .filter(Boolean);
  }

  function getGroupLabel(groupId) {
    const group = getGroup(groupId);
    return group ? group.label : "";
  }

  function renderGroupBadge(label) {
    return `
      <span class="group-badge">
        <span class="group-badge__eyebrow">Group</span>
        <strong>${escapeHtml(label)}</strong>
        <button class="group-badge__change" type="button" data-action="change-group">Change Group</button>
      </span>
    `;
  }


  function formatVesselLabel(vesselId) {
    const match = safeString(vesselId).match(/\d+/);
    if (!match) {
      return vesselId;
    }
    return `Vessel ${match[0]}`;
  }

  function getDestinationPort(vessel) {
    return vessel.aisMap.ports.find((port) => port.kind === "destination") || vessel.aisMap.ports[vessel.aisMap.ports.length - 1];
  }

  function formatPortKind(kind) {
    if (kind === "origin") {
      return "Origin";
    }
    if (kind === "destination") {
      return "Destination";
    }
    return "Transit point";
  }

  function formatEventType(type) {
    if (type === "gap") {
      return "AIS gap";
    }
    if (type === "loiter") {
      return "Loiter pattern";
    }
    if (type === "anchor") {
      return "Anchorage / waiting";
    }
    return "Normal movement";
  }



  function toKebabCase(value) {
    return safeString(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function isTypingTarget(target) {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return target.matches("input, textarea, select, [contenteditable='true']");
  }

  function safeString(value) {
    return typeof value === "string" ? value : "";
  }

  function escapeHtml(value) {
    return safeString(String(value))
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
