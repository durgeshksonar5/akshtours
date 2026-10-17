/**
 * Aksh Tours & Travels - Leads Management API Integration
 * Endpoint: https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/76c33825-3e03-4493-a025-cbd99b159aee
 * 
 * Supports:
 *  - Floating WhatsApp Lead Capture Popup (source/type/buttonType: "whatsapp")
 *  - Floating Call Lead Capture Popup (source/type/buttonType: "contact")
 *  - Website Contact Form (source/type/buttonType: "form")
 *  - Tour Booking Form (source/type/buttonType: "form")
 *  - Newsletter Subscription Forms (source/type/buttonType: "form")
 */

(function () {
    'use strict';

    const LEADS_API_ENDPOINT = 'https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/76c33825-3e03-4493-a025-cbd99b159aee';
    const OFFICIAL_WHATSAPP_NUMBER = '918669652936';
    const OFFICIAL_PHONE_NUMBER = '+918669652936';

    /**
     * Submit lead payload to Leads Management API
     */
    async function submitLead(payload) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(LEADS_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            let data = {};
            try {
                data = await response.json();
            } catch (e) {
                // non-json response
            }

            if (!response.ok) {
                const errMsg = data.error || data.message || `Submission failed with HTTP ${response.status}`;
                return { success: false, error: errMsg };
            }

            return { success: true, data: data };
        } catch (err) {
            clearTimeout(timeoutId);
            if (err.name === 'AbortError') {
                return { success: false, error: 'Request timed out. Please check your internet connection and try again.' };
            }
            return { success: false, error: err.message || 'Unable to connect to the lead server. Please try again.' };
        }
    }

    /**
     * Inject Floating Popups (WhatsApp & Call) into DOM
     */
    function initFloatingPopups() {
        if (document.getElementById('travexaFloatingPopups')) return;

        const popupsContainer = document.createElement('div');
        popupsContainer.id = 'travexaFloatingPopups';
        popupsContainer.innerHTML = `
            <!-- WhatsApp Lead Popup -->
            <div id="travexaWaPopup" class="travexa-floating-popup" role="dialog" aria-labelledby="travexaWaTitle" aria-hidden="true">
                <div class="travexa-popup-header header-whatsapp">
                    <div class="travexa-popup-header-info">
                        <div class="travexa-popup-badge">
                            <i class="fa-brands fa-whatsapp"></i>
                        </div>
                        <div>
                            <h3 id="travexaWaTitle" class="travexa-popup-title">Chat on WhatsApp</h3>
                            <p class="travexa-popup-subtitle">Aksh Tours &amp; Travels</p>
                        </div>
                    </div>
                    <button type="button" class="travexa-popup-close" aria-label="Close popup" data-close-popup>&times;</button>
                </div>
                <div class="travexa-popup-body">
                    <form id="travexaWaForm" autocomplete="on">
                        <div class="travexa-popup-field">
                            <label class="travexa-popup-label" for="waLeadName">Full Name <span>*</span></label>
                            <div class="travexa-popup-input-wrap">
                                <i class="fa-solid fa-user"></i>
                                <input type="text" id="waLeadName" name="name" class="travexa-popup-input" placeholder="e.g. John Doe" required autocomplete="name">
                            </div>
                        </div>
                        <div class="travexa-popup-field">
                            <label class="travexa-popup-label" for="waLeadPhone">Contact Number <span>*</span></label>
                            <div class="travexa-popup-input-wrap">
                                <i class="fa-solid fa-phone"></i>
                                <input type="tel" id="waLeadPhone" name="phone" class="travexa-popup-input" placeholder="e.g. +91 98765 43210" required autocomplete="tel">
                            </div>
                        </div>
                        <button type="submit" id="waLeadSubmitBtn" class="travexa-popup-btn travexa-popup-btn-wa">
                            <span>Continue to WhatsApp</span>
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                        <p class="travexa-popup-privacy">
                            <i class="fa-solid fa-shield-halved text-success me-1"></i> 100% Confidential &amp; Spam-Free
                        </p>
                        <div id="waLeadStatus" class="travexa-popup-status" aria-live="polite"></div>
                    </form>
                </div>
            </div>

            <!-- Call Lead Popup -->
            <div id="travexaCallPopup" class="travexa-floating-popup" role="dialog" aria-labelledby="travexaCallTitle" aria-hidden="true">
                <div class="travexa-popup-header header-call">
                    <div class="travexa-popup-header-info">
                        <div class="travexa-popup-badge">
                            <i class="fa-solid fa-phone"></i>
                        </div>
                        <div>
                            <h3 id="travexaCallTitle" class="travexa-popup-title">Speak With Our Expert</h3>
                            <p class="travexa-popup-subtitle">+91 86696 52936 • Aksh Tours</p>
                        </div>
                    </div>
                    <button type="button" class="travexa-popup-close" aria-label="Close popup" data-close-popup>&times;</button>
                </div>
                <div class="travexa-popup-body">
                    <form id="travexaCallForm" autocomplete="on">
                        <div class="travexa-popup-field">
                            <label class="travexa-popup-label" for="callLeadName">Full Name <span>*</span></label>
                            <div class="travexa-popup-input-wrap">
                                <i class="fa-solid fa-user"></i>
                                <input type="text" id="callLeadName" name="name" class="travexa-popup-input" placeholder="e.g. John Doe" required autocomplete="name">
                            </div>
                        </div>
                        <div class="travexa-popup-field">
                            <label class="travexa-popup-label" for="callLeadPhone">Contact Number <span>*</span></label>
                            <div class="travexa-popup-input-wrap">
                                <i class="fa-solid fa-phone"></i>
                                <input type="tel" id="callLeadPhone" name="phone" class="travexa-popup-input" placeholder="e.g. +91 98765 43210" required autocomplete="tel">
                            </div>
                        </div>
                        <button type="submit" id="callLeadSubmitBtn" class="travexa-popup-btn travexa-popup-btn-call">
                            <span>Continue to Call</span>
                            <i class="fa-solid fa-phone"></i>
                        </button>
                        <p class="travexa-popup-privacy">
                            <i class="fa-solid fa-shield-halved text-primary me-1"></i> 100% Confidential &amp; Direct Connection
                        </p>
                        <div id="callLeadStatus" class="travexa-popup-status" aria-live="polite"></div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(popupsContainer);

        const waPopup = document.getElementById('travexaWaPopup');
        const callPopup = document.getElementById('travexaCallPopup');

        function openPopup(popup, inputFocus) {
            closeAllPopups();
            popup.classList.add('active');
            popup.setAttribute('aria-hidden', 'false');
            if (inputFocus) {
                setTimeout(() => inputFocus.focus(), 100);
            }
        }

        function closeAllPopups() {
            if (waPopup) {
                waPopup.classList.remove('active');
                waPopup.setAttribute('aria-hidden', 'true');
            }
            if (callPopup) {
                callPopup.classList.remove('active');
                callPopup.setAttribute('aria-hidden', 'true');
            }
        }

        // Connect Floating WhatsApp Buttons
        document.querySelectorAll('.floating-whatsapp').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (waPopup.classList.contains('active')) {
                    closeAllPopups();
                } else {
                    openPopup(waPopup, document.getElementById('waLeadName'));
                }
            });
        });

        // Connect Floating Call Buttons
        document.querySelectorAll('.floating-call').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (callPopup.classList.contains('active')) {
                    closeAllPopups();
                } else {
                    openPopup(callPopup, document.getElementById('callLeadName'));
                }
            });
        });

        // Close buttons inside popups
        document.querySelectorAll('[data-close-popup]').forEach(btn => {
            btn.addEventListener('click', () => {
                closeAllPopups();
            });
        });

        // Close on clicking outside popups and floating buttons
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.travexa-floating-popup') && !e.target.closest('.floating-action-btn')) {
                closeAllPopups();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        });

        // --- WhatsApp Form Submit Handler ---
        const waForm = document.getElementById('travexaWaForm');
        const waStatus = document.getElementById('waLeadStatus');
        const waBtn = document.getElementById('waLeadSubmitBtn');
        const waNameInput = document.getElementById('waLeadName');
        const waPhoneInput = document.getElementById('waLeadPhone');

        if (waForm) {
            waForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const nameVal = waNameInput.value.trim();
                const phoneVal = waPhoneInput.value.trim();

                if (!nameVal || !phoneVal) {
                    waStatus.innerHTML = '<div class="alert alert-danger">Please fill in both Name and Contact Number.</div>';
                    return;
                }

                // Prevent duplicate clicks
                waBtn.disabled = true;
                waNameInput.disabled = true;
                waPhoneInput.disabled = true;
                const originalBtnText = waBtn.innerHTML;
                waBtn.innerHTML = '<span>Submitting details...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
                waStatus.innerHTML = '';

                const payload = {
                    name: nameVal,
                    phone: phoneVal,
                    buttonType: 'whatsapp',
                    type: 'whatsapp',
                    source: 'whatsapp',
                    form_name: 'WhatsApp Floating Lead',
                    page_url: window.location.href,
                    submitted_at: new Date().toISOString()
                };

                const res = await submitLead(payload);

                if (res.success) {
                    const waMessage = `Hello Aksh Tours & Travels, my name is ${nameVal}. I would like to inquire about your holiday tour packages.`;
                    const waUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

                    waStatus.innerHTML = `
                        <div class="alert alert-success mt-2">
                            <i class="fa-solid fa-circle-check me-1"></i> Details received successfully!
                        </div>
                        <a href="${waUrl}" id="waDirectClickBtn" target="_blank" rel="noopener noreferrer" class="travexa-popup-btn travexa-popup-btn-wa mt-2 text-white">
                            <span>Open WhatsApp Chat</span>
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                        <p class="text-muted small text-center mt-2 mb-0" style="font-size: 10px;">
                            Click the button above if WhatsApp did not open automatically.
                        </p>
                    `;

                    // Hide submit button now that lead is submitted
                    waBtn.style.display = 'none';

                    // Attempt automatic opening in a new tab
                    try {
                        const opened = window.open(waUrl, '_blank');
                        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
                            // Popup was blocked by browser; user will click the rendered button
                        }
                    } catch (navErr) {
                        // User can click button
                    }
                } else {
                    waStatus.innerHTML = `
                        <div class="alert alert-danger mt-2">
                            <i class="fa-solid fa-circle-exclamation me-1"></i> ${res.error}
                        </div>
                    `;
                    waBtn.disabled = false;
                    waNameInput.disabled = false;
                    waPhoneInput.disabled = false;
                    waBtn.innerHTML = originalBtnText;
                }
            });
        }

        // --- Call Form Submit Handler ---
        const callForm = document.getElementById('travexaCallForm');
        const callStatus = document.getElementById('callLeadStatus');
        const callBtn = document.getElementById('callLeadSubmitBtn');
        const callNameInput = document.getElementById('callLeadName');
        const callPhoneInput = document.getElementById('callLeadPhone');

        if (callForm) {
            callForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const nameVal = callNameInput.value.trim();
                const phoneVal = callPhoneInput.value.trim();

                if (!nameVal || !phoneVal) {
                    callStatus.innerHTML = '<div class="alert alert-danger">Please fill in both Name and Contact Number.</div>';
                    return;
                }

                // Prevent duplicate clicks
                callBtn.disabled = true;
                callNameInput.disabled = true;
                callPhoneInput.disabled = true;
                const originalBtnText = callBtn.innerHTML;
                callBtn.innerHTML = '<span>Submitting details...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
                callStatus.innerHTML = '';

                const payload = {
                    name: nameVal,
                    phone: phoneVal,
                    buttonType: 'contact',
                    type: 'contact',
                    source: 'contact',
                    form_name: 'Call Floating Lead',
                    page_url: window.location.href,
                    submitted_at: new Date().toISOString()
                };

                const res = await submitLead(payload);

                if (res.success) {
                    const telUrl = `tel:${OFFICIAL_PHONE_NUMBER}`;

                    callStatus.innerHTML = `
                        <div class="alert alert-success mt-2">
                            <i class="fa-solid fa-circle-check me-1"></i> Details received successfully!
                        </div>
                        <a href="${telUrl}" id="callDirectClickBtn" class="travexa-popup-btn travexa-popup-btn-call mt-2 text-white">
                            <span>Call Now: +91 86696 52936</span>
                            <i class="fa-solid fa-phone"></i>
                        </a>
                        <p class="text-muted small text-center mt-2 mb-0" style="font-size: 10px;">
                            Click above if your dialer did not open automatically.
                        </p>
                    `;

                    // Hide submit button now that lead is submitted
                    callBtn.style.display = 'none';

                    // Attempt automatic dial
                    try {
                        window.location.href = telUrl;
                    } catch (navErr) {
                        // User can click button
                    }
                } else {
                    callStatus.innerHTML = `
                        <div class="alert alert-danger mt-2">
                            <i class="fa-solid fa-circle-exclamation me-1"></i> ${res.error}
                        </div>
                    `;
                    callBtn.disabled = false;
                    callNameInput.disabled = false;
                    callPhoneInput.disabled = false;
                    callBtn.innerHTML = originalBtnText;
                }
            });
        }
    }

    /**
     * Connect Website Contact Form (contact.html)
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const statusContainer = document.getElementById('contactFormStatus') || (function () {
            const div = document.createElement('div');
            div.id = 'contactFormStatus';
            div.className = 'mt-3';
            contactForm.appendChild(div);
            return div;
        })();

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const nameEl = contactForm.querySelector('[name="name"]') || contactForm.querySelector('#contactName');
            const emailEl = contactForm.querySelector('[name="email"]') || contactForm.querySelector('#contactEmail');
            const phoneEl = contactForm.querySelector('[name="phone"]') || contactForm.querySelector('#contactPhone');
            const subjectEl = contactForm.querySelector('[name="subject"]') || contactForm.querySelector('#contactSubject');
            const messageEl = contactForm.querySelector('[name="message"]') || contactForm.querySelector('#contactMessage');

            const name = nameEl ? nameEl.value.trim() : '';
            const email = emailEl ? emailEl.value.trim() : '';
            const phone = phoneEl ? phoneEl.value.trim() : '';
            const subject = subjectEl ? subjectEl.value.trim() : '';
            const message = messageEl ? messageEl.value.trim() : '';

            if (!name || !email || !subject || !message) {
                statusContainer.innerHTML = `
                    <div class="alert alert-danger d-flex align-items-center gap-2 rounded-3">
                        <i class="fa-solid fa-circle-exclamation text-danger"></i>
                        <div>Please fill in all required fields marked with an asterisk (*).</div>
                    </div>
                `;
                return;
            }

            // Disable button & show spinner
            let originalBtnHtml = '';
            if (submitBtn) {
                submitBtn.disabled = true;
                originalBtnHtml = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin ms-2"></i>';
            }
            statusContainer.innerHTML = '';

            const payload = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                buttonType: 'form',
                type: 'form',
                source: 'form',
                form_name: 'Contact Form',
                page_url: window.location.href,
                submitted_at: new Date().toISOString()
            };

            const res = await submitLead(payload);

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }

            if (res.success) {
                statusContainer.innerHTML = `
                    <div class="alert alert-success d-flex align-items-center gap-3 rounded-4 p-3 shadow-sm border-0">
                        <i class="fa-solid fa-circle-check fs-3 text-success"></i>
                        <div>
                            <h5 class="fw-bold text-success mb-1">Message Sent Successfully!</h5>
                            <p class="mb-0 fs-7 text-dark">Thank you for reaching out to <strong>Aksh Tours &amp; Travels</strong>. Our customer support team will review your inquiry and get back to you shortly.</p>
                        </div>
                    </div>
                `;
                contactForm.reset();
            } else {
                statusContainer.innerHTML = `
                    <div class="alert alert-danger d-flex align-items-center gap-3 rounded-4 p-3 shadow-sm border-0">
                        <i class="fa-solid fa-triangle-exclamation fs-3 text-danger"></i>
                        <div>
                            <h5 class="fw-bold text-danger mb-1">Submission Failed</h5>
                            <p class="mb-0 fs-7 text-dark">${res.error} Your entered details have been preserved. You can also call us directly at <strong>+91 86696 52936</strong>.</p>
                        </div>
                    </div>
                `;
            }
        });
    }

    /**
     * Connect Tour Booking Form (tour-booking.html)
     */
    function initTourBookingForm() {
        const bookingForm = document.getElementById('tourBookingForm');
        if (!bookingForm) return;

        const statusContainer = document.getElementById('bookingFormStatus') || (function () {
            const div = document.createElement('div');
            div.id = 'bookingFormStatus';
            div.className = 'mt-3';
            bookingForm.appendChild(div);
            return div;
        })();

        // Enable payment method pill selection
        const paymentCards = bookingForm.querySelectorAll('.payment-method-card');
        paymentCards.forEach(card => {
            card.addEventListener('click', () => {
                paymentCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });

        // Read URL query parameters if coming from a tour or destination page
        const urlParams = new URLSearchParams(window.location.search);
        const tourParam = urlParams.get('tour');
        const dateParam = urlParams.get('date');
        const guestsParam = urlParams.get('guests');

        if (tourParam) {
            const tourSummaryTitle = document.querySelector('.dest-sidebar-card .text-muted span:first-child');
            if (tourSummaryTitle) {
                tourSummaryTitle.innerText = `${tourParam}`;
            }
        }
        if (dateParam) {
            const dateSpan = document.querySelector('.hero-booking-meta span:nth-child(2)');
            if (dateSpan) dateSpan.innerHTML = `<i class="fa-solid fa-calendar-days text-accent me-1"></i> ${dateParam}`;
        }
        if (guestsParam) {
            const guestsSpan = document.querySelector('.hero-booking-meta span:nth-child(3)');
            if (guestsSpan) guestsSpan.innerHTML = `<i class="fa-solid fa-user-group text-accent me-1"></i> ${guestsParam} Guests`;
        }

        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = bookingForm.querySelector('button[type="submit"]');

            const firstName = (bookingForm.querySelector('[name="first_name"]') || {}).value || '';
            const lastName = (bookingForm.querySelector('[name="last_name"]') || {}).value || '';
            const fullName = `${firstName} ${lastName}`.trim();
            const email = (bookingForm.querySelector('[name="email"]') || {}).value || '';
            const phone = (bookingForm.querySelector('[name="phone"]') || {}).value || '';
            const nationality = (bookingForm.querySelector('[name="nationality"]') || {}).value || '';
            const passportId = (bookingForm.querySelector('[name="passport_id"]') || {}).value || '';
            const guestName = (bookingForm.querySelector('[name="guest_name"]') || {}).value || '';
            const dietaryRequests = (bookingForm.querySelector('[name="dietary_requests"]') || {}).value || '';
            const cardholderName = (bookingForm.querySelector('[name="cardholder_name"]') || {}).value || '';

            // Selected Add-ons
            const addons = [];
            bookingForm.querySelectorAll('input[type="checkbox"][id^="addon"]:checked').forEach(cb => {
                const label = bookingForm.querySelector(`label[for="${cb.id}"]`);
                if (label) addons.push(label.innerText.trim());
            });

            // Selected payment method
            const activePaymentCard = bookingForm.querySelector('.payment-method-card.active span');
            const paymentMethod = activePaymentCard ? activePaymentCard.innerText.trim() : 'Credit Card';

            // Tour details from summary
            const tourSummaryTitle = document.querySelector('.dest-sidebar-card .text-muted span:first-child');
            const tourName = tourParam || (tourSummaryTitle ? tourSummaryTitle.innerText.trim() : 'Tour Package Reservation');

            if (!firstName || !lastName || !email || !phone) {
                statusContainer.innerHTML = `
                    <div class="alert alert-danger d-flex align-items-center gap-2 rounded-3">
                        <i class="fa-solid fa-circle-exclamation text-danger"></i>
                        <div>Please fill in all primary traveler details marked with an asterisk (*).</div>
                    </div>
                `;
                return;
            }

            // Disable button & show spinner
            let originalBtnHtml = '';
            if (submitBtn) {
                submitBtn.disabled = true;
                originalBtnHtml = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Submitting Booking Request...</span> <i class="fa-solid fa-spinner fa-spin ms-2"></i>';
            }
            statusContainer.innerHTML = '';

            const payload = {
                name: fullName,
                email: email,
                phone: phone,
                nationality: nationality,
                passport_id: passportId,
                guest_name: guestName,
                dietary_requests: dietaryRequests,
                addons: addons.join('; '),
                payment_method: paymentMethod,
                cardholder_name: cardholderName,
                tour: tourName,
                destination: tourParam || tourName,
                travel_date: dateParam || '',
                travelers: guestsParam || '',
                buttonType: 'form',
                type: 'form',
                source: 'form',
                form_name: 'Tour Booking Form',
                page_url: window.location.href,
                submitted_at: new Date().toISOString()
            };

            const res = await submitLead(payload);

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }

            if (res.success) {
                statusContainer.innerHTML = `
                    <div class="alert alert-success d-flex align-items-start gap-3 rounded-4 p-4 shadow-sm border-0">
                        <i class="fa-solid fa-circle-check fs-2 text-success mt-1"></i>
                        <div>
                            <h4 class="fw-bold text-success mb-2">Booking Request Confirmed!</h4>
                            <p class="mb-2 fs-7 text-dark">Thank you for booking with <strong>Aksh Tours &amp; Travels</strong>. We have securely received your reservation details.</p>
                            <p class="mb-0 fs-8 text-muted">Our dedicated booking concierge will contact you at <strong>${phone}</strong> and <strong>${email}</strong> with your final itinerary confirmation.</p>
                        </div>
                    </div>
                `;
                bookingForm.reset();
                // Scroll smoothly to status message
                statusContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                statusContainer.innerHTML = `
                    <div class="alert alert-danger d-flex align-items-center gap-3 rounded-4 p-3 shadow-sm border-0">
                        <i class="fa-solid fa-triangle-exclamation fs-3 text-danger"></i>
                        <div>
                            <h5 class="fw-bold text-danger mb-1">Booking Submission Failed</h5>
                            <p class="mb-0 fs-7 text-dark">${res.error} All your entered information has been preserved. Please try again or call our booking desk at <strong>+91 86696 52936</strong>.</p>
                        </div>
                    </div>
                `;
            }
        });
    }

    /**
     * Connect Tour & Destination Sidebar Enquiry Forms
     */
    function initSidebarEnquiryForms() {
        document.querySelectorAll('.dest-sidebar-card form').forEach(form => {
            if (form.id === 'tourBookingForm' || form.getAttribute('data-leads-bound')) return;
            form.setAttribute('data-leads-bound', 'true');

            form.addEventListener('submit', (e) => {
                const dateInput = form.querySelector('.travexa-date-picker') || form.querySelector('input[type="text"]');
                const guestsInput = form.querySelector('.select-input') || form.querySelector('[name="guests"]');
                const packageEl = form.closest('.dest-sidebar-card').querySelector('.fs-5.fw-bold.text-primary');

                const dateVal = dateInput ? dateInput.value.trim() : '';
                const guestsVal = guestsInput ? guestsInput.value.trim() : '';
                const packageName = packageEl ? packageEl.innerText.trim() : '';

                const action = form.getAttribute('action') || 'tour-booking.html';
                const url = new URL(action, window.location.href);
                if (dateVal) url.searchParams.set('date', dateVal);
                if (guestsVal) url.searchParams.set('guests', guestsVal);
                if (packageName) url.searchParams.set('tour', packageName);

                e.preventDefault();
                window.location.href = url.href;
            });
        });
    }

    /**
     * Connect All Newsletter Forms (Across all pages in footer)
     */
    function initNewsletterForms() {
        document.querySelectorAll('.newsletter-form form').forEach(form => {
            // Avoid double binding
            if (form.getAttribute('data-leads-bound')) return;
            form.setAttribute('data-leads-bound', 'true');

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const emailInput = form.querySelector('input[type="email"]');
                const submitBtn = form.querySelector('button[type="submit"]');
                const email = emailInput ? emailInput.value.trim() : '';

                if (!email) return;

                // Existing or new feedback container
                let feedbackEl = form.querySelector('.newsletter-feedback');
                if (!feedbackEl) {
                    feedbackEl = document.createElement('div');
                    feedbackEl.className = 'newsletter-feedback small mt-2';
                    form.appendChild(feedbackEl);
                }

                if (submitBtn) submitBtn.disabled = true;
                feedbackEl.innerHTML = '<span class="text-white opacity-75"><i class="fa-solid fa-spinner fa-spin me-1"></i> Subscribing...</span>';

                const payload = {
                    email: email,
                    buttonType: 'form',
                    type: 'form',
                    source: 'form',
                    form_name: 'Newsletter Subscription',
                    page_url: window.location.href,
                    submitted_at: new Date().toISOString()
                };

                const res = await submitLead(payload);

                if (submitBtn) submitBtn.disabled = false;

                if (res.success) {
                    feedbackEl.innerHTML = '<span class="text-success fw-bold"><i class="fa-solid fa-circle-check me-1"></i> Subscribed successfully! Thank you.</span>';
                    form.reset();
                } else {
                    feedbackEl.innerHTML = `<span class="text-warning"><i class="fa-solid fa-circle-exclamation me-1"></i> ${res.error}</span>`;
                }
            });
        });
    }

    /**
     * Initialize all lead integrations when DOM is ready
     */
    function init() {
        initFloatingPopups();
        initContactForm();
        initTourBookingForm();
        initSidebarEnquiryForms();
        initNewsletterForms();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
