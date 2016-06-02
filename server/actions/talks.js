const GitHubApi = require('github')

const github = new GitHubApi({
  protocol: "https",
  host: "api.github.com",
  timeout: 5000,
  headers: {
      "user-agent": "pastak/yapcasia-8oji-2016mid-talks",
      "Accept": "application/vnd.github.squirrel-girl-preview"
  }
})

github.authenticate({
  type: "token",
  token: process.env.GITHUB_TOKEN
})

const getIssues = (l) => function *(next) {
  var label = 'トーク応募'
  if (l === 'lt') {
    label = 'LT応募'
  }
  console.log(label)
  this.body = yield new Promise((resolve) => github.issues.getForRepo({
    user: 'hachiojipm',
    repo: 'yapcasia-8oji-2016mid-timetable',
    state: 'open',
    per_page: 100,
    labels: label
  }, (err, res) => {
    resolve(res)
  }))
}

module.exports = {
  getTalks: () => getIssues('talk'),
  getLts: () => getIssues('lt')
}
