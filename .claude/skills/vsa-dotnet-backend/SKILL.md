---
name: vsa-dotnet-backend
description: Enforces .NET backend coding standards plus Vertical Slice Architecture. Use when making or reviewing C#/.NET code changes, refactors, or new feature slices.
---

# VSA + .NET Backend

## Instructions
1. Read these rule files first and follow them verbatim:
   - `.cursor/rules/net-backend-master.mdc`
   - `.cursor/rules/vertical-slice-architecture-specialist.mdc`
  
  do not proceed unless both files were read

2. If any guidance conflicts, state the conflict and prefer VSA isolation and feature-first structure.
3. Apply the rules to all C#/.NET edits, reviews, and new slices.

## Examples
**Example 1**
Input: "Add a new endpoint to create a category."
Output: Create a new slice `Features/CreateCategory/` with command/handler/validator. Keep the API action minimal and delegate to the handler. Keep each type in its own file.

**Example 2**
Input: "Make a shared repository interface for all slices."
Output: Avoid a generic repository interface. Keep repositories local to each slice, or duplicate logic if needed to preserve slice isolation.

## Reference
Primary sources are the rule files listed above.
