import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'app-sortcard',
  templateUrl: './sortcard.component.html',
  styleUrls: ['./sortcard.component.css'],
})
export class SortcardComponent {
  cards: string[] = []; // Array to hold valid cards
  invalidCards: string[] = []; // Array to hold invalid cards
  errorMessage: string = ''; // Error message for invalid cards
  inputCards: string = ''; // User input for the card string

  private specialCards = ['4T', '2T', 'ST', 'PT', 'RT']; // Define special cards

  constructor(private cardService: SortingService) {}

  // Card validation logic
  private isValidCard(card: string): boolean {
    const validSuits = ['D', 'S', 'C', 'H'];
    const validRanks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];

    if (this.specialCards.includes(card)) return true; // Allow special cards

    if (card.length < 2 || card.length > 3) return false; // Invalid if length is not 2 or 3

    const rank = card.slice(0, card.length - 1);
    const suit = card[card.length - 1];

    // Check if the rank and suit are valid
    return validRanks.includes(rank) && validSuits.includes(suit);
  }

  // Call the API to sort the valid cards
  sortCards(): void {
    this.errorMessage = ''; // Clear previous error messages
    this.invalidCards = []; // Clear previous invalid cards

    // Split input string into an array of cards
    const cardArray = this.inputCards.split(',').map((card) => card.trim());

    // Separate valid and invalid cards
    this.cards = cardArray.filter((card) => this.isValidCard(card));
    this.invalidCards = cardArray.filter(
      (card) => !this.isValidCard(card) && !this.specialCards.includes(card)
    ); // Only show truly invalid cards

    // If there are invalid cards, don't call the API and display them separately
    if (this.invalidCards.length > 0) {
      this.errorMessage = `Some invalid cards detected: ${this.invalidCards.join(
        ', '
      )}`;
      return;
    }

    // Proceed to call the API to sort the valid cards
    this.cardService
      .sortCards(this.cards)
      .pipe(
        tap((response) => {
          this.cards = response.sortedCards;
        }),
        catchError((error) => {
          console.error('Error sorting cards', error);
          return of([]); // return an empty array or handle the error as needed
        })
      )
      .subscribe();
  }

  // Get the rank part of the card (e.g., "3", "J", "PT", etc.)
  getCardRank(card: string): string {
    return card.slice(0, card.length - 1); // Everything except the last character (suit)
  }

  // Get the suit part of the card (e.g., "D", "S", etc.)
  getCardSuit(card: string): string {
    const suitMap: { [key: string]: string } = {
      D: '♦',
      S: '♠',
      C: '♣',
      H: '♥',
    };
    return suitMap[card[card.length - 1]] || card; // Use suitMap or return original for special cards
  }

  // Apply classes based on the suit of the card
  cardClass(card: string): string {
    const suit = card[card.length - 1];
    return suit === 'D' || suit === 'H' ? 'card red' : 'card black';
  }
}