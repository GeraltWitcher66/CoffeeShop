const faNumber = new Intl.NumberFormat('fa-IR');
const faDigits = '۰۱۲۳۴۵۶۷۸۹';

export function formatNumber(value) {
  return faNumber.format(value);
}

export function formatPrice(value) {
  return `${faNumber.format(value)} تومان`;
}

export function toEnglishDigits(value) {
  return String(value).replace(/[۰-۹]/g, (digit) => String(faDigits.indexOf(digit)));
}

export function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => faDigits[Number(digit)]);
}
