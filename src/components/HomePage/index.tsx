import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Switch,
  FormControl,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import moment, { Moment } from "moment";
import Game from "../Game";
import { MatchCardProps } from "../MatchCard";
import ToyStoryDeck from "../../decks/ToyStoryDeck";
import MainMenu from "../DifficultyMenu";
import Fireworks from "../Fireworks";
import "./index.css";

type GameContextType = {
  cards: Array<MatchCardProps>;
  difficulty: number;
  gameOver: boolean;
  gameRunning: boolean;
  isDarkMode: boolean;
  gameTime: Moment;
  gameTimer: any;
  setCards: React.Dispatch<React.SetStateAction<MatchCardProps[]>>;
  setDifficulty: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setGameTime: React.Dispatch<React.SetStateAction<Moment>>;
};

const RESET_CARDS_DELAY = 1500;
const RESET_GAME_DELAY = 8000;
const WIN_DELAY = 1000;

export const GameContext = React.createContext<GameContextType>({
  cards: [],
  difficulty: 0,
  gameOver: false,
  gameRunning: false,
  isDarkMode: true,
  gameTime: moment(),
  gameTimer: null,
  setCards: () => null,
  setDifficulty: () => null,
  setGameOver: () => null,
  setGameRunning: () => null,
  setGameTime: () => null,
});

const HomePage = () => {
  const [cards, setCards] = useState<MatchCardProps[]>(ToyStoryDeck);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [gameStartTime, setGameStartTime] = useState<Moment>(moment());
  const [gameTime, setGameTime] = useState<Moment>(moment());
  const [gameTimer, setGameTimer] = useState<any>(null);

  const cardsFromDifficulty = () => {
    return difficulty === 0
      ? setCards(ToyStoryDeck.filter((card) => card.id <= 8))
      : difficulty === 1
      ? setCards(ToyStoryDeck.filter((card) => card.id <= 16))
      : setCards(ToyStoryDeck.filter((card) => card.id <= 24));
  };

  const selectGameDifficulty = (): any => {
    setDifficulty(difficulty);
    return cardsFromDifficulty();
  };

  const toggleIsDarkMode = () => setIsDarkMode(!isDarkMode);

  const startGameTime = () => {
    setGameTimer(
      setInterval(() => {
        const currentTime = moment();
        setGameTime(moment(currentTime.diff(gameStartTime)));
      }, 10)
    );
  };

  useEffect(() => {
    selectGameDifficulty();
  }, [difficulty]);

  useEffect(() => {
    clearInterval(gameTimer);
    startGameTime();
  }, [gameRunning]);

  useEffect(() => {
    // setGameStartTime(moment());
    clearInterval(gameTimer);
  }, [gameOver]);

  return (
    <Grid className={`home-page-container ${isDarkMode ? "dark" : "light"}`}>
      {gameOver && <Fireworks />}
      <Grid container justify="center" alignItems="center" className="title">
        <Typography variant="h2">Card Matcher</Typography>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={toggleIsDarkMode}
                  name="darkModeToggle"
                />
              }
              label="Dark Mode"
              labelPlacement="start"
            />
          </FormGroup>
        </FormControl>
      </Grid>
      {gameRunning && (
        <Grid container justify="center" alignItems="center" className="title">
          {/* <Typography variant="h3">{`${gameTime.minutes()}:${gameTime.seconds()}:${gameTime.milliseconds()}`}</Typography> */}
          <Typography variant="h3">{gameTime.format("mm:ss.SS")}</Typography>
        </Grid>
      )}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className="game-container"
      >
        <GameContext.Provider
          value={{
            cards: cards,
            difficulty: difficulty,
            gameOver: gameOver,
            gameRunning: gameRunning,
            isDarkMode: isDarkMode,
            gameTime: gameTime,
            gameTimer: gameTimer,
            setCards: setCards,
            setDifficulty: setDifficulty,
            setGameOver: setGameOver,
            setGameRunning: setGameRunning,
            setGameTime: setGameTime,
          }}
        >
          {gameRunning ? (
            <Game
              difficulty={difficulty}
              resetCardsDelay={RESET_CARDS_DELAY}
              resetGameDelay={RESET_GAME_DELAY}
              winDelay={WIN_DELAY}
            />
          ) : (
            <MainMenu />
          )}
        </GameContext.Provider>
      </Grid>
    </Grid>
  );
};
export default HomePage;
