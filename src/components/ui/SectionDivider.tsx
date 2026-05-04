export function SectionDivider() {
  return (
    <div className="flex items-center py-7" aria-hidden="true">
      <div className="flex-1 h-px bg-yxane-line/50" />

      <div className="px-5">
        <div className="w-[5px] h-[5px] rotate-45 bg-yxane-mauve" />
      </div>

      <div className="flex-1 h-px bg-yxane-line/50" />
    </div>
  );
}