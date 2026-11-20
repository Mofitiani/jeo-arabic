# ما وراء السطور

An Arabic trivia board game played in one room. The host screen (a laptop or TV) shows the board, and players join from their phones to buzz in and type their answers.

- Open the site on the host screen. It shows a 4-letter room code and a QR code.
- Players scan the code (or open `?room=CODE`), enter a name and get a buzzer.
- The host reads a clue and opens the buzzers. Buzzing early locks that phone for 0.25 s.
- The first player to buzz types an answer within 20 s. Answers are checked with fuzzy matching (Levenshtein, after normalizing Arabic spelling), and the host can undo or override any mark.
- Two hidden wager tiles, plus a final round with secret wagers and answers typed on phones.

Everything is in `index.html`, with no build step. Buzzes travel over Supabase Realtime broadcast channels using the project's public key, and no database tables are used.
