export const Rupiah = angka => {
  const format = angka.split('').reverse().join('');
  const convert = format.match(/\d{1,3}/g);
  const rupiah = 'Rp. ' + convert.join('.').split('').reverse().join('');
  return rupiah;
};
