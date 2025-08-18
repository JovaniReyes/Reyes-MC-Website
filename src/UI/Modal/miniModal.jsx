import { useLayoutEffect, useMemo, useState } from "react";
import { useMiniModalsStore } from "../../Exp/stores/miniModalStore";
import "../../Styles/miniModals.scss";

/* — system controls —  */
const MAX_SIZE = 300;             // largest card edge
const MIN_SIZE = 100;             // smallest card edge (lower if you want to fit more)
const BREAK    = 1000;            // desktop / mobile switch
const GAP_DESK = 15;              // gap ≥ BREAK
const GAP_MOB  = 5;               // gap <  BREAK

const SAFE_PAD = 10;              // min top/bottom margin inside viewport
const FORCE_COLS_FOR_COUNT = {    // force columns/side for certain counts
  10: 2,
};
const MAX_COLS_PER_SIDE     = 2;  // hard cap for desktop sides
const MAX_GRID_COLS_MOBILE  = 5;  // cap for stacked grid under the main modal

export default function MiniModalsManager() {
  const { miniModals, animation } = useMiniModalsStore();

  // gap depends on viewport width
  const [gap, setGap] = useState(window.innerWidth >= BREAK ? GAP_DESK : GAP_MOB);
  useLayoutEffect(() => {
    const onResize = () => setGap(window.innerWidth >= BREAK ? GAP_DESK : GAP_MOB);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // live main modal measurements
  const [modalSize, setModalSize] = useState({
    width: Math.min(window.innerWidth * 0.95, 800),
    bottom: Math.round(window.innerHeight * 0.6),
  });

  // Watch .modal robustly: attach when it appears, remeasure on viewport changes
  useLayoutEffect(() => {
    let modalElement = null;
    let ro = null;
    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = modalElement?.getBoundingClientRect();
        const width  = r?.width  ?? Math.min(window.innerWidth * 0.95, 1000);
        const bottom = r?.bottom ?? Math.round(window.innerHeight * 0.6);
        setModalSize({ width, bottom });
        document.documentElement.style.setProperty("--modal-w", `${width}px`);
        document.documentElement.style.setProperty("--modal-bottom", `${Math.round(bottom)}px`);
      });
    };

    const attach = () => {
      const el = document.querySelector(".modal");
      if (!el || el === modalElement) return;     // not found or already observing
      modalElement = el;
      ro?.disconnect();
      ro = new ResizeObserver(update);
      ro.observe(modalElement);
      update(); // measure immediately once attached
    };

    // 1) Try now, then keep watching DOM until .modal shows up
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    // 2) Viewport changes that don’t always fire 'resize' (iOS URL bar, rotations)
    const onViewport = () => update();
    window.addEventListener("resize", onViewport, { passive: true });
    window.addEventListener("orientationchange", onViewport, { passive: true });
    const vv = window.visualViewport;
    vv?.addEventListener("resize", onViewport);
    vv?.addEventListener("scroll", onViewport);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onViewport);
      window.removeEventListener("orientationchange", onViewport);
      vv?.removeEventListener("resize", onViewport);
      vv?.removeEventListener("scroll", onViewport);
    };
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

      // space available on ONE side of the modal
      const sideFree = (vw - modalSize.width) / 2 - gap;

      // override: force specific column count for certain card counts
      const forcedCols   = FORCE_COLS_FOR_COUNT[n] ?? null;
      const forceDesktop = !!forcedCols && vw > BREAK && sideFree > 0;

      // stacked when small screen or literally no side space
      const stacked = forceDesktop ? false : (vw <= BREAK || sideFree < MIN_SIZE);

      /* —— desktop layout (cards on each side of big modal) —— */
      const sideCount = Math.ceil(n / 2); // cards per side
      let best = { cols: forcedCols ?? 1, size: MIN_SIZE };

      const candidates = forcedCols
        ? [Math.min(forcedCols, MAX_COLS_PER_SIDE)]
        : [1, 2];

      candidates.forEach((c) => {
        const rows   = Math.ceil(sideCount / c);
        const limitH = (vh - 2 * SAFE_PAD - (rows - 1) * gap) / rows; // keep vertical breathing room
        const limitW = (sideFree - (c - 1) * gap) / c;
        const size = Math.max(
          MIN_SIZE,
          Math.min(MAX_SIZE, Math.floor(Math.min(limitH, limitW)))
        );
        if (!forcedCols) {
          if (size > best.size) best = { cols: c, size };
        } else {
          best = { cols: c, size }; // when forced, take that layout
        }
      });

      /* —— stacked / mobile layout (cards under big modal) —— */
      const freeH    = Math.max(0, vh - modalSize.bottom - gap - SAFE_PAD);
      const freeW    = vw;
      const gridCols = Math.min(
        MAX_GRID_COLS_MOBILE,
        Math.max(1, Math.floor((freeW + gap) / (MIN_SIZE + gap)))
      );
      const gridRows = Math.ceil(n / gridCols);
      const sizeMob  = Math.max(
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
    window.addEventListener("resize", chooseLayout, { passive: true });
    return () => window.removeEventListener("resize", chooseLayout);
  }, [miniModals.length, modalSize.width, modalSize.bottom, gap]);

  /* how many cards live on each side */
  const leftCount  = Math.ceil(miniModals.length / 2);
  const rightCount = Math.floor(miniModals.length / 2);

  /* 2 ▸ top offsets for desktop rows (centred & CLAMPED vertically) */
  const makeTops = (count) => {
    const vh = window.innerHeight;
    const rows   = Math.ceil(Math.max(count, 1) / cols);
    const totalH = rows * card + (rows - 1) * gap;
    const availH = Math.max(0, vh - 2 * SAFE_PAD);
    const startY = SAFE_PAD + Math.max(0, (availH - totalH) / 2);
    // clamp each row just in case rounding would push beyond the safe area
    return Array.from({ length: rows }, (_, r) => {
      const y = startY + r * (card + gap);
      return Math.min(SAFE_PAD + availH - card, Math.max(SAFE_PAD, y));
    });
  };
  const topsLeft  = useMemo(() => makeTops(leftCount),  [leftCount,  card, cols, gap]);
  const topsRight = useMemo(() => makeTops(rightCount), [rightCount, card, cols, gap]);

  // render nothing if no cards
  if (!miniModals.length) return null;

  const sideBlockW = cols * card + (cols - 1) * gap;  // width of one side's grid
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
          const row = Math.floor(idxInSide / cols);
          const col = idxInSide % cols;

          const x = Math.max(0, edgeOffset) + col * (card + gap);
          const y = onRight ? topsRight[row] : topsLeft[row];

          return (
            <div
              key={m.id}
              className={`mini-modal ${onRight ? "right" : "left"} ${animation}`}
              style={onRight ? { right: `${x}px`, top: `${y}px` } : { left: `${x}px`, top: `${y}px` }}
            >
              {m.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
