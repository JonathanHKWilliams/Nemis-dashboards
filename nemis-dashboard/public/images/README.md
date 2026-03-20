# /public/images

Place all static image assets here. Vite serves this folder at the root URL.

## How to use in code

```jsx
// ✅ Correct — reference from root
<img src="/images/login-photo.jpg" />
<img src="/images/school-banner.jpg" />

// ❌ Wrong — do not use relative paths like ./images/...
```

## Suggested files to add

| File                    | Used in                  | Notes                          |
|-------------------------|--------------------------|-------------------------------- | 
| `login-photo.jpg`       | Login.jsx (right panel)  | Min 800×240px, landscape       |
| `login-left-photo.jpg`  | Login.jsx (left panel)   | Min 560×200px, landscape       | 
| `school-banner.jpg`     | Teacher/Dashboard banner | Min 300×200px                  |

## Tips
- Landscape photos work best (wider than tall)
- Keep files under 500 KB for fast load
- JPG is fine for photos; PNG for logos/icons


lets add the same labeling to the 