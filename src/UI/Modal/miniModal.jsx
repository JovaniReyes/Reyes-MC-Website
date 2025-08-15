import { useLayoutEffect, useMemo, useState } from "react";
import { useMiniModalsStore } from "../../Exp/stores/miniModalStore";
import "../../Styles/miniModals.scss";

/* ——— tweakables ——— */
const MAX_SIZE = 300;           // largest card edge
const MIN_SIZE = 125;           // smallest card edge
const BREAK    = 1415;          // desktop / mobile switch
const GAP_DESK = 30;            // gap ≥ BREAK
const GAP_MOB  = 5;            // gap <  BREAK
/* ———————————————— */

export default function MiniModalsManager() {
  const { miniModals, animation } = useMiniModalsStore();

  /* gap depends on viewport width */
  const [gap, setGap] = useState(
   window.innerWidth >= BREAK ? GAP_DESK : GAP_MOB
 );
 useLayoutEffect(() => {
  const onResize = () =>
    setGap(window.innerWidth >= BREAK ? GAP_DESK : GAP_MOB);
   onResize();
   window.addEventListener("resize", onResize);
   return () => window.removeEventListener("resize", onResize);
 }, []);

  //Live Main Modal Measurements
  const [modalSize, setModalSize] = useState({
    width: Math.min(window.innerWidth * 0.95, 800),
    bottom: Math.round(window.innerHeight * 0.6),
  });

  //Watch .modal element to keep the UI consistent
  useLayoutEffect(() => {
    const modalEl = document.querySelector(".modal");
    const update = () => {
      const r = modalEl?.getBoundingClientRect();
        const width = r?.width ?? Math.min(window.innerWidth * 0.95, 800);
        const bottom = r?.bottom ?? Math.round(window.innerHeight * 0.6);
        setModalSize({ width, bottom });
        // expose to CSS for stacked positioning
        document.documentElement.style.setProperty("--modal-w", `${width}px`);
        document.documentElement.style.setProperty("--modal-bottom", `${Math.round(bottom)}px`);
      };
    update();
   window.addEventListener("resize", update);
    const ro = modalEl ? new ResizeObserver(update) : null;
    if (modalEl && ro) ro.observe(modalEl);
    return () => { window.removeEventListener("resize", update); ro?.disconnect(); };
  }, []);

  /** chosen card size (px) */
  const [card, setCard] = useState(MAX_SIZE);
  /** how many *inner* columns per desktop side (1 or 2) */
  const [cols, setCols] = useState(1);

  /* 1 ▸ decide size + column-count whenever window or list changes */
  useLayoutEffect(() => {
    const chooseLayout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const n  = Math.max(miniModals.length, 1);
      // side space available on ONE side of the modal
      const sideFree = (vw - modalSize.width) / 2 - gap;
      // Force stacked layout if there isn’t room for even the smallest card
      const stacked = vw <= BREAK || sideFree < MIN_SIZE;

      /* —— desktop layout (cards on each side of big modal) —— */
      const sideCount = Math.ceil(n / 2);            // cards each side
      let best = { cols: 1, size: MIN_SIZE };

      [1, 2].forEach((c) => {
        const rows  = Math.ceil(sideCount / c);
        const limitH = (vh - (rows - 1) * gap) / rows;
        const limitW = (sideFree - (c - 1) * gap) / c;
        const size = Math.max(
          MIN_SIZE,
          Math.min(MAX_SIZE, Math.floor(Math.min(limitH, limitW)))
        );
        if (size > best.size) best = { cols: c, size };
      });

      /* —— stacked / mobile layout (cards under big modal) —— */
      const freeH = Math.max(0, vh - modalSize.bottom - gap);
      const freeW = vw;
      const gridCols = Math.max(
        1,
        Math.floor((freeW + gap) / (MIN_SIZE + gap))
      );
      const gridRows = Math.ceil(n / gridCols);
      const sizeMob = Math.max(
        MIN_SIZE,
        Math.min(
          MAX_SIZE,
          Math.floor(
            Math.min(
              (freeH - (gridRows - 1) * gap) / gridRows,
              (freeW - (gridCols - 1) * gap) / gridCols
            )
          )
        )
      );

      if (stacked) {
        setCard(sizeMob);
        setCols(gridCols);
      } else {
        setCard(best.size);
        setCols(best.cols);
      }
    };

    chooseLayout();
    window.addEventListener("resize", chooseLayout);
    return () => window.removeEventListener("resize", chooseLayout);
  }, [miniModals.length, modalSize.width, modalSize.bottom, gap]);

  /* how many cards live on each side */
  const leftCount  = Math.ceil(miniModals.length / 2);
  const rightCount = Math.floor(miniModals.length / 2);

  /* 2 ▸ top offsets for desktop rows (centred vertically) */
  /* 3 ▸ vertical anchors **per side** — each side is centred on its own */
  const makeTops = (count) => {
    const rows = Math.ceil(Math.max(count, 1) / cols);
    const totalH = rows * card + (rows - 1) * gap;
    const startY = (window.innerHeight - totalH) / 2;
    return Array.from({ length: rows }, (_, r) => startY + r * (card + gap));
  };
  const topsLeft  = useMemo(() => makeTops(leftCount), [leftCount, card, cols]);
  const topsRight = useMemo(() => makeTops(rightCount), [rightCount, card, cols]);

  /* 3 ▸ render nothing if no cards */
  if (!miniModals.length) return null;

  const sideBlockW = cols * card + (cols - 1) * gap;  // width of one column stack
  const edgeOffset = (window.innerWidth - modalSize.width) / 2 - sideBlockW - gap;
  // Use the bottom tray only on DESKTOP when there isn't enough side space.
  const needsBottomTray = window.innerWidth >= BREAK && edgeOffset < 0;
  const wrapperType = `${needsBottomTray ? "bottom " : ""}${animation || ""}`.trim();


  /* helpers to track per-side index */
  let leftIdx = 0;
  let rightIdx = 0;

  return (
    <div
      className={`mini-modals-wrapper ${wrapperType}`}
      style={{ "--mini": `${card}px`, "--gap": `${gap}px` }}
    >
      <div className="mini-modal-body">
        {miniModals.map((m, i) => {
          const onRight = i % 2 === 1;
          const idxInSide = onRight ? rightIdx++ : leftIdx++;
          /* —— column + row inside *that* side —— */
          const row = Math.floor(idxInSide / cols);
          const col = idxInSide % cols;

          const x = Math.max(0, edgeOffset) + col * (card + gap);
          const y = onRight ? topsRight[row] : topsLeft[row];
          

          return (
            <div
              key={m.id}
              className={`mini-modal ${onRight ? "right" : "left"} ${animation}`}
              style={
                onRight
                  ? { right: `${x}px`, top: `${y}px` }
                  : { left: `${x}px`,  top: `${y}px` }
              }
            >
              {m.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
