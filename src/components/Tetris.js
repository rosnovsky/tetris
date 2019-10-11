import React, { useState } from 'react';
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';

import { createStage, checkCollision } from '../gameHelpers'

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameover, setGameover] = useState(false)

    const [player, updatePlayerPosition, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);


    const movePlayer = direction => {
        if(!checkCollision(player, stage, {x: direction, y: 0})){
            updatePlayerPosition({x: direction, y: 0});
        }
    }

    const startGame = () => {
        //reset game
        setStage(createStage());
        resetPlayer();
        setGameover(false)
        
    }
    
    const drop = () => {
        if(!checkCollision(player, stage, {x: 0, y: 1})){
            updatePlayerPosition({x: 0, y: 1, collided: false});
        } else if (player.position.y < 1) {
        setGameover(true);
        setDropTime(null)
        }else{
            updatePlayerPosition({x: 0, y: 0, collided: true})
        }
    }

    const dropPlayer = () => {
        drop()
    }

    const move = ( {keyCode} ) => {
        if(!gameover) {
            if(keyCode === 37) {
                movePlayer(-1)
            }else if(keyCode === 39){
                movePlayer(1)
            }else if(keyCode === 40) {
                dropPlayer()
            }
        }
    }


    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
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
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;
