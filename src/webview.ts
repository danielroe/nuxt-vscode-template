import { join } from 'node:path'
import * as vscode from 'vscode'

// @ts-expect-error raw loader
// eslint-disable-next-line antfu/no-import-dist
import html from '../ui/dist/200.html?raw'

export function prepareWebView(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'vueWebView',
    'Webview',
    vscode.ViewColumn.One,
    { enableScripts: true },
  )

  const processedHTML = (html as string).replace(
    /(src|href)="([^"]+)"/g,
    (string, _attribute, source) => string.replace(source, panel.webview.asWebviewUri(
      vscode.Uri.file(
        join(context.extensionPath, 'ui/dist', source),
      ),
    ).toString()),
  )

  panel.webview.html = processedHTML

  panel.webview.onDidReceiveMessage((message) => {
    if (message === 'ping') {
      vscode.window.showInformationMessage('Pinged from webview')
      panel.webview.postMessage('pong')
    }
  })
  return panel
}
