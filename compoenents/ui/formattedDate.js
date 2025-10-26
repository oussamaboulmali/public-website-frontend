import { mdiClockTimeEight } from "@mdi/js";
import Icon from "@mdi/react";

const FormattedDate = ({ date, smallIcon }) => {
  return (
    <div className="flex items-center gap-1 text-gray-500">
      <Icon path={mdiClockTimeEight} size={0.8} className="sm:w-5 sm:h-5" />
      <span className="text-xs">{date}</span>
    </div>
  );
};

export default FormattedDate;
