#!/usr/bin/env node

const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const dir = path.join( __dirname, '..', '..');
const sys = require('sys');
const childProcess = require('child_process').spawn;
const plt = (process.env.CORDOVA_PLATFORMS + '').toLowerCase();

var parser = new xml2js.Parser();
var task = {
	icon : true,
	land : true,
	prot : true,
	task : true
};

function closes (name) {
	return function (code) {
		var test = true;
		task[name] = true;
		for ( var x in task)
			test = task[x] === true && test;

		if(test)
			process.exit();
	}
}

function putOut (name, tipe) {
	return function (data) {
		console[tipe]('Task :', name, data.toString());
	}
}

fs.readFile(path.join(dir, 'config.xml'), function (err, data) {
	if(err || !data) throw err || new Error('No exist the config.xml');
	parser.parseString(data, function (err, result) {
		if(err || !result) throw err || new Error('The config.xml is empty');
		if( result.widget.task ){
			var coms = result.widget.icon[0].$[ plt ] || result.widget.icon[0].$.comand;

			if ( plt === 'serv' )
				coms = 'watch';
			
			if( coms ){
				task.task = childProcess(result.widget.task[0].$.name, coms.split(',') );
				task.task.stdout.on('data', putOut('task', 'log') );
				task.task.stderr.on('data', putOut('task', 'error'));
				task.task.on('close', closes('task'));	
			}
		}

		if( result.widget.icon ){
			var coms = [ 
				'-icon',
				path.join(dir, result.widget.icon[0].$.src),
				'-out',
				path.join(dir, 'res' ),
				path.join(dir, 'hooks', 'resize', 'icons-' + plt + '.msl' )];

			task.icon = childProcess('conjure', coms );
			task.icon.stdout.on('data', putOut('icon', 'log') );
			task.icon.stderr.on('data', putOut('icon', 'error'));
			task.icon.on('close', closes('icon'));
		}
		
		if( result.widget.splash ){
			if( result.widget.splash[0].$.land ){
				var coms = [ 
					'-icon',
					path.join(dir, result.widget.splash[0].$.land),
					'-out',
					path.join(dir, 'res' ),
					path.join(dir, 'hooks', 'resize', 'splash-land-' + plt + '.msl' )];

				task.land = childProcess('conjure', coms );
				task.land.stdout.on('data', putOut('land', 'log') );
				task.land.stderr.on('data', putOut('land', 'error'));
				task.land.on('close', closes('land'));
			}

			if( result.widget.splash[0].$.prot ){
				var coms = [ 
					'-icon',
					path.join(dir, result.widget.splash[0].$.prot),
					'-out',
					path.join(dir, 'res' ),
					path.join(dir, 'hooks', 'resize', 'splash-prot-' + plt + '.msl' )];

				task.prot = childProcess('conjure', coms );
				task.prot.stdout.on('data', putOut('prot', 'log') );
				task.prot.stderr.on('data', putOut('prot', 'error'));
				task.prot.on('close', closes('prot'));
			}
		}
    });
});