import { Chess, SQUARES } from 'chess.js';
import './App.css'
import Chessground from '@react-chess/chessground'
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { useState } from 'react';
import type { Config } from 'chessground/config';
import type { Key } from 'chessground/types';

function App() {
    const [fen, setFen] = useState(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );

    const chess = new Chess(fen);
    const turnColor = chess.turn() === "w" ? "white" : "black";
    const handleMove = (from: string, to: string) => {
        chess.move({ from, to });
        setFen(chess.fen());
    };
    const size = 700
    const toDests = (): Map<Key, Key[]> => {
        const dests = new Map<Key, Key[]>()
        SQUARES.forEach((s) => {
            const ms = chess.moves({ square: s, verbose: true })
            if (ms.length)
                dests.set(
                    s,
                    ms.map((m) => m.to)
                )
        })
        return dests;
    }
    const config: Config = {
        fen: fen,
        turnColor: turnColor,
        movable: {
            free: false,
            color: turnColor,
            dests: toDests(),
            rookCastle: true,
        },
        events: {
            move: handleMove
        }

    }

    return (
        <>
            <Chessground
                width={size}
                height={size}
                config={config}
            />
        </>
    )
}

export default App
