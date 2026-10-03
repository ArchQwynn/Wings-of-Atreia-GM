document.addEventListener("DOMContentLoaded",()=>{
const body=document.body;
const script=document.currentScript;
const base=body.dataset.base||((script&&script.src.includes("/assets/js/site.js"))?"../":"./");
body.dataset.base=base;

const manifest=document.createElement("link");manifest.rel="manifest";manifest.href=base+"manifest.json";document.head.appendChild(manifest);
const theme=document.createElement("meta");theme.name="theme-color";theme.content="#07111f";document.head.appendChild(theme);
const apple=document.createElement("meta");apple.name="apple-mobile-web-app-capable";apple.content="yes";document.head.appendChild(apple);

if(!document.querySelector(".skip-link")){const skip=document.createElement("a");skip.className="skip-link";skip.href="#main";skip.textContent="Skip to content";body.insertBefore(skip,body.firstChild)}

if(!document.querySelector(".site-header")){
const header=document.createElement("header");header.className="site-header";
header.innerHTML='<div class="nav-wrap"><a class="brand" href="'+base+'index.html">WINGS OF ATREIA</a><button class="mobile-nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">☰ Menu</button><nav class="nav-links" id="site-nav" aria-label="Primary"><a href="'+base+'index.html">Home</a><a href="'+base+'world/">World</a><a href="'+base+'lords/">Lords</a><a href="'+base+'monsters/">Monsters</a><a href="'+base+'npcs/">NPCs</a><a href="'+base+'tables/">Tables</a><a href="'+base+'encounters/">Encounters</a><a href="'+base+'campaign/">Campaign</a><a href="'+base+'tools/">GM Tools</a></nav><div class="search-box"><input aria-label="Search GM Reference" data-site-search placeholder="Search GM Reference…" type="search"><div class="search-results" data-search-results></div></div></div>';
body.insertBefore(header,body.firstChild);
}

if(!document.querySelector(".site-footer")){
const footer=document.createElement("footer");footer.className="site-footer";footer.textContent='Wings of Atreia · GM Reference · Created & Designed by Clark Michael Zafra (“ArchQwynn”) · Non-commercial fan project.';body.appendChild(footer);
}

/* Lord Encyclopedia: load its dedicated spacing/layout rules without changing the shared GM stylesheet. */
if(document.querySelector(".lord-encyclopedia-grid")){const lordCss=document.createElement("link");lordCss.rel="stylesheet";lordCss.href=base+"assets/css/lords.css";document.head.appendChild(lordCss)}

const nav=document.getElementById("site-nav"),toggle=document.querySelector(".mobile-nav-toggle");
if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))})}

/* Monster Compendium: convert the structured core statblock into real, readable tables. */
if(document.querySelector(".monster-section")){
 document.querySelectorAll(".monster-section .ability-grid").forEach(grid=>{
  const cells=[...grid.querySelectorAll(".ability")];
  if(!cells.length)return;
  const table=document.createElement("table");table.className="rank-table statblock-table ability-table";
  const thead=document.createElement("thead"),hr=document.createElement("tr");
  cells.forEach(c=>{const th=document.createElement("th");th.textContent=c.querySelector("span")?.textContent.trim()||"";hr.appendChild(th)});thead.appendChild(hr);
  const tbody=document.createElement("tbody"),vr=document.createElement("tr");
  cells.forEach(c=>{const td=document.createElement("td");td.textContent=c.querySelector("strong")?.textContent.trim()||"";vr.appendChild(td)});tbody.appendChild(vr);
  table.append(thead,tbody);grid.replaceWith(table);
 });
 document.querySelectorAll(".monster-section .stat-facts").forEach(facts=>{
  const rows=[...facts.children];if(!rows.length)return;
  const table=document.createElement("table");table.className="rank-table statblock-table facts-table";
  const tbody=document.createElement("tbody");
  rows.forEach(row=>{const strong=row.querySelector("strong");const tr=document.createElement("tr");const th=document.createElement("th");th.textContent=(strong?.textContent||"").replace(/\\.$/,"");const td=document.createElement("td");if(strong){const clone=row.cloneNode(true);clone.querySelector("strong")?.remove();td.textContent=clone.textContent.trim()}else td.textContent=row.textContent.trim();tr.append(th,td);tbody.appendChild(tr)});
  table.appendChild(tbody);facts.replaceWith(table);
 });
}

const input=document.querySelector("[data-site-search]"),results=document.querySelector("[data-search-results]");
if(input&&results){
const pages=[["World","world/","Regions, geography, history, factions, and locations."],["Lords","lords/","Lords Compendium and GM-facing Lord information."],["Monsters","monsters/","Monster Compendium, ranks, lore, tactics, habitats, and loot."],["NPCs","npcs/","NPC Compendium, factions, merchants, secrets, and relationships."],["Tables","tables/","Weapon roll tables, loot tables, equipment references, and generators."],["Encounters","encounters/","Encounter references and random encounter support."],["Campaign","campaign/","Campaign timeline, missions, factions, locations, and secrets."],["GM Tools","tools/","Quick-reference utilities and GM tools."]];
const render=q=>{const term=q.trim().toLowerCase();if(!term){results.classList.remove("active");results.innerHTML="";return}const hits=pages.filter(x=>x.join(" ").toLowerCase().includes(term));results.innerHTML='<div class="search-summary">'+hits.length+" result"+(hits.length===1?"":"s")+"</div>"+(hits.length?hits.map(x=>'<a class="search-result" href="'+base+x[1]+'"><strong>'+x[0]+"</strong><small>"+x[2]+"</small></a>").join(""):'<div class="search-result"><strong>No result</strong><small>Try another term.</small></div>');results.classList.add("active")};input.addEventListener("input",e=>render(e.target.value));input.addEventListener("keydown",e=>{if(e.key==="Escape"){input.value="";render("")}});document.addEventListener("click",e=>{if(!e.target.closest(".search-box"))results.classList.remove("active")})}

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register(base+"sw.js?v=7",{scope:base,updateViaCache:"none"}).then(r=>r.update()).catch(e=>console.warn("WoA GM offline service worker could not be registered:",e)))}

let deferredInstallPrompt=null;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstallPrompt=e;if(document.querySelector(".pwa-install-button"))return;const b=document.createElement("button");b.type="button";b.className="pwa-install-button";b.textContent="Install WoA GM";b.setAttribute("aria-label","Install Wings of Atreia GM Reference for offline use");b.addEventListener("click",async()=>{if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();try{await deferredInstallPrompt.userChoice}catch(_){}deferredInstallPrompt=null;b.remove()});document.body.appendChild(b)});window.addEventListener("appinstalled",()=>{deferredInstallPrompt=null;document.querySelector(".pwa-install-button")?.remove()});
});