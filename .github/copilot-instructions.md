# Copilot Coding Standards and Best Practices

## General Coding Standards
- Follow the language-specific style guides (e.g., PEP 8 for Python, Airbnb for JavaScript/TypeScript).
- Write clean, readable, and maintainable code with proper indentation and spacing.
- Use meaningful variable, function, and class names that convey intent.
- Avoid hardcoding values; use constants or configuration files instead.

## Code Documentation
- Add comments to explain complex logic or non-obvious decisions.
- Use docstrings or JSDoc for documenting functions, classes, and modules.
- Ensure that comments are concise and up-to-date with the code.

## Error Handling
- Handle exceptions gracefully and provide meaningful error messages.
- Avoid using generic exception handlers (e.g., `catch (Exception e)` or `except:`).
- Log errors for debugging purposes but avoid exposing sensitive information.

## Security Practices
- Validate and sanitize all user inputs to prevent injection attacks.
- Avoid storing sensitive information like passwords in plain text.
- Use environment variables for configuration secrets.
- Regularly update dependencies to patch known vulnerabilities.

## Testing and Quality Assurance
- Write unit tests for critical functions and components.
- Use test-driven development (TDD) where applicable.
- Ensure code coverage is adequate and meaningful.
- Use linters and formatters to enforce coding standards.

## Collaboration
- Follow the "single responsibility principle" to make code easier to review.
- Use consistent naming conventions across the team.
- Document shared utilities and reusable components.
