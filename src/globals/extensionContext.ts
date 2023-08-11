import * as vscode from "vscode";

let chatbotExtensionContext: vscode.ExtensionContext | null = null;

export function setChatbotExtensionContext(
  context: vscode.ExtensionContext
): void {
    chatbotExtensionContext = context;
}

export function getChatbotExtensionContext(): vscode.ExtensionContext | null {
  return chatbotExtensionContext;
}