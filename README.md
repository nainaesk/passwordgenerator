# PasswordGenerator

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

# Stage 1: Generate password that contains alphabets

Assumptions:

- Alphabets: Includes uppercase and lowercase English letters.
- Password Length: Should be atleast 5 and maximum of 50
- Validation: Entered input is validated on blur

Steps:

- create an numeric input to enter number
  - handle validation on blur
- create a "generate" button to trigger creation of password
  - should be disabled if value is null, not within the set limits
- Password creation
  - implement password creation logic in a centralized service so that it can be easily extended in the future.
- Display created password

# Stage 2: Include checkboxes for adding alphabets and numbers

Assumptions:

- If both the categories (alphabets, numbers) are checked the number of characters from each category would be random and be atleast one.
- By default only alphabets check box is checked.

Steps:

- Include checkboxes for user to select following options:
  1. Include alphabets
  2. Include numbers
- Validate to see if atleast one of the checkboxes are checked.
