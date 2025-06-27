// ButtonImages.jsx
// ---------------------------------------------------------------------
// Centralised imports for all map-control / modal button graphics.
// Adjust the relative path (“../../images/…”) if this file lives
// somewhere else in your folder structure.
// ---------------------------------------------------------------------

import downstairsSymbol   from "../images/Buttons/DownstairsSymbol.webp";
import upstairsSymbol     from "../images/Buttons/UpstairsSymbol.webp";
import teleportSymbol     from "../images/Buttons/EnderPearl.webp";
import closeSymbol        from "../images/Buttons/CloseSymbol.svg";

import moveDefaultSymbol  from "../images/Buttons/MoveDefaultSymbol.webp";   // movement arrow (idle)
import moveClickedSymbol  from "../images/Buttons/MoveClickedSymbol.webp";   // movement arrow (pressed)

import audioPlaySymbol from "../images/Buttons/AudioPlaySymbol.png";
import audioMuteSymbol from "../images/Buttons/AudioMuteSymbol.png";

/* ───── named exports (preferred) ───── */
export {
  downstairsSymbol,
  upstairsSymbol,
  teleportSymbol,
  closeSymbol,
  moveDefaultSymbol,
  moveClickedSymbol,
  audioMuteSymbol,
  audioPlaySymbol,
};

/* ───── optional default export ────────
   Lets you do:  import icons from "./ButtonImages";
   Then access icons.moveDefaultSymbol, etc.
*/
export default {
  downstairsSymbol,
  upstairsSymbol,
  teleportSymbol,
  closeSymbol,
  moveDefaultSymbol,
  moveClickedSymbol,
  audioMuteSymbol,
  audioPlaySymbol,
};
