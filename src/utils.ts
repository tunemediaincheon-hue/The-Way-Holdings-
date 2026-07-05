/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function hexToRgb(hex: string): string {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16) || 167;
  const g = parseInt(hex.substring(2, 4), 16) || 139;
  const b = parseInt(hex.substring(4, 6), 16) || 250;
  return `${r}, ${g}, ${b}`;
}

export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`theway_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error("Local storage save error:", error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`theway_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Local storage load error:", error);
    return defaultValue;
  }
}
