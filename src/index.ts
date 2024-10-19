import type { ExtensionContext } from 'vscode'
import * as vscode from 'vscode'

import { prepareWebView } from './webview'

export async function activate(context: ExtensionContext) {
  const webview = vscode.commands.registerCommand('publisher-slug.preview', () => prepareWebView(context))
  context.subscriptions.push(webview)
}

export function deactivate() {}
