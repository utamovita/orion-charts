type DataType = {
  date: Date;
  phone: string;
  country: string;
  pricePerMinute: string;
  callLength: string;
  total: string;
};

type RecordType = {
  name: string;
  data: DataType[];
};

type WeekdayType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type SegmentType = "totalCalls" | "averageCallAmount";

type SortType = "desc" | "asc" | "alpha";

type ViewType = "monthly" | "daily" | "weekly" | "yearly";

export type { RecordType, DataType, SegmentType, SortType, ViewType, WeekdayType };
