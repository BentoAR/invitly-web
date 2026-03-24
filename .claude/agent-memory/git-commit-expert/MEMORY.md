# Git Commit Expert Memory - invitly-web

## Project Context
- **Project**: invitly-web (Next.js 16 marketing site for Bento platform)
- **Repository**: https://github.com/BentoAR/invitly-web
- **Main branch**: master
- **Development branch**: dev
- **Current status**: Regular development workflow

## Commit Strategy Applied

### Session: 2026-03-24 - Templates Redesign Commits

Organized and pushed 2 semantic commits:

1. **`00ed194` - feat(templates): redesign InvitationsList with GSAP carousel and parallax**
   - Files: TemplatesSection.tsx, InvitationsList.tsx, TemplatesHeader.tsx (combined due to staging state)
   - Changes: Horizontal GSAP carousel with pin, internal parallax, train effect, mobile grid layout
   - Why combined: All three files were already staged together and represent cohesive feature work on templates catalog redesign

2. **`9716bdb` - chore: add product UX researcher agent memory**
   - Files: .claude/agent-memory/product-ux-researcher/* (4 new files)
   - Purpose: Documentation for future sessions with UX research context

### Key Details

- **Conventional Commits style**: All commits follow Semantic Versioning prefix format
- **Staging discipline**: Analyzed `git status` and `git diff` before committing
- **Branch management**: Pushed to `origin/dev` (development branch)
- **Co-author footer**: Included in all commits for attribution

## Future Recommendations

- If splitting complex feature work in future: reset staging more granularly and use `git add -p` for partial file staging
- Keep component redesigns (like InvitationsList) in single commits since they're atomic features
- Memory files can be committed separately as chore-type commits
