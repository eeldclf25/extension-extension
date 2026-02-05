import * as vscode from 'vscode';

export class DailyCalendarProvider implements vscode.TextDocumentContentProvider {
    private changeEvent = new vscode.EventEmitter<vscode.Uri>();
    get onDidChange(): vscode.Event<vscode.Uri> {
        return this.changeEvent.event;
    }

    async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
        if (!vscode.extensions.getExtension("Markwhen.markwhen")) {
            return "Markwhen extension is required to view this calendar.";
        }

        if (!vscode.workspace.workspaceFolders) {
            return "No workspace folder open.";
        }

        try {
            const dailyNotesDir = vscode.workspace.getConfiguration("extext").get<string>("dailyNotesDirectory");
            const files = await vscode.workspace.findFiles(new vscode.RelativePattern(vscode.workspace.workspaceFolders[0], `${dailyNotesDir}/*.{md,mw}`));

            const decoder = new TextDecoder();
            const combinedContent = (await Promise.all(
                files.map(async (fileUri) => {
                    const fileContent = await vscode.workspace.fs.readFile(fileUri);
                    return decoder.decode(fileContent);
                })
            )).join('\n');

            return combinedContent;
        } catch (error) {
            return `Error reading calendar files: ${error}`;
        }
    }

    public async openDailyCalendar() {
        if (!vscode.extensions.getExtension("Markwhen.markwhen")) {
            vscode.window.showErrorMessage('This feature requires the Markwhen extension.');
            return;
        }

        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showWarningMessage('No workspace folder open.');
            return;
        }

        const uri = vscode.Uri.parse('markwhen:Daily Calendar.mw');
        this.changeEvent.fire(uri);

        await vscode.commands.executeCommand('vscode.openWith', uri, 'markwhen.timeline', vscode.ViewColumn.Two);
        await vscode.commands.executeCommand('markwhen.calendarView');
    }
}