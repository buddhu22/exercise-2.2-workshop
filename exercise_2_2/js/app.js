(() => {
  "use strict";
  const ALLOWED = Object.freeze({
    category: ["Hardware", "Software", "Network", "Account Access", "Other"],
    urgency: ["Low", "Medium", "High"],
    contact: ["Email", "Phone", "In-person"]
  });
  const SAMPLE_TICKETS = Object.freeze([
    { id: "HD-20261009-101", category: "Network", title: "Wi-Fi connection issue", urgency: "Medium", status: "In review" },
    { id: "HD-20261009-102", category: "Hardware", title: "Printer not responding", urgency: "Low", status: "Submitted" },
    { id: "HD-20261009-103", category: "Software", title: "Software installation request", urgency: "Low", status: "Resolved" },
    { id: "HD-20261009-104", category: "Account Access", title: "Demo account sign-in issue", urgency: "High", status: "In review" },
    { id: "HD-20261009-105", category: "Network", title: "Slow connection in study room", urgency: "High", status: "Submitted" },
    { id: "HD-20261009-106", category: "Hardware", title: "Keyboard key is sticking", urgency: "Medium", status: "Resolved" }
  ]);
  const form = document.getElementById("request-form");
  const status = document.getElementById("form-status");
  const fieldIds = { category: "category", title: "title", description: "description", urgency: "urgency", contact: "contact" };
  const filters = {
    category: document.getElementById("filter-category"),
    urgency: document.getElementById("filter-urgency"),
    status: document.getElementById("filter-status")
  };

  function setError(name, message) {
    const input = document.getElementById(fieldIds[name]);
    const error = document.getElementById(`${name}-error`);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;
  }

  function clearErrors() {
    Object.keys(fieldIds).forEach((name) => setError(name, ""));
  }

  function validate(data) {
    const errors = {};
    if (!ALLOWED.category.includes(data.category)) errors.category = "Choose a valid category.";
    if (!data.title) errors.title = "Short title is required.";
    else if (data.title.length < 5) errors.title = "Short title must contain at least 5 characters.";
    else if (data.title.length > 100) errors.title = "Short title must be 100 characters or fewer.";
    if (!data.description) errors.description = "Description is required.";
    else if (data.description.length < 10) errors.description = "Description must contain at least 10 characters.";
    else if (data.description.length > 1000) errors.description = "Description must be 1,000 characters or fewer.";
    if (!ALLOWED.urgency.includes(data.urgency)) errors.urgency = "Choose a valid urgency.";
    if (!ALLOWED.contact.includes(data.contact)) errors.contact = "Choose a valid contact method.";
    return errors;
  }

  function createRequestId() {
    const date = new Date();
    const day = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("");
    const serial = String(Math.floor(Math.random() * 900) + 100);
    return `HD-${day}-${serial}`;
  }

  function appendSummaryRow(list, label, value, className) {
    const row = document.createElement("div");
    row.className = "summary-row";
    const term = document.createElement("dt");
    term.textContent = label;
    const detail = document.createElement("dd");
    detail.textContent = value;
    if (className) detail.className = className;
    row.append(term, detail);
    list.append(row);
  }

  function showSummary(data) {
    const content = document.getElementById("summary-content");
    const list = document.createElement("dl");
    list.className = "summary-items";
    appendSummaryRow(list, "Request ID", createRequestId(), "request-id");
    appendSummaryRow(list, "Category", data.category);
    appendSummaryRow(list, "Short title", data.title);
    appendSummaryRow(list, "Description", data.description);
    appendSummaryRow(list, "Urgency", data.urgency);
    appendSummaryRow(list, "Preferred contact", data.contact);
    const row = document.createElement("div");
    row.className = "summary-row";
    const term = document.createElement("dt");
    term.textContent = "Status";
    const detail = document.createElement("dd");
    const badge = document.createElement("span");
    badge.className = "summary-status";
    badge.textContent = "Submitted";
    detail.append(badge);
    row.append(term, detail);
    list.append(row);
    content.replaceChildren(list);
    document.getElementById("summary-state").textContent = "REQUEST CREATED";
    document.getElementById("summary-subtitle").textContent = "Your local confirmation summary is ready.";
  }

  function updateCounter(inputId, counterId, max) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    const update = () => { counter.textContent = `${input.value.length} / ${max}`; };
    input.addEventListener("input", update);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    const data = {
      category: document.getElementById("category").value,
      title: document.getElementById("title").value.trim(),
      description: document.getElementById("description").value.trim(),
      urgency: document.getElementById("urgency").value,
      contact: document.getElementById("contact").value
    };
    const errors = validate(data);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      Object.entries(errors).forEach(([name, message]) => setError(name, message));
      status.textContent = "Please correct the highlighted fields.";
      status.className = "status-message error";
      status.hidden = false;
      document.getElementById(fieldIds[firstInvalid]).focus();
      return;
    }
    showSummary(data);
    status.textContent = "Your request has been submitted successfully.";
    status.className = "status-message success";
    status.hidden = false;
  });

  Object.entries(fieldIds).forEach(([name, id]) => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") setError(name, ""); });
    input.addEventListener("change", () => { if (input.getAttribute("aria-invalid") === "true") setError(name, ""); });
  });
  updateCounter("title", "title-count", 100);
  updateCounter("description", "description-count", 1000);

  function renderTickets() {
    const list = document.getElementById("ticket-list");
    const matches = SAMPLE_TICKETS.filter((ticket) =>
      (!filters.category.value || ticket.category === filters.category.value) &&
      (!filters.urgency.value || ticket.urgency === filters.urgency.value) &&
      (!filters.status.value || ticket.status === filters.status.value)
    );
    document.getElementById("ticket-count").textContent = `${matches.length} sample request${matches.length === 1 ? "" : "s"}`;
    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "no-results";
      empty.textContent = "No sample requests match those filters.";
      list.replaceChildren(empty);
      return;
    }
    const cards = matches.map((ticket) => {
      const card = document.createElement("article");
      card.className = "ticket-card";
      const head = document.createElement("div");
      head.className = "ticket-card-head";
      const id = document.createElement("span");
      id.className = "ticket-id";
      id.textContent = ticket.id;
      const urgency = document.createElement("span");
      urgency.className = `ticket-urgency urgency-${ticket.urgency.toLowerCase()}`;
      urgency.textContent = `${ticket.urgency} urgency`;
      head.append(id, urgency);
      const title = document.createElement("h3");
      title.textContent = ticket.title;
      const meta = document.createElement("div");
      meta.className = "ticket-meta";
      [ticket.category, ticket.status].forEach((value) => {
        const chip = document.createElement("span");
        chip.textContent = value;
        meta.append(chip);
      });
      card.append(head, title, meta);
      return card;
    });
    list.replaceChildren(...cards);
  }
  Object.values(filters).forEach((select) => select.addEventListener("change", renderTickets));
  document.getElementById("clear-filters").addEventListener("click", () => {
    Object.values(filters).forEach((select) => { select.value = ""; });
    renderTickets();
  });
  renderTickets();
})();
