import { useDataDispatch } from "../context/data.context";
import { RecordType } from "../types/DataTypes.type";

const dataIndexes = {
  skypeName: 0,
  fullName: 1,
  email: 2,
  group: 3,
  date: 4,
  phone: 5,
  country: 6,
  type: 7,
  pricePerMinute: 8,
  callLength: 9,
  total: 10,
};

function useData() {
  const dispatchData = useDataDispatch();

  const handleData = (data: string[][]) => {
    const transformedData: RecordType[] = [];

    data.slice(1).map((row) => {
      if (!row[dataIndexes.fullName]) return null;

      const record = {
        date: row[dataIndexes.date],
        phone: row[dataIndexes.phone],
        country: row[dataIndexes.country],
        pricePerMinute: row[dataIndexes.pricePerMinute],
        callLength: row[dataIndexes.callLength],
        total: row[dataIndexes.total],
      };

      if (
        transformedData.some((item) => item.name === row[dataIndexes.fullName])
      ) {
        const index = transformedData.findIndex(
          (item) => item.name === row[dataIndexes.fullName]
        );
        transformedData[index].data.push(record);
      } else {
        transformedData.push({
          name: row[dataIndexes.fullName],
          data: [record],
        });
      }
    });

    dispatchData({ type: "ADD_DATA", data: transformedData });
  };

  const validateData = (data: string[][]): null | string => {
    const dataHeader = data[0];

    let error = null;

    if (dataHeader[dataIndexes.skypeName] !== "Nazwa użytkownika Skype'a") {
      error = "Zły układ kolumny: Nazwa użytkownika Skype'a";
    }
    if (dataHeader[dataIndexes.fullName] !== "Członek") {
      error = "Zły układ kolumny: Członek";
    }
    if (dataHeader[dataIndexes.email] !== "E-mail") {
      error = "Zły układ kolumny: Adres e-mail";
    }
    if (dataHeader[dataIndexes.group] !== "Grupa") {
      error = "Zły układ kolumny: Grupa";
    }
    if (dataHeader[dataIndexes.date] !== "Data") {
      error = "Zły układ kolumny: Data";
    }
    if (dataHeader[dataIndexes.phone] !== "Pozycja") {
      error = "Zły układ kolumny: Pozycja";
    }
    if (dataHeader[dataIndexes.country] !== "Kraj docelowy") {
      error = "Zły układ kolumny: Kraj";
    }
    if (dataHeader[dataIndexes.type] !== "Typ") {
      error = "Zły układ kolumny: Typ";
    }
    if (dataHeader[dataIndexes.pricePerMinute] !== "Cena/min.") {
      error = "Zły układ kolumny: Cena/min.";
    }
    if (dataHeader[dataIndexes.callLength] !== "Czas trwania") {
      error = "Zły układ kolumny: Czas trwania";
    }
    if (dataHeader[dataIndexes.total] !== "Kwota") {
      error = "Zły układ kolumny: Kwota";
    }

    return error;
  };

  return { handleData, validateData };
}

export { useData };
