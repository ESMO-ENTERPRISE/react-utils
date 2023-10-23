---
sidebar_position: 3
---

# Form Validators

- ```min(val: UseFormValue, minVal: number): boolean```<br />Validator that requires the control's value to be greater than or equal to the provided number.<br /><br />
- ```max(val: UseFormValue, maxVal: number): boolean```<br />Validator that requires the control's value to be less than or equal to the provided number.<br /><br />
- ```required(val: UseFormValue): boolean```<br />Validator that requires the control have a non-empty value.<br /><br />
- ```requiredTrue(val: UseFormValue): boolean```<br />Validator that requires the control's value be true. This validator is commonly used for required checkboxes.<br /><br />
- ```equal(withName: string): boolean```<br />Validator that requires the control's value to be equal with other control's value. This validator is commonly used to compare passwords.<br /><br />
- ```email(val: UseFormValue): boolean```<br />Validator that requires the control's value pass an email validation test.<br /><br />
- ```minLength(val: UseFormValue, minLengh: number): boolean```<br />Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.<br /><br />
- ```maxLength(val: UseFormValue, maxLength: number): boolean```<br />Validator that requires the length of the control's value to be less than or equal to the provided maximum length.<br /><br />
- ```pattern(pattern: string | RegExp): boolean```<br />Validator that requires the control's value to match a regex pattern.<br /><br />
- ```numeric(val: UseFormValue): boolean```<br />Validator that requires the control's value pass numeric validation test.<br /><br />
- ```decimal(val: UseFormValue): boolean```<br />Validator that requires the control's value pass decimal validation test.