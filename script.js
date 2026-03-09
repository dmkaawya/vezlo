/* ================================================== */
/*                 EDITABLE DATA SECTION              */
/* ================================================== */

const DEFAULT_DATA = {
    contact: {
        phone: "0775048455",
        email: "dmkaawya@gmail.com",
        location: "Colombo, Sri Lanka"
    },
    crew: [
        { img: "550849113_793950093582977_6052144821339117883_n.jpg", name: "Kaawya C Chandrasekara", role: "CEO & Founder", caption: "Visionary leader driving digital innovation." },
        { img: "495450294_1061000905932408_1598779699165680492_n.jpg", name: "Navindu V Samarathunga ", role: "Lead Developer", caption: "Full-stack expert with 4+ years experience." },
    ],
    projects: [
        { name: "Inceptra 25", desc: "Voting Platform", link: "https://inceptra25.vercel.app/", color: "#00d4aa" },
        { name: "NovaX Team", desc: "Promotion Network", link: "https://nova-x-team.vercel.app/", color: "#00b4d8" },
        { name: "DMKaawya", desc: "Portfolio Website", link: "https://dmkaawya.vercel.app/", color: "#ff6b6b" },
        { name: "DMC Group", desc: "Company Portfolio Website", link: "https://dmcgroup.vercel.app/", color: "#ffd93d" },
        { name: "KEdu LMS", desc: "Learning Management System", link: "https://kedu-eta.vercel.app/", color: "#6bcb77" },
        { name: "DMCStores", desc: "Dropshipping Platform", link: "https://dmc-stores.vercel.app/", color: "#4d96ff" },
        { name: "Laaba Kade", desc: "E-commerce website", link: "https://dmc-stores.vercel.app/laabakade.html", color: "#4d96ff" }
    ],
    proposals: [
        { client: "Nadeeja Bandara", project: "Voting Platform", status: "Active", password: "contact-0775048455", link: "https://vezlo-web.vercel.app/v1nadeeja.html" },
        { client: "Malindu Nethmina", project: "Promotion Network", status: "Active", password: "contact-0775048455", link: "https://vezlo-web.vercel.app/v1nadeeja.html" }
    ]
};

// Load from LocalStorage or use Default
function getSiteData() {
    const stored = localStorage.getItem('vezloSiteData');
    return stored ? JSON.parse(stored) : DEFAULT_DATA;
}

function saveSiteData(data) {
    localStorage.setItem('vezloSiteData', JSON.stringify(data));
    alert('Data Saved Successfully!');
    location.reload();
}

const SITE_DATA = getSiteData();

/* ================================================== */
/*         CORE FUNCTIONS                             */
/* ================================================== */

(function() {
    // --- HIGHLIGHT CURRENT NAV LINK ---
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // --- MODE TOGGLE ---
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        if (localStorage.getItem('vezlo-mode') === 'light') {
            document.body.classList.add('light-mode');
        }
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('vezlo-mode', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
    }

    // --- MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // --- ANIMATIONS ON SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

})();

// --- REUSABLE RENDER FUNCTIONS ---

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    let html = '';
    SITE_DATA.projects.forEach((p, i) => {
        html += `
            <div class="fade-in stagger-${(i % 6) + 1} card p-6">
                <div class="w-full h-32 rounded-lg mb-4" style="background: linear-gradient(135deg, ${p.color}33, ${p.color}11);"></div>
                <h3 class="font-semibold text-lg mb-2">${p.name}</h3>
                <p class="text-sm mb-4" style="color: var(--fg-muted)">${p.desc}</p>
                <a href="${p.link}" target="_blank" rel="noopener" class="btn-primary inline-block text-sm py-2 px-4">View Project</a>
            </div>`;
    });
    grid.innerHTML = html;
}

function renderProposals() {
    const grid = document.getElementById('proposalsGrid');
    if (!grid) return;
    let html = '';
    SITE_DATA.proposals.forEach((p, i) => {
        const statusClass = `status-${p.status.toLowerCase()}`;
        html += `
            <div class="fade-in stagger-${(i % 6) + 1} card p-5">
                <div class="flex items-center justify-between mb-3">
                    <span class="font-semibold">${p.client}</span>
                    <span class="status-badge ${statusClass}">${p.status}</span>
                </div>
                <p class="text-sm mb-1" style="color: var(--fg-muted)">${p.project}</p>
                <p class="text-xs mb-3" style="color: var(--fg-muted); opacity: 0.6;">Password: <span style="font-family: monospace;">${p.password}</span></p>
                <button class="btn-secondary text-sm py-2 px-4 w-full view-proposal" data-idx="${i}">View Proposal</button>
            </div>`;
    });
    grid.innerHTML = html;

    // Attach Modal Listeners
    document.querySelectorAll('.view-proposal').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            openProposalModal(idx);
        });
    });
}

function renderCrew() {
    const grid = document.getElementById('crewGrid');
    if (!grid) return;
    let html = '';
    SITE_DATA.crew.forEach((c, i) => {
        html += `
            <div class="fade-in stagger-${(i % 6) + 1} card p-6 text-center">
                <div class="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2" style="border-color: var(--accent);">
                    <img src="${c.img}" alt="${c.name}" class="crew-img">
                </div>
                <h3 class="font-semibold text-lg mb-1">${c.name}</h3>
                <p class="text-sm font-medium mb-2" style="color: var(--accent)">${c.role}</p>
                <p class="text-xs" style="color: var(--fg-muted)">${c.caption}</p>
            </div>`;
    });
    grid.innerHTML = html;
}

function renderContactInfo() {
    const phoneCont = document.getElementById('contactInfoPhone');
    const emailCont = document.getElementById('contactInfoEmail');
    const locCont = document.getElementById('contactInfoLocation');
    
    if(phoneCont) phoneCont.innerHTML = `
        <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background: var(--glow);">
            <svg class="w-6 h-6" fill="none" stroke="var(--accent)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        </div>
        <div><p class="font-semibold">Phone</p><p style="color: var(--fg-muted)">${SITE_DATA.contact.phone}</p></div>`;

    if(emailCont) emailCont.innerHTML = `
        <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background: var(--glow);">
            <svg class="w-6 h-6" fill="none" stroke="var(--accent)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <div><p class="font-semibold">Email</p><p style="color: var(--fg-muted)">${SITE_DATA.contact.email}</p></div>`;

    if(locCont) locCont.innerHTML = `
        <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background: var(--glow);">
            <svg class="w-6 h-6" fill="none" stroke="var(--accent)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div><p class="font-semibold">Location</p><p style="color: var(--fg-muted)">${SITE_DATA.contact.location}</p></div>`;
}

// --- MODAL LOGIC ---
let currentProposalIndex = null;

function openProposalModal(index) {
    currentProposalIndex = parseInt(index);
    const modal = document.getElementById('proposalModal');
    if(modal) {
        modal.classList.add('active');
        document.getElementById('proposalPassword').value = '';
        document.getElementById('proposalPassword').focus();
        document.getElementById('passwordError').classList.add('hidden');
    }
}

function checkPassword() {
    const input = document.getElementById('proposalPassword').value.trim();
    const proposal = SITE_DATA.proposals[currentProposalIndex];
    
    if (input === proposal.password) {
        window.open(proposal.link, '_blank');
        document.getElementById('proposalModal').classList.remove('active');
    } else {
        document.getElementById('passwordError').classList.remove('hidden');
    }
}

function initModalListeners() {
    const submitBtn = document.getElementById('submitPassword');
    const cancelBtn = document.getElementById('cancelModal');
    const modal = document.getElementById('proposalModal');
    const passInput = document.getElementById('proposalPassword');

    if(submitBtn) submitBtn.addEventListener('click', checkPassword);
    if(cancelBtn) cancelBtn.addEventListener('click', () => modal.classList.remove('active'));
    if(passInput) passInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkPassword(); });
    if(modal) modal.addEventListener('click', (e) => { if (e.target.id === 'proposalModal') modal.classList.remove('active'); });
}

// --- FORM HANDLING ---
function initForms() {
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const subject = document.getElementById('formSubject').value;
            const message = document.getElementById('formMessage').value;
            
            let phone = SITE_DATA.contact.phone;
            if (phone.startsWith('0')) phone = '94' + phone.substring(1);
            
            const text = `Hello Vezlo!%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });
    }

    const customPackageForm = document.getElementById('customPackageForm');
    if(customPackageForm) {
        customPackageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('pkgName').value;
            const email = document.getElementById('pkgEmail').value;
            const budget = document.getElementById('pkgBudget').value;
            const type = document.getElementById('pkgType').value;
            const requirements = document.getElementById('pkgRequirements').value;
            
            let phone = SITE_DATA.contact.phone;
            if (phone.startsWith('0')) phone = '94' + phone.substring(1);
            
            const text = `*New Custom Package Request*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Budget:* ${budget}%0A*Project Type:* ${type}%0A*Requirements:* ${requirements}`;
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });
    }
}
