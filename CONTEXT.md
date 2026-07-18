# @dnd-mapp/project-template

Scaffold repo for new `dnd-mapp` repos (Angular apps, NestJS services, plain TypeScript/Node projects, and GitHub Actions), carrying the org's shared tooling and process conventions, not product code.

## Language

**Template repository**:  
GitHub's own feature (`Settings → Template repository`), which gives a repo a **Use this template** button. Clicking it copies the repo's current file tree into a new repo, as a plain, one-time file copy: no git history, and no variable substitution of any kind. Renaming placeholder values (package name, badge URLs, etc.) in a newly generated repo is a manual step, see the checklist in [README.md](README.md#using-this-template).  
_Avoid_: "scaffolding tool" or "generator" for this mechanism, those imply prompt-driven variable substitution (e.g. Copier, Cookiecutter, Yeoman), which this repo deliberately does not use, see [ADR 0001](docs/adr/0001-github-native-template-repository.md).
