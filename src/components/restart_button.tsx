import { Action, ActionType } from "@/utils/types";

export default function Restart({ onClick }: { onClick: () => void }) {
  return (
    <div className="pt-3 md:pt-6 flex justify-center">
      <button
        onClick={() => onClick()}
        className="rounded-md text-lg md:text-xl bg-white text-black"
      >
        <span className="px-2 text-black">New game</span>
      </button>
    </div>
  );
}
