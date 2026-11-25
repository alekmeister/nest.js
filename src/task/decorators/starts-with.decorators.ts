import { registerDecorator, ValidationOptions } from 'class-validator';

export function StartsWith(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return (obj: Object, propertyName: string) => {
    registerDecorator({
      name: 'startsWith',
      target: obj.constructor,
      propertyName,
      constraints: [prefix],
      options: validationOptions,
      validator: {
        validate: (value: unknown) =>
          typeof value === 'string' && value.startsWith(prefix),
        defaultMessage: () => `Поле должно начинаться с "${prefix}"`,
      },
    });
  };
}
