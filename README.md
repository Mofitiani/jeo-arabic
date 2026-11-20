# جيو!

An Arabic trivia board game played in one room. The host screen (a laptop or TV) shows the board, and players join from their phones to vote, buzz in and answer.

- Open the site on the host screen. The lobby shows a room code and a QR code.
- Players scan the code, enter a name, choose لاعب or لاعبة, and vote for up to 3 of 12 topics.
- Start the game: the votes decide the 6 columns (popular topics can take 2), avoiding categories played recently on this screen. A short intro explains the rules and reveals today's categories.
- The host reads a clue (or turns on voice so the TV reads it and opens the buzzers when it finishes). Buzzing early locks that phone for 0.25 s.
- The first player to buzz types or says the answer within 20 s. Answers are checked with fuzzy matching (Levenshtein after normalizing Arabic spelling; numbers must match exactly), and the host can undo or override any mark.
- Two hidden wager tiles, and a final round with secret wagers and answers typed on phones.

Files:
- `index.html`: the whole app (host screen and phone). All on-screen text is in its `COPY` table, with masculine and feminine forms.
- `questions.js`: the question bank (12 topics, 5 categories each, 5 clues per category), final-round clues, and the category descriptions shown on hover.

Buzzes travel over Supabase Realtime broadcast channels using the project's public key; no database tables are used. Voice uses the browser's built-in speech synthesis (TV) and speech recognition (phones).
