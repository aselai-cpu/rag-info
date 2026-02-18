<!--
Sync Impact Report
===================
- Version change: N/A → 1.0.0 (initial ratification)
- Added principles:
  - I. Test-First (NEW)
  - II. Simplicity & YAGNI (NEW)
  - III. Defensive Engineering (NEW)
- Added sections:
  - Development Workflow
  - Quality Gates
  - Governance
- Removed sections: None (initial version)
- Templates requiring updates:
  - .specify/templates/plan-template.md — ✅ no update needed
    (Constitution Check section is generic; filled at plan time)
  - .specify/templates/spec-template.md — ✅ no update needed
    (spec template is principle-agnostic)
  - .specify/templates/tasks-template.md — ✅ no update needed
    (task phases align with test-first and story-driven approach)
- Follow-up TODOs: None
-->

# 102 Constitution

## Core Principles

### I. Test-First (NON-NEGOTIABLE)

- All features MUST have tests written before implementation code.
- The Red-Green-Refactor cycle MUST be followed: write a failing
  test, write the minimum code to pass, then refactor.
- No implementation PR MUST be merged without corresponding test
  coverage for the changed behavior.
- Tests MUST be independently runnable and deterministic.

**Rationale**: Tests written after implementation tend to confirm
what was built rather than what was intended. Test-first ensures
requirements drive the code, not the other way around.

### II. Simplicity & YAGNI

- Every feature MUST start with the simplest viable implementation.
- Abstractions MUST NOT be introduced until at least two concrete
  use cases exist (Rule of Two).
- Speculative features, premature optimization, and unused
  configurability MUST be avoided.
- Three similar lines of code are preferable to a premature
  abstraction.
- Complexity MUST be justified in writing when it exceeds the
  minimum needed for the current requirement.

**Rationale**: Unnecessary complexity is the primary source of
bugs, maintenance burden, and onboarding friction. Building only
what is needed keeps the codebase lean and comprehensible.

### III. Defensive Engineering

- All user input and external API data MUST be validated at system
  boundaries before processing.
- Strict typing MUST be enforced; implicit `any` types and type
  assertion escape hatches MUST NOT be used without documented
  justification.
- OWASP Top 10 vulnerabilities (XSS, injection, CSRF, etc.) MUST
  be actively prevented in all user-facing code paths.
- Dependencies MUST be kept to the minimum necessary and audited
  for known vulnerabilities before adoption.
- Secrets and credentials MUST NOT appear in source code or version
  control.

**Rationale**: Combining type safety with security-first practices
catches errors at compile time and prevents exploitable flaws at
runtime, reducing both bug density and attack surface.

## Development Workflow

- Feature work MUST follow a branch-based workflow with code review
  before merging to the main branch.
- Each user story MUST be independently implementable, testable,
  and deployable.
- Commits MUST be atomic and descriptive, covering one logical
  change per commit.
- Linting and formatting checks MUST pass before code review.

## Quality Gates

- All tests MUST pass in CI before a PR can be merged.
- Type checking MUST report zero errors before a PR can be merged.
- New code MUST NOT introduce linting warnings or errors.
- Security-sensitive changes (authentication, authorization, input
  handling) MUST receive explicit review from at least one other
  contributor.

## Governance

- This constitution supersedes all other development practices
  where conflicts arise.
- Amendments require: (1) a written proposal describing the change,
  (2) review and approval, and (3) a migration plan if existing
  code is affected.
- Version numbering follows semantic versioning:
  - MAJOR: backward-incompatible principle removals or redefinitions
  - MINOR: new principle/section additions or material expansions
  - PATCH: clarifications, wording fixes, non-semantic refinements
- Compliance with these principles MUST be verified during code
  review. Reviewers MUST flag violations.

**Version**: 1.0.0 | **Ratified**: 2026-02-17 | **Last Amended**: 2026-02-17
