# 打造簡單記帳程式

使用 Node.js 、 Express-handlebars 等工具打造的記帳程式

# 流程

1.建立 expense-tracker 資料夾

2.載入 npm 、 express 、 express-handlebars 、 nodemon 等功能

3.建立視覺模板 views

4.載入 public 內容

5.建立基礎種子

6.建立增刪改查功能

7.建立類別

8.建立登入及註冊功能

# 功能

只有登入的使用者可以查看清單

可以新增使用者

可以新增清單、刪除清單、修改清單

為清單分類

# 使用方式

1.將專案 clone 到本地端

2.安裝所需套件

```
npm install
```

3.設定環境變數

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.oox40uh.mongodb.net/expense?retryWrites=true&w=majority
```

4.產出種子資料

```
npm run seed
```

5.啟動伺服器

```
npm run dev
```

6.因為使用的 port 為 3000 請在瀏覽器上輸入 localhost:3000 來使用

7.使用預設種子帳號登入

```
acount : mother
password : 000000
```

# 開發工具

- Node.js 16.17.1
- Express 4.18.2
- Express-Handlebars 7.0.7
- Express-session 1.17.3
- Bootstrap 5
- Font-awesome
- MongoDB
- Mongoose 7.1.0
- Dotenv 16.0.3
- Method-override 3.0.0
- Bcryptjs 2.4.3
- Body-parser 1.20.2
- Connect-flash 0.1.1
- Passport 0.6.0
- Passport-local 1.0.0
