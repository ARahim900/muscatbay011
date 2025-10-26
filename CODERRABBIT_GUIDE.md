# CodeRabbit Usage Guide for Muscat Bay Utilities Dashboard

## Overview
CodeRabbit is an AI-powered code review tool that automatically analyzes your code for bugs, security issues, performance problems, and best practices.

## Setup Methods

### Method 1: GitHub Integration (Recommended)
CodeRabbit reviews are automatically triggered on GitHub Pull Requests.

**Steps:**
1. Visit [www.coderabbit.ai](https://www.coderabbit.ai)
2. Sign in with your GitHub account
3. Install the CodeRabbit GitHub App
4. Grant access to your repository: `muscatbay011`
5. Create a Pull Request to trigger automatic review

**How it works:**
- Each time you create a PR, CodeRabbit automatically reviews your code
- Reviews appear as comments on the PR
- Many issues have "one-click fixes" you can apply directly

### Method 2: CodeRabbit CLI (For Local Development)

Install the CLI for immediate feedback before creating a PR:

```bash
# Install CodeRabbit CLI globally
npm install -g @coderabbitai/cli

# Authenticate with CodeRabbit
coderabbit auth login

# Review your current changes
coderabbit review

# Review staged changes only
coderabbit review --staged

# Review specific files
coderabbit review --files components/**/*.tsx
```

## What CodeRabbit Checks

### 1. Bugs and Logic Errors
- Potential runtime errors
- Unhandled edge cases
- Null/undefined access issues
- Type mismatches (TypeScript)
- Array/object access errors

### 2. Security Issues
- SQL injection vulnerabilities
- XSS (Cross-Site Scripting) risks
- Authentication/authorization flaws
- Dependency vulnerabilities
- Sensitive data exposure

### 3. Performance Problems
- Unnecessary re-renders in React
- Large bundle sizes
- Inefficient algorithms
- Memory leaks
- Expensive operations in loops

### 4. Code Quality
- Code complexity
- Maintainability issues
- Best practices violations
- Code smells
- Duplicate code

### 5. TypeScript/JavaScript Specific
- Type safety issues
- ESLint violations
- Missing error handling
- Incorrect prop types
- Hook dependency issues

## How to Use CodeRabbit Reviews

### Step 1: Create a Pull Request
```bash
# Make your changes
git add .
git commit -m "feat: your feature description"
git push origin your-branch

# Create PR on GitHub
```

### Step 2: Wait for Review
- CodeRabbit automatically analyzes your PR
- Review typically takes 1-3 minutes
- Results appear as comments on the PR

### Step 3: Review Feedback
Each comment includes:
- **Issue Type**: Bug, Security, Performance, etc.
- **Severity**: Critical, High, Medium, Low
- **Description**: What's wrong and why
- **Location**: File and line number
- **Suggestion**: How to fix it
- **Fix Button**: One-click fix (when available)

### Step 4: Apply Fixes
- Click "Apply suggestion" for automatic fixes
- Review the diff carefully
- Commit the changes

## Configuration Options

Your `.coderabbit.yaml` file includes:

### Review Settings
- **Type**: `assertive` (comprehensive) or `chill` (critical only)
- **Auto-review**: Enabled for all PRs
- **Draft PRs**: Reviewed automatically

### Tools Enabled
- **ESLint**: JavaScript/TypeScript linting
- **TypeScript**: Type checking
- **React**: React-specific rules
- **npm audit**: Dependency vulnerability scanning
- **Complexity**: Code complexity analysis
- **Security**: Security scanning

### File Filters
- **Included**: `components/**`, `lib/**`, `hooks/**`, `*.tsx`, `*.ts`
- **Excluded**: `node_modules`, `dist`, `*.csv`, `*.sql`

## Best Practices

### 1. Regular Code Reviews
- Create PRs for every feature/bug fix
- Review feedback before merging
- Address critical issues immediately

### 2. Use CLI for Fast Feedback
```bash
# Check code before committing
coderabbit review --staged

# Test before pushing
coderabbit review
```

### 3. Apply Auto-Fixes
- Use "Apply suggestion" for safe fixes
- Review auto-applied changes
- Commit fixes in separate commits

### 4. Ignore False Positives
If CodeRabbit flags a false positive:
- Add a comment explaining why it's intentional
- Consider suppressing with eslint-disable for known cases
- Don't just ignore without justification

## Example Review Scenario

### Scenario: Adding a new component

1. **Create branch and add code**
```bash
git checkout -b feature/new-component
# Add your new component
git add components/modules/newfeature/
git commit -m "feat: add new feature component"
git push origin feature/new-component
```

2. **Create PR on GitHub**
- CodeRabbit automatically starts review
- Review appears within 1-3 minutes

3. **Review feedback**
```
⚠️ Performance Issue (Medium)
Location: components/modules/newfeature/Component.tsx:45
Issue: Missing React.memo for component with expensive props
Suggestion: Wrap component with React.memo
[Apply suggestion]
```

4. **Apply fix**
- Click "Apply suggestion"
- Commit the change
- CodeRabbit re-reviews automatically

5. **Merge when satisfied**
- All critical issues resolved
- Code reviewed and approved
- Merge PR

## Troubleshooting

### CodeRabbit not reviewing PRs
- Check GitHub App is installed
- Verify repository access is granted
- Ensure `.coderabbit.yaml` is in root directory

### Too many false positives
- Change `review.type` to `chill` in `.coderabbit.yaml`
- Add problematic files to `ignore.paths`
- Disable specific tools in `tools` section

### CLI not working
```bash
# Update CLI to latest version
npm update -g @coderabbitai/cli

# Check authentication
coderabbit auth status

# Re-authenticate if needed
coderabbit auth login
```

## Additional Resources

- [CodeRabbit Documentation](https://docs.coderabbit.ai)
- [Supported Tools](https://docs.coderabbit.ai/tools)
- [Configuration Guide](https://docs.coderabbit.ai/config-file)
- [CLI Usage](https://www.coderabbit.ai/cli)

## Quick Reference

```bash
# GitHub Integration (Automatic)
- Create PR → CodeRabbit reviews automatically

# CLI Usage
coderabbit review                 # Review all changes
coderabbit review --staged        # Review staged changes only
coderabbit review --files <path>  # Review specific files
coderabbit auth login             # Authenticate
coderabbit auth status            # Check auth status
```

## Current Configuration Summary

✅ **Enabled**: Comprehensive code reviews with assertive mode
✅ **Auto-fix**: ESLint issues can be auto-fixed
✅ **Tools**: ESLint, TypeScript, React, npm audit, Security, Complexity
✅ **Draft PRs**: Reviewed automatically
✅ **Languages**: TypeScript, JavaScript, React/JSX
✅ **Path Filters**: Focused on components, lib, hooks, context

---

**Happy coding! 🐰**

