function showPage(pageId) {
    // Skjul alle sider
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    // Vis den valgte side
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }

    // Opdater body-klassen for at indikere, hvilken side der er aktiv
    document.body.className = ''; // Nulstil klasser
    document.body.classList.add(pageId + '-active'); // Tilføj f.eks. 'hjem-page-active'
}

// Vis "Hjem" siden, når siden indlæses
window.onload = function() {
    showPage('hjem-page');
};

function openBookingPage() {
    showPage('booking-page'); // Viser booking-siden i stedet for at åbne en ny fane
}

function toggleMenu() {
    const menu = document.getElementById('mobil-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  // Kortlægning af stier til page-id'er og body-klasser
  const pageMap = {
    '/': { pageId: 'hjem-page', bodyClass: 'hjem-page-active' },
    '/index.html': { pageId: 'hjem-page', bodyClass: 'hjem-page-active' },
    '/links': { pageId: 'link-page', bodyClass: 'link-page-active' },
    '/booking': { pageId: 'booking-page', bodyClass: 'hjem-page-active' },
    '/tilmeld': { pageId: 'tilmeld-page', bodyClass: 'hjem-page-active' },
    '/faq': { pageId: 'faq-page', bodyClass: 'hjem-page-active' },
    '/seminarer': { pageId: 'seminar-page', bodyClass: 'hjem-page-active' },
    '/om': { pageId: 'om-page', bodyClass: 'hjem-page-active' },
    '/praktisk': { pageId: 'praktisk-page', bodyClass: 'hjem-page-active' }
  };

  const match = pageMap[path];

  if (match) {
    // Fjern alle tidligere page-aktive klasser
    document.body.className = match.bodyClass;

    // Skjul alle pages
    document.querySelectorAll('.page').forEach(el => el.style.display = 'none');

    // Vis kun den relevante page
    const targetPage = document.getElementById(match.pageId);
    if (targetPage) targetPage.style.display = 'block';
  }
});


// Funktion til at vise/skjule dropdown-menuen ved klik
function toggleDropdownMenu(event) {
    var dropdownMenu = event.target.nextElementSibling;
    dropdownMenu.classList.toggle('show'); // Tilføj eller fjern 'show'-klassen for at vise/skjule menuen
    event.preventDefault(); // Forhindrer side-skift ved klik
}

// Funktion til at åbne den ønskede side ved dobbeltklik og lukke mobil-menuen
function openPage(pageId) {
    // Skift til den ønskede side
    showPage(pageId);
    
    // Rul til den første sektion af siden (valgfrit)
    document.getElementById(pageId).scrollIntoView({ behavior: "smooth" });

    // Luk mobil-menuen ved dobbeltklik
    toggleMenu();
}

function navigateToSection(pageId, sectionId) {
    // Vis den korrekte side
    showPage(pageId);

    // Scroll til sektionen efter en kort forsinkelse
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Sektionen med id '${sectionId}' blev ikke fundet.`);
        }
    }, 100); // Vent lidt, så siden når at blive vist
}

document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', function(event) {
        // Hent target id fra href-attributten
        let targetId = this.getAttribute('href').substring(1); 

        // Find hvilken hovedfane den tilhører
        let parentPage = document.getElementById(targetId).closest('.page').id;

        // Vis den rigtige fane
        showPage(parentPage);

        // Vent et kort øjeblik før scrolling (så siden når at skifte)
        setTimeout(() => {
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        }, 100);
        
        // Forhindre standard anker-adfærd (springer ikke direkte uden animation)
        event.preventDefault();
    });
});

document.querySelectorAll('.dropdown-menu-mobil a').forEach(link => {
    link.addEventListener('click', function(event) {
        // Hent target id fra href-attributten
        let targetId = this.getAttribute('href').substring(1); 

        // Find hvilken hovedfane den tilhører
        let parentPage = document.getElementById(targetId).closest('.page').id;

        // Vis den rigtige fane
        showPage(parentPage);

        // Vent et kort øjeblik før scrolling (så siden når at skifte)
        setTimeout(() => {
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        }, 100);
        
        // Forhindre standard anker-adfærd (springer ikke direkte uden animation)
        event.preventDefault();
    });
});

document.querySelectorAll(".dropdown-menu-mobil a").forEach(link => {
    link.addEventListener("click", () => {
        // Luk dropdown-menuen (valgfrit: kan fjernes hvis kun mobilmenu skal lukkes)
        document.querySelectorAll(".dropdown-menu-mobil").forEach(menu => {
            menu.classList.remove("åben");
        });

        // Luk mobilmenuen
        toggleMenu();
    });
});

document.getElementById("send-button").addEventListener("click", function(event) {
    event.preventDefault(); // Stopper formularen fra at blive sendt

    var telefon = document.getElementById("telefon-besked");
    var email = document.getElementById("email-besked");
    var telefonFejl = document.getElementById("telefonFejl-beskedform");
    var emailFejl = document.getElementById("emailFejl-beskedform");
    var telefonRegex = /^\+?[0-9]{8,15}$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = true;

    // Nulstil fejlvisning
    telefon.classList.remove("invalid");
    email.classList.remove("invalid");
    telefonFejl.textContent = "";
    emailFejl.textContent = "";

    if (!telefonRegex.test(telefon.value)) {
        telefon.classList.add("invalid");
        telefonFejl.textContent = "Indtast et gyldigt telefonnummer.";
        isValid = false;
    }

    if (!emailRegex.test(email.value)) {
        email.classList.add("invalid");
        emailFejl.textContent = "Indtast en gyldig e-mailadresse.";
        isValid = false;
    }

    if (!isValid) {
        return; // Stop hvis validering fejler
    }

    // Hent formulardata
    var formData = new FormData(document.getElementById("beskedForm"));
    
    // Send dataen til Formspree via fetch()
    fetch(document.getElementById("beskedForm").action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Besked sendt! Du hører fra os! 😃");
            document.getElementById("beskedForm").reset(); // Nulstil formularen
        } else {
            alert("Noget gik galt. Prøv igen.");
        }
    }).catch(error => {
        alert("Der opstod en fejl. Prøv igen senere.");
    });
});


document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Stopper formularen fra at blive sendt på den normale måde med det samme

    var telefon = document.getElementById("telefon-booking");
    var telefonFejl = document.getElementById("telefonFejl-bookingform");
    var telefonRegex = /^\+?[0-9]{8,15}$/;
    var isValid = true;

    // Nulstil fejlvisning
    telefon.classList.remove("invalid");
    telefonFejl.textContent = "";

    // Tjek telefonnummer
    if (!telefonRegex.test(telefon.value)) {
        telefon.classList.add("invalid");
        telefonFejl.textContent = "Indtast et gyldigt telefonnummer.";
        isValid = false;
    }

    // Hvis ikke valid, vis fejl og stop submission
    if (!isValid) {
        return; // Stopper funktionen, så der ikke sendes noget
    }

    // Hent formulardata
    var formData = new FormData(document.getElementById("bookingForm"));

    // Send dataen til Formspree via fetch()
    fetch(document.getElementById("bookingForm").action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Prøvegang booked👊 Vi glæder os til at se dig!");
            document.getElementById("bookingForm").reset(); // Nulstil formularen
        } else {
            alert("Noget gik galt. Prøv igen.");
        }
    }).catch(error => {
        alert("Der opstod en fejl. Prøv igen senere.");
    });
});

// Fjerner rød kant, når brugeren skriver igen
document.getElementById("telefon-booking").addEventListener("input", function() {
    this.classList.remove("invalid");
    document.getElementById("telefonFejl-bookingform").textContent = "";
});


document.addEventListener("DOMContentLoaded", function () {
    let btn16 = document.getElementById("btn-16");
    let btnJunior = document.getElementById("btn-junior");
    let navnFelt = document.getElementById("navn-booking");
    let foraelderFelt = document.getElementById("foraelder-booking");
    let formType = document.getElementById("form-type");
    let datoInput = document.getElementById("dato-kalender");
    let trialInfo = document.getElementById("trial-info");

    // Husk at gemme den aktuelle flatpickr-instans så vi kan ødelægge/genoprette den
    let fp;

    function setupDatepicker(erJunior) {
        if (fp) {
            fp.destroy();
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let minDato = erJunior ? new Date("2025-08-19") : today;
        let maxDato = new Date();
        maxDato.setMonth(maxDato.getMonth() + 3);

        fp = flatpickr(datoInput, {
            allowInput: true,
            dateFormat: "d-m-Y",
            placeholder: "Dato*",
            onOpen: function() {
                datoInput.setAttribute("placeholder", "");
            },
            onClose: function() {
                if (!datoInput.value) {
                    datoInput.setAttribute("placeholder", "Dato*");
                }
            },
            disable: [
                function(date) {
                    return erJunior
                        ? date.getDay() !== 2 // Kun tirsdag
                        : !(date.getDay() === 2 || date.getDay() === 4); // Tirs + tors
                }
            ],
            minDate: minDato,
            maxDate: maxDato,
        });
    }

    // Første setup = 16+
    setupDatepicker(false);

    // Knap til 16+
    btn16.addEventListener("click", function () {
        trialInfo.style.display = "block";
        btn16.classList.add("active");
        btnJunior.classList.remove("active");
        btn16.disabled = true;
        btnJunior.disabled = false;

        navnFelt.placeholder = "Navn*";
        foraelderFelt.style.display = "none";
        formType.value = "16+";

        setupDatepicker(false);
    });

    // Knap til junior
    btnJunior.addEventListener("click", function () {
        trialInfo.style.display = "none";
        btnJunior.classList.add("active");
        btn16.classList.remove("active");
        btnJunior.disabled = true;
        btn16.disabled = false;

        navnFelt.placeholder = "Barnets navn*";
        foraelderFelt.style.display = "block";
        formType.value = "Junior";

        setupDatepicker(true);
    });
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('tilmeldForm');
  const helbredJa = document.getElementById('helbred-ja');
  const helbredNej = document.getElementById('helbred-nej');
  const radioInputs = [helbredJa, helbredNej];
  const helbredTextContainer = document.getElementById('helbred-text-container');
  const helbredError = document.getElementById('helbred-error');

  const ansvarsfraskrivelse = document.getElementById('ansvarsfraskrivelse');
  const persondata = document.getElementById('persondata');
  const fototilladelse = document.getElementById('fototilladelse');
  const samtykkeError = document.getElementById('samtykke-error');

  const fødselsdagInput = document.getElementById('fødselsdag');
  const errorSpan = document.getElementById('age-error');

  const btn16Tilmeld = document.getElementById('btn-16-tilmeld');
  const btnJuniorTilmeld = document.getElementById('btn-junior-tilmeld');

  const emailInput = document.getElementById('email');
  const telefonInput = document.getElementById('telefon');
  const nødkontaktTelefonInput = document.getElementById('nødkontakt-tlf');

  // --- Fødselsdag: automatisk bindestreg ---
  fødselsdagInput.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 2 && v.length <= 4) {
      v = v.slice(0, 2) + '-' + v.slice(2);
    } else if (v.length > 4) {
      v = v.slice(0, 2) + '-' + v.slice(2, 4) + '-' + v.slice(4, 8);
    }
    this.value = v;
  });

  // --- Helbred: vis / skjul beskrivelse ---
  helbredJa.addEventListener('change', () => {
    radioInputs.forEach(i => i.classList.remove('error'));
    helbredTextContainer.style.display = 'block';
    helbredError.style.display = 'none';
  });
  helbredNej.addEventListener('change', () => {
    radioInputs.forEach(i => i.classList.remove('error'));
    helbredTextContainer.style.display = 'none';
    helbredError.style.display = 'none';
  });

  // --- Funktioner til at skifte formular-type ---
  function switchTo16() {
    form.dataset.type = '16+';
    btn16Tilmeld.classList.add('active'); btn16Tilmeld.disabled = true;
    btnJuniorTilmeld.classList.remove('active'); btnJuniorTilmeld.disabled = false;
    // UI-tilpasninger for 16+:
    document.getElementById('navn').placeholder = 'Fulde Navn*';
    telefonInput.style.display = ''; telefonInput.required = true;
    document.getElementById('nødkontakt-overskrift').textContent = 'Nødkontakt';
    document.getElementById('helbred-tekst').textContent = 'Har du nogen medicinske tilstande, skader eller allergier, vi skal være opmærksomme på?';
    document.getElementById('fototilladelse-tekst').textContent = 'Fototilladelse: Jeg giver tilladelse til, at klubben må tage billeder/videoer af mig (valgfri)';
  }

  function switchToJunior() {
    form.dataset.type = 'junior';
    btnJuniorTilmeld.classList.add('active'); btnJuniorTilmeld.disabled = true;
    btn16Tilmeld.classList.remove('active'); btn16Tilmeld.disabled = false;
    // UI-tilpasninger for junior:
    document.getElementById('navn').placeholder = 'Barnets Navn*';
    telefonInput.style.display = 'none'; telefonInput.required = false;
    nødkontaktTelefonInput.required = true;
    document.getElementById('nødkontakt-overskrift').textContent = 'Forældre/ Værge';
    document.getElementById('helbred-tekst').textContent = 'Har barnet nogen medicinske tilstande, skader eller allergier, vi skal være opmærksomme på?';
    document.getElementById('fototilladelse-tekst').textContent = 'Fototilladelse: Jeg giver tilladelse til, at klubben må tage billeder/videoer af mit barn (valgfri)';
  }

  // --- Initial skift til 16+ ---
  switchTo16();

  // --- Knap-kliks for at skifte type ---
  btn16Tilmeld.addEventListener('click', switchTo16);
  btnJuniorTilmeld.addEventListener('click', switchToJunior);

  // --- Én samlet submit-håndtering ---
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // 1) Validation
    let valid = true;

    // Alder-validering
    const [d, m, y] = fødselsdagInput.value.split('-').map(Number);
    const bd = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - bd.getFullYear();
    if (today.getMonth() < bd.getMonth() ||
        (today.getMonth() === bd.getMonth() && today.getDate() < bd.getDate())) {
      age--;
    }

    if (form.dataset.type === '16+' && age < 16) {
    errorSpan.innerText = 'Vær venlig at bruge junior‑formularen til børn under 16 år.';
    errorSpan.style.display = 'block';
    valid = false;
    } else if (form.dataset.type === 'junior' && age >= 16) {
    errorSpan.innerText = 'Vær venlig at bruge 16+ formularen, hvis du er 16 år eller ældre.';
    errorSpan.style.display = 'block';
    valid = false;

    } else {
    errorSpan.style.display = 'none';
    }

    // Helbred-radio
    if (!helbredJa.checked && !helbredNej.checked) {
      helbredError.style.display = 'block';
      radioInputs.forEach(i => i.classList.add('error'));
      valid = false;
    } else {
      helbredError.style.display = 'none';
    }

    // Samtykke-checkboxes
    if (!ansvarsfraskrivelse.checked || !persondata.checked) {
      samtykkeError.style.display = 'block';
      valid = false;
    } else {
      samtykkeError.style.display = 'none';
    }

    // Email + telefon
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonPattern = /^\+?[0-9]{8,15}$/;

    if (!emailPattern.test(emailInput.value)) {
      emailInput.classList.add('error'); valid = false;
    } else {
      emailInput.classList.remove('error');
    }

    if (telefonInput.offsetParent !== null && !telefonPattern.test(telefonInput.value)) {
      telefonInput.classList.add('error'); valid = false;
    } else {
      telefonInput.classList.remove('error');
    }

    if (!telefonPattern.test(nødkontaktTelefonInput.value)) {
      nødkontaktTelefonInput.classList.add('error'); valid = false;
    } else {
      nødkontaktTelefonInput.classList.remove('error');
    }

    console.log('Form valid?:', valid);
    if (!valid) return;

    // 2) Byg payload i ønsket rækkefølge
    const isJunior = form.dataset.type === 'junior';
    const payload = {};

    if (!isJunior) {
      // 16+
      payload['type'] = '16+';
      payload['navn'] = form.navn.value;
      payload['email'] = form.email.value;
      payload['telefon'] = form.telefon.value;
      payload['adresse'] = form.adresse.value;
      payload['postnr'] = form.postnr.value;
      payload['by'] = form.by.value;
      payload['fødselsdag'] = form.fødselsdag.value;
      payload['nødkontakt'] = form['nødkontakt'].value;
      payload['nødkontakt-relation'] = form['nødkontakt-relation'].value;
      payload['nødkontakt-tlf'] = form['nødkontakt-tlf'].value;
      payload['helbred'] = form.helbred.value;
      payload['helbred-beskrivelse'] = form['helbred-beskrivelse'].value;
    } else {
      // Junior
      payload['type'] = 'junior';
      payload['barnets_navn'] = form.navn.value;
      payload['email'] = form.email.value;
      payload['forældre/værge_telefon'] = form['nødkontakt-tlf'].value;
      payload['adresse'] = form.adresse.value;
      payload['postnr'] = form.postnr.value;
      payload['by'] = form.by.value;
      payload['fødselsdag'] = form.fødselsdag.value;
      payload['forældre/værge_navn'] = form['nødkontakt'].value;
      payload['forældre/værge_relation'] = form['nødkontakt-relation'].value;
      payload['helbred'] = form.helbred.value;
      payload['helbred-beskrivelse'] = form['helbred-beskrivelse'].value;
    }

    // Checkbox-værdier (samme for begge)
    payload['ansvarsfraskrivelse'] = ansvarsfraskrivelse.checked ? 'Ja' : 'Nej';
    payload['persondata'] = persondata.checked ? 'Ja' : 'Nej';
    payload['fototilladelse'] = fototilladelse.checked ? 'Ja' : 'Nej';

    // 3) Send til Formspree som JSON
    fetch('https://formspree.io/f/mvgabajd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        alert('Fedt mand! Vi ses til træning! 👊');
        form.reset();
        switchTo16();
      } else {
        alert('Noget gik galt. Prøv igen.');
      }
    })
    .catch(() => {
      alert('Der opstod en fejl. Prøv igen.');
    });
  });
});



// Funktion til at vise den korrekte side baseret på URL'en
function handleRouting() {
    const path = window.location.pathname; // Henter URL'ens path (f.eks. "/om")
    const pages = document.querySelectorAll('.page'); // Henter alle sider

    // Skjuler alle sider
    pages.forEach(page => page.style.display = 'none');

    // Nulstil body-klassen
    document.body.className = '';

    // Viser den relevante side baseret på path og opdaterer body-klassen
    if (path === '/hjem') {
        document.getElementById('hjem-page').style.display = 'block';
        document.body.classList.add('hjem-page-active');
    } else if (path === '/seminarer') {
        document.getElementById('seminar-page').style.display = 'block';
        document.body.classList.add('seminar-page-active');
    } else if (path === '/tak') {
        document.getElementById('tak-page').style.display = 'block';
        document.body.classList.add('tak-page-active');
    } else if (path === '/fejl') {
        document.getElementById('fejl-page').style.display = 'block';
        document.body.classList.add('fejl-page-active');
    } else if (path === '/link') {
        document.getElementById('link-page').style.display = 'block';
        document.body.classList.add('link-page-active');
    } else if (path === '/om') {
        document.getElementById('om-page').style.display = 'block';
        document.body.classList.add('om-page-active');
    } else if (path === '/praktisk') {
        document.getElementById('praktisk-page').style.display = 'block';
        document.body.classList.add('praktisk-page-active');
    } else if (path === '/faq') {
        document.getElementById('faq-page').style.display = 'block';
        document.body.classList.add('faq-page-active');
    } else if (path === '/tilmeld') {
        document.getElementById('tilmeld-page').style.display = 'block';
        document.body.classList.add('tilmeld-page-active');
    } else if (path === '/booking') {
        document.getElementById('booking-page').style.display = 'block';
        document.body.classList.add('booking-page-active');
    } else if (path === '/betingelser-og-privatlivspolitik') {
        document.getElementById('betingelser-page').style.display = 'block';
        document.body.classList.add('betingelser-page-active');
    } else {
        // Standard: Vis forsiden
        document.getElementById('hjem-page').style.display = 'block';
        document.body.classList.add('hjem-page-active');
    }
}

// Lyt efter ændringer i URL'en
window.addEventListener('popstate', handleRouting);

// Kør routing-funktionen, når siden indlæses
window.onload = handleRouting;

// Funktion til at navigere til en ny side
function navigateTo(path) {
    window.history.pushState({}, '', path); // Opdater URL'en uden at genindlæse siden
    handleRouting(); // Opdater visningen
}

document.getElementById("seminar-knap").addEventListener("click", function() {
    document.getElementById("seminar-formular").classList.add("vis");
});

document.getElementById("seminar-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Forhindrer formularen i at blive sendt automatisk

    // Hent felterne
    const navn = document.getElementById("navn-seminar").value.trim();
    const email = document.getElementById("email-seminar").value.trim();
    const besked = document.getElementById("besked-seminar").value.trim();

    // Valider email med regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Tjek om alle felter er udfyldt og emailen er gyldig
    if (!navn || !email || !besked) {
        alert("Udfyld venligst alle felter.");
        return; // Stopper afsendelsen
    }

    if (!emailRegex.test(email)) {
        alert("Indtast venligst en gyldig emailadresse.");
        return; // Stopper afsendelsen
    }

    // Hvis valideringen er vellykket, send dataen via fetch
    const formData = new FormData(document.getElementById("seminar-form"));

    fetch(document.getElementById("seminar-form").action, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                alert("Du hører fra os!"); // Viser besked til brugeren
                document.getElementById("seminar-form").reset(); // Nulstil formularen
                document.getElementById("seminar-formular").classList.remove("vis"); // Luk popup
            } else {
                alert("Noget gik galt. Prøv igen.");
            }
        })
        .catch((error) => {
            alert("Der opstod en fejl. Prøv igen senere.");
        });
});

function closeForm() {
    const FormElement = document.getElementById("seminar-formular");
    FormElement.style.display = "none";
}