import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { ans: "Answer     " });
});

function check(type1, num) {
  let result = false;
  let length = num.length;
  let x = 0;
  switch (type1) {
    case 0:
      {
        for (let i = 0; i < length; i++) {
          if (num[i] < '0' || num[i] > '9') {
            result = true;
            break;
          }
        }
      }
      break;
    case 1:
      {
        for (let i = 0; i < length; i++) {
          if (num[i] < '0' || num[i] > '1') {
            result = true;
            break;
          }
        }
      }
      break;
    case 2:
      {
        for (let i = 0; i < length; i++){
          if (num[i] < '0' || num[i] > '7') {
            result = true;
            break;
          }
        }
      }
      break;
    case 3:
      {
        for (let i = 0; i < length; i++) {
          if (num[i] < '0' || num[i] > 'F') {
            result = true;
            break;
          }
          else if(num[i] < 'A' && num[i] > '9') {
            result = true;
            break;
          }
        }
      }
      break;
  }
  return result; 
}

function decToBin(n) {
  let ans = "";
  while (n >= 1) {
    ans = (n % 2) + ans;
    n = parseInt(n / 2);
  }
  return ans;
}

function decToOct(n) {
  let ans = "";
  while (n >= 1) {
    ans = (n % 8) + ans;
    n = parseInt(n / 8);
  }
  return ans;
}

function binToDec(n) {
  let ans = 0;
  let j = 1;
  for (let i = n.length - 1; i >= 0; i--) {
    ans = ans + parseInt(n[i]) * j;
    j = j * 2;
  }
  let text = ans.toString();
  return text;
}

function octToDec(n) {
  let ans = 0;
  let j = 1;
  for (let i = n.length - 1; i >= 0; i--) {
    ans = ans + parseInt(n[i]) * j;
    j = j * 8;
  }
  let text = ans.toString();
  return text;
}

function hexa(n) {
  if (n < 10) return n;
  else {
    switch (n) {
      case 10:
        return "A";
      case 11:
        return "B";
      case 12:
        return "C";
      case 13:
        return "D";
      case 14:
        return "E";
      case 15:
        return "F";
    }
  }
}

function hexaR(n) {
  if (n < 10) return n;
  else {
    switch (n) {
      case "A":
        return "10";
      case "B":
        return "11";
      case "C":
        return "12";
      case "D":
        return "13";
      case "E":
        return "14";
      case "F":
        return "15";
    }
  }
}

function decToHex(n) {
  let ans = "";
  while (n >= 1) {
    ans = hexa(n % 16) + ans;
    n = parseInt(n / 16);
  }
  return ans;
}

function hexToDec(n) {
  let ans = 0;
  let j = 1;
  for (let i = n.length - 1; i >= 0; i--) {
    ans = ans + parseInt(hexaR(n[i])) * j;
    j = j * 16;
  }
  let text = ans.toString();
  return text;
}

function caller(type1, type2, num) {
  let ans = "";
  switch (type1) {
    case 0:
      {
        switch (type2) {
          case 0:
            {
              ans = num;
            }
            break;

          case 1:
            {
              ans = decToBin(num);
            }
            break;
          case 2:
            {
              ans = decToOct(num);
            }
            break;
          case 3:
            {
              ans = decToHex(num);
            }
            break;
        }
      }
      break;
    case 1:
      {
        switch (type2) {
          case 0:
            {
              ans = binToDec(num);
            }
            break;
          case 1:
            {
              ans = num;
            }
            break;
          case 2:
            {
              ans = binToDec(num);
              ans = decToOct(ans);
            }
            break;
          case 3:
            {
              ans = binToDec(num);
              ans = decToHex(ans);
            }
            break;
        }
      }
      break;
    case 2:
      {
        switch (type2) {
          case 0:
            {
              ans = octToDec(num);
            }
            break;
          case 1:
            {
              ans = octToDec(num);
              ans = decToBin(ans);
            }
            break;
          case 2:
            {
              ans = num;
            }
            break;
          case 3:
            {
              ans = octToDec(num);
              ans = decToHex(ans);
            }
            break;
        }
      }
      break;
    case 3:
      {
        switch (type2) {
          case 0:
            {
              ans = hexToDec(num);
            }
            break;
          case 1:
            {
              ans = hexToDec(num);
              ans = decToBin(ans);
            }
            break;
          case 2:
            {
              ans = hexToDec(num);
              ans = decToOct(ans);
            }
            break;
          case 3:
            {
              ans = num;
            }
            break;
        }
      }
      break;
  }
  return ans;
}
const list = ["Decimal", "Binary", "Octal", "Hexa-decimal"];
app.post("/solution", (req, res) => {
  const type1 = Number(req.body.pre);
  const num = req.body.input;
  const type2 = Number(req.body.post);
  const result = check(type1, num);
  if(result) res.render("index.ejs", { ans: "Invalid Input!" });
  else {
    const ans = caller(type1, type2, num);
    const text =
      list[type2] + "  of  " + list[type1] + "  number  " + num + "  is  " + ans;
    res.render("index.ejs", { ans: text });
  }
});

app.listen(port, () => {});
