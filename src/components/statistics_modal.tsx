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
  close: (g: GameState) => void;
  gameState: GameState;
  dispatchGameState: (a: Action) => void;
}) {
  let callBack = () => {
    close(gameState);
    dispatchGameState({ actionType: ActionType.RESTART });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close(gameState)}
      title=""
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={true}
      centered
      size="auto"
    >
      <EndMessage state={gameState.state} />
      <StatsBar gameState={gameState} />
      <SolutionGrid boards={gameState.boards} state={gameState.state} />
      <Restart onClick={callBack} />
    </Modal>
  );
}
