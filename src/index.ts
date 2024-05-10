import * as vscode from 'vscode'
import type { ExtensionContext } from 'vscode'

import { prepareWebView } from './webview'

export async function activate(context: ExtensionContext) {
  const webview = vscode.commands.registerCommand('publisher-slug.preview', () => {
    const panel = prepareWebView(context)

    panel.webview.onDidReceiveMessage(
      async ({ message }) => {
        vscode.window.showInformationMessage(message)
      },
      undefined,
      context.subscriptions,
    )
  })
  context.subscriptions.push(webview)
}

export function deactivate() {}
