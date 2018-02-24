let credentials = {
	host:     'localhost',
	port: 		'27017',
	username: 'cs602_user',
	password: 'cs602_secret',
	database: 'blogDB'
}

// construct the database url
const url = 'mongodb://' + 
  credentials.username +
  ':' + 
  credentials.password + 
  '@' + 
  credentials.host + 
  ':' + 
  credentials.port + 
  '/' + 
  credentials.database;

  module.exports = url;