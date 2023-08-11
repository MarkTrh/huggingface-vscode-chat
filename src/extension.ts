import * as vscode from 'vscode';
import { setChatbotExtensionContext } from './globals/extensionContext';
import { registerCommands } from './commandHandler';

export async function activate(context: vscode.ExtensionContext) : Promise<void> {
	void initStartup(context);

	void backgroundInit(context);
}

function initStartup(context: vscode.ExtensionContext): void {
	setChatbotExtensionContext(context);
}


async function backgroundInit(context: vscode.ExtensionContext) {
	registerCommands(context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
