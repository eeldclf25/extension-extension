import * as vscode from 'vscode';
import { DailyCalendarProvider } from './dailyCalendar';

export function activate(context: vscode.ExtensionContext) {
	const provider = new DailyCalendarProvider();
	const markwhenProvider = vscode.workspace.registerTextDocumentContentProvider("markwhen", provider);
	const dailyCalendar = vscode.commands.registerCommand("extext.openDailyCalendar", () => provider.openDailyCalendar());

	context.subscriptions.push(
		markwhenProvider,
		dailyCalendar
	);
}

export function deactivate() { }
