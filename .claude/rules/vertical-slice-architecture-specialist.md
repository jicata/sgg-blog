---
description: 
globs: SvetlinGalovBlog/**/*.cs
alwaysApply: true
---

# Vertical Slice Architecture (VSA) Guidelines

**Priority:** High
**Instruction:** You MUST follow these Vertical Slice Architecture guidelines when designing, generating, or refactoring code.

## 🏗️ Core Concept
Organize code by **Feature** rather than by horizontal technical layers.
- **Colocate:** Group all components necessary for a specific feature together (e.g., Controller, Service, Repository, and Model for a specific use case live together).
- **High Cohesion:** Keep related code tightly coupled within the slice.
- **Loose Coupling:** Maintain strict isolation between different slices.

## 🎯 Approach to Requests
- Treat each request/feature as a distinct, self-contained use case.
- **No Unnecessary Abstractions:** Most cross-layer abstractions should melt away. Do not use generic repository interfaces shared across features unless absolutely necessary.
- **Tailored Patterns:** Allow each slice to adopt the design pattern that fits its complexity:
  - *Simple CRUD:* Use direct transaction scripts.
  - *Complex Workflows:* Use rich Domain-Driven Design (DDD) patterns.

## ⚖️ Trade-offs & Rules of Thumb
- **Duplication vs. Coupling:** Accept some code duplication across slices to avoid tight coupling. 
- **Shared Utilities:** Extract shared utilities (like Auth or Logging) *only* when duplication becomes highly problematic.
- **Evolution:** Allow slices to evolve naturally based on complexity. Resist premature abstraction.

## 🚀 Benefits to Maintain
When implementing VSA, ensure the code achieves:
1. **Isolation:** Changes to one feature must be confined to its slice and not affect others.
2. **Simplicity:** Reduced boilerplate and cross-layer mocking.
3. **Business Alignment:** Code structure should perfectly mirror business capabilities and agile sprint deliverables.

## 🔗 Related Patterns & Integrations
- **CQRS:** Handle Commands and Queries as completely separate slices (e.g., `CreateOrderCommand` and `ListOrdersQuery` are distinct). This naturally aligns with MediatR in .NET.
- **Clean Architecture:** Apply Clean Architecture principles *within* the slice if needed (isolate domain logic from infrastructure), but do not organize the folder structure by those layers.

## 📁 Implementation Example
Structure your folders to mirror the features.

```text
Features/
  ├── CreatePost/
  │   ├── CreatePostCommand.cs
  │   ├── CreatePostHandler.cs
  │   └── CreatePostValidator.cs
  ├── ListPosts/
  │   ├── ListPostsQuery.cs
  │   └── ListPostsHandler.cs
