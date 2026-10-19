# CS650 — Chapter 5: Constraint Satisfaction Problems

A fully static, beginner-friendly, instructor-paced interactive teaching site for GitHub Pages.

## Scope

The numbering follows the **4th Global Edition** of Russell and Norvig, *Artificial Intelligence: A Modern Approach*: 5.1 defining CSPs, 5.2 constraint propagation, 5.3 backtracking, 5.4 local search, 5.5 problem structure. The US edition uses chapter 6 for this material.

It includes separate animated, explanatory lessons for: variables/domains/constraints; map coloring; scheduling; constraint types; propagation; node consistency; arc consistency; AC-3 with directed arcs and REVISE; path consistency; k-consistency; AllDiff; AtMost; bounds propagation; Sudoku; backtracking; MRV; degree; LCV; search and inference; backjumping; constraint learning; local search; min-conflicts; component structure; trees; cycle cutsets; tree decomposition; value symmetry; and chapter review.

Each activity provides instructor-controlled next/previous/replay/autoplay, explicit intermediate state, student comprehension question, transfer prompt, and optional teacher note. No external libraries, CDNs, fonts, images or build step are necessary. Graphic assets (including graph diagrams) are generated in native SVG by the site itself.

## Repository name

Recommended new GitHub repository: **CS650-Chapter05-CSP-Interactive**

GitHub owner: **`monroeu`** (Monroe University). When created under this organization, the expected address is:

`https://monroeu.github.io/CS650-Chapter05-CSP-Interactive/`

This is a proposed URL, not a currently deployed website.

## Upload and publish via GitHub (web interface)

1. Sign in to GitHub with permission to create repositories in the `monroeu` organization. If you do not have organization permission, create the repository in an account you control and use that owner in the URL.
2. From GitHub choose **New repository**, set Owner to `monroeu` (if available), Name to `CS650-Chapter05-CSP-Interactive`, and Visibility to Public. Create it.
3. Download and **unzip** the provided archive. Upload `index.html`, `README.md`, and the `assets/` directory to the repository **root**, preserving the structure. Do not upload only the ZIP: GitHub Pages will not unpack it.
4. Commit the files to the `main` branch.
5. Open repository **Settings → Pages**. Under **Build and deployment**, Source: **Deploy from a branch**. Branch: `main`; folder: `/ (root)`. Save.
6. Open `https://monroeu.github.io/CS650-Chapter05-CSP-Interactive/` when GitHub reports the site published. If GitHub Pages is restricted by organization policy, ask the organization administrator to allow Pages.
7. For Blackboard: add a Web Link titled `CS650 Chapter 5: Interactive CSP Lab`, paste the published address, and set it to open in a new tab.

## Folder layout

```
CS650-Chapter05-CSP-Interactive/
├── index.html
├── README.md
├── .nojekyll
└── assets/
    ├── app.js
    ├── lessons.js
    ├── style.css
    └── favicon.svg
```

## Teaching and usage

- On the left, pick a subsection.
- Click **Next step**. Each click represents one discrete rule application or algorithm action. **Previous** goes back.
- **Auto-play** advances every 3.4 seconds; use Pause to stop. This is an optional convenience, not needed for instruction.
- **Instructor notes** shows a teacher prompt or important nuance.
- Answer the question under the demonstration to reveal an explanation.
- Use browser **Print** for a simple handout.
- For live demonstrations, use browser full-screen mode, increase zoom, and turn on teacher notes.
- Keyboard shortcuts when focus is outside a button: Left Arrow / Right Arrow.

## Maintenance

- Edit teaching text and steps in `assets/lessons.js`; each `add()` call defines a lesson.
- Edit site interactions in `assets/app.js`.
- Edit appearance in `assets/style.css`.
- Test locally by opening `index.html` in a browser; all assets use relative paths.
- To add a quiz, use the `Q(question, choiceA, choiceB, choiceC, correctIndex, explanation)` helper in `lessons.js`.

## Pedagogical note

The examples are original, simplified demonstrations. They are intended to explain each operation and are **not** verbatim textbook figures. For textbook exercises and formal proofs, consult the licensed textbook. Particularly, `AC-3 returns true` means no arc inconsistency was found: it does not necessarily certify a complete CSP solution.

## Accessibility

Semantic controls, visible focus indicators, text descriptions for every visual step, reduced-motion preference support, instructor-controlled progression, responsive layout. No student accounts or data tracking.

## Cross-section navigation (Version 2 update)

- **Previous step** moves backward within a lesson. At step 1, it automatically opens the **last step of the preceding subsection**.
- **Next step** moves forward; from the final step it opens the next subsection.
- **Previous subsection** and **Next subsection** skip directly between lessons.
- **Section overview** returns to the first lesson of the current numbered textbook section.
- The left navigation panel allows direct access to any subsection.
- Browser Back and Forward buttons can use the subsection URL fragment; individual step positions are controlled on the page.
- Keyboard Left/Right arrows also navigate steps when the focus is not in another interactive control.


## Version 3 — Illustrated Masterclass Upgrade

- Includes **29 lessons**, now with structured beginner introduction, walkthrough, reflection, and transfer stages (**about 236 step screens**).
- New `assets/visuals.js` provides separate scalable inline SVG visuals: map regions, queue-style AC-3 arcs, branching backtracking tree, eight-queen chessboard, Sudoku grid, resource capacity bars, and highlighted graph links.
- A domain-difference panel explicitly identifies removed/restored values between steps.
- Observe → Explain why → Predict cards reinforce reasoning instead of memorization.
- Previous step crosses backward into the prior subsection at its last step. Previous subsection, Section overview, Next subsection, and Next step are also provided.
- All assets are local. No image downloads, CDN, API keys, Supabase, or paid services are necessary.
- Illustrations are teaching diagrams; some are schematic rather than complete algorithm solvers. The Sudoku figure is a demonstration board, not the book's reproduced figure.

### Release procedure

Upload the contents of this extracted folder (including `assets/`) into the root of `monroeu/CS650-Chapter05-CSP-Interactive`, replacing existing files. GitHub Settings → Pages → Deploy from branch `main`, folder `/ (root)`.

### Classroom guide

Use the diagram to introduce the problem, advance through each algorithm stage, and require students to explain domain removals. For AC-3, pause at every arc; for backtracking, ask which choice is undone; for min-conflicts, ask students to count attacking pairs. End every subsection with the quiz and transfer challenge. For a fully executable generalized solver, supplement this static explanatory site with Python programming labs.
