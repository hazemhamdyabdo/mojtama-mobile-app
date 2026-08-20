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
