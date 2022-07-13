/**
 * Check input is true or false
 *
 * @param value
 */
export function isTruthy(value): boolean {
  if (value === 'false' || value === '0') {
    return false;
  }
  return !!value;
}

/**
 * Generate random string by any length and custom source characters
 *
 * @param length
 * @param options
 */
export function randomString(length: number, options?: { source: string }) {
  let result = '';
  const characters = options.source ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}