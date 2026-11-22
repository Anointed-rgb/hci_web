/**
 * Hope and Courage International (HCI) - Interactive Controller
 * Domain: hopeandcourageint.org
 * Request Recipient: anointedsim@gmail.com
 */

document.addEventListener("DOMContentLoaded", () => {
    const REQUEST_EMAIL = "anointedsim@gmail.com";

    // 1. Preloader / Spinner Handler
    const preloader = document.getElementById("hci-preloader");
    const progressBar = document.getElementById("loader-progress");

    if (preloader) {
        if (progressBar) {
            setTimeout(() => { progressBar.style.width = "100%"; }, 100);
        }
        setTimeout(() => {
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 750);
        }, 2000);
    }

    // 2. Timed Hero Slideshow (Home Page) — Images cycle every 4.5s; buttons remain
    const slides = document.querySelectorAll("#hero-slideshow .hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    let currentSlide = 0;

    function showSlide(index) {
        if (!slides.length) return;
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, idx) => {
            if (idx === currentSlide) {
                slide.classList.remove("hidden");
            } else {
                slide.classList.add("hidden");
            }
        });
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.remove("w-2.5", "bg-white/40");
                dot.classList.add("w-8", "bg-amber-400");
            } else {
                dot.classList.remove("w-8", "bg-amber-400");
                dot.classList.add("w-2.5", "bg-white/40");
            }
        });
    }

    if (slides.length > 1) {
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4500);
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const idx = parseInt(dot.dataset.slide, 10);
            if (!Number.isNaN(idx)) showSlide(idx);
        });
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }

    // 4. Hero Upcoming Events Drawer Toggle
    const toggleHeroEventsBtn = document.getElementById("toggle-hero-events-btn");
    const heroEventsDrawer = document.getElementById("hero-events-drawer");
    const closeHeroEventsBtn = document.getElementById("close-hero-events-btn");

    if (toggleHeroEventsBtn && heroEventsDrawer) {
        toggleHeroEventsBtn.addEventListener("click", () => {
            heroEventsDrawer.classList.toggle("hidden");
            const isHidden = heroEventsDrawer.classList.contains("hidden");
            toggleHeroEventsBtn.setAttribute("aria-expanded", !isHidden);
        });
    }

    if (closeHeroEventsBtn && heroEventsDrawer) {
        closeHeroEventsBtn.addEventListener("click", () => {
            heroEventsDrawer.classList.add("hidden");
        });
    }

    // 5. Get Involved Role Selector (Volunteer, Member, Donor, Sponsor, Partner)
    const roleButtons = document.querySelectorAll(".involvement-tab");
    const roleInput = document.getElementById("involvement-role-select");
    const roleDescription = document.getElementById("role-dynamic-description");
    const rolePerksList = document.getElementById("role-perks-list");

    const roleProfiles = {
        volunteer: {
            title: "Volunteer with Hope & Courage International",
            desc: "Support children, adolescents (13–18), and young adults (18–25) through peer mentorship, Haven of Hope activities, awareness outreaches, and events.",
            perks: [
                "Orientation aligned with survivor-led care values",
                "Flexible community & event volunteering opportunities",
                "Direct coordination with HCI leadership"
            ]
        },
        member: {
            title: "Become an HCI Member",
            desc: "Connect with childhood cancer survivors, AYAs, caregivers, and advocates working together for dignity, healing, and survivorship.",
            perks: [
                "Access to peer connection and survivorship support",
                "Participation in HCI programs and community circles",
                "Shared mission of healing body, mind, hope & courage"
            ]
        },
        donor: {
            title: "Become a Monthly or One-Time Donor",
            desc: "Support families across Kenya and Burundi via monthly multi-currency plans, one-time gifts, M-Changa, or clothes and nutritional supplements.",
            perks: [
                "Monthly plan (changeable anytime) or one-time wish gift",
                "Option to direct support to a specific program or where needed most",
                "Support for clothes, supplements, meals & wellness"
            ]
        },
        sponsor: {
            title: "Sponsor an Initiative or Survivor Stay",
            desc: "Sponsor a survivor's stay at Haven of Hope, support meals and utilities, fund transition programs, or help grant wishes to children.",
            perks: [
                "Direct contribution to survivorship and transition care",
                "One Dollar, One Child, One Smile impact alignment",
                "Clear coordination and acknowledgment"
            ]
        },
        partner: {
            title: "Partner with HCI",
            desc: "Collaborate with HCI as a corporate partner, foundation, medical/psychosocial team, or community organization in Kenya and Burundi.",
            perks: [
                "Support Haven of Hope and survivor-led care",
                "Joint awareness, advocacy, and resource initiatives",
                "Long-term impact for AYAs and childhood cancer survivors"
            ]
        }
    };

    window.selectInvolvementRole = function(roleKey) {
        const profile = roleProfiles[roleKey] || roleProfiles.volunteer;

        roleButtons.forEach(btn => {
            if (btn.dataset.role === roleKey) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        if (roleInput) roleInput.value = roleKey;
        if (roleDescription) {
            roleDescription.innerHTML = `<h4 class="text-xl font-bold text-purple-950 mb-2">${profile.title}</h4><p class="text-slate-600 text-sm leading-relaxed">${profile.desc}</p>`;
        }
        if (rolePerksList) {
            rolePerksList.innerHTML = profile.perks.map(perk => `
                <li class="flex items-start gap-2.5 text-sm text-slate-700">
                    <i class="fa-solid fa-circle-check text-teal-600 mt-0.5"></i>
                    <span>${perk}</span>
                </li>
            `).join("");
        }
    };

    roleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            selectInvolvementRole(btn.dataset.role);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const initialRole = urlParams.get("role");
    selectInvolvementRole(initialRole && roleProfiles[initialRole] ? initialRole : "volunteer");

    // 6. Involvement & Contact Forms — Route Requests to anointedsim@gmail.com
    const involvementForm = document.getElementById("hci-involvement-form");
    const involvementFeedback = document.getElementById("involvement-feedback");

    if (involvementForm) {
        involvementForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(involvementForm);
            const name = formData.get("full_name") || "";
            const role = formData.get("role") || "general";
            const email = formData.get("email") || "";
            const phone = formData.get("phone") || "";
            const focus = formData.get("program_interest") || "";
            const message = formData.get("message") || "";

            const subject = encodeURIComponent(`HCI Website Request (${role.toUpperCase()}): ${name}`);
            const body = encodeURIComponent(
                `Name / Organization: ${name}\nPathway: ${role}\nEmail: ${email}\nPhone: ${phone}\nFocus: ${focus}\n\nDetails:\n${message}`
            );
            const mailtoUrl = `mailto:${REQUEST_EMAIL}?subject=${subject}&body=${body}`;

            if (involvementFeedback) {
                involvementFeedback.classList.remove("hidden");
                involvementFeedback.innerHTML = `
                    <div class="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-sm space-y-2">
                        <p class="font-bold"><i class="fa-solid fa-check-circle text-teal-600 mr-1"></i> Request prepared for ${REQUEST_EMAIL}</p>
                        <p class="text-xs text-teal-800">Your email client should open automatically to send this request to <strong>${REQUEST_EMAIL}</strong>. If it does not open automatically, click below:</p>
                        <a href="${mailtoUrl}" class="inline-block px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-bold">Open Email to ${REQUEST_EMAIL} &rarr;</a>
                    </div>
                `;
            }
            window.location.href = mailtoUrl;
            involvementForm.reset();
        });
    }

    const contactForm = document.getElementById("hci-contact-form");
    const contactFeedback = document.getElementById("contact-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get("name") || "";
            const email = formData.get("email") || "";
            const subjectRaw = formData.get("subject") || "HCI Contact Message";
            const message = formData.get("message") || "";

            const subject = encodeURIComponent(`HCI Contact: ${subjectRaw}`);
            const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
            const mailtoUrl = `mailto:${REQUEST_EMAIL}?subject=${subject}&body=${body}`;

            if (contactFeedback) {
                contactFeedback.classList.remove("hidden");
                contactFeedback.innerHTML = `
                    <div class="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-sm space-y-2">
                        <p class="font-bold"><i class="fa-solid fa-paper-plane text-purple-700 mr-1"></i> Message prepared for ${REQUEST_EMAIL}</p>
                        <p class="text-xs text-slate-600">If your mail app did not open automatically, use this direct link:</p>
                        <a href="${mailtoUrl}" class="inline-block px-4 py-2 rounded-lg bg-purple-800 text-white text-xs font-bold">Send to ${REQUEST_EMAIL} &rarr;</a>
                    </div>
                `;
            }
            window.location.href = mailtoUrl;
            contactForm.reset();
        });
    }

    // 7. Gallery Filter Buttons
    const galleryFilters = document.querySelectorAll(".gallery-filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryFilters.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            galleryFilters.forEach(b => {
                b.classList.remove("bg-purple-800", "text-white");
                b.classList.add("bg-white", "text-slate-700");
            });
            btn.classList.remove("bg-white", "text-slate-700");
            btn.classList.add("bg-purple-800", "text-white");

            galleryItems.forEach(item => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });

    // 8. Staff / Django + PostgreSQL ERP Portal Modal
    const erpModal = document.getElementById("erp-portal-modal");
    const openErpBtns = document.querySelectorAll(".open-erp-modal");
    const closeErpBtn = document.getElementById("close-erp-modal");
    const erpLoginForm = document.getElementById("erp-login-form");
    const erpStatusMsg = document.getElementById("erp-status-msg");

    openErpBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (erpModal) erpModal.classList.remove("hidden");
        });
    });

    if (closeErpBtn && erpModal) {
        closeErpBtn.addEventListener("click", () => {
            erpModal.classList.add("hidden");
        });
    }

    if (erpModal) {
        erpModal.addEventListener("click", (e) => {
            if (e.target === erpModal) {
                erpModal.classList.add("hidden");
            }
        });
    }

    if (erpLoginForm) {
        erpLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const erpUrl = document.getElementById("erp-endpoint-url").value.trim() || "https://erp.hopeandcourageint.org/admin/";
            if (erpStatusMsg) {
                erpStatusMsg.classList.remove("hidden");
                erpStatusMsg.innerHTML = `
                    <div class="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs">
                        <i class="fa-solid fa-database mr-1 text-amber-700"></i>
                        Connecting to <strong>Django / PostgreSQL ERP</strong> at <code class="underline">${erpUrl}</code>...
                    </div>
                `;
            }
        });
    }

    // 9. Scroll Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal-section").forEach(sec => observer.observe(sec));
});
