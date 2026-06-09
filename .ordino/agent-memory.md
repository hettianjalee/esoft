---
project: connectorapptest
base_url: https://opensource-demo.orangehrmlive.com
schema_version: 1
last_updated: 2026-05-12T10:42:00Z
validation_ttl_days: 30
stats:
  pages: 2
  elements: 6
  successful_validations: 6
  failed_validations: 0
---

# Ordino agent memory

> Persistent locator cache for this project. Committed to git.
> Updated automatically by the ordino skill on every successful
> capture and smoke pass.

## Index

| URL | Page Object | Last Validated | Status | Hash (short) |
| --- | --- | --- | --- | --- |
| `.../auth/login` | LoginPage | 2026-05-12 | Working | _(pending hash)_ |
| `.../dashboard/index` | DashboardPage | 2026-05-12 | Working | _(pending hash)_ |

---

## URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

- **Page Object:** `src/gui/pages/LoginPage.ts`
- **Spec:** `features/login.spec.ts`
- **Last Validated:** 2026-05-12T10:42:00Z

### username input

- **Locator:** `//input[@name="username"]`
- **Status:** Working
- **Validation Count:** 1

### password input

- **Locator:** `//input[@name="password"]`
- **Status:** Working
- **Validation Count:** 1

### login submit

- **Locator:** `//button[@type="submit"]`
- **Status:** Working
- **Validation Count:** 1

### login error text

- **Locator:** `//p[contains(@class,'oxd-alert-content-text')]`
- **Status:** Working
- **Validation Count:** 1

---

## URL: https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index

- **Page Object:** `src/gui/pages/DashboardPage.ts`
- **Spec:** `features/login.spec.ts`
- **Last Validated:** 2026-05-12T10:42:00Z

### active dashboard nav

- **Locator:** `//a[contains(@href,'dashboard/index') and contains(@class,'active')]`
- **Status:** Working
- **Validation Count:** 1

---

## Navigation graph

```yaml
nav: {}
```

```mermaid
graph LR
```

---

## Entities

```yaml
entities: {}
```

---

## Test data registry

```yaml
test_data: {}
```

---

## Feature index

```yaml
features:
  authentication:
    entities: []
    pages: [LoginPage, DashboardPage]
    nav_path: []
    test_data: []
    spec: features/login.spec.ts
```

---

## Facts

```yaml
facts: []
```
