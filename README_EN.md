# meow LLM Detector 4.5.3

Compare model behavior using distributions of answers to short probes. Fingerprint evidence is not identity authentication and does not establish why a provider's behavior differs.

## Download and launch

- Windows 10/11 Intel/AMD x64: use the `windows-x64-portable-en.zip`, extract into a new folder and run `start.bat`. Python and dependencies are isolated and bundled.
- Source packages require Python 3.11+ on Windows, macOS or Linux. Run `start.bat` on Windows or `sh start.sh` on macOS/Linux. Dependencies are installed in a private environment, not globally.
- The default address is http://127.0.0.1:8765/ . Pass `--port 8790` for a different port.
- The [website](https://meowllm.top/) requires no installation; reports are public and upstream APIs must use public HTTPS.

Use [GitHub Releases](https://github.com/chen-006/meow-llm-detector/releases) for official downloads. A 4.5.3 acceptance build is not a published release.

## First detection

Choose a protocol, enter URL/Key or select a saved connection, choose a baseline and claimed model, then review the request budget and start. Fetch the site's model list to fill the request alias, or enter it manually. API charges belong to your account. Search history by URL, claimed model or request alias.

Claude aliases default to relay-style hyphens such as `claude-fable-5-1`; OpenRouter retains its precise alias. Model-list entries are not identity evidence.

## Updates and migration

Updates are checked at startup and every 24 hours while running. One click prepares and verifies a new version, waits for current tasks and restarts. Failed startup rolls back. Existing reports and frozen tasks retain their original baseline.

Version 4.5.2 has no automatic installer, so entering 4.5.3 requires launching the new package once. Stop the old backend and use `start.bat --migrate-from "old installation"` or `sh start.sh --migrate-from "/old installation"`. The new data directory must be empty. Original data is kept; OS-vault credentials do not migrate between computers. Modified developer checkouts are not overwritten: use a separate official installation.

## Privacy and interpretation

Temporary keys stay in page/task memory, not ordinary files. Refreshing the page or restarting the backend loses them. Explicitly saved credentials use the OS vault. Reports and non-secret settings live in `meow_runs`.

Local HTTP is for trusted local networks only. On the website, requests including keys pass through Cloudflare and the server; URLs, groups and sanitized errors are public.

A mismatch does not establish deliberate model substitution. Routing, service changes or baseline limitations may contribute; this tool alone cannot determine the cause. [Community discussion](https://linux.do/t/topic/2811197) is context, not verified attribution.

[Usage](docs/USAGE_EN.md) · [Technical scope](TECHNICAL_REPORT_EN.md) · [Baseline workflow](docs/BASELINES_EN.md) · [Changes](docs/CHANGELOG_EN.md)
