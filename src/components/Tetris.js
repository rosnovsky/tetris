import React, { useState } from 'react';
import usePlayer from '../hooks/usePlayer';
import useStage from '../hooks/useStage';

import { createStage } from '../gameHelpers'

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { StyledTetrisWrapper,StyledTetris } from './styles/StyledTetris';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameover, setGemaover] = useState(false)

    const [player, updatePlayerPosition, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log("re-render")

    const movePlayer = (direction) => {
        updatePlayerPosition({x: direction, y: 0});
    }

    const startGame = () => {
        //reset game
        setStage(createStage());
        resetPlayer();
        
    }
    
    const drop = () => {
        updatePlayerPosition({x: 0, y: 1, collided: false});

    }

    const dropPlayer = () => {
        drop()
    }

    const move = ({ keycode }) => {
        if(!gameover) {
            if(keycode === 37) {
                movePlayer(-1)
            }else if(keycode === 39){
                movePlayer(1)
            }else if(keycode === 40) {
                dropPlayer()
            }
        }

    }


    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onkeydown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    { gameover ? <Display gameover={gameover} text="Game Over" /> :
                        <> 
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                        </>
                    }
                    <StartButton onClick={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;
