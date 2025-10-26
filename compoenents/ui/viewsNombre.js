import { mdiEye } from "@mdi/js";
import Icon from "@mdi/react";

export default function ViewCounter({ initialViews = 0 }) {
  const formatViews = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="flex items-center gap-1 text-gray-500">
      <Icon path={mdiEye} size={0.6} className="sm:w-5 sm:h-5" />
      <span className="text-[10px] sm:text-[18px]">
        {formatViews(initialViews)}
      </span>
    </div>
  );
}
