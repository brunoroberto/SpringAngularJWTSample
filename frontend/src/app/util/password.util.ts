export const PASSWORD_PATTERN_UPPERCASE = /[A-Z]+/;
export const PASSWORD_PATTERN_LOWECASE = /[a-z]+/;
export const PASSWORD_PATTERN_NUMBER = /[0-9]+/;
export const PASSWORD_PATTERN_MIN_8_CHARS = /^.{8,}$/;

export const PASSWORD_PATTERN = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';