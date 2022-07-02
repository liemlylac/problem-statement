export function isTruthy(value): boolean {
  if (value === 'false' || value === '0') {
    return false;
  }
  return !!value;
}
