const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const path = require('path');

describe('UI Тесты', function() {
    let driver;
    before(async function() {
        let options = new chrome.Options();
        options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        const filePath = 'file://' + path.resolve(__dirname, 'index.html');
        await driver.get(filePath);
    });
    after(async function() {
        if (driver) await driver.quit();
    });

    it('Проверка заголовка', async function() {
        const title = await driver.getTitle();
        expect(title).to.equal('Лабораторная CI/CD');
    });
    it('Проверка наличия кнопки', async function() {
        const button = await driver.findElement(By.id('submitBtn'));
        expect(button).to.not.be.null;
    });
    it('Проверка работы формы', async function() {
        await driver.findElement(By.id('nameInput')).sendKeys('Студент');
        await driver.findElement(By.id('submitBtn')).click();
        const result = await driver.findElement(By.id('resultMessage')).getText();
        expect(result).to.equal('Привет, Студент!');
    });
});