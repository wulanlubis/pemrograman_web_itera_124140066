"use strict";

// const: menyimpan key untuk localStorage.
const STORAGE_KEY = "studyspace_tasks_v1";

// Class untuk merepresentasikan satu tugas.
class TaskItem {
    constructor(title, course, deadline, priority, completed = false, id = null) {
        this.id = id ?? (
            globalThis.crypto?.randomUUID?.() ??
            `${Date.now()}-${Math.random().toString(16).slice(2)}`
        );
        this.title = title;
        this.course = course;
        this.deadline = deadline;
        this.priority = priority;
        this.completed = completed;
    }
}

// Class utama untuk mengatur aplikasi.
class DashboardApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.editingId = null;
        this.bindEvents();
        this.render();
        this.showDate();
        this.loadWeather();
    }

    // Membaca data tugas dari localStorage.
    loadTasks() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            const parsed = saved ? JSON.parse(saved) : [];

            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed
                .filter(task =>
                    task &&
                    typeof task.title === "string" &&
                    typeof task.course === "string" &&
                    typeof task.deadline === "string"
                )
                .map(task => new TaskItem(
                    task.title,
                    task.course,
                    task.deadline,
                    task.priority || "Sedang",
                    Boolean(task.completed),
                    task.id
                ));
        } catch (error) {
            console.error("Gagal membaca data tugas:", error);
            return [];
        }
    }

    // Menyimpan seluruh tugas.
    saveTasks() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
        } catch (error) {
            console.error("Gagal menyimpan tugas:", error);
            alert("Data tidak bisa disimpan. Periksa penyimpanan browser.");
        }
    }

    // Menghubungkan elemen HTML dengan event.
    bindEvents() {
        getElement("taskForm").addEventListener("submit", event => {
            this.handleSubmit(event);
        });

        getElement("cancelEdit").addEventListener("click", () => {
            this.resetForm();
        });

        getElement("searchInput").addEventListener("input", () => {
            this.render();
        });

        getElement("filterStatus").addEventListener("change", () => {
            this.render();
        });

        getElement("taskList").addEventListener("click", event => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;

            const { action, id } = button.dataset;

            if (action === "edit") this.editTask(id);
            if (action === "delete") this.deleteTask(id);
            if (action === "toggle") this.toggleTask(id);
        });

        getElement("taskList").addEventListener("change", event => {
            const checkbox = event.target.closest("input[data-action='toggle']");
            if (checkbox) this.toggleTask(checkbox.dataset.id);
        });

        getElement("refreshWeather").addEventListener("click", () => {
            this.loadWeather();
        });
    }

    // CREATE dan UPDATE: memproses form tugas.
    handleSubmit(event) {
        event.preventDefault();

        const title = getElement("taskTitle").value.trim();
        const course = getElement("taskCourse").value.trim();
        const deadline = getElement("taskDeadline").value;
        const priority = getElement("taskPriority").value;

        if (!title || !course || !deadline) {
            alert("Mohon lengkapi seluruh data tugas.");
            return;
        }

        if (!this.isValidDate(deadline)) {
            alert("Tanggal deadline tidak valid.");
            return;
        }

        if (this.editingId) {
            const task = this.tasks.find(item => item.id === this.editingId);

            if (task) {
                Object.assign(task, { title, course, deadline, priority });
            }
        } else {
            const newTask = new TaskItem(title, course, deadline, priority);
            this.tasks = [...this.tasks, newTask];
        }

        this.saveTasks();
        this.resetForm();
        this.render();
    }

    // MEMPERBAIKI VALIDASI TANGGAL (Bebas Masalah Timezone UTC)
    isValidDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    }

    // Mengisi form saat tugas diedit.
    editTask(id) {
        const task = this.tasks.find(item => item.id === id);
        if (!task) return;

        this.editingId = id;
        getElement("taskTitle").value = task.title;
        getElement("taskCourse").value = task.course;
        getElement("taskDeadline").value = task.deadline;
        getElement("taskPriority").value = task.priority;

        getElement("formTitle").textContent = "Edit Tugas";
        getElement("submitBtn").textContent = "Simpan Perubahan";
        getElement("cancelEdit").classList.remove("hidden");

        getElement("taskTitle").focus();
    }

    // DELETE: menghapus tugas.
    deleteTask(id) {
        const task = this.tasks.find(item => item.id === id);
        if (!task) return;

        const confirmed = confirm(`Hapus tugas "${task.title}"?`);
        if (!confirmed) return;

        this.tasks = this.tasks.filter(item => item.id !== id);

        if (this.editingId === id) {
            this.resetForm();
        }

        this.saveTasks();
        this.render();
    }

    // Mengubah status selesai/belum selesai.
    toggleTask(id) {
        const task = this.tasks.find(item => item.id === id);
        if (!task) return;

        task.completed = !task.completed;
        this.saveTasks();
        this.render();
    }

    resetForm() {
        getElement("taskForm").reset();
        this.editingId = null;

        getElement("formTitle").textContent = "Tambah Tugas";
        getElement("submitBtn").textContent = "+ Simpan Tugas";
        getElement("cancelEdit").classList.add("hidden");
    }

    // Memperbarui ringkasan dan daftar tugas.
    render() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(isTaskCompleted).length;
        const pending = total - completed;

        getElement("totalTasks").textContent = total;
        getElement("pendingTasks").textContent = pending;
        getElement("completedTasks").textContent = completed;

        const keyword = getElement("searchInput").value.trim().toLowerCase();
        const status = getElement("filterStatus").value;

        const visibleTasks = this.tasks
            .filter(task => {
                const matchesKeyword =
                    task.title.toLowerCase().includes(keyword) ||
                    task.course.toLowerCase().includes(keyword);

                const matchesStatus =
                    status === "Semua" ||
                    (status === "Selesai" && task.completed) ||
                    (status === "Belum" && !task.completed);

                return matchesKeyword && matchesStatus;
            })
            .sort(sortTasksByDeadline);

        getElement("taskCount").textContent =
            `${visibleTasks.length} tugas ditampilkan`;

        getElement("emptyState").classList.toggle(
            "hidden",
            visibleTasks.length > 0
        );

        getElement("taskList").innerHTML = visibleTasks
            .map(task => this.taskTemplate(task))
            .join("");
    }

    // Template literal untuk membuat kartu tugas.
    taskTemplate(task) {
        const { id, title, course, deadline, priority, completed } = task;
        
        // Membaca string tanggal secara lokal tanpa jam agar aman
        const [year, month, day] = deadline.split("-").map(Number);
        const deadlineDate = new Date(year, month - 1, day);
        
        const formattedDeadline = deadlineDate.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const overdue = !completed && deadlineDate < today;
        const safeId = this.escapeHTML(id);
        const safeTitle = this.escapeHTML(title);
        const safeCourse = this.escapeHTML(course);
        const safePriority = ["Rendah", "Sedang", "Tinggi"].includes(priority)
            ? priority
            : "Sedang";

        return `
            <article class="task-item ${completed ? "completed" : ""}">
                <div class="task-main">
                    <input
                        class="task-check"
                        type="checkbox"
                        data-action="toggle"
                        data-id="${safeId}"
                        aria-label="Tandai ${safeTitle} selesai"
                        ${completed ? "checked" : ""}
                    >

                    <div class="task-details">
                        <h3>${safeTitle}</h3>
                        <p>${safeCourse}</p>
                        <div class="task-meta">
                            <span class="pill priority-${safePriority}">
                                ${safePriority}
                            </span>
                            <span class="${overdue ? "overdue" : "muted"}">
                                📅 ${formattedDeadline}
                                ${overdue ? " · Terlambat" : ""}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="task-actions">
                    <button class="edit-btn" data-action="edit" data-id="${safeId}">
                        Edit
                    </button>
                    <button class="delete-btn" data-action="delete" data-id="${safeId}">
                        Hapus
                    </button>
                    <button class="toggle-btn" data-action="toggle" data-id="${safeId}">
                        ${completed ? "Belum Selesai" : "Selesai"}
                    </button>
                </div>
            </article>
        `;
    }

    // Menghindari input teks pengguna diperlakukan sebagai HTML.
    escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    showDate() {
        const now = new Date();

        getElement("today").textContent = now.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        getElement("year").textContent = now.getFullYear();
    }

    // Async/await dan Fetch API untuk mengambil data cuaca.
    async loadWeather() {
        const content = getElement("weatherContent");
        const button = getElement("refreshWeather");

        content.textContent = "Mengambil data cuaca...";
        button.disabled = true;

        try {
            // Koordinat sekitar ITERA, Lampung.
            const latitude = -5.36;
            const longitude = 105.31;

            const url = new URL("https://api.open-meteo.com/v1/forecast");
            url.search = new URLSearchParams({
                latitude,
                longitude,
                current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
                timezone: "Asia/Jakarta"
            }).toString();

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            const current = data.current;

            if (!current) {
                throw new Error("Data cuaca tidak tersedia.");
            }

            content.innerHTML = `
                <div class="weather-info">
                    <div class="weather-stat">
                        <p>Kondisi</p>
                        <strong>${this.weatherDescription(current.weather_code)}</strong>
                    </div>
                    <div class="weather-stat">
                        <p>Suhu</p>
                        <strong>${Number(current.temperature_2m).toFixed(1)} °C</strong>
                    </div>
                    <div class="weather-stat">
                        <p>Kelembapan</p>
                        <strong>${Number(current.relative_humidity_2m)}%</strong>
                    </div>
                    <div class="weather-stat">
                        <p>Kecepatan Angin</p>
                        <strong>${Number(current.wind_speed_10m).toFixed(1)} km/jam</strong>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error("Gagal mengambil data cuaca:", error);
            content.textContent =
                "Data cuaca belum bisa dimuat. Periksa koneksi internet lalu coba lagi.";
        } finally {
            button.disabled = false;
        }
    }

    weatherDescription(code) {
        if (code === 0) return "Cerah ☀️";
        if ([1, 2].includes(code)) return "Cerah Berawan 🌤️";
        if (code === 3) return "Berawan ☁️";
        if ([45, 48].includes(code)) return "Berkabut 🌫️";
        if ([51, 53, 55, 56, 57].includes(code)) return "Gerimis 🌦️";
        if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Hujan 🌧️";
        if ([71, 73, 75, 77, 85, 86].includes(code)) return "Salju";
        if ([95, 96, 99].includes(code)) return "Badai Petir ⛈️";
        return "Tidak diketahui";
    }
}

// Arrow functions: helper untuk mencari elemen dan mengolah tugas.
const getElement = id => document.getElementById(id);
const isTaskCompleted = task => task.completed;
const sortTasksByDeadline = (a, b) =>
    a.deadline.localeCompare(b.deadline) ||
    a.title.localeCompare(b.title);

// Memulai aplikasi setelah seluruh kode didefinisikan.
const app = new DashboardApp();