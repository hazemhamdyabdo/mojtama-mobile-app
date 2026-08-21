# Task tracker

Each task you assign is logged here with the steps taken.

---

## Task 1 — Show onboarding when the app starts

**Requested:** Make `src/app/(auth)/onboarding.tsx` the screen that appears when the user runs the app.

### Steps

1. Checked Expo Router v57 routing: the app always loads `src/app/index.tsx` first (`/` route).
2. Replaced the placeholder home screen in `src/app/index.tsx` with a `Redirect` to `/onboarding`.
3. Hid the stack header for `index` and `onboarding` in `src/app/_layout.tsx` so the first screen is full-bleed.
4. Gave the onboarding `View` `flex: 1` and `resizeMode="cover"` so the image fills the screen instead of collapsing.

### Result

Opening the app now lands on `/onboarding` instead of the default index placeholder.

---

## Task 2 — Implement Figma design (node 91-8819)

**Requested:** Implement design from Figma  
`https://www.figma.com/design/bHjoCEZEWaZqFEEonj4Dzv/Mojtama?node-id=91-8819`

### Steps

1. Loaded the Figma design-to-code workflow skill.
2. Called Figma MCP `get_design_context`, `get_screenshot`, `get_metadata`, and `download_assets` for node `91:8819`.
3. Re-authenticated Figma MCP via `mcp_auth` and retried — same result.
4. Confirmed Figma account via `whoami`: `hhamdy@digiphilo.com` (View seat, Starter plan).

### Blocker

All Figma read tools returned:

> Looks like you don't have edit access to this file. The file owner can share it with you and make you an editor.

The Mojtama Figma file is not accessible to the connected Figma account, so the design specs, layout, colors, and assets could not be fetched.

### To unblock

1. Share the Figma file with **hhamdy@digiphilo.com** (Editor access recommended for MCP).
2. Or re-authenticate Figma MCP in Cursor with the account that owns the file.
3. Or paste a screenshot/export of node `91-8819` in chat.

### Result

**Blocked** — waiting on Figma file access or a design screenshot before implementation can start.

### Update (screenshot provided)

5. Implemented from the user-provided design screenshot.
6. Cropped assets from the screenshot into `assets/images/auth/` (logo, background waves, resident keys, manager house).
7. Built `RegisterRoleScreen` with logo, bilingual branding, and two role cards.
8. Wired `onboarding.tsx` to show the splash image for 1s, then `RegisterRoleScreen`.
9. Updated `register.tsx` to read the selected `role` param from navigation.

### Result

After the splash, users see the Register Role screen matching the Figma layout. Tapping a card navigates to `/register?role=resident` or `/register?role=manager`.

---

## Task 3 — Animate onboarding display transition

**Requested:** Animate the transition between the splash image and `RegisterRoleScreen` in `onboarding.tsx`.

### Steps

1. Replaced the hard cut (`if/return`) with a layered layout so both screens stay mounted during the transition.
2. Used `react-native-reanimated` shared values for splash opacity and content opacity/scale.
3. After 2s, crossfaded the splash out and faded/scaled the role screen in over 600ms with an ease-out curve.
4. Disabled pointer events on the splash layer while it fades so taps pass through to the role screen underneath.

### Result

The splash now smoothly crossfades into the Register Role screen instead of switching instantly.
