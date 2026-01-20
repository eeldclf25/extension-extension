import * as vscode from 'vscode';
import { DailyCalendarProvider } from './dailyCalendar';
import { DailyNote } from './dailyNote';

export function activate(context: vscode.ExtensionContext) {
	const provider = new DailyCalendarProvider();
	const markwhenProvider = vscode.workspace.registerTextDocumentContentProvider("markwhen", provider);
	const dailyCalendar = vscode.commands.registerCommand("extext.openDailyCalendar", () => provider.openDailyCalendar());

	const dailyNote = new DailyNote();
	const createDailyNote = vscode.commands.registerCommand("extext.createDailyNote", () => dailyNote.createDailyNote());

	context.subscriptions.push(
		markwhenProvider,
		dailyCalendar,
		createDailyNote
	);
}

export function deactivate() { }
