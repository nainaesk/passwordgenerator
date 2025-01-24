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
      passwordLength: [null, [Validators.required, Validators.min(5), Validators.max(50)]],
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

    if (this.passwordForm.invalid) {
      this.error = "Enter a number between 5 and 50";
    } else {
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
