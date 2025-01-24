import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PasswordsService } from './services/passwords.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  password: string = "";
  error: string | null = null;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private passwordService: PasswordsService) {
    this.passwordForm = this.fb.group({
      passwordLength: [null, [Validators.required, Validators.min(5), Validators.max(50)]],
      includeAlphabets: [true],
      includeNumbers: [true]
    });
  }

  ngOnInit(): void {
    const formValueChange$ = this.passwordForm.valueChanges.subscribe(() => {
      this.validateChanges();
    });
  }
  validateChanges() {
    this.password = "";
    console.log(this.passwordForm);

    if (this.passwordForm.invalid) {
      this.error = "Enter a number between 5 and 50";
    } else {
      this.error = "";
    }
  }

  handleGeneratePassword() {
    if (this.passwordForm.errors) { }
    const { passwordLength, includeAlphabets, includeNumbers } = this.passwordForm.value;
    this.password = this.passwordService.generatePassword(passwordLength, { alphabets: includeAlphabets, numbers: includeNumbers, specialChar: false });

  }
}
