# Markdown

Paragraph
text `Inline Code` text
~~Mistaken text.~~
_Italics_
**Bold**

---

Code Blocks

    4 space indention
    makes full-width
    standard code blocks

```js
var now = new Date();

var days = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
);

var months = new Array(
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
);

var date = (now.getDate() < 10 ? "0" : "") + now.getDate();

function fourdigits(number) {
  return number < 1000 ? number + 1900 : number;
}
today =
  days[now.getDay()] +
  ", " +
  months[now.getMonth()] +
  " " +
  date +
  ", " +
  fourdigits(now.getYear());

document.write(today);
```

* List item one
* List item two
  * A nested item
  * Facilisis in pretium nisl aliquet
  * Nulla volutpat aliquam velit

---

1.  Number list item one
2.  Number list item two
3.  Number list item three

> Quote
>
> Second line Quote

Standard link = http://ghost.org  
[Custom Text Link](http://ghost.org)

![Image](https://placekitten.com/200/200?image=1)

Table

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ | :-------------: | ------------: |
| col 3 is      | some wordy text |         $1600 |
| col 2 is      |    centered     |           $12 |
| zebra stripes |    are neat     |            $1 |
