export const PASSWORD_STRENGTH_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export type valueof<T> = T[keyof T];
