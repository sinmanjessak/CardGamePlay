namespace CardGameAPI.Services
{
    public class CardService
    {
        private static readonly List<string> SpecialCardOrder = new List<string> { "4T", "PT", "RT", "2T", "ST" };
        private static readonly List<string> SuitsOrder = new List<string> { "D", "S", "C", "H" };
        private static readonly List<string> ValidRanks = new List<string> { "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" };

        //validates the card format
        public bool IsValidCard(string card)
        {
            
            if (SpecialCardOrder.Contains(card))
                return true;

            // If it's not a special card, it should be in the form of "RankSuit", e.g., "10D", "AC", etc.
            if (card.Length < 2) return false;

            string rank = card.Substring(0, card.Length - 1);
            string suit = card.Last().ToString();

            return ValidRanks.Contains(rank) && SuitsOrder.Contains(suit);
        }

        public List<string> SortCards(List<string> cards)
        {
            //  invalid cards
            var invalidCards = cards.Where(card => !IsValidCard(card)).ToList();
            if (invalidCards.Any())
            {
                throw new ArgumentException($"Invalid card(s) found: {string.Join(", ", invalidCards)}");
            }

            // Sorting logic
            var specialCards = cards.Where(card => SpecialCardOrder.Contains(card)).OrderBy(card => SpecialCardOrder.IndexOf(card)).ToList();
            var normalCards = cards.Except(specialCards).OrderBy(card =>
            {
                var suit = card.Last().ToString();
                var value = card.Substring(0, card.Length - 1);
                return (SuitsOrder.IndexOf(suit), ConvertCardValue(value));
            }).ToList();

            return specialCards.Concat(normalCards).ToList();
        }

        private int ConvertCardValue(string value)
        {
            if (int.TryParse(value, out var intValue)) return intValue;
            return value switch
            {
                "J" => 11,
                "Q" => 12,
                "K" => 13,
                "A" => 14,
                _ => 0
            };
        }
    }


}