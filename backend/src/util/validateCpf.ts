export function validateCpf(cpf: string): boolean {
  const regexCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return regexCpf.test(cpf);
}
