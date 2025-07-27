import { RecurringIntervalEnum } from "./../models/transaction.model";
import { addDays, addMonths, addYears, startOfMonth } from "date-fns";

export function calculateNextReportDate(lastSentDate?: Date): Date {
  const now = new Date();
  const lastSent = lastSentDate || now;

  const nextDate = startOfMonth(addMonths(lastSent, 1));

  nextDate.setHours(0, 0, 0, 0); // Set time to midnight

  return nextDate;
}

export function calculatedDateNextOccurrence(
  date: Date,
  recurringInterval: keyof typeof RecurringIntervalEnum
) {
  const base = new Date(date);
  base.setHours(0, 0, 0, 0); // Set time to midnight

  switch (recurringInterval) {
    case RecurringIntervalEnum.DAILY:
      return addDays(base, 1);
    case RecurringIntervalEnum.WEEKLY:
      return addDays(base, 7);
    case RecurringIntervalEnum.MONTHLY:
      return addMonths(base, 1);
    case RecurringIntervalEnum.YEARLY:
      return addYears(base, 1);
    default:
      return base;
  }
}
