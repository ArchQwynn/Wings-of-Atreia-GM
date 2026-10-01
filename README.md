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

The main [Wings of Atreia player website](https://archqwynn.github.io/Wings-of-Atreia/) remains the authoritative player-facing mechanics reference.

GM/world content, Lords, monsters, NPCs, tables, campaign material, and GM utilities belong here.

## Offline / PWA

The site is configured as an installable Progressive Web App. It includes a web app manifest, service worker, offline fallback, application icons, and an app shell that is cached for offline use.

After first opening the site while online, the cached GM reference can be opened without internet. Pages that have been published after the device's last cache update may require one online visit before they are available offline.

When new site sections are added, include them in `service-worker.js` if they need to be guaranteed in the initial offline app shell. The service worker also caches successfully visited same-origin pages for later offline use.

## GitHub Pages

Enable GitHub Pages from repository Settings using the **main** branch and repository root (/).
