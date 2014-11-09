var config = {
	app: {
		logPrefix: {
			debug: 'debug',
			info: 'info'
		},
		logPath: '/srv/arifDNS/logs',
		dataMonitor: {
			watchData: false,
			reloadInterval: 10000
		}
	},
	dns: {
		masterPath: '/srv/dnsconfig/master',
		slaveEnablePath: '/srv/dnsconfig/slave-enable',
		slaveDisablePath: '/srv/dnsconfig/slave-disable'
	}
};

module.exports = config;