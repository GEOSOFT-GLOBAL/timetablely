/**
 * Password rules shared by signup and password reset.
 *
 * Kept out of the component file so both flows score passwords identically —
 * previously only the reset form had a meter, with its own private rules.
 */
export interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

/** The only rule enforced at submit; the rest raise the strength score. */
export const MIN_PASSWORD_LENGTH = 8;

export const passwordRequirements: PasswordRequirement[] = [
  {
    label: `At least ${MIN_PASSWORD_LENGTH} characters`,
    test: (password) => password.length >= MIN_PASSWORD_LENGTH,
  },
  {
    label: "Upper and lower case letters",
    test: (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
  { label: "A number", test: (password) => /\d/.test(password) },
  { label: "A symbol", test: (password) => /[^a-zA-Z0-9]/.test(password) },
];

/** Number of satisfied requirements, 0–4. */
export const scorePassword = (password: string) =>
  password.length === 0
    ? 0
    : passwordRequirements.filter((rule) => rule.test(password)).length;

export const isPasswordAcceptable = (password: string) =>
  password.length >= MIN_PASSWORD_LENGTH;
