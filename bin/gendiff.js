#!/usr/bin/env node
 
import { Command } from '../node_modules/commander/esm.mjs';
const program = new Command();

program
	.description('Compares two configuration files and shows a difference.')
	.arguments('<filepath1> <filepath2>')
	.version('0.0.1')
	.option('-f, --format [type]', 'output format')
	.parse();

 