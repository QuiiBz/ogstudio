/**
 * Convert string input values into number.
 */
export function setValue(value: string | number, max?: number) {
  if (typeof value === "string") {
    const numberValue = Number(value.replace(/[^0-9.-]/g, ""));
    if (max) return numberValue > max ? max : numberValue;
    return numberValue;
  }

  return value;
}
