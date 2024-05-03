import { get } from "lodash";
import divisionsList from "../../data/cities-and-postalcode-by-district.json"

export type TDivision = keyof typeof divisionsList | "all divisions";

export type TDivisionList = {
    [key: string]: {
        city: string;
        code: string;
    }[]
}


export type TCitiesOfDivision = {
    city: string,
    code: string
}[] | [];

export type City = {
    city: string;
    code: string;
}

export const divisionsOfSrilanka = Object.keys(divisionsList);

export const getCitiesOfDivision = (division: TDivision) => {
    if (division === "all divisions") return [];
    return divisionsList[division];
}

export const getZipCodeFromCity = (division: TDivision, city: string) => {
    const cities = getCitiesOfDivision(division);
    return get(cities.find(c => c.city === city), "code", "");
}
