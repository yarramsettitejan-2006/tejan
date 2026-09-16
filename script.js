/* =========================================================
   CAPACITY CONNECT
   Frontend JavaScript
   Backend can be connected later
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       INITIAL SETUP
       ===================================================== */

    const app = {
        currentUser: JSON.parse(localStorage.getItem("cc_currentUser")) || null,
        users: JSON.parse(localStorage.getItem("cc_users")) || [],
        courses: JSON.parse(localStorage.getItem("cc_courses")) || [],
        enrollments: JSON.parse(localStorage.getItem("cc_enrollments")) || [],
        announcements: JSON.parse(localStorage.getItem("cc_announcements")) || [],
        achievements: JSON.parse(localStorage.getItem("cc_achievements")) || []
    };

    /* =====================================================
       LOCAL STORAGE
       ===================================================== */

    function saveData() {
        localStorage.setItem("cc_users", JSON.stringify(app.users));
        localStorage.setItem("cc_courses", JSON.stringify(app.courses));
        localStorage.setItem("cc_enrollments", JSON.stringify(app.enrollments));
        localStorage.setItem("cc_announcements", JSON.stringify(app.announcements));
        localStorage.setItem("cc_achievements", JSON.stringify(app.achievements));

        if (app.currentUser) {
            localStorage.setItem(
                "cc_currentUser",
                JSON.stringify(app.currentUser)
            );
        }
    }

    /* =====================================================
       DEMO DATA
       ===================================================== */

    if (app.courses.length === 0) {

        app.courses = [
            {
                id: 1,
                title: "Weather Forecasting Fundamentals",
                category: "Meteorology",
                trainer: "Dr. Arun Kumar",
                duration: "6 Weeks",
                level: "Beginner",
                students: 128,
                progress: 0,
                description:
                    "Learn the fundamental principles of weather forecasting, observation and analysis."
            },
            {
                id: 2,
                title: "Climate Change and Its Impacts",
                category: "Climate Science",
                trainer: "Dr. Priya Sharma",
                duration: "4 Weeks",
                level: "Intermediate",
                students: 96,
                progress: 0,
                description:
                    "Understand climate change, its causes, impacts and adaptation strategies."
            },
            {
                id: 3,
                title: "Disaster Risk Management",
                category: "Disaster Management",
                trainer: "Prof. Ravi Teja",
                duration: "5 Weeks",
                level: "Intermediate",
                students: 74,
                progress: 0,
                description:
                    "Learn disaster preparedness, response and risk reduction techniques."
            },
            {
                id: 4,
                title: "Satellite Meteorology",
                category: "Technology",
                trainer: "Dr. Meena Rao",
                duration: "8 Weeks",
                level: "Advanced",
                students: 52,
                progress: 0,
                description:
                    "Explore satellite data and its applications in meteorology."
            },
            {
                id: 5,
                title: "UI/UX Design Essentials",
                category: "UI/UX Design",
                trainer: "Ananya Rao",
                duration: "5 Weeks",
                level: "Beginner",
                students: 142,
                progress: 0,
                description:
                    "Design intuitive digital products with research, wireframes and prototypes."
            },
            {
                id: 6,
                title: "Java Full-Stack Development",
                category: "Java",
                trainer: "Vikram Singh",
                duration: "8 Weeks",
                level: "Intermediate",
                students: 187,
                progress: 0,
                description:
                    "Build scalable web applications with Java, Spring Boot and REST APIs."
            },
            {
                id: 7,
                title: "Python Programming Bootcamp",
                category: "Python",
                trainer: "Maya Joseph",
                duration: "6 Weeks",
                level: "Beginner",
                students: 216,
                progress: 0,
                description:
                    "Learn Python fundamentals and automate real-world tasks with confidence."
            },
            {
                id: 8,
                title: "Data Analytics with Excel & SQL",
                category: "Data Analytics",
                trainer: "Rohan Mehta",
                duration: "5 Weeks",
                level: "Intermediate",
                students: 154,
                progress: 0,
                description:
                    "Turn business data into clear insights using spreadsheets, SQL and dashboards."
            },
            {
                id: 9,
                title: "AI & Machine Learning Foundations",
                category: "AI & Machine Learning",
                trainer: "Dr. Neha Kapoor",
                duration: "7 Weeks",
                level: "Intermediate",
                students: 198,
                progress: 0,
                description:
                    "Understand modern AI concepts and build your first machine learning workflow."
            }
        ];

        saveData();
    }

    /* =====================================================
       TOAST
       ===================================================== */

    window.showToast = function(message, type = "success") {

        let toast = document.getElementById("toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast";
            toast.className = "toast";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    };


    /* =====================================================
       MODALS
       ===================================================== */

    window.openModal = function(id) {
        const modal = document.getElementById(id);

        if (modal) {
            modal.classList.add("active");
            modal.style.display = "flex";
        }
    };


    window.closeModal = function(id) {
        const modal = document.getElementById(id);

        if (modal) {
            modal.classList.remove("active");
            modal.style.display = "none";
        }
    };


    document.addEventListener("click", (event) => {

        if (event.target.classList.contains("modal")) {
            event.target.classList.remove("active");
            event.target.style.display = "none";
        }

    });


    /* =====================================================
       LOGIN / REGISTER
       ===================================================== */

    let selectedRole = "trainee";

    window.selectRole = function(role) {

        selectedRole = role;

        document.querySelectorAll(".role-card").forEach(card => {
            card.classList.remove("selected");
        });

        const selected = document.querySelector(
            `.role-card[data-role="${role}"]`
        );

        if (selected) {
            selected.classList.add("selected");
        }
    };


    window.registerUser = function(event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName")?.value.trim();

        const email =
            document.getElementById("registerEmail")?.value.trim();

        const password =
            document.getElementById("registerPassword")?.value;

        const organization =
            document.getElementById("registerOrganization")?.value.trim() || "";


        if (!name || !email || !password) {
            showToast("Please fill all required fields", "error");
            return;
        }


        const existingUser = app.users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );


        if (existingUser) {
            showToast("Email already registered", "error");
            return;
        }


        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            organization,
            role: selectedRole,
            approved: selectedRole === "trainee",
            profileCompleted: 20,
            certificates: [],
            createdAt: new Date().toISOString()
        };


        app.users.push(newUser);
        saveData();

        showToast("Registration successful!");

        setTimeout(() => {

            closeModal("registerModal");

            openModal("loginModal");

        }, 1000);
    };


    window.loginUser = function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail")?.value.trim();

        const password =
            document.getElementById("loginPassword")?.value;


        if (!email || !password) {
            showToast("Enter email and password", "error");
            return;
        }


        /* Demo admin accounts */

        if (
            email === "admin@capacityconnect.com" &&
            password === "admin123"
        ) {

            app.currentUser = {
                id: "admin",
                name: "System Administrator",
                email,
                role: "admin",
                approved: true
            };

            saveData();

            closeModal("loginModal");

            showDashboard("admin");

            showToast("Welcome Administrator!");

            return;
        }


        const user = app.users.find(
            item =>
                item.email.toLowerCase() === email.toLowerCase() &&
                item.password === password
        );


        if (!user) {
            showToast("Invalid email or password", "error");
            return;
        }


        if (user.role !== "trainee" && !user.approved) {
            showToast(
                "Your account is waiting for administrator approval",
                "error"
            );

            return;
        }


        app.currentUser = user;

        saveData();

        closeModal("loginModal");

        showDashboard(user.role);

        showToast(`Welcome ${user.name}!`);
    };


    window.logout = function() {

        app.currentUser = null;

        localStorage.removeItem("cc_currentUser");

        location.reload();
    };


    /* =====================================================
       PAGE NAVIGATION
       ===================================================== */

    window.showPage = function(pageId) {

        document.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active");
        });


        const page = document.getElementById(pageId);

        if (page) {
            page.classList.add("active");
        }


        document.querySelectorAll(".sidebar-link").forEach(link => {
            link.classList.remove("active");
        });


        const activeLink =
            document.querySelector(`[data-page="${pageId}"]`);

        if (activeLink) {
            activeLink.classList.add("active");
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        if (pageId === "coursesPage") {
            renderCourses();
        }

        if (pageId === "traineeDashboard") {
            renderTraineeDashboard();
        }

        if (pageId === "adminUsersPage") {
            renderUsers();
        }

        if (pageId === "adminCoursesPage") {
            renderAdminCourses();
        }

        if (pageId === "adminAnnouncementsPage") {
            renderAnnouncements();
        }

    };


    /* =====================================================
       DASHBOARD SWITCHING
       ===================================================== */

    window.showDashboard = function(role) {

        document
            .querySelectorAll(".landing-content")
            .forEach(element => {
                element.style.display = "none";
            });


        document
            .querySelectorAll(".dashboard-container")
            .forEach(element => {
                element.style.display = "none";
            });


        if (role === "trainee") {

            const dashboard =
                document.getElementById("traineeDashboardContainer");

            if (dashboard) {
                dashboard.style.display = "flex";
            }

            renderTraineeDashboard();

        }


        else if (role === "trainer") {

            const dashboard =
                document.getElementById("trainerDashboardContainer");

            if (dashboard) {
                dashboard.style.display = "flex";
            }

            renderTrainerDashboard();

        }


        else if (role === "admin") {

            const dashboard =
                document.getElementById("adminDashboardContainer");

            if (dashboard) {
                dashboard.style.display = "flex";
            }

            renderAdminDashboard();
        }


        document.body.classList.add("dashboard-mode");
    };


    window.showLanding = function() {

        document
            .querySelectorAll(".dashboard-container")
            .forEach(element => {
                element.style.display = "none";
            });


        document
            .querySelectorAll(".landing-content")
            .forEach(element => {
                element.style.display = "";
            });


        document.body.classList.remove("dashboard-mode");
    };


    /* =====================================================
       COURSES
       ===================================================== */

    window.renderCourses = function() {

        const container =
            document.getElementById("coursesContainer");

        if (!container) return;


        container.innerHTML = "";


        app.courses.forEach(course => {

            const enrolled =
                app.enrollments.some(
                    item =>
                        item.userId === app.currentUser?.id &&
                        item.courseId === course.id
                );


            container.innerHTML += `

                <div class="course-card">

                    <div class="course-image">
                        <span>${course.category}</span>
                    </div>

                    <div class="course-content">

                        <h3>${course.title}</h3>

                        <p>${course.description}</p>

                        <div class="course-info">

                            <span>👨‍🏫 ${course.trainer}</span>

                            <span>⏱ ${course.duration}</span>

                            <span>📊 ${course.level}</span>

                        </div>

                        <button
                            class="btn primary"
                            onclick="viewCourse(${course.id})">

                            ${enrolled ? "Continue Course" : "View Course"}

                        </button>

                    </div>

                </div>
            `;
        });
    };


    window.viewCourse = function(courseId) {

        const course =
            app.courses.find(item => item.id === courseId);

        if (!course) return;


        const modal =
            document.getElementById("courseModal");

        if (!modal) {
            showToast(course.title);
            return;
        }


        const content =
            modal.querySelector(".course-modal-content");


        if (content) {

            const enrolled =
                app.enrollments.some(
                    item =>
                        item.userId === app.currentUser?.id &&
                        item.courseId === course.id
                );


            content.innerHTML = `

                <button
                    class="modal-close"
                    onclick="closeModal('courseModal')">
                    ×
                </button>

                <h2>${course.title}</h2>

                <p>${course.description}</p>

                <hr>

                <p><strong>Trainer:</strong> ${course.trainer}</p>

                <p><strong>Duration:</strong> ${course.duration}</p>

                <p><strong>Level:</strong> ${course.level}</p>

                <p><strong>Category:</strong> ${course.category}</p>

                <button
                    class="btn primary"
                    onclick="enrollCourse(${course.id})">

                    ${enrolled ? "Continue Learning" : "Enroll Now"}

                </button>
            `;
        }


        openModal("courseModal");
    };


    window.enrollCourse = function(courseId) {

        if (!app.currentUser) {

            closeModal("courseModal");

            openModal("loginModal");

            showToast("Please login first", "error");

            return;
        }


        const alreadyEnrolled =
            app.enrollments.some(
                item =>
                    item.userId === app.currentUser.id &&
                    item.courseId === courseId
            );


        if (alreadyEnrolled) {

            closeModal("courseModal");

            showPage("myCoursesPage");

            return;
        }


        app.enrollments.push({

            id: Date.now(),

            userId: app.currentUser.id,

            courseId,

            progress: 0,

            enrolledAt: new Date().toISOString()

        });


        saveData();

        closeModal("courseModal");

        showToast("Course enrolled successfully!");

        renderCourses();

        renderTraineeDashboard();
    };


    /* =====================================================
       TRAINEE DASHBOARD
       ===================================================== */

    function renderTraineeDashboard() {

        if (!app.currentUser) return;


        const nameElements =
            document.querySelectorAll(".user-name");

        nameElements.forEach(element => {
            element.textContent = app.currentUser.name;
        });


        const userEnrollments =
            app.enrollments.filter(
                item => item.userId === app.currentUser.id
            );


        const totalCourses =
            document.querySelectorAll(".total-courses");

        totalCourses.forEach(element => {
            element.textContent = userEnrollments.length;
        });


        const courseContainer =
            document.getElementById("myCoursesContainer");


        if (!courseContainer) return;


        courseContainer.innerHTML = "";


        userEnrollments.forEach(enrollment => {

            const course =
                app.courses.find(
                    item => item.id === enrollment.courseId
                );


            if (!course) return;


            courseContainer.innerHTML += `

                <div class="dashboard-course-card">

                    <h3>${course.title}</h3>

                    <p>${course.category}</p>

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width:${enrollment.progress}%">
                        </div>

                    </div>

                    <p>${enrollment.progress}% completed</p>

                    <button
                        class="btn primary"
                        onclick="continueCourse(${course.id})">

                        Continue

                    </button>

                </div>
            `;
        });
    }


    window.continueCourse = function(courseId) {

        const enrollment =
            app.enrollments.find(
                item =>
                    item.userId === app.currentUser.id &&
                    item.courseId === courseId
            );


        if (!enrollment) return;


        if (enrollment.progress < 100) {

            enrollment.progress += 10;

            if (enrollment.progress > 100) {
                enrollment.progress = 100;
            }

            saveData();

            renderTraineeDashboard();

            showToast(
                `Learning progress: ${enrollment.progress}%`
            );

        }

        else {

            showToast("Course completed!");
        }
    };


    /* =====================================================
       ASSESSMENT
       ===================================================== */

    const assessmentQuestions = [

        {
            question: "What does IMD stand for?",
            options: [
                "Indian Meteorological Department",
                "International Meteorology Division",
                "Indian Marine Department",
                "India Measurement Department"
            ],
            answer: 0
        },

        {
            question:
                "Which instrument is commonly used to measure temperature?",
            options: [
                "Barometer",
                "Thermometer",
                "Anemometer",
                "Rain Gauge"
            ],
            answer: 1
        },

        {
            question:
                "Which instrument measures atmospheric pressure?",
            options: [
                "Thermometer",
                "Barometer",
                "Hygrometer",
                "Wind vane"
            ],
            answer: 1
        },

        {
            question:
                "Which instrument measures wind speed?",
            options: [
                "Anemometer",
                "Barometer",
                "Thermometer",
                "Rain Gauge"
            ],
            answer: 0
        },

        {
            question:
                "What is climate?",
            options: [
                "Weather at one moment",
                "Long-term pattern of weather",
                "Only rainfall",
                "Only temperature"
            ],
            answer: 1
        }

    ];


    window.startAssessment = function() {

        const container =
            document.getElementById("assessmentContainer");

        if (!container) return;


        container.innerHTML = `

            <div class="assessment-header">

                <h2>Weather & Climate Assessment</h2>

                <p>Answer all questions and submit your assessment.</p>

            </div>

            <form id="assessmentForm">

                ${assessmentQuestions.map((q, index) => `

                    <div class="question-card">

                        <h3>
                            ${index + 1}. ${q.question}
                        </h3>

                        ${q.options.map((option, optionIndex) => `

                            <label class="answer-option">

                                <input
                                    type="radio"
                                    name="question${index}"
                                    value="${optionIndex}"
                                >

                                ${option}

                            </label>

                        `).join("")}

                    </div>

                `).join("")}

                <button
                    type="submit"
                    class="btn primary">

                    Submit Assessment

                </button>

            </form>
        `;


        document
            .getElementById("assessmentForm")
            ?.addEventListener(
                "submit",
                submitAssessment
            );
    };


    function submitAssessment(event) {

        event.preventDefault();


        let score = 0;


        assessmentQuestions.forEach((question, index) => {

            const answer =
                document.querySelector(
                    `input[name="question${index}"]:checked`
                );


            if (
                answer &&
                Number(answer.value) === question.answer
            ) {
                score++;
            }
        });


        const percentage =
            Math.round(
                (score / assessmentQuestions.length) * 100
            );


        const container =
            document.getElementById("assessmentContainer");


        container.innerHTML = `

            <div class="assessment-result">

                <h2>Assessment Completed 🎉</h2>

                <div class="score">

                    ${percentage}%

                </div>

                <p>
                    You answered ${score}
                    out of ${assessmentQuestions.length}
                    questions correctly.
                </p>

                ${
                    percentage >= 60
                        ? `<p class="success-text">
                            Congratulations! You passed.
                           </p>`
                        : `<p class="error-text">
                            Keep learning and try again.
                           </p>`
                }

                <button
                    class="btn primary"
                    onclick="showPage('traineeDashboard')">

                    Back to Dashboard

                </button>

            </div>
        `;
    }


    /* =====================================================
       PROFILE
       ===================================================== */

    window.saveProfile = function(event) {

        event.preventDefault();


        if (!app.currentUser) return;


        const user =
            app.users.find(
                item => item.id === app.currentUser.id
            );


        if (!user) return;


        const name =
            document.getElementById("profileName")?.value;

        const organization =
            document.getElementById("profileOrganization")?.value;

        const qualification =
            document.getElementById("profileQualification")?.value;

        const skills =
            document.getElementById("profileSkills")?.value;


        if (name) user.name = name;

        if (organization) user.organization = organization;

        user.qualification = qualification || "";

        user.skills = skills || "";

        user.profileCompleted = 100;


        app.currentUser = user;

        saveData();


        document
            .querySelectorAll(".user-name")
            .forEach(element => {
                element.textContent = user.name;
            });


        showToast("Profile updated successfully!");
    };


    /* =====================================================
       TRAINER DASHBOARD
       ===================================================== */

    function renderTrainerDashboard() {

        if (!app.currentUser) return;


        document
            .querySelectorAll(".user-name")
            .forEach(element => {
                element.textContent = app.currentUser.name;
            });


        const trainerCourses =
            app.courses.filter(
                course =>
                    course.trainer === app.currentUser.name
            );


        const element =
            document.getElementById("trainerCourseCount");


        if (element) {
            element.textContent = trainerCourses.length;
        }
    }


    /* =====================================================
       TRAINER - CREATE COURSE
       ===================================================== */

    window.createCourse = function(event) {

        event.preventDefault();


        const title =
            document.getElementById("courseTitle")?.value.trim();

        const category =
            document.getElementById("courseCategory")?.value;

        const duration =
            document.getElementById("courseDuration")?.value.trim();

        const level =
            document.getElementById("courseLevel")?.value;

        const description =
            document.getElementById("courseDescription")?.value.trim();


        if (!title || !category || !duration) {

            showToast(
                "Please fill the required course details",
                "error"
            );

            return;
        }


        const course = {

            id: Date.now(),

            title,

            category,

            duration,

            level,

            description,

            trainer:
                app.currentUser?.name || "Trainer",

            students: 0,

            progress: 0

        };


        app.courses.push(course);

        saveData();


        event.target.reset();


        showToast("Course created successfully!");

        renderCourses();

        renderTrainerDashboard();
    };


    /* =====================================================
       QUESTIONNAIRE
       ===================================================== */

    window.createQuestionnaire = function(event) {

        event.preventDefault();


        const title =
            document.getElementById("questionnaireTitle")
                ?.value.trim();

        const deadline =
            document.getElementById("questionnaireDeadline")
                ?.value;


        if (!title || !deadline) {

            showToast(
                "Enter questionnaire title and deadline",
                "error"
            );

            return;
        }


        const questionnaires =
            JSON.parse(
                localStorage.getItem("cc_questionnaires") || "[]"
            );


        questionnaires.push({

            id: Date.now(),

            title,

            deadline,

            trainer: app.currentUser?.name,

            createdAt: new Date().toISOString()

        });


        localStorage.setItem(
            "cc_questionnaires",
            JSON.stringify(questionnaires)
        );


        event.target.reset();

        showToast("Questionnaire created successfully!");
    };


    /* =====================================================
       TRAINER LIBRARY
       ===================================================== */

    window.addLibraryResource = function() {

        const title =
            document.getElementById("resourceTitle")?.value.trim();

        const type =
            document.getElementById("resourceType")?.value;


        if (!title) {

            showToast(
                "Enter resource title",
                "error"
            );

            return;
        }


        const resources =
            JSON.parse(
                localStorage.getItem("cc_resources") || "[]"
            );


        resources.push({

            id: Date.now(),

            title,

            type,

            trainer: app.currentUser?.name,

            date: new Date().toISOString()

        });


        localStorage.setItem(
            "cc_resources",
            JSON.stringify(resources)
        );


        showToast("Resource added to library!");

        document
            .getElementById("resourceTitle")
            ?.value = "";
    };


    /* =====================================================
       ADMIN DASHBOARD
       ===================================================== */

    function renderAdminDashboard() {

        const usersCount =
            document.getElementById("adminUsersCount");

        const coursesCount =
            document.getElementById("adminCoursesCount");

        const enrollmentsCount =
            document.getElementById("adminEnrollmentsCount");


        if (usersCount) {
            usersCount.textContent = app.users.length;
        }


        if (coursesCount) {
            coursesCount.textContent = app.courses.length;
        }


        if (enrollmentsCount) {
            enrollmentsCount.textContent =
                app.enrollments.length;
        }
    }


    /* =====================================================
       ADMIN USERS
       ===================================================== */

    function renderUsers() {

        const container =
            document.getElementById("usersTableBody");

        if (!container) return;


        container.innerHTML = "";


        app.users.forEach(user => {

            container.innerHTML += `

                <tr>

                    <td>${user.name}</td>

                    <td>${user.email}</td>

                    <td>${user.role}</td>

                    <td>

                        ${
                            user.approved
                                ? `<span class="status approved">
                                    Approved
                                   </span>`
                                : `<span class="status pending">
                                    Pending
                                   </span>`
                        }

                    </td>

                    <td>

                        ${
                            !user.approved
                                ? `
                                <button
                                    class="btn small primary"
                                    onclick="approveUser(${user.id})">

                                    Approve

                                </button>
                                `
                                : `
                                <button
                                    class="btn small"
                                    onclick="changeUserRole(${user.id})">

                                    Change Role

                                </button>
                                `
                        }

                    </td>

                </tr>
            `;
        });
    }


    window.approveUser = function(userId) {

        const user =
            app.users.find(item => item.id === userId);


        if (!user) return;


        user.approved = true;

        saveData();

        renderUsers();

        showToast(`${user.name} approved successfully!`);
    };


    window.changeUserRole = function(userId) {

        const user =
            app.users.find(item => item.id === userId);


        if (!user) return;


        if (user.role === "trainee") {

            user.role = "trainer";

        }

        else {

            user.role = "trainee";

        }


        saveData();

        renderUsers();

        showToast("User role updated!");
    };


    /* =====================================================
       ADMIN COURSES
       ===================================================== */

    function renderAdminCourses() {

        const container =
            document.getElementById("adminCoursesTableBody");

        if (!container) return;


        container.innerHTML = "";


        app.courses.forEach(course => {

            container.innerHTML += `

                <tr>

                    <td>${course.title}</td>

                    <td>${course.category}</td>

                    <td>${course.trainer}</td>

                    <td>${course.students}</td>

                    <td>

                        <button
                            class="btn small"
                            onclick="deleteCourse(${course.id})">

                            Delete

                        </button>

                    </td>

                </tr>
            `;
        });
    }


    window.deleteCourse = function(courseId) {

        const confirmed =
            confirm(
                "Are you sure you want to delete this course?"
            );


        if (!confirmed) return;


        app.courses =
            app.courses.filter(
                course => course.id !== courseId
            );


        app.enrollments =
            app.enrollments.filter(
                enrollment =>
                    enrollment.courseId !== courseId
            );


        saveData();

        renderAdminCourses();

        renderCourses();

        showToast("Course deleted");
    };


    /* =====================================================
       ADMIN ANNOUNCEMENTS
       ===================================================== */

    window.publishAnnouncement = function(event) {

        event.preventDefault();


        const title =
            document.getElementById("announcementTitle")
                ?.value.trim();

        const message =
            document.getElementById("announcementMessage")
                ?.value.trim();


        if (!title || !message) {

            showToast(
                "Please enter announcement details",
                "error"
            );

            return;
        }


        app.announcements.push({

            id: Date.now(),

            title,

            message,

            date: new Date().toISOString()

        });


        saveData();

        event.target.reset();

        renderAnnouncements();

        showToast("Announcement published!");
    };


    function renderAnnouncements() {

        const container =
            document.getElementById("announcementsContainer");

        if (!container) return;


        container.innerHTML = "";


        app.announcements.forEach(item => {

            container.innerHTML += `

                <div class="announcement-card">

                    <h3>${item.title}</h3>

                    <p>${item.message}</p>

                    <small>
                        ${new Date(item.date).toLocaleDateString()}
                    </small>

                </div>
            `;
        });
    }


    /* =====================================================
       ADMIN ACHIEVEMENTS
       ===================================================== */

    window.publishAchievement = function(event) {

        event.preventDefault();


        const title =
            document.getElementById("achievementTitle")
                ?.value.trim();

        const description =
            document.getElementById("achievementDescription")
                ?.value.trim();


        if (!title || !description) {

            showToast(
                "Please enter achievement details",
                "error"
            );

            return;
        }


        app.achievements.push({

            id: Date.now(),

            title,

            description,

            date: new Date().toISOString()

        });


        saveData();

        event.target.reset();

        showToast("Achievement published!");
    };


    /* =====================================================
       SEARCH COURSES
       ===================================================== */

    window.searchCourses = function() {

        const input =
            document.getElementById("courseSearch");

        const value =
            input?.value.toLowerCase().trim();


        const cards =
            document.querySelectorAll(".course-card");


        cards.forEach(card => {

            const text =
                card.textContent.toLowerCase();


            if (text.includes(value)) {

                card.style.display = "";

            }

            else {

                card.style.display = "none";

            }

        });
    };


    /* =====================================================
       FILTER COURSES
       ===================================================== */

    window.filterCourses = function(category) {

        const cards =
            document.querySelectorAll(".course-card");


        cards.forEach(card => {

            if (
                category === "all" ||
                card.textContent
                    .toLowerCase()
                    .includes(category.toLowerCase())
            ) {

                card.style.display = "";

            }

            else {

                card.style.display = "none";

            }

        });
    };


    /* =====================================================
       MOBILE SIDEBAR
       ===================================================== */

    window.toggleSidebar = function() {

        const sidebar =
            document.querySelector(".sidebar");

        if (sidebar) {
            sidebar.classList.toggle("open");
        }
    };


    /* =====================================================
       NAVIGATION LINK EVENTS
       ===================================================== */

    document.addEventListener("click", event => {

        const link =
            event.target.closest("[data-page]");

        if (!link) return;


        event.preventDefault();

        const page =
            link.getAttribute("data-page");

        showPage(page);
    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(event) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;


        document
            .querySelectorAll(".modal.active")
            .forEach(modal => {

                modal.classList.remove("active");
                modal.style.display = "none";

            });

    });


    /* =====================================================
       INITIALIZE
       ===================================================== */

    renderCourses();
    renderAnnouncements();

    if (app.currentUser) {

        showDashboard(app.currentUser.role);

    }


    /* =====================================================
       EXPOSE APP
       ===================================================== */

    window.capacityConnect = app;

});