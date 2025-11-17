// utils/khmerNumbers.ts
const khmerDigits: Record<string, string> = {
  "0": "០",
  "1": "១",
  "2": "២",
  "3": "៣",
  "4": "៤",
  "5": "៥",
  "6": "៦",
  "7": "៧",
  "8": "៨",
  "9": "៩",
};

export function toKhmer(num: number | string): string {
  return num.toString().replace(/[0-9]/g, (d) => khmerDigits[d]);
}
