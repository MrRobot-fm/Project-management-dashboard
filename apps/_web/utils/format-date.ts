import { format, type FormatOptions } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = ({
  date,
  dateFormat = "dd MMMM yyyy",
  options = { locale: enUS },
}: {
  date: string | Date;
  dateFormat?: string;
  options?: FormatOptions;
}) => {
  const d = new Date(date);

  return format(d, dateFormat, options);
};
