import * as vscode from "vscode";
import { getChatbotExtensionContext } from "../globals/extensionContext";

export class ConversationViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'conversation.view';
    private exContext = getChatbotExtensionContext();

    resolveWebviewView(webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext<unknown>,
        token: vscode.CancellationToken): void | Thenable<void> {


        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
				vscode.Uri.joinPath(this.exContext.extensionUri, 'scripts'),
			]
        };


        webviewView.webview.html = this.getWebviewContent(webviewView.webview, this.exContext);
        // throw new Error("Method not implemented.");
        webviewView.webview.onDidReceiveMessage(message => {
            console.log(message);
            if (message.command === 'buttonClicked') {
                // Button click event received from the webview
                vscode.window.showInformationMessage('Button was clicked!');
            }
        });
    }


    private getWebviewContent(webview: vscode.Webview, context: vscode.ExtensionContext) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'scripts', 'conversation.js'));
        const microlightUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'scripts', 'microlight.min.js'));
        const tailwindUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'scripts', 'showdown.min.js'));
        const showdownUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'scripts', 'tailwind.min.js'));
        
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Button and Input Example</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        
        .content {
            flex: 1;
            padding: 20px;
        }
        
        .button-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            background-color: #f0f0f0;
        }
        
        .input-box {
            flex: 1;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        
        .button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        </style>
        </head>
        <body>
        <div class="content">
        <h1>Button and Input Example</h1>
        <p>This is some example content on the page.</p>
        </div>
        <div class="button-container">
        <input class="input-box" type="text" id="prompt-input" placeholder="Enter something...">
        <button class="button">Click Me</button>
        </div>
        </body>
        </html>  

        <script src="${scriptUri}"></script>
        <script src="${tailwindUri}"></script>
        <script src="${showdownUri}"></script>
        <script src="${microlightUri}"></script>
        `;
    }
}