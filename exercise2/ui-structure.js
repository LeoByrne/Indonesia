// Exercise 2 structural enhancement pass.
// Additive only: does not touch DATA, AIS tracks, Leaflet map construction, assessments, or localStorage.
(() => {
  const app = document.getElementById("app");
  if (!app) return;

  let scheduled = false;
  const observer = new MutationObserver(() => scheduleEnhance());
  observer.observe(app, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleEnhance, { once: true });
  } else {
    scheduleEnhance();
  }

  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      enhanceExercise2();
    });
  }

  function enhanceExercise2() {
    const shell = app.querySelector(".shell");
    const sidebar = app.querySelector(".analyst-sidebar");
    const workspace = app.querySelector(".workspace-grid");
    const queue = app.querySelector(".case-queue");

    if (sidebar) {
      sidebar.classList.add("analyst-sidebar--sts");
      compactSidebar(sidebar);
    }

    if (shell) {
      shell.classList.toggle("shell--workspace", Boolean(workspace));
      shell.classList.toggle("shell--dashboard", Boolean(queue) && !workspace);
    }

    if (queue) enhanceQueue(queue);
    if (workspace) enhanceWorkspace(workspace);
  }

  function compactSidebar(sidebar) {
    const brandTitle = sidebar.querySelector(".analyst-sidebar__brand h1");
    const brandCopy = sidebar.querySelector(".analyst-sidebar__brand p");
    if (brandTitle && brandTitle.textContent.trim() === "Registry Review OS") {
      brandTitle.textContent = "STS Detection OS";
    }
    if (brandCopy) brandCopy.textContent = "Maritime investigation exercise";

    const navSections = [...sidebar.querySelectorAll(".analyst-sidebar__nav")];
    navSections.forEach((section) => section.classList.add("is-ui-hidden"));
  }

  function enhanceQueue(queue) {
    if (!queue.querySelector(".case-queue-header")) {
      const header = document.createElement("div");
      header.className = "case-queue-header";
      header.setAttribute("aria-hidden", "true");
      header.innerHTML = "<span>Case</span><span>Evidence summary</span><span>Status / action</span>";
      queue.prepend(header);
    }

    queue.querySelectorAll(".case-card").forEach((card) => {
      card.classList.add("is-structured-row");
      const button = card.querySelector(".solid-button[data-action='open-case']");
      if (button && button.textContent.trim() === "Open Case") button.textContent = "Open Review";
    });
  }

  function enhanceWorkspace(workspace) {
    workspace.classList.add("is-structured-workspace");

    const mapPanel = workspace.querySelector(".map-panel");
    if (mapPanel) mapPanel.classList.add("map-panel--dominant");

    const documentPanel = workspace.querySelector(".document-panel");
    if (documentPanel) {
      documentPanel.classList.add("is-evidence-document");
      const docButton = documentPanel.querySelector(".fact-card__button");
      if (docButton && !docButton.querySelector(".document-panel__action-note")) {
        const note = document.createElement("span");
        note.className = "document-panel__action-note";
        note.textContent = "Click to inspect document";
        docButton.appendChild(note);
      }
    }

    const assessmentPanel = workspace.querySelector(".assessment-panel");
    if (assessmentPanel) assessmentPanel.classList.add("is-decision-panel");

    const side = workspace.querySelector(".workspace-grid__side");
    const caseBrief = workspace.querySelector(".workspace-grid__main .case-brief-panel");
    if (side && caseBrief && !side.contains(caseBrief)) {
      side.appendChild(caseBrief);
    }
  }
})();
