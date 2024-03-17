import divisionsList from "../../data/cities-and-postalcode-by-district.json"

export type TDivision = keyof typeof divisionsList | "all divisions";

export type TDivisionList = {
    [key: string]: {
        city: string;
        code: string;
    }[]
}


export type TCitiesOfDivision = {
    city : string,
    code : string
}[] | [];

export const getCitiesOfDivision = (division: TDivision) => {
    if(division === "all divisions") return [];
    return divisionsList[division];
}