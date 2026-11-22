# جيو!

An Arabic trivia board game played in one room. The host screen (a laptop or TV) shows the board, and players join from their phones to vote, buzz in and answer.

- Open the site on the host screen. The lobby shows a room code and a QR code.
- Players scan the code, enter a name, choose لاعب or لاعبة, and vote for up to 3 of 12 topics.
- Start the game: the votes decide the 6 columns (popular topics can take 2), avoiding categories played recently on this screen. A short intro explains the rules and reveals today's categories.
- The host reads a clue (or turns on voice so the TV reads it and opens the buzzers when it finishes). Buzzing early locks that phone for 0.25 s.
- The first player to buzz types the answer within 20 s. Answers are checked with fuzzy matching (Levenshtein after normalizing Arabic spelling; numbers must match exactly), and the host can undo or override any mark.
- Two hidden wager tiles, and a final round with secret wagers and answers typed on phones.

Files:
- `index.html`: the whole app (host screen and phone). All on-screen text is in its `COPY` table, with masculine and feminine forms.
- `questions.js`: the question bank (12 topics, 5 categories each, 5 clues per category), final-round clues, and the category descriptions shown on hover.

Buzzes travel over Supabase Realtime broadcast channels using the project's public key; no database tables are used. The TV can read clues aloud with the browser's built-in speech synthesis.

## مبارزة (duel.html)

A second game on the same site: a 1v1 picture duel, played in one room with the TV at `/duel.html` and two phones joining by room code.

- Before each match, the two players choose a theme (منوّع، من عنّا، رياضة، شاشة ونجوم، عالم وسفر، فن وثقافة، ماركات وأغراض، للصغار) and a starting difficulty on their phones. If they disagree, the TV draws one player's choice at random.
- The TV then offers 8 random categories from that theme; each player picks one (or a hidden random one). Best of 3 rounds: round 1 in player 1's category, round 2 in player 2's, a tie-breaker in a random one from the theme.
- Each player has a 30-second or 1-minute clock (set on the TV in the lobby). A right answer passes the turn; passing costs 3 seconds; whoever runs out loses the round. Pictures start at the chosen difficulty and get harder.
- If a picture is wrong or gives the answer away, the host taps صورة غلط: it's skipped with no penalty and never shown again on that TV.
- Answer by typing, in Arabic or English; the host can also mark صح or مرّر.
- Anyone else waits in line, predicts the winner for stars, and the winner stays to face the next challenger.

`duel-data.js` holds the categories, items and difficulty levels. Flags come from flag-icons (MIT) and other pictures from Twemoji (CC BY 4.0); credits are shown in the lobby.

Logo categories (`kind: "icon"`) use brand symbols from Simple Icons (CC0), bundled in `duel-icons.js`; each was checked by eye to show no brand name. Photo categories store only English Wikipedia article titles: for `kind: "item"` the TV looks up the article's Wikidata item and uses its Commons photo (P18) or map (P242). Pictures are fetched at game time and remembered in the TV's browser storage; no images are stored in this repo or on the site.
