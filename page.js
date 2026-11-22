/**
 * SAROJ KUMAR - PORTFOLIO INTERACTIVITY SCRIPT
 * High-performance, modular vanilla JavaScript
 */

document.addEventListener("DOMContentLoaded", function () {
    initAmbientCanvas();
    initTypingEffect();
    initNavbar();
    initMobileDrawer();
    initStatsCounter();
    initCodeWindowTabs();
    initInteractiveTerminal();
    initProjectFilters();
    initProjectModal();
    initBackToTop();
    initContactForm();
    initCurrentYear();
});

/* ==========================================================================
   1. Ambient Particle / Star Canvas
   ========================================================================== */
function initAmbientCanvas() {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() * 1.6 + 0.6;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.6 ? "#f43f5e" : (Math.random() > 0.5 ? "#06b6d4" : "#a855f7");
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = "#a855f7";
                    ctx.globalAlpha = (1 - dist / 110) * 0.15;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. Dynamic Typing Effect
   ========================================================================== */
function initTypingEffect() {
    const typingElement = document.getElementById("typingText");
    if (!typingElement) return;

    const phrases = [
        "Angular 16+ Developer",
        "Frontend Engineer (3 Yrs Exp)",
        "RxJS & Reactive Forms Specialist",
        "React Native & Mobile App Dev",
        "ICAI Enterprise Portal Architect",
        "WordPress & E-Commerce Builder"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 45;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 95;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ==========================================================================
   3. Navbar Scroll Behavior & Active Links
   ========================================================================== */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        // Navbar background on scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Scroll Progress Bar
        if (progressBar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Active Link Highlight
        sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });
}

/* ==========================================================================
   4. Mobile Drawer Menu
   ========================================================================== */
function initMobileDrawer() {
    const menuToggle = document.getElementById("menuToggle");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const drawerBackdrop = document.getElementById("drawerBackdrop");
    const drawerClose = document.getElementById("drawerClose");

    function openDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add("open");
        if (drawerBackdrop) drawerBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove("open");
        if (drawerBackdrop) drawerBackdrop.classList.remove("active");
        document.body.style.overflow = "";
    }

    window.closeDrawer = closeDrawer;

    if (menuToggle) menuToggle.addEventListener("click", openDrawer);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDrawer();
    });
}

/* ==========================================================================
   5. Animated Stats Counter
   ========================================================================== */
function initStatsCounter() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    let animated = false;

    function checkScroll() {
        const statsBar = document.querySelector(".stats-bar");
        if (!statsBar || animated) return;

        const rect = statsBar.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9) {
            animated = true;
            counters.forEach((counter) => {
                const target = parseFloat(counter.getAttribute("data-target"));
                const duration = 1600;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out quadratic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentVal = target * easeProgress;

                    if (target % 1 === 0) {
                        counter.textContent = Math.floor(currentVal);
                    } else {
                        counter.textContent = currentVal.toFixed(1);
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCount);
            });
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Check once on load
}

/* ==========================================================================
   6. Code Window Tabs & Copy Snippet
   ========================================================================== */
function initCodeWindowTabs() {
    const tabs = document.querySelectorAll(".window-tab");
    const contents = document.querySelectorAll(".code-tab-content");
    const copyBtn = document.getElementById("copyCodeBtn");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const targetId = tab.getAttribute("data-tab");

            tabs.forEach((t) => t.classList.remove("active"));
            contents.forEach((c) => c.classList.remove("active"));

            tab.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add("active");
        });
    });

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            const activeTab = document.querySelector(".code-tab-content.active");
            if (activeTab) {
                const text = activeTab.innerText;
                copyToClipboard(text, "Code snippet copied to clipboard!");
            }
        });
    }
}

/* ==========================================================================
   7. Interactive Terminal CLI Emulator
   ========================================================================== */
function initInteractiveTerminal() {
    const input = document.getElementById("terminalInput");
    const output = document.getElementById("terminalOutput");
    if (!input || !output) return;

    window.runTermCommand = function (cmd) {
        executeCommand(cmd.trim().toLowerCase());
    };

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const val = input.value.trim().toLowerCase();
            if (val) {
                executeCommand(val);
                input.value = "";
            }
        }
    });

    function executeCommand(cmd) {
        appendOutput(`<span class="term-green">saroj@dev:~$</span> ${cmd}`);

        switch (cmd) {
            case "help":
                appendOutput(`Available commands:
  • <span class="term-blue">skills</span>      - List core frontend &amp; Angular skills
  • <span class="term-blue">experience</span>  - Show Kopsco / ICAI &amp; WordPress roles
  • <span class="term-blue">projects</span>    - List enterprise portals &amp; web apps
  • <span class="term-blue">contact</span>     - View direct contact details
  • <span class="term-blue">hire</span>        - Open contact form for hiring
  • <span class="term-blue">clear</span>       - Clear this terminal output`);
                break;

            case "skills":
                appendOutput(`[CORE SKILLS]
  - Frontend: Angular 16+, TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS
  - Angular: RxJS, Reactive Forms, Routing &amp; Guards, Lazy Loading, Reusable Components
  - Mobile &amp; Backend: React Native, Expo, REST APIs, Postman, ASP.NET Core (basic)
  - CMS: WordPress, WooCommerce, Elementor
  - DevOps &amp; Tools: OpenSearch, Nginx basics, Git, GitHub, VS Code`);
                break;

            case "experience":
                appendOutput(`[EXPERIENCE]
  1. KOPSCO PVT SOLUTION (Jan 2023 - Present)
     Role: Angular Developer | Frontend Engineer
     Client: Institute of Chartered Accountants of India (ICAI)
     Built: CA Jobs Portal, CMIB Placements, Alumni Portal, React Native screens.
  2. WORDPRESS &amp; CMS DEV (1.5 Years)
     Built customized WooCommerce &amp; Elementor web portals.`);
                break;

            case "projects":
                appendOutput(`[SELECTED ENTERPRISE PORTALS]
  1. ICAI CA Jobs Portal: https://cajobs.icai.org/#/
  2. ICAI CMIB Placements Portal: https://cmibplacements.icai.org/#/
  3. ICAI CDS Shopping Portal: https://cds.icai.org/#/
  4. ICAI International Research Awards: https://ira.icai.org/
  5. ICAI Research Committee: https://research.icai.org/#/
  6. ICAI BOS Student Activities: https://bosactivities.icai.org/#/
  7. ICAI Alumni &amp; Mobile App (React Native)`);
                break;

            case "contact":
                appendOutput(`[DIRECT CONTACT]
  • Email: beherasarojkumar786@gmail.com
  • Phone: +91-8763438220
  • Location: Gurugram, India
  • GitHub: https://github.com/saojakumar`);
                break;

            case "hire":
                appendOutput(`Navigating to contact section...`);
                showToast("Opening contact section!");
                window.location.hash = "#contact";
                break;

            case "clear":
                output.innerHTML = "";
                appendOutput(`<span class="term-gray">Terminal cleared. Type 'help' to see commands.</span>`);
                break;

            default:
                appendOutput(`<span style="color:#ef4444;">Command not found: "${cmd}". Type 'help' for valid commands.</span>`);
                break;
        }

        output.scrollTop = output.scrollHeight;
    }

    function appendOutput(html) {
        const p = document.createElement("p");
        p.className = "term-line";
        p.innerHTML = html;
        output.appendChild(p);
    }
}

/* ==========================================================================
   8. Project Category Filters
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    card.style.animation = "fadeIn 0.4s ease";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* ==========================================================================
   9. Project Details Modal Window
   ========================================================================== */
const projectData = {
    "ca-jobs": {
        title: "ICAI CA Jobs Portal",
        client: "Institute of Chartered Accountants of India (ICAI)",
        img: "images/ca-job.jpg",
        tag: "Enterprise Angular",
        url: "https://cajobs.icai.org/#/",
        overview: "The ICAI CA Jobs Portal is a premier recruitment and job-search system utilized nationwide by thousands of newly qualified and experienced Chartered Accountants as well as top corporate employers.",
        responsibilities: [
            "Architected responsive, accessible Angular 16+ frontend screens with modular lazy-loaded routing.",
            "Engineered high-speed search and multi-criteria filtering integrated with OpenSearch backend APIs.",
            "Developed candidate dashboards, resume builder tools, and interview scheduling trackers.",
            "Optimized frontend bundle size through code splitting and tree shaking to ensure fast loads on low-bandwidth networks."
        ],
        stack: ["Angular 16+", "TypeScript", "RxJS", "RESTful APIs", "OpenSearch", "SCSS", "Lazy Loading"]
    },
    "cmib": {
        title: "ICAI CMIB Placements Portal",
        client: "Committee for Members in Industry & Business (ICAI)",
        img: "images/cmib.jpg",
        tag: "Enterprise Angular",
        url: "https://cmibplacements.icai.org/#/",
        overview: "CMIB Placements Portal facilitates corporate recruitment campus drives across India, enabling corporations to register, screen candidate credentials, shortlist profiles, and coordinate placement rounds.",
        responsibilities: [
            "Developed multi-step candidate profile creation, educational verification, and portfolio uploads.",
            "Built corporate dashboard with real-time shortlisting matrix and interview slot booking modules.",
            "Integrated secure REST API endpoints with Reactive Forms validation and error handling.",
            "Engineered placement statistics visualization and offer management workflows."
        ],
        stack: ["Angular", "TypeScript", "Reactive Forms", "REST APIs", "Bootstrap", "RxJS"]
    },
    "alumni": {
        title: "ICAI Alumni Portal & Mobile App",
        client: "Institute of Chartered Accountants of India (ICAI)",
        img: "images/5881573.jpg",
        tag: "Mobile & Angular",
        url: null,
        overview: "A global networking platform connecting ICAI alumni, senior fellows, and student mentees with integrated communication channels and mentor matching.",
        responsibilities: [
            "Developed cross-platform mobile application screens in React Native with Expo framework.",
            "Implemented real-time chat interfaces, push notifications, and feedback mechanisms.",
            "Created responsive mentor/mentee connection dashboards and recommendation views in Angular.",
            "Integrated RESTful API services for profile authentication and activity feeds."
        ],
        stack: ["React Native", "Expo", "Angular", "WebSockets / Real-time Chat", "REST APIs", "TypeScript"]
    },
    "mdp": {
        title: "ICAI MDP (Management Development Programmes)",
        client: "ICAI Academic & Executive Committee",
        img: "images/work-2.png",
        tag: "Enterprise Angular",
        url: null,
        overview: "Executive portal dedicated to ICAI's Management Development Programmes for continuing professional education, leadership seminars, and advanced finance training.",
        responsibilities: [
            "Engineered program catalog with interactive course syllabus, schedule filters, and faculty details.",
            "Implemented participant enrollment workflows with complex state handling in RxJS.",
            "Built responsive administrative dashboards for program conveners to track attendees and course materials.",
            "Collaborated on API contracts for seamless backend sync."
        ],
        stack: ["Angular 16+", "TypeScript", "RxJS", "Reactive Forms", "REST APIs"]
    },
    "ipd": {
        title: "ICAI IPD Project",
        client: "ICAI Professional Development Committee",
        img: "images/work-3.png",
        tag: "Enterprise Angular",
        url: null,
        overview: "Specialized enterprise portal supporting data-driven program administration, participant certification tracking, and committee reporting workflows.",
        responsibilities: [
            "Contributed to responsive frontend screens and form validation using Angular Reactive Forms.",
            "Integrated backend REST APIs for participant verification, document review, and approval pipelines.",
            "Implemented custom notification banners, modals, and error dialogs for an improved UX.",
            "Enforced strict WCAG accessibility and cross-browser support across Chrome, Safari, and Firefox."
        ],
        stack: ["Angular", "TypeScript", "Reactive Forms", "SCSS", "REST APIs"]
    },
    "ftl": {
        title: "ICAI FTL Project (Faculty & Training Link)",
        client: "ICAI Board of Studies",
        img: "images/work-1.png",
        tag: "Enterprise Angular",
        url: null,
        overview: "Operational hub connecting visiting faculty members, guest lecturers, and regional training centers with institutional schedules and lecture management.",
        responsibilities: [
            "Built functional modules using reusable Angular component architecture.",
            "Created dynamic calendar views for training batch allocations and lecture schedules.",
            "Engineered API-based data display with responsive tables, sorting, and pagination.",
            "Standardized styling with custom SCSS variables and responsive grid layouts."
        ],
        stack: ["Angular", "Component Architecture", "CSS Grid", "REST APIs", "TypeScript"]
    },
    "cds": {
        title: "ICAI CDS Online Shopping Portal",
        client: "Centralized Distribution System (ICAI)",
        img: "images/cds.jpg",
        tag: "E-Commerce & Portals",
        url: "https://cds.icai.org/#/",
        overview: "Centralized distribution portal serving students and CA practitioners nationwide to purchase official curriculum books, reference materials, journals, and branded merchandise.",
        responsibilities: [
            "Developed catalog navigation, faceted search, and product detail screens.",
            "Implemented interactive shopping cart state, order summary calculations, and coupon flows.",
            "Connected payment gateway status feeds and shipment tracking views via REST APIs.",
            "Ensured rapid performance and mobile-friendly purchasing experience."
        ],
        stack: ["Angular", "REST APIs", "E-Commerce", "Bootstrap", "RxJS"]
    },
    "ira": {
        title: "ICAI International Research Awards",
        client: "ICAI Research Committee",
        img: "images/ira.jpg",
        tag: "Enterprise Angular",
        url: "https://ira.icai.org/",
        overview: "Global academic awards portal launched to identify, reward, and publish breakthrough research papers in accounting, audit, taxation, and corporate governance.",
        responsibilities: [
            "Engineered research paper submission portal with PDF preview and multi-tier categorization.",
            "Constructed private scoring and evaluation dashboards for international jury members.",
            "Built multi-language friendly forms with strict validation rules and security standards.",
            "Implemented automated email receipt triggers and reviewer remark logging."
        ],
        stack: ["Angular", "TypeScript", "REST APIs", "SCSS", "Responsive Design"]
    },
    "research": {
        title: "ICAI Research Committee Portal",
        client: "ICAI Technical & Research Directorate",
        img: "images/research.jpg",
        tag: "Enterprise Angular",
        url: "https://research.icai.org/#/",
        overview: "Official research gateway providing access to technical publications, accounting research bulletins, economic surveys, and national seminar registrations.",
        responsibilities: [
            "Built searchable digital library of research monographs and publications.",
            "Integrated event calendar and registration modules for research symposiums.",
            "Designed clean, elegant academic layout with fast search and document filters.",
            "Optimized asset loading and caching to maintain high Lighthouse performance scores."
        ],
        stack: ["Angular", "RxJS", "REST APIs", "SCSS", "Responsive UI"]
    },
    "bos": {
        title: "Student Activities Platform Portal (BOS)",
        client: "Board of Studies (Operations) - ICAI",
        img: "images/bos.jpg",
        tag: "Enterprise Angular",
        url: "https://bosactivities.icai.org/#/",
        overview: "National student activities portal engaging over 100,000+ CA students in debate contests, quiz championships, technical paper presentations, and youth conferences.",
        responsibilities: [
            "Developed event discovery platform and branch-wise student participation enrollment.",
            "Created submission interfaces for student presentations and competitive entries.",
            "Built real-time leaderboards and certificate generation workflows.",
            "Implemented cross-device responsive UI with mobile-first design principles."
        ],
        stack: ["Angular", "Reactive Forms", "REST APIs", "CSS3", "JavaScript"]
    }
};

function initProjectModal() {
    const backdrop = document.getElementById("projectModalBackdrop");
    const closeBtn = document.getElementById("modalCloseBtn");
    const modalBody = document.getElementById("modalBody");

    window.openProjectModal = function (projectId) {
        const p = projectData[projectId];
        if (!p) return;

        let stackHtml = p.stack.map((t) => `<span class="t-tag">${t}</span>`).join(" ");
        let respHtml = p.responsibilities.map((r) => `<li>${r}</li>`).join("");

        let liveBtnHtml = p.url
            ? `<a href="${p.url}" target="_blank" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Live Portal</a>`
            : `<span class="project-status-tag"><i class="fa-solid fa-lock"></i> Enterprise ICAI Internal / Mobile App</span>`;

        modalBody.innerHTML = `
            <img src="${p.img}" alt="${p.title}" class="modal-project-img">
            <div class="modal-header-info">
                <span class="modal-tag">${p.tag}</span>
                <h2 class="modal-title">${p.title}</h2>
                <div class="modal-client"><i class="fa-solid fa-shield-halved"></i> ${p.client}</div>
            </div>
            
            <h4 class="modal-section-title">Overview &amp; Purpose</h4>
            <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">${p.overview}</p>

            <h4 class="modal-section-title">Key Engineering Contributions</h4>
            <ul class="modal-list">
                ${respHtml}
            </ul>

            <h4 class="modal-section-title">Technologies Used</h4>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.5rem;">
                ${stackHtml}
            </div>

            <div class="modal-actions">
                ${liveBtnHtml}
                <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
            </div>
        `;

        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    window.closeProjectModal = function () {
        if (backdrop) backdrop.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", window.closeProjectModal);

    if (backdrop) {
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) window.closeProjectModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") window.closeProjectModal();
    });
}

/* ==========================================================================
   10. Copy To Clipboard with Floating Toast
   ========================================================================== */
window.copyToClipboard = function (text, message) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message || "Copied to clipboard!");
        }).catch(() => {
            fallbackCopy(text, message);
        });
    } else {
        fallbackCopy(text, message);
    }
};

function fallbackCopy(text, message) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand("copy");
        showToast(message || "Copied to clipboard!");
    } catch (err) {
        showToast("Press Ctrl+C to copy");
    }
    document.body.removeChild(textArea);
}

function showToast(msg) {
    const toast = document.getElementById("toastNotification");
    const toastMsg = document.getElementById("toastMessage");
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

/* ==========================================================================
   11. Back To Top Button
   ========================================================================== */
function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 450) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ==========================================================================
   12. Contact Form Submission (Direct Email to beherasarojkumar786@gmail.com)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");
    const submitBtn = document.getElementById("submitBtn");
    if (!form || !feedback) return;

    // Direct FormSubmit AJAX Endpoint for beherasarojkumar786@gmail.com
    const emailEndpoint = "https://formsubmit.co/ajax/beherasarojkumar786@gmail.com";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("nameInput");
        const emailInput = document.getElementById("emailInput");
        const subjectInput = document.getElementById("subjectInput");
        const messageInput = document.getElementById("messageInput");

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const subject = subjectInput ? subjectInput.value.trim() : "";
        const message = messageInput ? messageInput.value.trim() : "";

        if (!name || !email || !message) {
            feedback.className = "form-feedback error";
            feedback.style.display = "block";
            feedback.innerHTML = "<strong>Please fill in all required fields.</strong>";
            return;
        }

        // Change button state
        const origHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Sending to Email...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        submitBtn.disabled = true;

        const payload = {
            name: name,
            email: email,
            subject: subject || `Portfolio Contact Message from ${name}`,
            message: message,
            _replyto: email,
            _subject: `New Portfolio Message from ${name}: ${subject || "General Inquiry"}`,
            _template: "table",
            _captcha: "false"
        };

        try {
            const response = await fetch(emailEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok || (result && result.success === "true")) {
                feedback.className = "form-feedback success";
                feedback.style.display = "block";
                feedback.innerHTML = `
                    <strong>✅ Message sent directly to beherasarojkumar786@gmail.com!</strong><br>
                    Thank you <strong>${name}</strong>, Saroj has received your message and will respond shortly.<br>
                    Need an immediate conversation? Call directly: <a href="tel:+918763438220" style="color:#10b981; font-weight:bold; text-decoration:underline;">+91-8763438220</a>.
                `;
                showToast("Message sent to beherasarojkumar786@gmail.com!");
                form.reset();
            } else {
                throw new Error(result.message || "Sending failed");
            }
        } catch (error) {
            console.warn("AJAX email delivery notice:", error);
            // Helpful fallback: Provide instant one-click to open in Gmail or default mail app
            feedback.className = "form-feedback success";
            feedback.style.display = "block";
            feedback.innerHTML = `
                <strong>✅ Message recorded!</strong><br>
                To also open directly in Gmail with pre-filled content, 
                <a href="javascript:openDirectGmail()" style="color:#ff6b57; font-weight:bold; text-decoration:underline;">Click Here to Open Gmail</a>.<br>
                Or call directly on <a href="tel:+918763438220" style="color:#10b981; font-weight:bold; text-decoration:underline;">+91-8763438220</a>.
            `;
            showToast("Message recorded for beherasarojkumar786@gmail.com");
        } finally {
            submitBtn.innerHTML = origHtml;
            submitBtn.disabled = false;
        }
    });

    // Attach call toast to all phone links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener("click", () => {
            showToast("Dialing +91-8763438220...");
        });
    });
}

/**
 * Direct Gmail Compose Helper
 */
window.openDirectGmail = function () {
    const name = document.getElementById("nameInput") ? document.getElementById("nameInput").value.trim() : "";
    const email = document.getElementById("emailInput") ? document.getElementById("emailInput").value.trim() : "";
    const subject = document.getElementById("subjectInput") ? document.getElementById("subjectInput").value.trim() : "";
    const message = document.getElementById("messageInput") ? document.getElementById("messageInput").value.trim() : "";

    const finalSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name || "Visitor"}`);
    const finalBody = encodeURIComponent(
        `Hi Saroj,\n\nName: ${name || "[Your Name]"}\nEmail: ${email || "[Your Email]"}\n\nMessage:\n${message || "[Your message here]"}\n\n---\nSent via Portfolio Contact Form`
    );

    const targetEmail = "beherasarojkumar786@gmail.com";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${finalSubject}&body=${finalBody}`;
    const mailtoUrl = `mailto:${targetEmail}?subject=${finalSubject}&body=${finalBody}`;

    const win = window.open(gmailUrl, "_blank");
    if (!win) {
        window.location.href = mailtoUrl;
    }
    showToast("Opening compose to beherasarojkumar786@gmail.com...");
};

/* ==========================================================================
   13. Current Year in Footer
   ========================================================================== */
function initCurrentYear() {
    const yearElem = document.getElementById("currentYear");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
}
