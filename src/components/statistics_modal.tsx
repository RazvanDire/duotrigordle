import { Action, ActionType, GameState } from "@/utils/types";
import { Modal } from "@mantine/core";
import StatsBar from "./stats_bar";
import SolutionGrid from "./solution_grid";
import EndMessage from "./end_message";
import Restart from "./restart_button";

export default function StatsModal({
  opened,
  close,
  gameState,
  dispatchGameState,
}: {
  opened: boolean;
  close: () => void;
  gameState: GameState;
  dispatchGameState: (v: Action) => void;
}) {
  let callBack = () => {
    close();
    dispatchGameState({ actionType: ActionType.RESTART });
  };
  if (gameState.ended)
    return (
      <Modal
        opened={opened}
        onClose={close}
        title=""
        withCloseButton={false}
        closeOnEscape={false}
        closeOnClickOutside={true}
        centered
        size="auto"
      >
        <EndMessage won={gameState.won} />
        <StatsBar gameState={gameState} />
        <SolutionGrid
          boards={gameState.boards}
          won={gameState.won}
        />
        <Restart onClick={callBack} />
      </Modal>
    );
}
