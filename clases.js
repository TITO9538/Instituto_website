const API_URL =
  "https://script.google.com/macros/s/AKfycbztOyUJVu9XlZrB1V_2gaNHM8eVytPVsZdLFGwl2cTOmLAMsiOk6nNqBHWmEt3BD7KmkQ/exec";

let classes = [];

let currentClassIndex = 0;

let currentPage = 0;

const datesPerPage = 4;

// ==========================
// ICONOS
// ==========================

function getAttendanceIcon(status) {
  if (status === "P") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-5 text-green-600">

        <path fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75
          9.75-9.75s9.75 4.365
          9.75 9.75-4.365 9.75-9.75
          9.75S2.25 17.385 2.25 12Zm13.36-1.814
          a.75.75 0 1 0-1.22-.872l-3.236
          4.53L9.53 12.22a.75.75 0 0
          0-1.06 1.06l2.25 2.25a.75.75
          0 0 0 1.14-.094l3.75-5.25Z"
          clip-rule="evenodd"/>

      </svg>
    `;
  }

  if (status === "p") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-5 text-yellow-500">

        <path fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75
          9.75-9.75s9.75 4.365
          9.75 9.75-4.365 9.75-9.75
          9.75S2.25 17.385 2.25 12Zm13.36-1.814
          a.75.75 0 1 0-1.22-.872l-3.236
          4.53L9.53 12.22a.75.75 0 0
          0-1.06 1.06l2.25 2.25a.75.75
          0 0 0 1.14-.094l3.75-5.25Z"
          clip-rule="evenodd"/>

      </svg>
    `;
  }

  if (status === "A") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-5 text-red-700">

        <path fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75
          9.75-9.75s9.75 4.365
          9.75 9.75-4.365 9.75-9.75
          9.75S2.25 17.385 2.25 12ZM12
          8.25a.75.75 0 0 1 .75.75v3.75
          a.75.75 0 0 1-1.5 0V9a.75.75
          0 0 1 .75-.75Zm0 8.25a.75.75
          0 1 0 0-1.5.75.75 0 0 0
          0 1.5Z"
          clip-rule="evenodd" />

      </svg>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-5 text-gray-400">

      <path fill-rule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75
        9.75-9.75s9.75 4.365 9.75
        9.75-4.365 9.75-9.75
        9.75S2.25 17.385 2.25 12Zm8.706-1.442
        c1.146-.573 2.437.463 2.126 1.706
        l-.709 2.836.042-.02a.75.75 0 0 1
        .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706
        l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34
        l.041-.022ZM12 9a.75.75 0 1 0
        0-1.5.75.75 0 0 0 0 1.5Z"
        clip-rule="evenodd" />

    </svg>
  `;
}

// ==========================
// FORMATEAR FECHA
// ==========================

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
  });
}

// ==========================
// CLASE ACTUAL
// ==========================

function getCurrentClass() {
  return classes[currentClassIndex];
}

// ==========================
// FECHAS VISIBLES
// ==========================

function getVisibleDates() {
  const currentClass = getCurrentClass();

  const start = currentPage * datesPerPage;

  return currentClass.dates.slice(start, start + datesPerPage);
}

// ==========================
// TITULO
// ==========================

function renderClassTitle() {
  const currentClass = getCurrentClass();

  const title = document.getElementById("classTitle");

  if (!title) return;

  title.textContent = currentClass.className;
}

// ==========================
// FECHAS
// ==========================

function renderDates() {
  const container = document.getElementById("datesContainer");

  const visibleDates = getVisibleDates();

  container.innerHTML = visibleDates
    .map(
      (date) => `
      <div class="rounded-full text-[10px]
        w-8 p-1 text-center bg-[#F5F0EB]">

        ${formatDate(date)}

      </div>
    `,
    )
    .join("");
}

// ==========================
// ALUMNOS
// ==========================

function renderStudents() {
  const currentClass = getCurrentClass();

  const container = document.getElementById("studentsContainer");

  const visibleDates = getVisibleDates();

  container.innerHTML = currentClass.students
    .map((student) => {
      return `
        <div class="w-85 border-b
          border-[#8D6E63]/35
          grid grid-cols-[163px_1fr]
          py-1">

          <div class="w-full text-[10px]
            flex items-center text-[#5D4037]">

            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="size-2 mr-1">

              <path fill-rule="evenodd"
                d="M18 10a8 8 0 1 1-16 0
                8 8 0 0 1 16 0Z"
                clip-rule="evenodd"/>

            </svg>

            <p class="font-semibold">
              ${student.name} ${student.lastname}
            </p>

          </div>

          <div class="w-full flex
            justify-between items-center pr-8">

            ${visibleDates
              .map((date) => {
                const attendanceEntries = Object.entries(student.attendance);

                const found = attendanceEntries.find(([key]) => {
                  return new Date(key).getTime() === new Date(date).getTime();
                });

                const status = found ? found[1] : "n/a";

                return getAttendanceIcon(status);
              })
              .join("")}

          </div>

        </div>
      `;
    })
    .join("");
}

// ==========================
// RENDER GENERAL
// ==========================

function render() {
  renderClassTitle();

  renderDates();

  renderStudents();
}

// ==========================
// PAGINAS
// ==========================

function nextPage() {
  const currentClass = getCurrentClass();

  const maxPage = Math.ceil(currentClass.dates.length / datesPerPage) - 1;

  if (currentPage < maxPage) {
    currentPage++;

    render();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;

    render();
  }
}

// ==========================
// CLASES
// ==========================

function nextClass() {
  if (currentClassIndex < classes.length - 1) {
    currentClassIndex++;

    currentPage = 0;

    render();
  }
}

function prevClass() {
  if (currentClassIndex > 0) {
    currentClassIndex--;

    currentPage = 0;

    render();
  }
}

// ==========================
// API
// ==========================

async function loadData() {
  try {
    const response = await fetch(API_URL);

    classes = await response.json();

    render();
  } catch (error) {
    console.error(error);

    alert("Error cargando datos");
  }
}

// ==========================
// EVENTOS
// ==========================

document.getElementById("nextBtn")?.addEventListener("click", nextPage);

document.getElementById("prevBtn")?.addEventListener("click", prevPage);

document.getElementById("nextClassBtn")?.addEventListener("click", nextClass);

document.getElementById("prevClassBtn")?.addEventListener("click", prevClass);

// ==========================
// MODAL
// ==========================

const addBtn = document.getElementById("addStudentBtn");

const modal = document.getElementById("studentModal");

const closeModalBtn = document.getElementById("closeModalBtn");

const checklistContainer = document.getElementById("attendanceChecklist");

const studentForm = document.getElementById("studentForm");

// ==========================
// ABRIR MODAL
// ==========================

if (addBtn) {
  addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");

    renderChecklist();
  });
}

// ==========================
// CERRAR MODAL
// ==========================

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

// ==========================
// CHECKLIST
// ==========================

function renderChecklist() {
  const current = getCurrentClass();

  checklistContainer.innerHTML = current.dates
    .map((date) => {
      return `
          <label class="flex items-center gap-2 text-sm">

            <input
              type="checkbox"
              value="${date}"
              class="attendanceCheck">

            ${formatDate(date)}

          </label>
        `;
    })
    .join("");
}

// ==========================
// GUARDAR ALUMNO
// ==========================

if (studentForm) {
  studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("nameInput").value.trim();

    const lastname = document.getElementById("lastnameInput").value.trim();

    if (!name || !lastname) {
      alert("Completa nombre y apellido");

      return;
    }

    const attendance = {};

    const current = getCurrentClass();

    current.dates.forEach((date) => {
      attendance[date] = "n/a";
    });

    const checked = document.querySelectorAll(".attendanceCheck:checked");

    checked.forEach((checkbox) => {
      attendance[checkbox.value] = "P";
    });

    const body = {
      action: "addStudent",

      className: current.className,

      name,

      lastname,

      attendance,
    };

    try {
      const params = new URLSearchParams();

      params.append("data", JSON.stringify(body));

      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });

      // esperar un poquito
      setTimeout(async () => {
        await loadData();

        render();
      }, 1000);

      modal.classList.add("hidden");

      studentForm.reset();
    } catch (error) {
      console.error(error);

      alert("Error guardando alumno");
    }
  });
}

// ==========================
// START
// ==========================

loadData();
