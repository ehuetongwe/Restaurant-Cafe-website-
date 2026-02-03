# Deploy to Netlify
> Directive for configuring and deploying the project to Netlify.

## Goal
Ensure the project is ready for deployment on Netlify by establishing the necessary configuration files and directory structure.

## Inputs
- Project root directory.
- Website source files (HTML, CSS, JS).

## Tools & Scripts
- `execution/verify_netlify_config.py`: Checks for existence and validity of `netlify.toml`.

## Procedure
1.  **Check for existing configuration**:
    - Look for `netlify.toml` in the project root.
    - If missing, create a default `netlify.toml`.

2.  **Define Build Settings**:
    - **Base directory**: Root (`/`) or specific subfolder if applicable.
    - **Publish directory**: The folder containing the production-ready common HTML files (e.g., `.`, `public`, `dist`).
    - **Command**: Build command if using a framework (e.g., `npm run build`). For static sites, this may be empty.

3.  **Handle Redirects & Headers**:
    - Configure routing in `netlify.toml` (preferred) or `_redirects`.
    - Set useful security headers (CSP, X-Frame-Options) in `netlify.toml`.

4.  **Verification**:
    - Run `execution/verify_netlify_config.py` to ensure the configuration file is syntactically correct and points to valid directories.

## Output
- A valid `netlify.toml` file.
- Confirmation that the project structure supports the configuration.

## Edge Cases
- **Missing index.html**: Warn if the publish directory does not contain an entry point.
- **Mixed content**: Ensure asset paths are relative or HTTPS.
