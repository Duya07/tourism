import { WEATHERTOKEN, WEATHERAPI } from '../util/ConstSetting';

export async function dailyWeather(lng: string | number, lat: string | number) {
    return await fetch(WEATHERAPI + WEATHERTOKEN
        + "/" + lng + "," + lat
        + "/daily?dailysteps=14");
}