import { useFilters } from "src/components/filters/use-filters.hook";
import { useDataState } from "src/context/data.context";
import { getDayData, getMonthData, getWeekData, getYearData } from "src/helpers/data";
import { useChart } from "src/hooks/use-chart.hook";
import { RecordType } from "src/types/DataTypes.type";

const countryGroups = [
  "Germany",
  "Poland",
  "Czech",
  "Slovakia",
  "Hungary",
  "Austria",
  "France",
  "Italy",
  "Spain",
  "Turkey",
  "Greece",
  "Romania",
  "Netherlands",
  "Croatia",
  "Sweden",
  "Belgium",
  "Denmark",
  "Luxembourg",
  "Norway",
  "Finland",
  "Montenegro",
  "Portugal",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Slovenia",
  "Switzerland",
  "Serbia"
]

const contractorsChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
} as const;

type ContractorsData = Array<{
  [key: string]: number
}>

function useContractors() {
  const { chartColors } = useChart();
  const { getFilteredData } = useFilters();
  const { sort, segmentData } = useDataState();
  const { view, mainChart, dateFrom, dateTo } = segmentData.contractors;
  const currentDate = mainChart.currentDate;
  const data = getFilteredData(dateFrom, dateTo);

  function generateContractors(data: RecordType[]) {
    const contractorsData: ContractorsData = [];

    data.map((item) => {
      item.data.map((item) => {
        // group by country
        let countryName = item.country;

        countryGroups.map((country) => {
          if (item.country.includes(country)) {
            countryName = country;
          }
        });

        if (contractorsData.some(obj => Object.keys(obj).includes(countryName))) {
          contractorsData.map(obj => {
            if (Object.keys(obj).includes(countryName)) {
              obj[countryName] += 1
            }
          })
        }

        else {
          contractorsData.push({ [countryName]: 1 })
        }
      })
    });

    return contractorsData;
  }

  const getContractorsData = () => {
    if (view === "daily") {
      const currentDayData = getDayData(currentDate, data);

      const contractorsData = generateContractors(currentDayData);

      return contractorsData;
    }

    if (view === "weekly") {
      const weekData = getWeekData(currentDate, data);
      const contractorsData = generateContractors(weekData);

      return contractorsData;
    }

    if (view === "monthly") {
      const monthData = getMonthData(currentDate, data);
      const contractorsData = generateContractors(monthData);

      return contractorsData;
    }

    if (view === "yearly") {
      const yearData = getYearData(currentDate, data);
      const contractorsData = generateContractors(yearData);

      return contractorsData;
    }

    return []
  }

  const contractorsData = getContractorsData();

  contractorsData.sort((a, b) => {
    const valueA = Object.values(a)[0];
    const valueB = Object.values(b)[0];

    if (sort === "desc") {
      return valueB - valueA;
    }

    if (sort === "asc") {
      return valueA - valueB;
    }

    if(sort === "alpha") {
      const keyA = Object.keys(a)[0];
      const keyB = Object.keys(b)[0];

      if (keyA < keyB) {
        return -1;
      }

      if (keyA > keyB) {
        return 1;
      }
    }

    return 0;
  });



  const contractorsChartData = {
    labels: contractorsData.map(obj => Object.keys(obj)[0]),
    datasets: [
      {
        label: "Ilość połączeń",
        data: contractorsData.map(obj => Object.values(obj)[0]),
        backgroundColor: chartColors.map((color) => `rgba(${color}, 0.2)`),
        borderColor: chartColors.map((color) => `rgba(${color}, 1)`),
        borderWidth: 1,
      },
    ],
  };

  return {
    contractorsSummaryData: contractorsData,
    contractorsChartData,
    contractorsChartOptions
  }
}

export { useContractors }