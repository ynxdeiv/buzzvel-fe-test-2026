# Figma workflow

- The Figma MCP quota on this account is small. Fetch each frame once and cache the result in `docs/figma/`
  (screenshots, structure, extracted tokens). Read from the cache before calling the MCP again.
- Load the `figma:figma-design-to-code` skill before `get_design_context`. Its output is a reference:
  adapt it to these rules (tokens, primitives, Prismic), never paste it verbatim.
- Never leave Figma URLs in source code.
