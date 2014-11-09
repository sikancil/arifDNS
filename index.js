"use strict";

var dns = require('native-dns'),
	tcpserver = dns.createTCPServer(),
	server = dns.createServer(),
	dnsConst = dns.consts,
	util = require('util'),
	fs = require('fs'),
	winston = require('winston'),
	config = require('./config.js');


/**
 * REQUEST and QUESTION to SERVER
 *
var start = Date.now();

var question = dns.Question({
	name: 'awalkinacloud.com',
	type: 'A',
});

var req = dns.Request({
	question: question,
	server: { address: '202.138.234.157', port: 53, type: 'udp' },
	timeout: 1000,
});

req.on('timeout', function () {
	console.log('**REQUEST** Timeout: Timeout in making request');
});

req.on('message', function (err, answer) {
	answer.answer.forEach(function (a) {
		console.log('**REQUEST** Message: ', a.address);
	});
});

req.on('end', function () {
  var delta = (Date.now()) - start;
  console.log('**REQUEST** End: Finished processing request about ' + delta.toString() + 'ms');
});

req.send();
*/

var dateNow = new Date();
config.app.logDebugFileName =
	config.app.logPrefix.debug + '_' + 
		dateNow.getFullYear() + '-' + 
		(dateNow.getMonth()+1) + '-' + 
		((dateNow.getDay().toString().length == 1) ? ('0'+dateNow.getDay()) : dateNow.getDay()) + 
		'.log';
config.app.logInfoFileName = 
	config.app.logPrefix.info + '_' + 
		dateNow.getFullYear() + '-' + 
		(dateNow.getMonth()+1) + '-' + 
		((dateNow.getDay().toString().length == 1) ? ('0'+dateNow.getDay()) : dateNow.getDay()) + 
		'.log';
config.app.logErrorFileName = 
	'error' + '_' + 
		dateNow.getFullYear() + '-' + 
		(dateNow.getMonth()+1) + '-' + 
		((dateNow.getDay().toString().length == 1) ? ('0'+dateNow.getDay()) : dateNow.getDay()) + 
		'.log';

var logger;

if (fs.existsSync(config.app.logPath)) {
    winston.add(winston.transports.File, { filename: config.app.logPath + '/' + config.app.logDebugFileName });
	logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({
				level: 'info',
				json: false,
				colorize: true,
				prettyPrint: true,
				timestamp: true,
				handleExceptions: true
			}),
			new (winston.transports.File)({
				level: 'debug',
				filename: config.app.logPath + '/' + config.app.logDebugFileName,
				json: true,
				colorize: true,
				prettyPrint: true,
				timestamp: true,
				maxFiles: 20,
				maxsize: 1024*1024*3,
				handleExceptions: true
			})
		],
		exceptionHandlers: [
			new winston.transports.File({
				filename: config.app.logPath + '/' + config.app.logErrorFileName,
				json: true,
				colorize: true,
				prettyPrint: true,
				timestamp: true,
				maxFiles: 20,
				maxsize: 1024*1024*3,
				handleExceptions: true
			})
		],
		exitOnError: false
	});
}

var dnsRecords = [];
dnsRecords.push(
	//-- SOA
	dns.SOA({
		name: 'awalkinacloud.com',
		primary: 'ns1.awalkinacloud.com',
		admin: 'dimas.indie@gmail.com',
		serial: '2014101001',
		refresh: 604800,
		retry: 86400,
		expiration: 86400,
		minimum: 1400,
		address: '202.138.234.157',
		ttl: 600,
	}),
	//-- A
	dns.A({
		name: 'awalkinacloud.com',
		address: '202.138.234.157',
		ttl: 600
	}),
	dns.A({
		name: 'ns1.awalkinacloud.com',
		address: '202.138.234.157',
		ttl: 600
	}),
	dns.A({
		name: 'ns2.awalkinacloud.com',
		address: '202.138.234.157',
		ttl: 600
	}),
	dns.A({
		name: 'mail.awalkinacloud.com',
		address: '202.138.234.157',
		ttl: 600
	}),
	//-- A
	/*
	dns.A({
		name: question.name,
		address: '202.138.234.157',
		ttl: 600
	}),
	*/
	//-- NS
	dns.NS({
		name: 'ns1.awalkinacloud.com',
		data: 'ns1.awalkinacloud.com',
		ttl: 600
	}),
	dns.NS({
		name: 'ns2.awalkinacloud.com',
		data: 'ns2.awalkinacloud.com',
		ttl: 600
	}),
	//-- CNAME
	dns.CNAME({
		name: 'www.awalkinacloud.com',
		data: 'awalkinacloud.com',
		ttl: 600
	}),
	//-- MX
	dns.MX({
		name: 'mail.awalkinacloud.com',
		priority: 10,
		exchange: 'mail.awalkinacloud.com',
		ttl: 600
	}),
	//-- TXT
	dns.TXT({
		name: 'test',
		data: 'Parking Domain',
		ttl: 600
	})
	//-- SRV
	/*
	dns.SRV({
		name: question.name,
		priority: 0,
		weight: 10
		port: 9000,
		target: 'host'
		ttl: 600
	}),
	*/
	//-- PTR
	/*
	dns.PTR({
		name: question.name,
		data: 'mx.awalkinacloud.com',
		ttl: 600
	}),
	*/
	//-- NAPTR
	/*
	dns.PTR({
		name: question.name,
		order: 0,
		preference: 0,
		flags: '',
		service: '',
		regexp: '',
		replacement: ''
		ttl: 600
	}),
	*/
);

var onRequestMessage = function (request, response) {
	logger.info('**SVR.REQUEST**');
	logger.info('  > ' + request.address.address + ' have some question(s)..');
	if (request.question.length > 0) {
		request.question.forEach(function(question){
			logger.info('  > Do you manage record(s)  "' + question.name.toLowerCase() + '"  of  "' + dnsConst.qtypeToName(question.type) + '" ?');
			if (question.type === 255) {
				//-- ANY --
				response.answer = dnsRecords;
			} else {
				var availableRecord = dnsRecords.filter(function(record) {
					return (
						(record.type === question.type) && (record.name.toLowerCase() === question.name.toLowerCase())
					);
				});
				if (availableRecord.length !== 0) {
					response.answer = availableRecord;
				}
			}
		});
	}
	logger.info('  > My answer is ', (response.answer.length > 0) ? '"YES".' : '"NO".');
	if (response.answer.length > 0) {
		logger.debug('  > here is the results: ', response.answer);
	}
	
	response.send();
};

var onErrorMessage = function (err, buff, req, res) {
	logger.error('**SERVER** gor Error message: ', err.stack);
};

var onListening = function () {
	logger.info('**SERVER** were listening on ', this.address().address + ':' + this.address().port + ' (' + this.address().family + ').');
	//this.close();
};

var onSocketError = function (err, socket) {
	logger.error('**SERVER** SocketError: ', err);
};

var onSocketClose = function () {
	logger.info('**SERVER** Socket was closed from ', this.address().address + ':' + this.address().port + ' (' + this.address().family + ').');
};

server.on('request', onRequestMessage);
server.on('error', onErrorMessage);
server.on('listening', onListening);
server.on('socketError', onSocketError);
server.on('close', onSocketClose);

server.serve(53, '0.0.0.0');

//-------------------------------------------------------------------

tcpserver.on('request', onRequestMessage);
tcpserver.on('error', onErrorMessage);
tcpserver.on('listening', onListening);
tcpserver.on('socketError', onSocketError);
tcpserver.on('close', onSocketClose);

tcpserver.serve(53, '0.0.0.0');