# Usage

```javascript
interface IForm {
    email: string;
    password: string;
    repeatPassword: string;
    age: number;
};

function FormComponent() {
    // Custom age validator
    const ageValidator = (val: UseFormValue): string | null => {
    if (val === "") {
        return null;
    }

    if (Number(val) < 18) {
        return " Not 18";
    }

    return null;
    };

    const {ref, data, errors, handleSubmit} = useForm<ExampleForm>(
        {
            email: ['test@test.com', required('Email is required'), email()],
            password: [required('Password is required'), minLength(8)],
            repeatPassword: [required('Repeat password is required'), equal<ExampleForm>('password', 'Passwords must match')],
            age: [required('Age is required'), ageValidator],
        },
        {
            validateOn: 'change',
        });

    const submit = () => {
        // do something
    };

    return (
    <form ref={form.ref} onSubmit={handleSubmit}>
        <input type="text" placeholder="Email address" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <input type="password" placeholder="Repeat password" name="repeatPassword" />
        <input type="number" placeholder="Age" name="age" />
        <button type="submit">Submit</button>
    </form>
    );
```

# Validators

- ```min(minVal: number, message: string): string | null```<br />Validator that requires the control's value to be greater than or equal to the provided number.<br /><br />
- ```max(maxVal: number, message: string): string | null```<br />Validator that requires the control's value to be less than or equal to the provided number.<br /><br />
- ```required(message: string): string | null```<br />Validator that requires the control have a non-empty value.
- ```requiredTrue(message: string): string | null```<br />Validator that requires the control's value be true. This validator is commonly used for required checkboxes.<br /><br />
- ```equal(withName: string, message: string): string | null```<br />Validator that requires the control's value to be equal with other control's value. This validator is commonly used to compare passwords.<br /><br />
- ```email(message: string): string | null```<br />Validator that requires the control's value pass an email validation test.<br /><br />
- ```minLength(minLengh: number, message: string): string | null```<br />Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.<br /><br />
- ```maxLength(maxLength: number, message: string): string | null```<br />Validator that requires the length of the control's value to be less than or equal to the provided maximum length.<br /><br />
- ```pattern(pattern: string | RegExp, message: string): string | null```<br />Validator that requires the control's value to match a regex pattern.<br /><br />
- ```numeric(message: string): string | null```<br />Validator that requires the control's value pass numeric validation test.<br /><br />
- ```decimal(message: string): string | null```<br />Validator that requires the control's value pass decimal validation test.