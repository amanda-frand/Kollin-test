<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project decisions

- Keep the first release frontend-only with lesson state in React, because persistent accounts and progress were not requested.
- Use a semantic-token-first playful learning design, so all future math experiences share the same accessible visual language.
- Shared page chrome (header with stats, bottom nav) lives in src/components/site-chrome.tsx and is mounted once in src/routes/__root.tsx around <Outlet />, so / and /amnen stay in sync.
