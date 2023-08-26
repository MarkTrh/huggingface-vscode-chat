import { window, commands, ExtensionContext, workspace } from "vscode";
import { getChatbotExtensionContext } from "./globals/extensionContext";
import { ConversationViewProvider } from './conversation/ConversationViewProvider';

export const SET_API_TOKEN_COMMAND = "huggingface-vscode-chat:setApiToken";

export function registerCommands(
  context: ExtensionContext
): void {
  const config = workspace.getConfiguration('huggingface-vscode-chat');

  context.subscriptions.push(
    commands.registerCommand(SET_API_TOKEN_COMMAND, setApiToken)
  );

  console.log(config);
  const provider = new ConversationViewProvider();

  context.subscriptions.push(
    window.registerWebviewViewProvider(ConversationViewProvider.viewType, provider, {
      webviewOptions: { retainContextWhenHidden: true }
    })
  );
}


async function setApiToken() {
  const context = getChatbotExtensionContext();
  const input = await window.showInputBox({
    prompt: 'Please enter your API token (find yours at hf.co/settings/token):',
    placeHolder: 'Your token goes here ...'
  });
  if (input !== undefined) {
    await context?.secrets.store('apiToken', input);
    window.showInformationMessage(`Hugging Face Code: API Token was successfully saved`);
  }
};