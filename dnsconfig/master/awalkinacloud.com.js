var dns = {
	domainName: 'awalkinacloud.com',
	
	//-- SOA
	SOA: {	
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
	},
	
	
	//-- A
	A: [{	
		name: 'awalkinacloud.com',
		address: '202.138.234.157',
		ttl: 600
	}, {
		name: 'ns1.awalkinacloud.com',
		address: '202.138.234.157',
		ttl: 600
	}, {
		name: 'ns2.awalkinacloud.com',
		address: '202.138.234.157',
		ttl: 600
	}, {
		name: 'mail.awalkinacloud.com',
		address: '202.138.234.157',
		ttl: 600
	}],
	
	
	//-- NS
	NS: [{
		name: 'ns1.awalkinacloud.com',
		data: 'ns1.awalkinacloud.com',
		ttl: 600
	}, {
		name: 'ns2.awalkinacloud.com',
		data: 'ns2.awalkinacloud.com',
		ttl: 600
	}],
	
	
	//-- CNAME
	CNAME: [{
		name: 'www.awalkinacloud.com',
		data: 'awalkinacloud.com',
		ttl: 600
	}],
	
	
	//-- MX
	MX: [{
		name: 'mail.awalkinacloud.com',
		priority: 10,
		exchange: 'mail.awalkinacloud.com',
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