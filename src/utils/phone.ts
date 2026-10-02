/**
 * Converts what the user typed into the +994XXXXXXXXX format the API expects.
 * Accepts e.g. "050 123 45 67", "501234567", "994501234567", "+994 50 123 45 67".
 */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('994')) return `+${digits}`;
  if (digits.startsWith('0')) return `+994${digits.slice(1)}`;
  return `+994${digits}`;
}

export function isValidPhone(input: string): boolean {
  return /^\+994\d{9}$/.test(normalizePhone(input));
}
