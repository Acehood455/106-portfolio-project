const STORAGE_KEYS = {
  theme: "portfolio-theme",
  tasks: "portfolio-planner-tasks",
};

// Store the active theme so every page keeps the same appearance.
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEYS.theme, theme);

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.textContent = theme === "dark" ? "Light" : "Dark";
  });
}

// Initialize the saved theme or fall back to the user's system preference.
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  });
}

// Handle the mobile navigation panel and highlight the active page.
function initNav() {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobilePanel = document.querySelector("[data-mobile-panel]");

  if (menuButton && mobilePanel) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    mobilePanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobilePanel.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const normalized = href.split("/").pop();
    if (normalized === currentPath || (currentPath === "" && normalized === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

// Build the planner task list, update counters, and persist tasks in localStorage.
function initPlanner() {
  const form = document.querySelector("[data-planner-form]");
  const input = document.querySelector("[data-task-input]");
  const list = document.querySelector("[data-task-list]");
  const totalCount = document.querySelector("[data-total-count]");
  const completeCount = document.querySelector("[data-complete-count]");
  const remainingCount = document.querySelector("[data-remaining-count]");

  if (!form || !input || !list) {
    return;
  }

  let tasks = loadTasks();

  function loadTasks() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks) || "[]");
      // Keep the stored data model as an array of task objects.
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  }

  function updateStats() {
    const complete = tasks.filter((task) => task.completed).length;
    if (totalCount) totalCount.textContent = String(tasks.length);
    if (completeCount) completeCount.textContent = String(complete);
    if (remainingCount) remainingCount.textContent = String(tasks.length - complete);
  }

  function renderTasks() {
    list.innerHTML = "";

    if (!tasks.length) {
      // Show a friendly empty state until the first task is added.
      const empty = document.createElement("div");
      empty.className = "task-empty";
      empty.textContent = "No tasks yet. Add your first study task to get started.";
      list.appendChild(empty);
      updateStats();
      return;
    }

    tasks.forEach((task) => {
      const item = document.createElement("li");
      item.className = `task-item${task.completed ? " is-complete" : ""}`;
      item.dataset.id = task.id;

      const main = document.createElement("div");
      main.className = "task-main";

      const title = document.createElement("div");
      title.className = "task-title";
      title.textContent = task.title;

      const meta = document.createElement("div");
      meta.className = "task-meta";
      meta.textContent = task.completed ? "Completed" : "Pending";

      main.append(title, meta);

      const controls = document.createElement("div");
      controls.className = "task-controls";

      const toggleButton = document.createElement("button");
      toggleButton.type = "button";
      toggleButton.className = "task-icon-btn complete";
      toggleButton.textContent = task.completed ? "Undo" : "Done";
      toggleButton.dataset.action = "toggle";

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "task-icon-btn delete";
      deleteButton.textContent = "Delete";
      deleteButton.dataset.action = "delete";

      controls.append(toggleButton, deleteButton);
      item.append(main, controls);
      list.appendChild(item);
    });

    updateStats();
  }

  function addTask(title) {
    tasks.unshift({
      id: String(Date.now()),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    saveTasks();
    renderTasks();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if (!title) {
      input.setCustomValidity("Please enter a task.");
      input.reportValidity();
      return;
    }

    input.setCustomValidity("");
    addTask(title);
    input.value = "";
    input.focus();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const item = button.closest("[data-id]");
    if (!item) {
      return;
    }

    const taskId = item.dataset.id;
    const action = button.dataset.action;

    if (action === "toggle") {
      // Flip the completion state without changing the rest of the task.
      tasks = tasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    }

    if (action === "delete") {
      // Remove the selected task from the stored list.
      tasks = tasks.filter((task) => task.id !== taskId);
    }

    saveTasks();
    renderTasks();
  });

  renderTasks();
}

// Validate the contact form before allowing a submit message.
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) {
    return;
  }

  const success = document.querySelector("[data-form-success]");
  const fields = {
    name: form.elements.namedItem("name"),
    email: form.elements.namedItem("email"),
    phone: form.elements.namedItem("phone"),
    message: form.elements.namedItem("message"),
  };

  function setError(fieldName, message) {
    const error = form.querySelector(`[data-error-for="${fieldName}"]`);
    const field = fields[fieldName];
    if (error) {
      error.textContent = message;
    }
    if (field) {
      field.setAttribute("aria-invalid", message ? "true" : "false");
    }
  }

  function clearErrors() {
    // Reset inline errors and any prior success message.
    Object.keys(fields).forEach((fieldName) => setError(fieldName, ""));
    if (success) {
      success.classList.remove("is-visible");
      success.textContent = "";
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Keep the phone check strict so only digits pass validation.
  function validatePhone(phone) {
    return /^\d+$/.test(phone);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const values = {
      name: String(fields.name.value || "").trim(),
      email: String(fields.email.value || "").trim(),
      phone: String(fields.phone.value || "").trim(),
      message: String(fields.message.value || "").trim(),
    };

    let firstInvalidField = null;

    // Each field is required and gets its own inline error message.
    if (!values.name) {
      setError("name", "Name is required.");
      firstInvalidField = firstInvalidField || fields.name;
    }
    if (!values.email) {
      setError("email", "Email is required.");
      firstInvalidField = firstInvalidField || fields.email;
    } else if (!validateEmail(values.email)) {
      setError("email", "Enter a valid email address.");
      firstInvalidField = firstInvalidField || fields.email;
    }
    if (!values.phone) {
      setError("phone", "Phone number is required.");
      firstInvalidField = firstInvalidField || fields.phone;
    } else if (!validatePhone(values.phone)) {
      setError("phone", "Phone number must contain digits only.");
      firstInvalidField = firstInvalidField || fields.phone;
    }
    if (!values.message) {
      setError("message", "Message is required.");
      firstInvalidField = firstInvalidField || fields.message;
    }

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    // Show a success state after validation passes.
    if (success) {
      success.textContent = "Message sent successfully. I will get back to you soon.";
      success.classList.add("is-visible");
    }

    form.reset();
  });
}

// Fade sections into view as the user scrolls down the page.
function initReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !nodes.length) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  nodes.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
    observer.observe(node);
  });
}

// Show a back-to-top button after the user scrolls a bit.
function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) {
    return;
  }

  function handleScroll() {
    button.classList.toggle("is-visible", window.scrollY > 560);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Run every page feature after the DOM is ready.
function init() {
  initTheme();
  initNav();
  initReveal();
  initBackToTop();
  initPlanner();
  initContactForm();
}

document.addEventListener("DOMContentLoaded", init);
