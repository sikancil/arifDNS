var dns = {
	domainName: 'example.com',
	
	//-- SOA
	SOA: {	
		name: 'example.com',
		primary: 'ns1.example.com',
		admin: 'dimas.arif@outlook.com',
		serial: '2014101001',
		refresh: 604800,
		retry: 86400,
		expiration: 86400,
		minimum: 1400,
		address: '123.123.123.123',
		ttl: 600,
	},
	
	
	//-- A
	A: [{	
		name: 'example.com',
		address: '123.123.123.123',
		ttl: 600
	}, {
		name: 'ns1.example.com',
		address: '123.123.123.123',
		ttl: 600
	}, {
		name: 'ns2.example.com',
		address: '123.123.123.123',
		ttl: 600
	}, {
		name: 'mail.example.com',
		address: '123.123.123.123',
		ttl: 600
	}],
	
	
	//-- NS
	NS: [{
		name: 'ns1.example.com',
		data: 'ns1.example.com',
		ttl: 600
	}, {
		name: 'ns2.example.com',
		data: 'ns2.example.com',
		ttl: 600
	}],
	
	
	//-- CNAME
	CNAME: [{
		name: 'www.example.com',
		data: 'example.com',
		ttl: 600
	}],
	
	
	//-- MX
	MX: [{
		name: 'mail.example.com',
		priority: 10,
		exchange: 'mail.example.com',
		ttl: 600
	}],
	
	
	//-- TXT
	TXT: [{
		name: 'test',
		data: 'Parking Domain',
		ttl: 600
	}]
	
	
	//-- SRV
	SRV: [
	/*
	{
		name: '',
		priority: 0,
		weight: 10
		port: 9000,
		target: ''
		ttl: 600
	}
	*/
	],
	
	
	//-- PTR
	PTR: [
	/*
	{
		name: '',
		data: '',
		ttl: 600
	}
	*/
	],
	
	
	//-- NAPTR
	NAPTR: [
	/*
	{
		name: '',
		order: 0,
		preference: 0,
		flags: '',
		service: '',
		regexp: '',
		replacement: ''
		ttl: 600
	}
	*/
	]
}

module.exports = dns;