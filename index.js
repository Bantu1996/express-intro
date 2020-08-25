const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const SettingsBill = require('./settings-bill')
const moment = require('moment')

const app = express();

const settingsBill = SettingsBill();
moment().format()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index', {
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals(),
    totalClassName: settingsBill.totalClassName()
  })
});

app.post('/settings', function (req, res) {

  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  });
  console.log(settingsBill.getSettings());

  res.redirect('/');
})

app.post('/action', function (req, res) {
  settingsBill.recordAction(req.body.actionType)

  res.redirect('/');
})


app.get('/actions', function (req, res) {
  let actionList = settingsBill.actions()
  for (var keys of actionList) {
    keys.ago = moment(keys.timestamp).fromNow()
  }
  res.render('actions', { actions: actionList})
})

app.get('/actions/:actionType', function (req, res) {
  var actionType = req.params.actionType
  let actionList = settingsBill.actionsFor(actionType)
  for (var keys of actionList) {
    keys.ago = moment(keys.timestamp).fromNow()
  }
  res.render('actions', { actions: actionList})
})

const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
})