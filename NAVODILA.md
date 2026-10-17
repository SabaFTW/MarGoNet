# AERA — na tvoj računalnik

Časovnica Zemlje: globus, ledger dogodkov in leta od 3500 pr. n. št. do danes.
Isti izgled kot v predogledu, teče lokalno v brskalniku.

## Kaj je v mapi

| Datoteka | Čemu služi |
| --- | --- |
| `start-aera.bat` | Zagon na Windowsu (dvojni klik) |
| `start-aera.command` | Zagon na macOS (dvojni klik) |
| `src/` | Vmesnik, globus, časovnica |
| `public/earth/` | Teksture Zemlje |
| `package.json` | Seznam knjižnic |

`node_modules` namerno ni zraven. Prvi zagon jih sam prenese.

## Kaj potrebuješ

- [Node.js 22](https://nodejs.org) (deluje tudi 20+). Pri namestitvi označi **Add to PATH**.
- Brskalnik (Chrome, Safari, Edge ali Firefox).

## Windows

1. Razpakiraj zip na namizje, da dobiš mapo `AERA`.
2. Dvojni klik na `start-aera.bat`.
3. Prvič traja minuto (namestitev knjižnic). Odpre se brskalnik na `http://localhost:8080`.
4. Okno ne zapiraj, dokler uporabljaš AERA. Ustaviš s `Ctrl+C`.

## Mac

1. Razpakiraj zip na namizje.
2. Dvojni klik na `start-aera.command`.
3. Če macOS reče, da razvijalec ni preverjen: desni klik → **Odpri** → **Odpri**.
4. Prvič teče `npm install`, potem se odpre `http://localhost:8080`.
5. Terminal pusti odprt. Ustaviš s `Ctrl+C`.

## Ročno (če dvojni klik ne sede)

V mapi AERA, v terminalu:

```bash
npm install
npm run dev
```

Potem v brskalniku odpri `http://localhost:8080`.

## Kako se uporablja

- Kolešček desno ali puščici levo/desno premikata leto. Shift + puščica skoči za 10 let.
- Stikalo na glavi kategorije ugasne ali prižge cel sklop.
- Medeninast rob: ledger razširiš v desno, leta v levo, spodnjo časovnico navzgor.
- Obkljukan dogodek, ki v tem letu teče, na Zemlji nariše madež. Če je zadel ves svet, se okoli globusa nariše obroč.
- Pod letnico se sestavi stavek iz dogodkov, ki v tistem letu res držijo.
- Klik na dogodek obrne Zemljo tja.
- **+** v ledgerju doda tvoj dogodek. Pin spustiš s klikom na globus.
- Spodnja vrstica je razpon let. Povleci jo levo/desno. Minus in plus zožita ali razširita razpon.

## Če se kaj zatakne

- `node: command not found` ali podobno: Node ni nameščen ali pa terminal še ni bil zaprt po namestitvi. Namesti Node, zapri terminal, začni znova.
- Vrata 8080 so zasedena: zapri prejšnji zagon AERA in klikni start še enkrat.
- Prazen globus: počakaj par sekund, teksture se naložijo ob prvem odprtju.
