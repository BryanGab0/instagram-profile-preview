# Contributing

Thanks for your interest in improving InstaPreview!

## Before you start

- **Bugs:** open an issue with steps to reproduce.
- **New features:** open an issue first so we can agree on the idea before you spend time on code.

## Development setup

1. Fork the repository and clone your fork.
2. Install dependencies with `npm install`.
3. Start the app with `npm run dev`.

## Workflow

1. Create a branch from `main` named `type/short-description`, for example `feat/export-png` or `fix/bio-line-breaks`.
2. Make your changes, with tests for any new logic.
3. Make sure every check passes:

   ```bash
   npm run format && npm run lint && npm run typecheck && npm test
   ```

4. Open a pull request describing what changed and why. Screenshots help a lot for visual changes.

CI runs the same checks on every pull request, and a pull request can only be merged when they pass.

## Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(editor): allow captions on posts
fix(preview): keep long usernames on one line
docs: explain how to deploy
```

Common types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore` and `ci`.

## Guidelines

- **TypeScript is strict.** Avoid `any` and type assertions; if one is unavoidable, explain why in a comment.
- **Tests live next to the code** they test, as `*.test.ts` or `*.test.tsx`.
- **Comments explain why, not what.** The code already shows what it does.
- **The app's interface is in Brazilian Portuguese.** Code, comments and documentation are in English.
- **The preview must match the real app.** Base visual changes on screenshots of the current Instagram app, not on memory.
- **Accessibility matters.** Every control needs an accessible name, and the app must work with a keyboard.
