# Vihaar Performance Testing

## Quick Start

### Bundle Analysis
```bash
npm run analyze
```
Opens interactive bundle analyzer at http://127.0.0.1:8888

### Lighthouse Audit (Local)
```bash
# Start dev server first
npm run dev

# In another terminal
npm run lighthouse:local
```

### Lighthouse CI (Automated)
```bash
# Install Lighthouse CI globally (one-time)
npm install -g @lhci/cli

# Run CI audit
npm run lighthouse
```

## Performance Budgets

### Core Web Vitals
| Metric | Target | Budget |
|--------|--------|--------|
| LCP | < 2.5s | 2500ms |
| FCP | < 1.8s | 1800ms |
| CLS | < 0.1 | 0.1 |
| TBT | < 200ms | 200ms |
| Speed Index | < 3s | 3000ms |

### Resource Sizes (KB)
| Resource | Budget |
|----------|--------|
| JavaScript | 200 KB |
| CSS | 50 KB |
| Images | 500 KB |
| Fonts | 100 KB |
| **Total** | **1000 KB** |

### Resource Counts
| Resource | Budget |
|----------|--------|
| Scripts | 10 |
| Stylesheets | 5 |
| Fonts | 3 |
| Third-party | 5 |

## Testing Checklist

- [ ] Run bundle analyzer to identify large dependencies
- [ ] Run Lighthouse on all major pages (/, /explore, /profile)
- [ ] Verify all Core Web Vitals are within budget
- [ ] Check resource sizes don't exceed budgets
- [ ] Test offline functionality (Service Worker)
- [ ] Verify images load as AVIF/WebP
- [ ] Check font loading doesn't block render
- [ ] Test on 3G/4G network simulation

## Interpreting Results

### Bundle Analyzer
- Look for large dependencies that can be code-split
- Identify duplicate packages
- Check for unused code

### Lighthouse
- **Green (90-100):** Excellent
- **Orange (50-89):** Needs improvement
- **Red (0-49):** Poor

Focus on:
1. Opportunities (biggest impact)
2. Diagnostics (specific issues)
3. Passed audits (what's working)

## Continuous Monitoring

Set up automated Lighthouse CI in GitHub Actions:
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - run: npm run lighthouse
```
