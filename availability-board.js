(() => {
  const shell = document.querySelector("[data-availability-shell]");
  const panel = document.querySelector("[data-availability-panel]");
  const appOptions = document.querySelectorAll("[data-availability-app-option]");
  const closeButtons = document.querySelectorAll("[data-availability-close]");
  const mailLink = document.querySelector("[data-availability-mail]");

  const createMailHref = (appNames) => {
    const subject = "Feedback zur Verf\u00fcgbarkeit der SmartBuilt-AI Apps";
    const appList = appNames.map((appName) => `- ${appName}`).join("\n");
    const body = [
      "Hallo BuiltSmart Hub Team,",
      "",
      "ich interessiere mich f\u00fcr folgende SmartBuilt-AI Apps:",
      appList,
      "",
      "Bitte gebt mir eine R\u00fcckmeldung, sobald der Kaufbereich aktiv ist.",
      "",
      "Vielen Dank und freundliche Gr\u00fc\u00dfe",
      "",
    ].join("\n");

    return `mailto:Info@built-smart-hub.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const updateMailLink = () => {
    if (!mailLink) {
      return;
    }

    const selectedApps = Array.from(appOptions)
      .filter((option) => option.checked)
      .map((option) => option.value.trim())
      .filter(Boolean);

    if (selectedApps.length === 0) {
      mailLink.setAttribute("aria-disabled", "true");
      return;
    }

    mailLink.href = createMailHref(selectedApps);
    mailLink.setAttribute("aria-disabled", "false");
  };

  appOptions.forEach((option) => {
    option.addEventListener("change", updateMailLink);
  });
  updateMailLink();

  if (mailLink) {
    mailLink.addEventListener("click", (event) => {
      if (mailLink.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
        appOptions[0]?.focus();
      }
    });
  }

  if (panel && closeButtons.length > 0) {
    const closePanel = () => {
      if (window.history.length > 1 && document.referrer) {
        window.history.back();
        return;
      }

      if (shell) {
        shell.classList.add("is-hidden");
        return;
      }

      panel.classList.add("is-hidden");
    };

    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", () => {
        closePanel();
      });
    });
  }
})();
