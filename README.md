# **Currency Converter**

This Currency Converter is a simple tool that allows users to convert currency values between various countries and compare exchange rates of different countries. The application utilizes an external API to fetch real-time exchange rates and provide accurate conversion results.

### Features
- Convert currency values between multiple countries.
- Add and remove currency items.
- Automatic selection of the immediate next currency as the base currency if the current base currency is removed.
- Disabled selection for currencies that have been added.

### API Integration
The Currency Converter application integrates with the ExchangeRate-API to fetch exchange rates. The API provides reliable and up-to-date currency conversion data, ensuring accurate results for users.

### API Usage
- The application fetches exchange rates from the API based on user-selected currencies.
- Exchange rates are updated automatically to reflect real-time market values.
- API responses are parsed and used to perform currency conversions within the application.

### Adding a Currency
- Click on the "Add Currency" button.
- Select the desired currency from the currency list.
- The selected currency will be added to the converter.

### Removing a Currency
- Click on the <img src="https://cdn-icons-png.flaticon.com/128/4436/4436695.png" alt="Remove Icon" width="20" height="20"> button next to the currency you want to remove.
- The currency will be removed from the converter.
- If the base currency is removed, the immediate next currency becomes the base currency.

### Converting Currency
To convert currency values, enter the amount in the input field next to the currency you want to convert from. The converted value will be displayed automatically.
For other than a single digit value, click in the input place and enter the first digit of the amount. Next move the cursor to the place beside the first digit and enter the remaining digits.
