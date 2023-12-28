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

type SegmentType = "totalCalls";

export type { RecordType, DataType, SegmentType };
