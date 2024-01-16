## Contributing

Thanks for your interest in contributing to next-international!

### Requirements

- `node` >= 20
- `pnpm` >= 8

### Getting Started

1. Fork the repository, then clone it locally
2. Run `pnpm install` at the root of the repository
3. Setup the environment variables:
    1. Copy `.env.example` to `.env`:
        ```sh
        cp apps/dashboard/.env.example apps/dashboard/.env
        ```
    2. Open the `.env` file and fill in the GitHub and/or Google OAuth credentials by following the instructions
4. Setup the local SQLite database:
    1. Install the `turso` CLI:
        ```sh
        curl -sSfL https://get.tur.so/install.sh | bash
        ```
    2. Install the `sqld` CLI from  the [releases](https://github.com/tursodatabase/libsql/releases) or with Homebrew:
        ```sh
        brew tap libsql/sqld
        brew install sqld
        ```
    3. Navigate to `apps/dashboard` and run `pnpm db:db`, then `pnpm db:migrate` in a separate terminal
5. Navigate to `apps/dashboard` and run `pnpm dev`

Before submitting a PR, run the `test`, `lint`, and `typecheck` scripts from the root of the repository.

