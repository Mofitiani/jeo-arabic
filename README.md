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

## مبارزة (duel.html)

A second game on the same site: a 1v1 picture duel, played in one room with the TV at `/duel.html` and two phones joining by room code.

- Each of the two players picks a picture category (not the same as the opponent's). Best of 3 rounds: round 1 in player 1's category, round 2 in player 2's, a tie-breaker in a random one.
- Each player has a 30-second clock. A right answer passes the turn; passing costs 3 seconds; whoever runs out loses the round. Pictures go from easy to medium to hard within a round.
- Answer by voice (hands-free during your turn) or by typing; the host can also mark صح or مرّر.
- Anyone else waits in line, predicts the winner for stars, and the winner stays to face the next challenger.

`duel-data.js` holds the categories, items and difficulty levels. Flags come from flag-icons (MIT) and other pictures from Twemoji (CC BY 4.0); credits are shown in the lobby.

Character categories (`kind: "wikipage"`) store only English Wikipedia article titles. The TV fetches each article's lead picture at game time and keeps it in its own browser storage; no images are stored in this repo or on the site.
