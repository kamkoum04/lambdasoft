/**
 * Single source of truth for contact details.
 *
 * Two facts are unset, and each is expressed the same way: one constant that is
 * empty until it is real, with everything else derived from it. Setting the
 * constant flips every consequence at once. Do not hand-maintain a second field
 * that says the same thing — an earlier version had `emailIsPlaceholder: true`
 * sitting next to a derived `formIsLive`, so replacing the address without also
 * flipping the flag would have published a real inbox that search engines were
 * still told to ignore.
 */

/** Set to the real address. While empty, the placeholder ships and is marked as one. */
const CONTACT_EMAIL = '';
const PLACEHOLDER_EMAIL = 'hello@lambdasoft.com';

/**
 * The contact form has no destination yet. Front end is built and wired to this
 * one value: set it to a form-service endpoint (Web3Forms, Formspree, or an own
 * /api route) and the form activates, the disabled state lifts and the "not
 * connected" notice disappears. Until then the form is deliberately inert —
 * a form that looks live and silently drops messages is worse than none.
 */
const FORM_ENDPOINT = '';

export const site = {
  name: 'lambdasoft',
  email: CONTACT_EMAIL || PLACEHOLDER_EMAIL,
  emailIsPlaceholder: CONTACT_EMAIL.length === 0,
  formEndpoint: FORM_ENDPOINT,
  formIsLive: FORM_ENDPOINT.length > 0,
} as const;
