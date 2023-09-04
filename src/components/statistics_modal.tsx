import { GameState } from "@/utils/types";
import { Modal } from "@mantine/core";
import StatsBar from "./stats_bar";
import SolutionGrid from "./solution_grid";
import EndMessage from "./end_message";

export default function StatsModal({
  opened,
  close,
  gameState,
}: {
  opened: boolean;
  close: () => void;
  gameState: GameState;
}) {
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
      <SolutionGrid boards={gameState.boards} won={gameState.won} />
    </Modal>
  );
}
