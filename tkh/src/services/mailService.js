/**
 * Ten Kind Hands - Centralized Form Email Dispatch Service
 * Delivers all website inquiries, volunteer applications, and donation notifications
 * directly to tenkindhands@gmail.com with dedicated subject titles for each form.
 */

export const RECIPIENT_EMAIL = 'tenkindhands@gmail.com';
export const OFFICIAL_ORG_EMAIL = 'info@tenkindhands.org';
export const WHATSAPP_PHONE = '2348180994301';

/**
 * Accurately dispatches form data to tenkindhands@gmail.com via FormSubmit.
 * Checks whether delivery was ACTUALLY confirmed by FormSubmit.
 * Note: We do NOT pass `_cc` in the FormSubmit payload because FormSubmit
 * requires CC recipients to also be verified, which would block delivery.
 */
export async function dispatchFormEmail({ subject, replyTo, fields }) {
  const payload = {
    _subject: subject,
    _replyto: replyTo || OFFICIAL_ORG_EMAIL,
    _template: 'table',
    _captcha: 'false',
    ...fields,
    'Recipient Mailbox': RECIPIENT_EMAIL,
    'Official Organization Email': OFFICIAL_ORG_EMAIL,
    'Submission Time (WAT)': new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Lagos',
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    // FormSubmit returns { success: "true", message: "..." } on verified delivery
    // Or { success: "false", message: "This form needs activation..." } if activation is pending
    const isSuccess = response.ok && (data.success === 'true' || data.success === true) && !data.error;
    const isNeedsActivation = Boolean(
      (data.message && /activat/i.test(data.message)) ||
      (data.error && /activat/i.test(data.error)) ||
      (!isSuccess && response.status === 403)
    );

    return {
      success: isSuccess,
      delivered: isSuccess,
      status: response.status,
      needsActivation: isNeedsActivation,
      message: data.message || (isSuccess ? 'Message submitted and delivered successfully.' : 'Delivery unconfirmed.'),
      error: !isSuccess ? (data.message || data.error || `HTTP ${response.status}`) : null,
      data
    };
  } catch (err) {
    console.warn('Form email dispatch network error:', err.message);
    return {
      success: false,
      delivered: false,
      status: 0,
      needsActivation: false,
      message: 'Network connection error. Unable to reach the email gateway.',
      error: err.message
    };
  }
}

/**
 * Generate a pre-filled WhatsApp link as an immediate fallback
 */
export function createWhatsAppUrl({ name, email, phone, topic, message, formType }) {
  const parts = [
    `*Ten Kind Hands - ${formType || 'Direct Inquiry'}*`,
    name ? `• *From:* ${name}` : null,
    email ? `• *Email:* ${email}` : null,
    phone ? `• *Phone:* ${phone}` : null,
    topic ? `• *Topic:* ${topic}` : null,
    message ? `• *Message:*\n${message}` : null
  ].filter(Boolean);

  const text = parts.join('\n');
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate a mailto link as a direct fallback
 */
export function createMailtoLink(subject, fields) {
  const body = Object.entries(fields)
    .map(([key, val]) => `${key}: ${val}`)
    .join('\n');
  return `mailto:${RECIPIENT_EMAIL}?cc=${OFFICIAL_ORG_EMAIL}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * 1. Contact Form Dispatch
 * Dedicated title: "Contact Inquiry: [Topic] - [Name] | Ten Kind Hands"
 */
export async function sendContactInquiry({ name, email, topic, message }) {
  const subject = `Contact Inquiry: ${topic || 'General'} - ${name || 'Website Visitor'} | Ten Kind Hands`;
  const fields = {
    'Form Type': 'Direct Contact Inquiry',
    'Sender Name': name || 'Not provided',
    'Sender Email': email || 'Not provided',
    'Inquiry Topic': topic || 'General Question',
    'Message': message || 'No message content'
  };

  return dispatchFormEmail({
    subject,
    replyTo: email,
    fields
  });
}

/**
 * 2. Volunteer Application Dispatch
 * Dedicated title: "Volunteer Application - [Name] ([State]) | Ten Kind Hands"
 */
export async function sendVolunteerApplication({ name, email, phone, role, state, skills }) {
  const subject = `Volunteer Application - ${name || 'New Volunteer'} (${state || 'Nigeria'}) | Ten Kind Hands`;
  const fields = {
    'Form Type': 'Volunteer Application',
    'Applicant Name': name || 'Not provided',
    'Email Address': email || 'Not provided',
    'Phone / WhatsApp': phone || 'Not provided',
    'Preferred Role': role || 'Education tutor & mentor',
    'State / Location': state || 'FCT Abuja',
    'Skills & Availability': skills || 'Not provided'
  };

  return dispatchFormEmail({
    subject,
    replyTo: email,
    fields
  });
}

/**
 * 3. Donation Notification / Pledge Dispatch
 * Dedicated title: "Donation Notification - [Name] (₦[Amount]) | Ten Kind Hands"
 */
export async function sendDonationNotification({
  name,
  email,
  amount,
  frequency,
  designation,
  paymentMethod,
  isAnonymous
}) {
  const formattedAmount = Number(amount || 0).toLocaleString();
  const donorDisplayName = isAnonymous ? 'Anonymous Donor' : (name || 'Generous Donor');
  const isTransfer = paymentMethod === 'transfer';
  const subject = isTransfer
    ? `Bank Transfer Donation Notification - ${donorDisplayName} (₦${formattedAmount}) | Ten Kind Hands`
    : `Donation Notification - ${donorDisplayName} (₦${formattedAmount}) | Ten Kind Hands`;

  const fields = {
    'Form Type': isTransfer ? 'Bank Transfer Donation Notification' : 'Donation Notification / Pledge',
    'Donor Name': donorDisplayName,
    'Email Address': email || 'Not provided',
    'Amount': `₦${formattedAmount}`,
    'Frequency': frequency === 'monthly' ? 'Monthly Recurring' : 'One-time Contribution',
    'Designated Programme': designation || 'Where it is needed most',
    'Payment Method': isTransfer
      ? 'Direct Bank Transfer (Zenith Bank · 1309157309)'
      : 'Online Card (Paystack - Under Gateway Setup)',
    'Keep Name Private': isAnonymous ? 'Yes (Anonymous)' : 'No (Public list permitted)'
  };

  return dispatchFormEmail({
    subject,
    replyTo: email,
    fields
  });
}

/**
 * 4. Corporate & Institutional Partner Dispatch
 * Dedicated title: "Partnership Inquiry - [Org Name] | Ten Kind Hands"
 */
export async function sendPartnerInquiry({ orgName, contactName, email, phone, type, notes }) {
  const subject = `Partnership Inquiry - ${orgName || contactName || 'Corporate Partner'} | Ten Kind Hands`;
  const fields = {
    'Form Type': 'CSR / Institutional Partnership Inquiry',
    'Organization Name': orgName || 'Not provided',
    'Contact Person': contactName || 'Not provided',
    'Email Address': email || 'Not provided',
    'Phone Number': phone || 'Not provided',
    'Partnership Type': type || 'Corporate CSR Sponsorship',
    'Collaboration Notes': notes || 'None provided'
  };

  return dispatchFormEmail({
    subject,
    replyTo: email,
    fields
  });
}

/**
 * 5. Monthly Field Report Newsletter Subscription
 * Dedicated title: "Newsletter Subscription - [Email] | Ten Kind Hands"
 */
export async function sendNewsletterSubscription({ email, source = 'Website' }) {
  const subject = `Newsletter Subscription - ${email} | Ten Kind Hands`;
  const fields = {
    'Form Type': 'Monthly Field Report Subscription',
    'Subscriber Email': email,
    'Subscribed From': source
  };

  return dispatchFormEmail({
    subject,
    replyTo: email,
    fields
  });
}
