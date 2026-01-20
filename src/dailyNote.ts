import * as vscode from 'vscode';

export class DailyNote {
    public async createDailyNote() {
        if (!vscode.extensions.getExtension("foam.foam-vscode")) {
            vscode.window.showErrorMessage('This feature requires the Foam extension.');
            return;
        }
        await vscode.commands.executeCommand("foam-vscode.open-daily-note-for-date");
    }
}
