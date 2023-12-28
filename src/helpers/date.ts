function formatDate(date: Date): string {
  console.log("Xd", date);
  const d = new Date(date);

  let day = "" + d.getDate();
  let month = "" + (d.getMonth() + 1);
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
}

const getDateRange = (dates: Date[]): { min: Date; max: Date } => {
  //@ts-ignore
  const min = new Date(Math.min(...dates));
  //@ts-ignore
  const max = new Date(Math.max(...dates));

  return { min, max };
};

export { formatDate, getDateRange };
