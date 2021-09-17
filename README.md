#### Timeline ####

Deadline was within a days
Extended my deadline
Took 2 days due to my work schedule

> 16 Sep 2021

* [9:30 AM] read the email
* [2.40 PM - 3:45 PM] Initiated the react app in between work
* [5:03 PM - 10:09] Started working again

> 17 Sep 2021

* [7:44 AM - 11:11 AM] Started working again
* [11:30 AM - ] Started working again

#### Libraries Used ####

> For the App

* date-fns
* lodash
* react-datepicker (Safari do not suppor type="date" for input field)
* sweetalert2

> Formatting

* eslint
* prettier (for formatting)

> Testing

* jest
* @testing-library/react
* @testing-library/jest-dom
* @testing-library/

#### Some Considerations (Due to shortage of time) ####

* Avoided Using Webpack due to shortage of time
* Avoided Using Next JS
* Avoided creating a theme using Material UI
* Avoided multiple language support
* Avoided user accessibility
* Avoided using unnessary libraries eg: Material UI
* Avoided creating storybook


#### Logic ####

* Book select fields shows which are available
* Return select fields shows which are not available
* Booking will change the availability from true to false
* Return will change the availability from false to true
* Search field searches using ['code', 'name', 'type', 'durability', 'mileage']

#### Logic Considerations ####

* There was no discount in the given data, so the logic for discount has been ignored
* The logic to calculate the total Price for the return product is not given

#### Calculation Logic ####

> For Booking (Estimate Price)

```javascript
const estimatePrice = totalDayOfWork * price
```

> For Returning (Total Price)

```javascript
const totalPrice = minimum_rent_period * price
```