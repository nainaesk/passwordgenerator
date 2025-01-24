import { Injectable } from '@angular/core';

export interface SelectedPool {
  alphabets: boolean,
  numbers: boolean,
  specialChar: boolean
}

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {
  private alphabetPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private numericPool = "1234567890";
  private specialCharPool = "!@#$%^&*()_+[]{}|;:,.<>?";

  constructor() { }

  generatePassword(passwordLength: number, selectedPool: SelectedPool): string {
    let unshuffledPassword = "";
    let remainingLength = passwordLength;
    let pools: string[] = this.getPools(selectedPool);

    for (let pool = 0; pool < pools.length; pool++) {
      let currPoolLength = Math.floor(Math.random() * (remainingLength - pools.length + 1)) + 1;

      if (pool === pools.length - 1) {
        currPoolLength = remainingLength;
      }
      remainingLength -= currPoolLength;

      for (let i = 0; i < currPoolLength; i++) {
        unshuffledPassword += pools[pool][Math.floor(Math.random() * pools[pool].length)]
      }
    }
    console.log(unshuffledPassword);

    return this.shufflePassword(unshuffledPassword);
  }

  shufflePassword(str: string): string {
    return str.split("").sort(() => 0.5 - Math.random()).join("");
  }

  private getPools(selectedPools: {
    alphabets: boolean,
    numbers: boolean,
    specialChar: boolean
  }) {
    let pools = [];
    if (selectedPools.alphabets) {
      pools.push(this.alphabetPool)
    } if (selectedPools.numbers) {
      pools.push(this.numericPool)
    } if (selectedPools.specialChar) {
      pools.push(this.specialCharPool)
    }
    return pools;
  }
}
