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

type SegmentType = "totalCalls" | "averageCallAmount";

type SortType = "desc" | "asc" | "alpha";

type ViewType = "monthly" | "daily" | "weekly" | "yearly";

export type { RecordType, DataType, SegmentType, SortType, ViewType };
