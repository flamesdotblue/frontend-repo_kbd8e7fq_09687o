import React, { useMemo, useState } from 'react';
import { Lightbulb, Flag } from 'lucide-react';

const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

const pieceToChar = {
  p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
  P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔',
};

function parseFENBoard(fen) {
  const rows = fen.split('/');
  const board = [];
  for (let r = 0; r < 8; r++) {
    const row = [];
    for (const ch of rows[r]) {
      if (/[1-8]/.test(ch)) {
        for (let i = 0; i < Number(ch); i++) row.push(null);
      } else {
        row.push(ch);
      }
    }
    board.push(row);
  }
  return board;
}

export default function GameBoard({ user, onEnd, onMove }) {
  const [fen, setFen] = useState(initialFEN);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState([]);
  const board = useMemo(() => parseFENBoard(fen), [fen]);

  const turn = moves.length % 2 === 0 ? 'white' : 'black';

  const handleSquareClick = (r, c) => {
    const piece = board[r][c];
    if (!selected) {
      if (piece) setSelected([r, c]);
      return;
    }

    const [sr, sc] = selected;
    if (sr === r && sc === c) {
      setSelected(null);
      return;
    }

    // Very permissive move: move piece to target square (no rules enforcement)
    const next = board.map((row) => row.slice());
    next[r][c] = next[sr][sc];
    next[sr][sc] = null;

    // Convert board back to FEN (board-only portion)
    const toFen = next
      .map((row) => {
        let s = '';
        let empty = 0;
        for (const cell of row) {
          if (!cell) empty++;
          else {
            if (empty) { s += empty; empty = 0; }
            s += cell;
          }
        }
        if (empty) s += empty;
        return s;
      })
      .join('/');

    const moveStr = `${String.fromCharCode(97 + sc)}${8 - sr}-${String.fromCharCode(97 + c)}${8 - r}`;
    const newMoves = [...moves, moveStr];
    setFen(toFen);
    setSelected(null);
    setMoves(newMoves);
    onMove?.(moveStr, toFen);
  };

  const vipHint = user?.isVIP
    ? 'VIP hint: Control the center. Consider developing knights before bishops.'
    : null;

  return (
    <section className="grid w-full grid-cols-1 gap-6 md:grid-cols-[auto,1fr]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Board · {turn === 'white' ? 'White to move' : 'Black to move'}</h3>
          <button
            onClick={() => onEnd({ reason: 'resign', moves })}
            className="inline-flex items-center gap-2 rounded-md bg-rose-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-600"
          >
            <Flag size={16} /> End Game
          </button>
        </div>

        <div className="aspect-square w-full max-w-[480px] overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg">
          {board.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-8">
              {row.map((cell, cIdx) => {
                const dark = (rIdx + cIdx) % 2 === 1;
                const isSel = selected && selected[0] === rIdx && selected[1] === cIdx;
                return (
                  <button
                    key={cIdx}
                    onClick={() => handleSquareClick(rIdx, cIdx)}
                    className={[
                      'flex aspect-square items-center justify-center text-2xl sm:text-3xl',
                      dark ? 'bg-emerald-900/50' : 'bg-emerald-200/40',
                      isSel ? 'ring-2 ring-amber-400' : '',
                    ].join(' ')}
                    aria-label={`square-${rIdx}-${cIdx}`}
                  >
                    <span className={cell && cell === cell.toUpperCase() ? 'text-white' : 'text-black'}>
                      {cell ? pieceToChar[cell] : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {user?.isVIP && (
          <button
            onClick={() => alert(vipHint)}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-amber-500/90 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-500"
          >
            <Lightbulb size={16} /> Get VIP Hint
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
        <h4 className="mb-2 text-sm font-semibold tracking-wide text-white/70">Moves</h4>
        {moves.length === 0 ? (
          <p className="text-sm text-white/60">No moves yet. Tap a piece, then a destination square.</p>
        ) : (
          <ol className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {moves.map((m, i) => (
              <li key={i} className="text-white/80">
                <span className="mr-2 text-white/50">{Math.floor(i / 2) + 1}{i % 2 === 0 ? '.' : '…'}</span>
                {m}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
