# UI and validation test cases

This matrix distinguishes documented expected behavior from results actually exercised. Record a result only after performing the check in a browser.

| Test ID | Test Case | Input | Expected Result | Actual Result | Status |
|---------|-----------|-------|-----------------|---------------|--------|
| TC-01 | Submit valid form | Network; title `Wi-Fi issue`; description `Unable to connect in the study room`; Medium; Email | Success message and summary with all fields, Submitted status, and local reference ID; no navigation/network submit | Not run: browser file access blocked | Not run |
| TC-02 | Submit empty required fields | Leave all fields at defaults | Inline required/valid-choice errors; summary remains unsubmitted; focus moves to first invalid field | Not run: browser file access blocked | Not run |
| TC-03 | Description below minimum | Valid selects/title; description `Too short` (9 chars) | Description error says at least 10 characters; no success summary | Not run: browser file access blocked | Not run |
| TC-04 | Unexpected category | Change category control value to an unlisted value using browser devtools, then submit | Category rejected with a clear message; no confirmation | Not run: browser file access blocked | Not run |
| TC-05 | Harmless script-like input | Title `<script>alert("test")</script>` (within 100 characters); valid description and selects | Since title is longer than the maximum, title length validation rejects it; no script runs. For safe-display verification, use `<b>x</b> test` as the valid title or shorten the script-like text; if accepted, it appears literally as text | Not run: browser file access blocked | Not run |
| TC-06 | Title below minimum / whitespace | Title spaces only or `abcd` | Whitespace-only title reports required; 4-character title reports minimum length | Not run: browser file access blocked | Not run |
| TC-07 | Maximum text lengths | Title exactly 100 characters; description exactly 1,000 characters | Both are accepted when other fields are valid; counters show limits; content remains readable in summary | Not run: browser file access blocked | Not run |
| TC-08 | Overlong text | Attempt 101-character title and 1,001-character description | Native `maxlength` prevents extra typing; if values are injected or otherwise exceed limits, JavaScript rejects them | Not run: browser file access blocked | Not run |
| TC-09 | Invalid urgency and contact method | Set each select to an unlisted value with devtools and submit | Each unexpected selection is rejected with its own inline error | Not run: browser file access blocked | Not run |
| TC-10 | Keyboard navigation | Use Tab/Shift+Tab, select via keyboard, submit with Enter/Space | Logical focus order, visible focus indicators, native controls usable, invalid submit focuses first invalid field | Not run: browser file access blocked | Not run |
| TC-11 | Mobile layout | 375 × 667 viewport | Navigation remains usable; fields/cards stack; no horizontal page scrolling; controls fit and are tappable | Not run: browser file access blocked | Not run |
| TC-12 | Tablet layout | 768 × 1024 viewport | Content stays within viewport; request form and summary reflow cleanly; filters remain operable | Not run: browser file access blocked | Not run |
| TC-13 | Desktop layout | 1440 × 900 viewport | Two-column form/summary and three-column sample tickets display with readable spacing | Not run: browser file access blocked | Not run |
| TC-14 | Filter sample requests | Choose a category, urgency, and status; then clear | Only matching synthetic tickets appear; result count updates; clear restores all tickets | Not run: browser file access blocked | Not run |

