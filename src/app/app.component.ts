import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PasswordsService } from './services/passwords.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  password: string = "";
  error: string | null = null;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private passwordService: PasswordsService, private destroyRef: DestroyRef) {
    this.passwordForm = this.fb.group({
      passwordLength: [5, [Validators.required, Validators.min(5), Validators.max(30)]],
      includeAlphabets: [true],
      includeNumbers: [false],
      includeSpecialChar: [false]
    });
  }

  ngOnInit(): void {
    const formValueChange$ = this.passwordForm.valueChanges.subscribe(() => {
      this.validateChanges();
    });
    this.destroyRef.onDestroy(() => {
      formValueChange$.unsubscribe();
    })
  }
  validateChanges() {
    this.password = "";
    const { includeAlphabets, includeNumbers, includeSpecialChar } = this.passwordForm.value;
    if (this.passwordForm.invalid) {
      this.error = "Enter a valid number between 5 and 30";
    }
    else if (!includeAlphabets && !includeNumbers && !includeSpecialChar) {
      this.error = "Select atleast one of the options"
    }
    else {
      this.error = "";
    }
  }

  handleGeneratePassword() {
    if (this.error) { return; }
    const { passwordLength, includeAlphabets, includeNumbers, includeSpecialChar } = this.passwordForm.value;
    this.password = this.passwordService.generatePassword(passwordLength, { alphabets: includeAlphabets, numbers: includeNumbers, specialChar: includeSpecialChar });
  }
  getCharColor(char: string) {
    return this.passwordService.getCharColor(char)
  }

  get random() {
    return Math.random()
  }
}
