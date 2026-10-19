# Wings of Atreia — GM Reference

GM-facing companion website for **Wings of Atreia**.

## Scope

This repository is for GM/world material and tools. It does **not** duplicate the player rules or maintain a second copy of player mechanics.

### Sections

- World
- Lords Compendium
- Monster Compendium
- NPC Compendium
- Weapon Roll Tables
- Armor & Equipment Tables
- Loot & Rewards
- Encounters
- Campaign
- GM Tools

## Mechanics boundary

The [Wings of Atreia player website](https://archqwynn.github.io/Wings-of-Atreia/) is the single authority for current approved player-facing mechanics. The latest approved website mechanic supersedes any conflicting older rule text, including previously published or copied wording. Books and the Character Manager must be corrected to match the website; this GM repository must not be used to reinstate an older player mechanic.

GM/world content, Lords, monsters, NPCs, tables, campaign material, and GM utilities belong here. GM-only lore and bespoke encounter content may remain here; any shared/player-facing procedure must follow the current player website mechanics. A later non-mechanical site commit does not itself approve a rules change.

## Offline / PWA

The site is configured as an installable Progressive Web App. It includes a web app manifest, service worker, offline fallback, application icons, and an app shell that is cached for offline use.

After first opening the site while online, the cached GM reference can be opened without internet. Pages that have been published after the device's last cache update may require one online visit before they are available offline.

When new site sections are added, include them in `service-worker.js` if they need to be guaranteed in the initial offline app shell. The service worker also caches successfully visited same-origin pages for later offline use.

## GitHub Pages

Enable GitHub Pages from repository Settings using the **main** branch and repository root (/).
