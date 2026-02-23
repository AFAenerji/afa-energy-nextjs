# Third-Party License Notices

This document lists third-party dependencies with notable license terms.

## @img/sharp-libvips

- **Package**: `@img/sharp-libvips-*` (platform-specific prebuilt binaries)
- **Version**: 1.2.4
- **License**: LGPL-3.0-or-later
- **Source**: https://github.com/lovell/sharp-libvips
- **Usage**: Transitive optional dependency of `sharp` (v0.34.5), which is an optional dependency of `next` (v16.1.6). Used for server-side image optimization (Next.js `<Image>` component).

### Compliance Note

`@img/sharp-libvips` packages contain **prebuilt native binaries** of libvips and its dependencies, licensed under LGPL-3.0-or-later. This project:

1. **Does not modify** the libvips source code or binaries.
2. **Does not statically link** against libvips — it is loaded as a shared library at runtime.
3. **Uses it as-is** via the `sharp` npm package, which itself is licensed under Apache-2.0.

Under LGPL-3.0 Section 4, using an LGPL library via dynamic linking in a proprietary application is permitted, provided:
- The LGPL-licensed component can be replaced by the end user (satisfied: `npm install` fetches the binary; users can rebuild from source).
- This notice is provided (this document).

### sharp

- **Package**: `sharp`
- **Version**: 0.34.5
- **License**: Apache-2.0
- **Source**: https://github.com/lovell/sharp

No additional compliance actions required for Apache-2.0.

---

*Last updated: 2026-02-24*
