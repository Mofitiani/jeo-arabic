# جيو! و مبارزة

Two Arabic party games played in one room, with a TV (or laptop) as the host screen and phones as controllers. The site opens on a main screen with two buttons, one per game:

- `/`: main screen (pick a game)
- `/jeo`: جيو! (phones join at `/jeo?room=CODE`)
- `/duel`: مبارزة (phones join at `/duel?room=CODE`)

Old links (`/duel.html`, `/?room=CODE`) redirect to the new paths.

## Development

React 18 + TypeScript, built with Vite. Hosted on Vercel (framework preset: Vite, build `npm run build`, output `dist`).

```
npm install
npm run dev          # local dev server
npm run build        # type-check and build to dist/
npm run build:test   # build where phones and TV talk over BroadcastChannel (for browser tests, no Supabase)
```

```
src/
  App.tsx                 path switch: menu / جيو! / مبارزة (each a full page load)
  menu/                   main screen
  shared/                 realtime link (Supabase broadcast), answer matching, sounds, QR, hooks
  games/jeo/              data.js (question bank), copy.ts (all on-screen text, m/f forms),
                          host.ts (TV game logic), HostView.tsx, player.ts, PlayerView.tsx, jeo.css
  games/duel/             data.js (categories), icons.js (logo symbols), pics.tsx (pictures),
                          host.ts (TV game logic), HostView.tsx, player.ts, PlayerView.tsx, duel.css
```

Each game's TV logic lives in plain TypeScript (`host.ts`): the TV holds the game state, phones send events, and the TV broadcasts the state. The React views only render it.

## جيو!

A trivia board: players join from their phones to vote, buzz in and answer.

- Open جيو! on the host screen. The lobby shows a room code and a QR code.
- Players scan the code, enter a name, choose لاعب or لاعبة, and vote for up to 3 of 12 topics.
- Start the game: the votes decide the 6 columns (popular topics can take 2), avoiding categories played recently on this screen. A short intro explains the rules and reveals today's categories.
- The host reads a clue (or turns on voice so the TV reads it and opens the buzzers when it finishes). Buzzing early locks that phone for 0.25 s.
- The first player to buzz types the answer within 20 s. Answers are checked with fuzzy matching (Levenshtein after normalizing Arabic spelling; numbers must match exactly), and the host can undo or override any mark.
- Two hidden wager tiles, and a final round with secret wagers and answers typed on phones.

Files: `src/games/jeo/data.js` is the question bank (12 topics, 5 categories each, 5 clues per category), final-round clues, and the category descriptions shown on hover. All on-screen text is in `copy.ts`, with masculine and feminine forms.

Buzzes travel over Supabase Realtime broadcast channels using the project's public key; no database tables are used. The TV can read clues aloud with the browser's built-in speech synthesis.

## مبارزة

A second game on the same site: a 1v1 picture duel, played in one room with the TV at `/duel` and two phones joining by room code.

- Before each match, the two players choose a theme (منوّع، من عنّا، رياضة، شاشة ونجوم، عالم وسفر، فن وثقافة، ماركات وأغراض، للصغار) and a starting difficulty on their phones. If they disagree, the TV draws one player's choice at random.
- The TV then offers 8 random categories from that theme; each player picks one (or a hidden random one). Best of 3 rounds: round 1 in player 1's category, round 2 in player 2's, a tie-breaker in a random one from the theme.
- Each player has a 30-second or 1-minute clock (set on the TV in the lobby). A right answer passes the turn; passing costs 3 seconds; whoever runs out loses the round. Pictures start at the chosen difficulty and get harder.
- If a picture is wrong or gives the answer away, the host taps صورة غلط: it's skipped with no penalty and never shown again on that TV.
- Answer by typing, in Arabic or English; the host can also mark صح or مرّر.
- Anyone else waits in line, predicts the winner for stars, and the winner stays to face the next challenger.
- **No-phone mode** (lobby toggle بدون تلفونات): players are added by name on the TV, choose theme, level and categories on the TV, and shout their answers. Two ways to judge:
  - المضيف بيعرف الجواب: the host presses Space for right; holding H shows the answer in a corner while held.
  - كشف وتأكيد: R reveals the answer and pauses the clock; Y or Space if it was right (turn passes), N if wrong (counts as a pass, −3 s).
  - Both: P pass, B wrong picture, Esc pause, Enter for start / next round / next match. Every key also has an on-screen button.

`src/games/duel/data.js` holds the categories, items and difficulty levels. Flags come from flag-icons (MIT) and other pictures from Twemoji (CC BY 4.0); credits are shown in the lobby.

Logo categories (`kind: "icon"`) use brand symbols from Simple Icons (CC0), bundled in `src/games/duel/icons.js`; each was checked by eye to show no brand name. Character categories (`kind: "file"`) use pictures checked by eye and pinned to exact Wikipedia file names in `DUEL_FILES`. Other photo categories store only English Wikipedia article titles: for `kind: "item"` the TV looks up the article's Wikidata item and uses its Commons photo (P18) or map (P242). Photos are fetched at game time and remembered in the TV's browser storage; no photos are stored in this repo or on the site.
