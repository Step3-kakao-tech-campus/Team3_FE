export function validateEmail(email: string): boolean {
  const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email) && email.length <= 100;
}

export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-Z0-9가-힣]{1,20}$/;
  return nameRegex.test(name);
}

export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/;
  return passwordRegex.test(password);
}

export function validatePasswordConfirm(password: string, passwordConfirm: string): boolean {
  return password === passwordConfirm;
}
