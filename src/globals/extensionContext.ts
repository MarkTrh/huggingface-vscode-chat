import * as vscode from "vscode";

let chatbotExtensionContext: vscode.ExtensionContext;

export function setChatbotExtensionContext(
  context: vscode.ExtensionContext
): void {
    chatbotExtensionContext = context;
}

export function getChatbotExtensionContext(): vscode.ExtensionContext {
  return chatbotExtensionContext;
}