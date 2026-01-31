import { expect, type Locator, type Page } from '@playwright/test';

export class WeatherPage {
    readonly page: Page;
    readonly heading1: Locator;
    readonly heading2: Locator;
    readonly heading3: Locator;
    readonly loader: Locator;
    readonly cityLabel: Locator;
    readonly selectableCityColumn: Locator;
    readonly selectableCityName: Locator;
    readonly getWeatherButton: Locator;
    readonly weatherDetails: Locator;
    readonly enterCity: Locator;
    readonly weatherImage: Locator;
    readonly weatherIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading1 = page.locator('h1');
        this.heading2 = page.locator('h2');
        this.heading3 = page.locator('h3');
        this.loader = page.locator('#loader');
        this.cityLabel = page.locator('#city');
        this.selectableCityColumn = page.locator('.clickable-text-column');
        this.selectableCityName = page.getByRole('link');
        this.getWeatherButton = page.getByRole('button');
        this.weatherDetails = page.locator('#weather');
        this.enterCity = page.getByPlaceholder('Enter a city name');
        this.weatherImage = page.getByAltText('Weather image');
        this.weatherIcon = page.getByAltText('Weather Icon');
    }

    //Goes to the Website
    async goto() {
        await this.page.goto('http://localhost:3000');
    }
    //Checks that 'header1' is visible on the page
    async header1Visible() {
        await expect(this.heading1).toBeVisible();
    }
    //Checks that 'header2' is visible on the page
    async header2Visible() {
        await expect(this.heading2).toBeVisible();
    }
    //Checks that 'header3' is visible on the page
    async header3Visible() {
        await expect(this.heading3).toBeVisible();
    }
    //Checks thats the lable is visible on the page (for inputs)
    async labelVisible() {
        await expect(this.cityLabel).toBeVisible();
    }
    //Checks that the spinning blue loader is visible on the page after entering/selecting a city
    async loaderVisible() {
        await expect(this.loader).toBeVisible();
    }
    //Checks that the city label is clickable
    async cityLabelClickable() {
        await this.cityLabel.click();
    }
    //Checks that the column that displays the list of selectable cities is visible on the page
    async selectCityColumnVisible() {
        await expect(this.selectableCityColumn).toBeVisible();
    }
    //Selects one of the available cities on the screen (London, New York, Tokyo, Sydney)
    async selectCity(city: any) {
        await this.selectableCityName.filter({ hasText: city }).click();
    }
    //Checks that the 'Get the weather!' button is visible
    async weatherButtonVisible(text: any) {
        await expect(this.getWeatherButton.filter({hasText: text})).toBeVisible;
    }
    //Clicks the button to get the weather
    async getTheWeather() {
        await this.getWeatherButton.click();
    }
    //Checks that the weather details are visible after getting the weather
    async weatherDetailsVisible(city: any) {
        await expect(this.weatherDetails.filter({hasText: city})).toBeVisible();
    }
    //Enters a city name based on input
    async enterCityName(city: any) {
        await this.enterCity.fill(city);
    }
    //Checks that the weather icon is visible on the page after getting the weather
    async weatherIconVisible() {
        await expect(this.weatherIcon).toBeVisible();
    }
    //Checks that the weather image is visible on the page after getting the weather
    async weatherImageVisible() {
        await expect(this.weatherImage).toBeVisible();
    }
}